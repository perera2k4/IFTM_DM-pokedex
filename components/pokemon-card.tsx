import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { ImageBackground, Pressable, StyleSheet } from "react-native";

interface PokemonCardProps {
    id: number;
    name: string;
    imageUrl: string;
    onPress: () => void;
}

export function PokemonCard({ id, name, imageUrl, onPress }: PokemonCardProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        >
            <ImageBackground
                source={require("@/assets/images/background-card.png")}
                style={styles.imageContainer}
                resizeMode="cover"
            >
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    contentFit="contain"
                />
            </ImageBackground>
            <ThemedView style={styles.info}>
                <ThemedText style={styles.id}>
                    #{id.toString().padStart(3, "0")}
                </ThemedText>
                <ThemedText style={styles.name}>{name}</ThemedText>
            </ThemedView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "48%",
        borderRadius: 12,
        marginBottom: 16,
        overflow: "hidden",
        elevation: 5,
        shadowColor: "#ad0",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.97 }],
    },
    imageContainer: {
        width: "100%",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    info: {
        backgroundColor: "rgba(40, 40, 40, 1)",
        padding: 6,
        alignItems: "center",
    },
    id: {
        fontSize: 12,
        opacity: 0.6,
        marginBottom: 6,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        textTransform: "capitalize",
    },
});
