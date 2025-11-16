import { ExternalLink } from "@/components/external-link";
import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function HomeScreen() {
    const colorScheme = useColorScheme();

    const technologies = [
        { name: "@expo/vector-icons", version: "^15.0.3" },
        { name: "@react-navigation/bottom-tabs", version: "^7.4.0" },
        { name: "@react-navigation/elements", version: "^2.6.3" },
        { name: "@react-navigation/native", version: "^7.1.8" },
        { name: "expo", version: "~54.0.23" },
        { name: "expo-constants", version: "~18.0.10" },
        { name: "expo-font", version: "~14.0.9" },
        { name: "expo-haptics", version: "~15.0.7" },
        { name: "expo-image", version: "~3.0.10" },
        { name: "expo-linking", version: "~8.0.8" },
        { name: "expo-router", version: "~6.0.14" },
        { name: "expo-splash-screen", version: "~31.0.10" },
        { name: "expo-status-bar", version: "~3.0.8" },
        { name: "expo-symbols", version: "~1.0.7" },
        { name: "expo-system-ui", version: "~6.0.8" },
        { name: "expo-web-browser", version: "~15.0.9" },
        { name: "react", version: "19.1.0" },
        { name: "react-dom", version: "19.1.0" },
        { name: "react-native", version: "0.81.5" },
        { name: "react-native-gesture-handler", version: "~2.28.0" },
        { name: "react-native-reanimated", version: "~4.1.1" },
        { name: "react-native-safe-area-context", version: "~5.6.0" },
        { name: "react-native-screens", version: "~4.16.0" },
        { name: "react-native-web", version: "~0.21.0" },
        { name: "react-native-worklets", version: "0.5.1" },
        { name: "PokéAPI", version: "REST" },
    ];

    return (
        <ParallaxScrollView
            headerBackgroundImage={require("@/assets/images/background-about.jpg")}
            headerImage={
                <Image
                    source={require("@/assets/images/splash.png")}
                    style={styles.photo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Aooba bão?</ThemedText>
                <HelloWave />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">
                    Desenvolvido por: Bruno Pereira
                </ThemedText>

                <ThemedText style={{ textAlign: "justify" }}>
                    Esse trabalho foi desenvolvido para a disciplina de
                    programação para Dispositivos Móveis, caso queria acessar o
                    código fonte pode acessar o código no GitHub, no link:{" "}
                    <ExternalLink
                        href={"https://google.com"}
                        style={{ color: "#007AFF" }}
                    >
                        https://github.com/perera2k4/IFTM_DM-pokedex
                    </ExternalLink>
                    .
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Tecnologias:</ThemedText>

                <ThemedText style={{ textAlign: "justify" }}>
                    Usando o default-template do expo para realizar a navegação
                    e indexação de páginas dos pokémons, com as bibliotecas
                    abaixo:
                </ThemedText>

                {/* Tabela */}
                <View style={styles.tableContainer}>
                    {/* Header */}
                    <View style={styles.tableRow}>
                        <ThemedText
                            type="defaultSemiBold"
                            style={[styles.tableCell]}
                        >
                            Tecnologia
                        </ThemedText>
                        <ThemedText
                            type="defaultSemiBold"
                            style={[styles.tableCell]}
                        >
                            Versão
                        </ThemedText>
                    </View>

                    {/* Linhas */}
                    {technologies.map((tech, index) => (
                        <View key={index} style={[styles.tableRow]}>
                            <ThemedText style={styles.tableCell}>
                                {tech.name}
                            </ThemedText>
                            <ThemedText style={styles.tableCell}>
                                {tech.version}
                            </ThemedText>
                        </View>
                    ))}
                </View>
            </ThemedView>

            <ThemedView
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                    marginBottom: 20,
                }}
            >
                <Image
                    source={
                        colorScheme === "dark"
                            ? require("@/assets/images/if-logo-branca.png")
                            : require("@/assets/images/if-logo-colorida.png")
                    }
                    style={{
                        width: "100%",
                        height: 75,
                    }}
                    contentFit="contain"
                />
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
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    photo: {
        height: 150,
        width: 150,
        position: "relative",
        top: 75,
    },
    tableContainer: {
        marginVertical: 12,
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    tableCell: {
        flex: 1,
        padding: 12,
        textAlign: "center",
    },
});
