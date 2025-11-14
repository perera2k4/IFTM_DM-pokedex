import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { pokemonApi } from "@/services/pokemon-api";
import { Pokemon } from "@/types/pokemon";

export default function PokemonDetailScreen() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);

    const loadPokemon = useCallback(async () => {
        try {
            setLoading(true);
            const data = await pokemonApi.getPokemonByName(name as string);
            setPokemon(data);
        } catch (error) {
            console.error("Error loading pokemon:", error);
        } finally {
            setLoading(false);
        }
    }, [name]);

    useEffect(() => {
        if (name) {
            loadPokemon();
        }
    }, [name, loadPokemon]);

    if (loading || !pokemon) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
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

    const primaryType = pokemon.types[0]?.type.name || "normal";
    const backgroundColor = typeColors[primaryType] || "#A8A878";

    return (
        <ParallaxScrollView
            headerBackgroundImage={require("@/assets/images/background-card.png")}
            headerImage={
                <Image
                    source={{
                        uri:
                            pokemon.sprites.other["official-artwork"]
                                .front_default || pokemon.sprites.front_default,
                    }}
                    style={styles.pokemonImage}
                    contentFit="contain"
                />
            }
        >
            <ThemedView style={styles.headerInfo}>
                <ThemedText type="title" style={styles.name}>
                    {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                </ThemedText>
                <ThemedText style={styles.id}>
                    #{pokemon.id.toString().padStart(3, "0")}
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.typesContainer}>
                {pokemon.types.map((typeInfo) => (
                    <ThemedView
                        key={typeInfo.type.name}
                        style={[
                            styles.typeChip,
                            {
                                backgroundColor:
                                    typeColors[typeInfo.type.name] || "#A8A878",
                            },
                        ]}
                    >
                        <ThemedText style={styles.typeText}>
                            {typeInfo.type.name.toUpperCase()}
                        </ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Informações Básicas
                </ThemedText>
                <ThemedView style={styles.infoRow}>
                    <ThemedText style={styles.infoLabel}>Altura:</ThemedText>
                    <ThemedText style={styles.infoValue}>
                        {(pokemon.height / 10).toFixed(1)} m
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.infoRow}>
                    <ThemedText style={styles.infoLabel}>Peso:</ThemedText>
                    <ThemedText style={styles.infoValue}>
                        {(pokemon.weight / 10).toFixed(1)} kg
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.infoRow}>
                    <ThemedText style={styles.infoLabel}>
                        Experiência Base:
                    </ThemedText>
                    <ThemedText style={styles.infoValue}>
                        {pokemon.base_experience}
                    </ThemedText>
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Habilidades
                </ThemedText>
                {pokemon.abilities.map((abilityInfo) => (
                    <ThemedView
                        key={abilityInfo.ability.name}
                        style={styles.abilityItem}
                    >
                        <ThemedText style={styles.abilityName}>
                            • {abilityInfo.ability.name.replace("-", " ")}
                        </ThemedText>
                        {abilityInfo.is_hidden && (
                            <ThemedText style={styles.hiddenTag}>
                                (Oculta)
                            </ThemedText>
                        )}
                    </ThemedView>
                ))}
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Estatísticas Base
                </ThemedText>
                {pokemon.stats.map((statInfo) => (
                    <ThemedView key={statInfo.stat.name} style={styles.statRow}>
                        <ThemedText style={styles.statName}>
                            {statInfo.stat.name.replace("-", " ").toUpperCase()}
                        </ThemedText>
                        <ThemedView style={styles.statBarContainer}>
                            <ThemedView
                                style={[
                                    styles.statBar,
                                    {
                                        width: `${
                                            (statInfo.base_stat / 255) * 100
                                        }%`,
                                        backgroundColor: backgroundColor,
                                    },
                                ]}
                            />
                        </ThemedView>
                        <ThemedText style={styles.statValue}>
                            {statInfo.base_stat}
                        </ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pokemonImage: {
        width: 200,
        height: 200,
        position: "relative",
        top: 75,
    },
    headerInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    name: {
        textTransform: "capitalize",
    },
    id: {
        fontSize: 20,
        fontWeight: "bold",
        opacity: 0.5,
    },
    typesContainer: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 24,
    },
    typeChip: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
    },
    typeText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 12,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    infoLabel: {
        fontWeight: "600",
    },
    infoValue: {
        opacity: 0.7,
    },
    abilityItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        gap: 8,
    },
    abilityName: {
        textTransform: "capitalize",
    },
    hiddenTag: {
        fontSize: 12,
        opacity: 0.6,
        fontStyle: "italic",
    },
    statRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 12,
    },
    statName: {
        width: 80,
        fontSize: 11,
        fontWeight: "600",
    },
    statBarContainer: {
        flex: 1,
        height: 8,
        backgroundColor: "#e0e0e0",
        borderRadius: 4,
        overflow: "hidden",
    },
    statBar: {
        height: "100%",
        borderRadius: 4,
    },
    statValue: {
        width: 40,
        textAlign: "right",
        fontWeight: "bold",
    },
});
