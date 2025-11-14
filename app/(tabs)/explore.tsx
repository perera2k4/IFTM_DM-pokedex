import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { PokemonCard } from "@/components/pokemon-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { pokemonApi } from "@/services/pokemon-api";
import { PokemonListItem } from "@/types/pokemon";

export default function ExploreScreen() {
    const router = useRouter();
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const LIMIT = 20;

    useEffect(() => {
        loadPokemons();
    }, []);

    const loadPokemons = async () => {
        try {
            setLoading(true);
            const data = await pokemonApi.getPokemons(LIMIT, 0);
            setPokemons(data.results);
            setOffset(LIMIT);
        } catch (error) {
            console.error("Error loading pokemons:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePokemons = async () => {
        if (loadingMore) return;

        try {
            setLoadingMore(true);
            const data = await pokemonApi.getPokemons(LIMIT, offset);
            setPokemons((prev) => [...prev, ...data.results]);
            setOffset((prev) => prev + LIMIT);
        } catch (error) {
            console.error("Error loading more pokemons:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    const handlePokemonPress = (name: string) => {
        router.push(`/(tabs)/pokemon/${name}` as any);
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

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
                    Pokédex
                </ThemedText>
                <ThemedText style={styles.subtitle}>
                    Encontre todos os Pokémon
                </ThemedText>
            </ThemedView>

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
                keyExtractor={(item) => item.name}
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
            />
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
    subtitle: {
        marginTop: 8,
        opacity: 0.7,
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
});
