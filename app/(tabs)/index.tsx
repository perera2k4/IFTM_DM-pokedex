import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundImage={require("@/assets/images/background-index.png")}
            headerImage={
                <Image
                    source={require("@/assets/images/pokeball.png")}
                    style={styles.imageCenter}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Bem-vindo!</ThemedText>
                <HelloWave />
            </ThemedView>

            <ThemedView>
                <ThemedText type="subtitle">Como usar o aplicativo?</ThemedText>
                <ThemedText>
                    Leia a demonstração abaixo caso tenha dúvidas
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedView style={styles.viewSeparator}>
                    <ThemedText style={styles.textContainer}>
                        Caso queira consultar a pokédex ou procurar um pokémon
                        específico, clique em:
                    </ThemedText>
                    <Image
                        source={require("@/assets/images/buscar-pokemon.png")}
                        style={{ height: 125, borderRadius: 28 }}
                    />
                </ThemedView>

                <ThemedView style={styles.viewSeparator}>
                    <ThemedText style={styles.textContainer}>
                        Na pokédex, você pode acessar a barra de pesquisa para
                        procurar um pokémon ou tipo(s) de pokémon específicos.
                    </ThemedText>
                    <Image
                        source={require("@/assets/images/filtrar-pokemon.png")}
                        style={{
                            height: 200,
                            borderRadius: 28,
                            marginBottom: 8,
                        }}
                    />
                    <Image
                        source={require("@/assets/images/pesquisar-nome.png")}
                        style={{ height: 400, borderRadius: 28 }}
                    />
                </ThemedView>

                <ThemedView>
                    <ThemedText style={styles.textContainer}>
                        Para retornar a página anterior basta realizar a
                        navegação nativa do seu dispositivo, com botões ou
                        gestos!
                    </ThemedText>

                    <Image
                        source={require("@/assets/images/navegacao-nativa.png")}
                        style={{ height: 275, borderRadius: 28 }}
                    />
                </ThemedView>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    viewSeparator: {
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: "#333",
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    imageCenter: {
        height: 150,
        width: 150,
        position: "relative",
        top: 75,
    },
    textContainer: {
        textAlign: "justify",
        paddingVertical: 8,
    },
});
