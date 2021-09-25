import * as React from 'react';
import {StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle} from 'react-native';

import {useTheme} from '../../theme';

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
});

export default function NavigationHeader({children, height, style}: {
  readonly children?: JSX.Element | readonly JSX.Element[];
  readonly height: number;
  readonly style?: StyleProp<ViewStyle>;
}): JSX.Element {
  const {width} = useWindowDimensions();
  const {hints} = useTheme();
  const {statusBarHeight} = hints;
  return (
    <View style={[style, styles.absolute, {height, width}]}>
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

