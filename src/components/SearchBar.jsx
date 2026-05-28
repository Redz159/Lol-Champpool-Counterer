import React from 'react'

export default function SearchBar({ value, onChange, onAdd, onEnter }) {
  function handleKey(e) {
    if (e.key === 'Enter') {
      if (value && value.trim()) onEnter()
      else if (!value && onAdd) onAdd()
    }
  }

  return (
    <div className="searchbar">
      <input
        placeholder="Add Champion..."
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
      />
      <button onClick={onAdd}>Add</button>
    </div>
  )
}

