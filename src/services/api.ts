import axios from 'axios';
import { CharactersResponse } from "@/app/dto/character";

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

/**
 * Obtiene la lista de personajes de Rick and Morty con paginación y filtros
 */
export async function getCharacters(params?: GetCharactersParams): Promise<CharactersResponse> {
  try {
    const response = await axios.get<CharactersResponse>(`${API_BASE_URL}/character`, { params });
    return response.data;
  } catch (error: any) {
    // Si es 404, significa que no hay resultados - devolver respuesta vacía
    if (error.response?.status === 404) {
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null
        },
        results: []
      };
    }
    // Cualquier otro error se propaga
    console.error('Error fetching characters:', error);
    throw error;
  }
}

/**
 * Obtiene un personaje específico por ID
 */
export async function getCharacterById(id: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    throw error;
  }
}

/**
 * Busca personajes por nombre
 */
export async function searchCharactersByName(name: string): Promise<CharactersResponse> {
  try {
    const response = await axios.get<CharactersResponse>(`${API_BASE_URL}/character`, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching characters by name "${name}":`, error);
    throw error;
  }
}

/**
 * Filtra personajes por status
 */
export async function filterCharactersByStatus(status: string): Promise<CharactersResponse> {
  try {
    const response = await axios.get<CharactersResponse>(`${API_BASE_URL}/character`, {
      params: { status }
    });
    return response.data;
  } catch (error) {
    console.error(`Error filtering characters by status "${status}":`, error);
    throw error;
  }
}

