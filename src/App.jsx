import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import ChampionList from './components/ChampionList'
import ChampPoolPopup from './components/ChampPoolPopup'
import { getPatches, getCounters } from './api'

export default function App() {
  const [search, setSearch] = useState('')
  const [champs, setChamps] = useState([])
  const [patches, setPatches] = useState([])
  const [selectedPatch, setSelectedPatch] = useState('')
  const [onlyPool, setOnlyPool] = useState(false)
  const [pool, setPool] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('champpool') || '[]')
    } catch (e) {
      return []
    }
  })
  const [showPopup, setShowPopup] = useState(false)
  const [results, setResults] = useState(null)

  useEffect(() => {
    getPatches().then(list => {
      setPatches(list)
      if (list && list.length) setSelectedPatch(list[0])
    }).catch(() => {})
  }, [])

  useEffect(() => {
    localStorage.setItem('champpool', JSON.stringify(pool))
  }, [pool])

  function addChamp(name) {
    const n = name.trim()
    if (!n) return
    setChamps(prev => Array.from(new Set([...prev, n])))
    setSearch('')
  }

  function removeChamp(name) {
    setChamps(prev => prev.filter(c => c !== name))
  }

  async function doQuery() {
    if (champs.length === 0) return
    const data = await getCounters(champs, { patch: selectedPatch, onlyPool, pool })
    setResults(data)
  }

  return (
    <div className="app">
      <header>
        <h1>LoL Champpool Counterer</h1>
      </header>

      <section className="controls">
        <SearchBar
          value={search}
          onChange={setSearch}
          onAdd={() => addChamp(search)}
          onEnter={() => addChamp(search)}
        />

        <div className="select-row">
          <label>Patch:</label>
          <select value={selectedPatch} onChange={e => setSelectedPatch(e.target.value)}>
            {patches.map(p => <option key={p} value={p}>{p}</option>)}
            <option value="">(manuell)</option>
          </select>
          <label className="only-pool">
            <input type="checkbox" checked={onlyPool} onChange={e => setOnlyPool(e.target.checked)} /> Only Champpool
          </label>
          <button onClick={() => setShowPopup(true)}>✎</button>
        </div>

        <div className="champs-row">
          {champs.map(c => (
            <div className="chip" key={c}>
              {c} <button onClick={() => removeChamp(c)}>x</button>
            </div>
          ))}
        </div>

        <div className="actions">
          <button onClick={doQuery}>Done</button>
        </div>
      </section>

      <main>
        <ChampionList results={results} onlyPool={onlyPool} pool={pool} />
      </main>

      {showPopup && <ChampPoolPopup pool={pool} onClose={() => setShowPopup(false)} onSave={setPool} />}
    </div>
  )
}

