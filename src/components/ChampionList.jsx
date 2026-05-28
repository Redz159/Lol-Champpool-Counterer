import React from 'react'
import ChampionCard from './ChampionCard'

export default function ChampionList({ results, onlyPool, pool }) {
  if (!results) return <div className="empty">No results yet. Add champions and press Done.</div>

  // results expected shape: { query, generatedAt, results: [...] }
  const list = results.results || []

  const filtered = onlyPool && pool.length ? list.filter(r => pool.includes(r.champ)) : list

  return (
    <div className="champ-list">
      {filtered.map(r => <ChampionCard key={r.champ} data={r} />)}
    </div>
  )
}

