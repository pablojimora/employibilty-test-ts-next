'use client'

import { useEffect, useState } from "react"

export default function Home() {
  const [characters, setCharacters] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(data => {
        setCharacters(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      {characters.map((char, index) => (
        <div key={index}>
          <h3>{char.name}</h3>
          <img src={char.image} />
        </div>
      ))}
    </div>
  )
}
