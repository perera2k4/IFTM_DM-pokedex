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
                    Siga o passo a passo abaixo caso tenha dúvidas
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Passo 1:</ThemedText>
                <ThemedView>
                    <ThemedText style={styles.textContainer}>
                        Caso queira consultar a pokédex ou procurar um pokémon
                        específico, clique em:
                    </ThemedText>
                    <Image
                        source={require("@/assets/images/botao-pesquisar.gif")}
                        style={{height:125}}
                    />
                </ThemedView>

                <ThemedView>
                    <ThemedText style={styles.textContainer}>Na pokédex, você pode acessar a barra de pesquisa para procurar um pokémon ou tipo(s) de pokémon específicos.</ThemedText>
                    <Image
                        source={require("@/assets/images/barra-de-pesquisa.gif")}
                        style={{height: 200}}
                    />
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Passo 2:</ThemedText>
                <ThemedText style={styles.textContainer}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Aperiam pariatur qui iste odit excepturi fuga dolores,
                    ratione placeat magni praesentium quis, quas inventore minus
                    necessitatibus recusandae tempora nobis voluptate.
                    Voluptatibus fuga, mollitia consequatur ratione reiciendis,
                    totam minima quidem delectus quae commodi hic temporibus!
                    Blanditiis dicta repudiandae exercitationem maxime sit
                    itaque.
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Passo 3:</ThemedText>
                <ThemedText style={styles.textContainer}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus blanditiis libero ex nihil repudiandae eos
                    repellat. Enim praesentium distinctio magnam iure laborum
                    voluptate aut, illo magni dolorem. Iste accusantium enim
                    ratione quas. Quibusdam officia consequatur a vel!
                    Asperiores error incidunt nihil minima mollitia saepe quis
                    in dolores, magnam officia? Rerum!
                </ThemedText>
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
