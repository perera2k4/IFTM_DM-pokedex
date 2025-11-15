import { Pokemon, PokemonListResponse } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = {
    // Buscar lista de Pokémon com paginação
    async getPokemons(
        limit: number = 20,
        offset: number = 0
    ): Promise<PokemonListResponse> {
        const response = await fetch(
            `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch pokemon list");
        }
        return response.json();
    },

    // Buscar detalhes de um Pokémon específico
    async getPokemonByName(name: string): Promise<Pokemon> {
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch pokemon: ${name}`);
        }
        return response.json();
    },

    // Buscar Pokémon por ID
    async getPokemonById(id: number): Promise<Pokemon> {
        const response = await fetch(`${BASE_URL}/pokemon/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch pokemon with id: ${id}`);
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
            throw new Error(`Failed to fetch pokemons of type: ${type}`);
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
            throw new Error("Failed to fetch all pokemons");
        }
        return response.json();
    },
};
