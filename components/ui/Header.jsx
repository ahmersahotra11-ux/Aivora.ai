'use client'
import React from 'react'

export default function Header(){
  return (
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:44,height:44,background:'#1f2937',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>A</div>
        <div>
          <div style={{fontWeight:700}}>Aivora.ai <span style={{fontSize:12,opacity:.8}}>by Infinity Duo ♾️</span></div>
          <div style={{fontSize:12,opacity:.7}}>GPT + DeepThink + Grok-style ensemble</div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <button id="theme-toggle" style={{padding:'8px 10px',borderRadius:8}}>Toggle Theme</button>
      </div>
    </header>
  )
}
