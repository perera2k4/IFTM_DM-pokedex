import type { PropsWithChildren, ReactElement } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    headerImage?: ReactElement;
    headerBackgroundColor?: { dark: string; light: string };
    headerBackgroundImage?: any;
}>;

export default function ParallaxScrollView({
    children,
    headerImage,
    headerBackgroundColor,
    headerBackgroundImage,
}: Props) {
    const backgroundColor = useThemeColor({}, "background");
    const colorScheme = useColorScheme() ?? "light";
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollOffset(scrollRef);
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [2, 1, 1]
                    ),
                },
            ],
        };
    });

    return (
        <Animated.ScrollView
            ref={scrollRef}
            style={{ backgroundColor, flex: 1 }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            bounces={true}
            decelerationRate="fast"
            overScrollMode="always"
        >
            {headerImage && (
                <Animated.View style={[styles.header, headerAnimatedStyle]}>
                    {headerBackgroundImage ? (
                        <ImageBackground
                            source={headerBackgroundImage}
                            style={styles.backgroundImage}
                            resizeMode="cover"
                        >
                            {headerImage}
                        </ImageBackground>
                    ) : (
                        <Animated.View
                            style={{
                                backgroundColor:
                                    headerBackgroundColor?.[colorScheme],
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {headerImage}
                        </Animated.View>
                    )}
                </Animated.View>
            )}
            <ThemedView style={styles.content}>{children}</ThemedView>
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        zIndex: 1000,
        elevation: 1000,
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: "hidden",
        marginTop: 75,
    },
});
