export async function getPatches() {
  try {
    const res = await fetch('/api/patches')
    if (!res.ok) throw new Error('network')
    return res.json()
  } catch (e) {
    // fallback list
    return ['16.11', '16.10', '16.9', '15.24']
  }
}

export async function getCounters(champs, options = {}) {
  const params = new URLSearchParams()
  params.set('champs', champs.join(','))
  if (options.patch) params.set('patch', options.patch)
  if (options.tier) params.set('tier', options.tier)
  if (options.lane) params.set('lane', options.lane)
  if (options.vslane) params.set('vslane', options.vslane)
  // onlyPool and pool are sent as JSON in body for simplicity via POST in future; for mock use query
  try {
    const res = await fetch('/api/counters?' + params.toString())
    if (!res.ok) throw new Error('network')
    return res.json()
  } catch (e) {
    return null
  }
}

