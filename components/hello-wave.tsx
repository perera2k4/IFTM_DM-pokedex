import React from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export function HelloWave() {
    const r = useSharedValue(0);

    React.useEffect(() => {
        r.value = withRepeat(
            withSequence(
                withTiming(25, { duration: 150 }),
                withTiming(0, { duration: 150 })
            ),
            -1 // infinito
        );
    }, []);

    const anim = useAnimatedStyle(() => ({
        transform: [{ rotate: `${r.value}deg` }],
    }));

    return (
        <Animated.Text
            style={[{ fontSize: 28, lineHeight: 32, marginTop: -6 }, anim]}
        >
            👋
        </Animated.Text>
    );
}
