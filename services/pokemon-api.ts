import { Pokemon, PokemonListResponse } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = {
    // Buscar lista de Pokémon com paginação
    async getPokemons(
        limit: number = 100,
        offset: number = 0
    ): Promise<PokemonListResponse> {
        const response = await fetch(
            `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!response.ok) {
            throw new Error("Erro ao buscar a lista de Pokémon");
        }
        return response.json();
    },

    // Buscar detalhes de um Pokémon específico
    async getPokemonByName(name: string): Promise<Pokemon> {
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar o pokémon: ${name}`);
        }
        return response.json();
    },

    // Extrair o ID da URL do Pokémon
    getPokemonIdFromUrl(url: string): number {
        const parts = url.split("/").filter(Boolean);
        return parseInt(parts[parts.length - 1]);
    },

    // Buscar todos os Pokémon de um tipo específico
    async getPokemonsByType(type: string) {
        const response = await fetch(`${BASE_URL}/type/${type}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar pokémons do tipo: ${type}`);
        }
        const data = await response.json();
        return data.pokemon.map((p: any) => ({
            name: p.pokemon.name,
            url: p.pokemon.url,
        }));
    },

    // Buscar todos os Pokémon (até 1000)
    async getAllPokemons() {
        const response = await fetch(`${BASE_URL}/pokemon?limit=1000&offset=0`);
        if (!response.ok) {
            throw new Error("Erro ao buscar todos os pokémons");
        }
        return response.json();
    },
};
