import React from 'react';
import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
  vec
} from '@shopify/react-native-skia';

interface Props {
  width: number;
  height: number;
}

const COLORS_ARRAY = ['cyan', 'magenta', 'yellow', 'cyan'];

export const BackgroundGradient = ({ width, height }: Props) => {
  const canvasPadding = 40;

  return (
    <Canvas
      style={{ width: width + canvasPadding, height: height + canvasPadding }}
    >
      <RoundedRect
        x={canvasPadding / 2}
        y={canvasPadding / 2}
        width={width}
        height={height}
        r={20}
      >
        <SweepGradient
          c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)}
          colors={COLORS_ARRAY}
        />
        <BlurMask blur={10} style='solid' />
      </RoundedRect>
    </Canvas>
  );
};
