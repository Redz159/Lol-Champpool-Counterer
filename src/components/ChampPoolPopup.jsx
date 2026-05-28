import React, { useState } from 'react'

export default function ChampPoolPopup({ pool, onClose, onSave }) {
  const [text, setText] = useState(pool.join('\n'))

  function save() {
    const arr = text.split('\n').map(s => s.trim()).filter(Boolean)
    onSave(arr)
    onClose()
  }

  return (
    <div className="overlay">
      <div className="popup">
        <h3>Edit Champpool</h3>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={10} />
        <div className="row">
          <button onClick={save}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

