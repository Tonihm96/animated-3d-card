import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withTiming,
  Extrapolate
} from 'react-native-reanimated';

interface Props {
  width: number;
  height: number;
}

const ANIMATION_DURATION_IN_MS = 150;

export const Card = ({ width, height }: Props) => {
  const cardAnimationX = useSharedValue(0);
  const cardAnimationY = useSharedValue(0);

  const onGesture = Gesture.Pan()
    .onBegin(event => {
      // top right    X:  10, Y:  10
      // bottom right X: -10, Y:  10
      // bottom left  X: -10, Y: -10
      // top right    X:  10, Y: -10
      cardAnimationX.value = withTiming(
        interpolate(event.y, [0, height], [10, -10], Extrapolate.CLAMP),
        { duration: ANIMATION_DURATION_IN_MS }
      );
      cardAnimationY.value = withTiming(
        interpolate(event.x, [0, width], [-10, 10], Extrapolate.CLAMP),
        { duration: ANIMATION_DURATION_IN_MS }
      );
    })
    .onUpdate(event => {
      // top right    X:  10, Y:  10
      // bottom right X: -10, Y:  10
      // bottom left  X: -10, Y: -10
      // top right    X:  10, Y: -10
      (cardAnimationX.value = interpolate(
        event.y,
        [0, height],
        [10, -10],
        Extrapolate.CLAMP
      )),
        { duration: ANIMATION_DURATION_IN_MS };
      (cardAnimationY.value = interpolate(
        event.x,
        [0, width],
        [-10, 10],
        Extrapolate.CLAMP
      )),
        { duration: ANIMATION_DURATION_IN_MS };
    })
    .onFinalize(() => {
      cardAnimationX.value = withTiming(0, {
        duration: ANIMATION_DURATION_IN_MS
      });
      cardAnimationY.value = withTiming(0, {
        duration: ANIMATION_DURATION_IN_MS
      });
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateX: `${cardAnimationX.value}deg`
      },
      {
        rotateY: `${cardAnimationY.value}deg`
      },
      {
        perspective: 300
      }
    ]
  }));

  return (
    <GestureDetector gesture={onGesture}>
      <Animated.View
        style={[
          {
            height: height,
            width: width,
            backgroundColor: 'black',
            position: 'absolute',
            borderRadius: 18,
            zIndex: 999,
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 20
          },
          animatedCardStyle
        ]}
      >
        <View style={styles.circle} />
        <View style={styles.infoContainer}>
          <View style={styles.infoRect} />
          <View style={styles.infoRect} />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 10,
    backgroundColor: '#505050'
  },
  infoContainer: {
    height: 70,
    justifyContent: 'space-between'
  },
  infoRect: {
    height: 30,
    width: 80,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#505050'
  }
});
