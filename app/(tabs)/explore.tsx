import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
} from "react-native";

import { PokemonCard } from "@/components/pokemon-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { pokemonApi } from "@/services/pokemon-api";
import { PokemonListItem } from "@/types/pokemon";

export default function ExploreScreen() {
    const router = useRouter();
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
    const [allPokemons, setAllPokemons] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadingFilters, setLoadingFilters] = useState(false);
    const [offset, setOffset] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const LIMIT = 100;

    const POKEMON_TYPES = [
        "normal",
        "fire",
        "water",
        "electric",
        "grass",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy",
    ];

    useEffect(() => {
        loadInitialPokemons();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, selectedTypes]);

    const loadInitialPokemons = async () => {
        try {
            setLoading(true);
            // Carregar todos os pokémons de uma vez
            const data = await pokemonApi.getAllPokemons();
            setAllPokemons(data.results);
            setPokemons(data.results.slice(0, LIMIT));
            setOffset(LIMIT);
        } catch (error) {
            console.error("Error loading pokemons:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePokemons = async () => {
        if (loadingMore || searchQuery || selectedTypes.length > 0) return;

        try {
            setLoadingMore(true);
            const newOffset = offset + LIMIT;
            const morePokemons = allPokemons.slice(offset, newOffset);
            setPokemons((prev) => [...prev, ...morePokemons]);
            setOffset(newOffset);
        } catch (error) {
            console.error("Error loading more pokemons:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    const applyFilters = async () => {
        // Se não há filtros, mostrar os primeiros pokémons
        if (!searchQuery && selectedTypes.length === 0) {
            setPokemons(allPokemons.slice(0, offset));
            return;
        }

        setLoadingFilters(true);

        try {
            let filtered: PokemonListItem[] = [];

            // Se há tipos selecionados, buscar da API
            if (selectedTypes.length > 0) {
                // Buscar pokémons de cada tipo selecionado
                const typePromises = selectedTypes.map((type) =>
                    pokemonApi.getPokemonsByType(type)
                );
                const typesResults = (await Promise.all(
                    typePromises
                )) as PokemonListItem[][];

                // Se há múltiplos tipos, encontrar interseção (pokémons que têm TODOS os tipos)
                if (typesResults.length === 1) {
                    filtered = typesResults[0];
                } else {
                    // Criar mapa de contagem para cada pokémon
                    const pokemonCount = new Map<string, number>();
                    typesResults.forEach((typePokemons: PokemonListItem[]) => {
                        typePokemons.forEach((pokemon: PokemonListItem) => {
                            pokemonCount.set(
                                pokemon.name,
                                (pokemonCount.get(pokemon.name) || 0) + 1
                            );
                        });
                    });

                    // Filtrar pokémons que aparecem em todos os tipos
                    filtered = typesResults[0].filter(
                        (pokemon: PokemonListItem) =>
                            pokemonCount.get(pokemon.name) ===
                            selectedTypes.length
                    );
                }
            } else {
                filtered = allPokemons;
            }

            // Aplicar filtro de nome sobre os resultados
            if (searchQuery) {
                filtered = filtered.filter((pokemon) =>
                    pokemon.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                );
            }

            setPokemons(filtered);
        } catch (error) {
            console.error("Error applying filters:", error);
        } finally {
            setLoadingFilters(false);
        }
    };

    const toggleType = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedTypes([]);
    };

    const handlePokemonPress = (name: string) => {
        router.push(`/pokemon/${name}` as any);
    };

    if (loading) {
        return (
            <ThemedView style={styles.container}>
                <ThemedView style={styles.header}>
                    <ThemedText
                        type="title"
                        style={{ fontFamily: Fonts.rounded }}
                    >
                        Pokédex
                    </ThemedText>
                </ThemedView>
                <ActivityIndicator size="large" style={styles.loader} />
            </ThemedView>
        );
    }

    const typeColors: { [key: string]: string } = {
        normal: "#A8A878",
        fire: "#F08030",
        water: "#6890F0",
        electric: "#F8D030",
        grass: "#78C850",
        ice: "#98D8D8",
        fighting: "#C03028",
        poison: "#A040A0",
        ground: "#E0C068",
        flying: "#A890F0",
        psychic: "#F85888",
        bug: "#A8B820",
        rock: "#B8A038",
        ghost: "#705898",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0",
        fairy: "#EE99AC",
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                {!searchModalVisible ? (
                    <ThemedView style={styles.headerTop}>
                        <ThemedView>
                            <ThemedText
                                type="title"
                                style={{ fontFamily: Fonts.rounded }}
                            >
                                Pokédex
                            </ThemedText>
                            <ThemedText style={styles.subtitle}>
                                Encontre todos os Pokémons
                            </ThemedText>
                        </ThemedView>

                        {/* Ícone de Lupa */}
                        <Pressable
                            style={styles.searchIconButton}
                            onPress={() => setSearchModalVisible(true)}
                        >
                            <IconSymbol
                                size={24}
                                name="magnifyingglass"
                                color="#333"
                            />
                        </Pressable>
                    </ThemedView>
                ) : (
                    <ThemedView style={styles.searchBar}>
                        <Pressable
                            style={styles.backButton}
                            onPress={() => {
                                setSearchModalVisible(false);
                                setSearchQuery("");
                            }}
                        >
                            <IconSymbol
                                size={24}
                                name="chevron.left"
                                color="#333"
                            />
                        </Pressable>
                        <TextInput
                            style={styles.searchBarInput}
                            placeholder="Digite o nome do Pokémon..."
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        />
                        <Pressable
                            style={styles.searchBarButton}
                            onPress={() => setSearchModalVisible(false)}
                        >
                            <IconSymbol
                                size={22}
                                name="magnifyingglass"
                                color="#FFF"
                            />
                        </Pressable>
                    </ThemedView>
                )}

                {/* Filtros de Tipo */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.typesScrollView}
                    contentContainerStyle={styles.typesContainer}
                >
                    {POKEMON_TYPES.map((type) => (
                        <Pressable
                            key={type}
                            onPress={() => toggleType(type)}
                            style={[
                                styles.typeChip,
                                {
                                    backgroundColor: selectedTypes.includes(
                                        type
                                    )
                                        ? typeColors[type]
                                        : "#e0e0e0",
                                },
                            ]}
                        >
                            <ThemedText
                                style={[
                                    styles.typeChipText,
                                    {
                                        color: selectedTypes.includes(type)
                                            ? "#FFF"
                                            : "#333",
                                    },
                                ]}
                            >
                                {type}
                            </ThemedText>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Botão Limpar Filtros */}
                {(searchQuery || selectedTypes.length > 0) && (
                    <Pressable
                        onPress={clearFilters}
                        style={styles.clearButton}
                    >
                        <ThemedText style={styles.clearButtonText}>
                            Limpar filtros ({pokemons.length} resultados)
                        </ThemedText>
                    </Pressable>
                )}
            </ThemedView>

            {loadingFilters ? (
                <ThemedView style={styles.loadingFiltersContainer}>
                    <ActivityIndicator size="large" />
                    <ThemedText style={styles.loadingFiltersText}>
                        Buscando Pokémon...
                    </ThemedText>
                </ThemedView>
            ) : (
                <FlatList
                    data={pokemons}
                    renderItem={({ item }) => {
                        const id = pokemonApi.getPokemonIdFromUrl(item.url);
                        return (
                            <PokemonCard
                                id={id}
                                name={item.name}
                                imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                                onPress={() => handlePokemonPress(item.name)}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => {
                        const id = pokemonApi.getPokemonIdFromUrl(item.url);
                        return `pokemon-${id}-${item.name}`;
                    }}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                    onEndReached={loadMorePokemons}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loadingMore ? (
                            <ActivityIndicator
                                size="small"
                                style={styles.footerLoader}
                            />
                        ) : null
                    }
                    ListEmptyComponent={
                        !loading ? (
                            <ThemedView style={styles.emptyContainer}>
                                <ThemedText style={styles.emptyText}>
                                    Nenhum Pokémon encontrado
                                </ThemedText>
                            </ThemedView>
                        ) : null
                    }
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 60,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    searchIconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
    },
    subtitle: {
        marginTop: 4,
        opacity: 0.7,
    },
    typesScrollView: {
        marginTop: 12,
    },
    typesContainer: {
        flexDirection: "row",
        gap: 8,
        paddingVertical: 8,
    },
    typeChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
    },
    typeChipText: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    clearButton: {
        marginTop: 12,
        padding: 10,
        backgroundColor: "#ff6b6b",
        borderRadius: 8,
        alignItems: "center",
    },
    clearButtonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 14,
    },
    list: {
        padding: 16,
    },
    row: {
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
    loader: {
        marginTop: 50,
    },
    footerLoader: {
        marginVertical: 20,
    },
    emptyContainer: {
        padding: 40,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        opacity: 0.6,
    },
    loadingFiltersContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
    },
    loadingFiltersText: {
        marginTop: 16,
        fontSize: 16,
        opacity: 0.7,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
    },
    searchBarInput: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: "#333",
    },
    searchBarButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
    },
});
