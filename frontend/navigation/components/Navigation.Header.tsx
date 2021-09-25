import * as React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';

import {useTheme} from '../../theme';

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
});

export default function NavigationHeader({children, height}: {
  readonly children?: JSX.Element | readonly JSX.Element[];
  readonly height: number;
}): JSX.Element {
  const {width} = useWindowDimensions();
  const {hints} = useTheme();
  const {statusBarHeight} = hints;
  return (
    <View
      style={[
        styles.absolute,
        {
          height,
          left: -width * 0.5,
          top: -1 * statusBarHeight,
          width,
        },
      ]}>
      <View
        children={children}
        style={[
          StyleSheet.absoluteFill,
          {paddingTop: statusBarHeight},
        ]}
      />
    </View>
  );
}

