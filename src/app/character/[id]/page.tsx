'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCharacterById } from '@/services/api';
import { Character } from '@/app/dto/character';
import LoadingState from '@/components/Loadingstate';
import { notification } from '@/helpers/notificaciones';

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const id = Number(params.id);
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (error) {
        notification('Error al cargar el personaje', 'error');
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [params.id, router]);

  if (loading) return <LoadingState />;
  if (!character) return null;

  const statusColor = {
    'Alive': 'bg-green-500',
    'Dead': 'bg-red-500',
    'unknown': 'bg-gray-400'
  }[character.status];

  const statusTextColor = {
    'Alive': 'text-green-700',
    'Dead': 'text-red-700',
    'unknown': 'text-gray-700'
  }[character.status];

  return (
    <div className="container-fluid p-4 md:p-8">
      {/* Back button */}
      <button
        onClick={() => router.push('/dashboard')}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <span className="text-xl">←</span>
        <span className="font-medium">Volver al Dashboard</span>
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/2 lg:w-2/5 relative">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
              style={{ minHeight: '400px' }}
            />
            <div className={`absolute top-4 right-4 ${statusColor} text-white px-4 py-2 rounded-full font-semibold shadow-lg`}>
              {character.status}
            </div>
          </div>

          {/* Information */}
          <div className="md:w-1/2 lg:w-3/5 p-8">
            {/* Name */}
            <h1 className="text-4xl font-bold mb-2 text-gray-800">{character.name}</h1>
            <p className="text-xl text-gray-500 mb-6">ID: #{character.id}</p>

            {/* Information grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Status */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Estado</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
                  <p className={`text-lg font-bold ${statusTextColor}`}>{character.status}</p>
                </div>
              </div>

              {/* Species */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Especie</p>
                <p className="text-lg font-semibold text-gray-800">{character.species}</p>
              </div>

              {/* Type */}
              {character.type && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Tipo</p>
                  <p className="text-lg font-semibold text-gray-800">{character.type}</p>
                </div>
              )}

              {/* Gender */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Género</p>
                <p className="text-lg font-semibold text-gray-800">{character.gender}</p>
              </div>
            </div>

            {/* Origin and Location */}
            <div className="space-y-6 mb-8">
              {/* Origin */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Origen</p>
                <p className="text-lg font-semibold text-gray-800">{character.origin.name}</p>
              </div>

              {/* Last known location */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Última ubicación conocida</p>
                <p className="text-lg font-semibold text-gray-800">{character.location.name}</p>
              </div>
            </div>

            {/* Episodes */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Apariciones</p>
              <p className="text-2xl font-bold text-blue-700">
                {character.episode.length} episodio{character.episode.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Creation date */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Creado: {new Date(character.created).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
