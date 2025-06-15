import type { Filme } from '../types/filme'

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000'

export async function getFilme(id: string): Promise<Filme> {
  const response = await fetch(`${API_URL}/filmes/${id}`)
  if (!response.ok) {
    throw new Error('Erro ao buscar filme')
  }
  return response.json()
}

export async function getFilmesPorGenero(genero: string): Promise<Filme[]> {
  const response = await fetch(`${API_URL}/filmes/genero/${genero}`)
  if (!response.ok) {
    throw new Error('Erro ao buscar filmes por gênero')
  }
  return response.json()
}

export async function getFilmes(): Promise<Filme[]> {
  const response = await fetch(`${API_URL}/filmes`)
  if (!response.ok) {
    throw new Error('Erro ao buscar filmes')
  }
  return response.json()
} 