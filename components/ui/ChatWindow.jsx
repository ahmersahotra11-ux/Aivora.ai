'use client'
import React, { useState } from 'react'

export default function ChatWindow(){
  const [input,setInput] = useState('')
  const [messages,setMessages] = useState([])
  const [loading,setLoading] = useState(false)
  const [deepThink, setDeepThink] = useState(false)
  const [model, setModel] = useState('gpt-4o-mini')

  async function send(){
    if(!input.trim()) return
    const user = { sender:'user', text: input }
    setMessages(prev=>[...prev,user])
    setInput('')
    setLoading(true)
    try{
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ message: input, model, deepThink })
      })
      const j = await res.json()
      if (j.error) {
        setMessages(prev=>[...prev,{ sender:'bot', text: 'Error: ' + j.error }])
      } else {
        setMessages(prev=>[...prev,{ sender:'bot', text: j.reply }])
      }
    }catch(e){
      setMessages(prev=>[...prev,{ sender:'bot', text: 'Error connecting to server.' }])
    }finally{
      setLoading(false)
    }
  }

  function clearHistory(){
    setMessages([])
  }

  return (
    <div style={{background:'#071124',padding:16,borderRadius:10}}>
      <div style={{display:'flex',gap:10,marginBottom:12}}>
        <select value={model} onChange={e=>setModel(e.target.value)} style={{padding:8,borderRadius:6}}>
          <option value="gpt-4o-mini">GPT-like</option>
          <option value="deepthink-v1">DeepThink (detailed)</option>
          <option value="grokish">Grok-style</option>
          <option value="cloud-ensemble">Cloud Ensemble</option>
        </select>
        <label style={{display:'flex',alignItems:'center',gap:6}}>
          <input type="checkbox" checked={deepThink} onChange={e=>setDeepThink(e.target.checked)} />
          DeepThink
        </label>
        <button onClick={clearHistory} style={{padding:8,borderRadius:6}}>Delete History</button>
      </div>

      <div style={{maxHeight:360,overflowY:'auto',display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
        {messages.map((m,i)=>(
          <div key={i} style={{
            alignSelf: m.sender==='user'?'flex-end':'flex-start',
            background: m.sender==='user'?'#0f62fe':'#198038',
            color:'#fff',padding:10,borderRadius:8,maxWidth:'80%'
          }}>
            <strong style={{textTransform:'capitalize'}}>{m.sender}:</strong> <span style={{marginLeft:8}}>{m.text}</span>
          </div>
        ))}
        {loading && <div style={{color:'#9ca3af'}}>Thinking...</div>}
      </div>

      <div style={{display:'flex',gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} style={{flex:1,padding:10,borderRadius:8,background:'#071024',color:'#fff',border:'1px solid #233'}} placeholder="Ask Aivora..." />
        <button onClick={send} style={{padding:'10px 14px',borderRadius:8,background:'#0f62fe',color:'#fff'}}>Send</button>
      </div>
    </div>
  )
}
