import * as React from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import {useTheme} from '../../theme';

export default function SelectCollectionCreate({style}: {
  readonly style?: StyleProp<ViewStyle>;
}): JSX.Element {
  const {hints} = useTheme();
  const {marginStandard} = hints;
  return (
    <ScrollView style={[StyleSheet.flatten(style), {padding: marginStandard}]}>
      <Text children="Hello world." />
    </ScrollView>
  );
}
