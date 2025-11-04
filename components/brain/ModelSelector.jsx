'use client'
import React from 'react'
export default function ModelSelector({onChange}){
  return (
    <select onChange={e=>onChange(e.target.value)} style={{padding:8,borderRadius:6}}>
      <option value="gpt-4o-mini">GPT-like</option>
      <option value="deepthink-v1">DeepThink (detailed)</option>
      <option value="grokish">Grok-style</option>
      <option value="cloud-ensemble">Cloud Ensemble</option>
    </select>
  )
}
