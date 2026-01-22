'use client'
import { getCharacters } from "@/services/api"
import { Character } from "../dto/character"
import { useEffect, useState } from "react"
import { Card } from "../components/Card"
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getCharacters()
        setCharacters(data.results || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching characters:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [user, router])

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6">Error: {error}</p>;
  if (characters.length === 0) return <p className="p-6">No characters available</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Character List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((char, index) => (
          <div key={index}>
            <Card
              title={char.name}
              description={`${char.species} - ${char.status}`}
              imageUrl={char.image}
              status={char.status}
              species={char.species}
              onClick={() => getCharacters()}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
