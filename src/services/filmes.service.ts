import api from './axios.config'

export interface Filme {
  id: number
  titulo: string
  imagem: string
  notaMedia: number
  genero: string
  ano: number
  diretor: string
  sinopse: string
}

export interface Genero {
  id: number
  nome: string
  quantidade: number
}

export const filmesService = {
  async listarFilmes(): Promise<Filme[]> {
    const response = await api.get('/filmes')
    return response.data
  },

  async buscarFilmePorId(id: number): Promise<Filme> {
    const response = await api.get(`/filmes/${id}`)
    return response.data
  },

  async listarFilmesPorGenero(genero: string): Promise<Filme[]> {
    const response = await api.get(`/filmes/genero/${genero}`)
    return response.data
  },

  async listarGeneros(): Promise<Genero[]> {
    const response = await api.get('/filmes/generos')
    return response.data
  }
} 