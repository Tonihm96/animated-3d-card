import React from 'react';
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
            zIndex: 999
          },
          animatedCardStyle
        ]}
      />
    </GestureDetector>
  );
};
