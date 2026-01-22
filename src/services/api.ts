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
 * Gets the list of Rick and Morty characters with pagination and filters
 */
export async function getCharacters(params?: GetCharactersParams): Promise<CharactersResponse> {
  try {
    const response = await axios.get<CharactersResponse>(`${API_BASE_URL}/character`, { params });
    return response.data;
  } catch (error: any) {
    // If 404, it means no results - return empty response
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
    // Any other error is propagated
    console.error('Error fetching characters:', error);
    throw error;
  }
}

/**
 * Gets a specific character by ID
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
 * Searches characters by name
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
 * Filters characters by status
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

