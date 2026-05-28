import React from 'react'

export default function ChampionCard({ data }) {
  // data: { champ, winrate, games, normalized1, normalized2, final_score, confidence }
  const topGood = (data.good_vs || []).slice(0,3)
  const bad = (data.bad_vs || []).slice(0,1)

  return (
    <div className="champ-card">
      <div className="left">
        <div className="icon" />
        <div className="name">{data.champ}</div>
      </div>
      <div className="middle">
        <div className="agg">Avg Winrate: {data.winrate ?? 'N/A'}%</div>
        <div className="games">Games: {data.games ?? 0}</div>
      </div>
      <div className="right">
        <div className="good">Good vs
          {topGood.map(g => <div key={g} className="small">{g}</div>)}
        </div>
        <div className="bad">Bad vs
          {bad.map(b => <div key={b} className="small bad">{b}</div>)}
        </div>
      </div>
    </div>
  )
}

