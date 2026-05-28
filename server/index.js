import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

app.get('/api/patches', (req, res) => {
  // In a real implementation this would crawl or fetch available patches
  res.json(['16.11','16.10','16.9','15.24'])
})

app.get('/api/counters', (req, res) => {
  const champs = (req.query.champs || '').split(',').filter(Boolean)
  const patch = req.query.patch || ''
  const tier = req.query.tier || ''
  const lane = req.query.lane || ''
  const vslane = req.query.vslane || ''

  // Build a source url similar to description
  const buildUrl = (champ) => {
    const base = `https://lolalytics.com/lol/${encodeURIComponent(champ)}/counters/?`
    const params = []
    if (lane) params.push(`lane=${encodeURIComponent(lane)}`)
    if (vslane) params.push(`vslane=${encodeURIComponent(vslane)}`)
    if (patch) params.push(`patch=${encodeURIComponent(patch)}`)
    if (tier) params.push(`tier=${encodeURIComponent(tier)}`)
    return base + params.join('&')
  }

  const results = champs.map(ch => {
    // generate mock counters
    const good_vs = ['Aatrox','Olaf','Darius'].filter((_,i)=>i<3)
    const bad_vs = ['Fiora']
    return {
      champ: ch,
      winrate: (50 + Math.round(Math.random()*10*100)/100).toFixed(2),
      games: Math.floor(200 + Math.random()*5000),
      normalized1: 0,
      normalized2: 0,
      final_score: 0,
      confidence: 0.7,
      good_vs,
      bad_vs,
      sourceUrl: buildUrl(ch)
    }
  })

  res.json({ query: { champs, patch, tier, lane, vslane }, generatedAt: new Date().toISOString(), results })
})

app.listen(PORT, () => console.log(`Mock API running on http://localhost:${PORT}`))

