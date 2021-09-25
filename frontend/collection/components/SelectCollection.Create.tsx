import * as React from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';

import {useTheme} from '../../theme';

export default function SelectCollectionCreate({style}: {
  readonly style?: StyleProp<ViewStyle>;
}): JSX.Element {
  const {systemColors, fonts, hints} = useTheme();
  const {disabledColor} = systemColors;
  const {h1, h2, p1} = fonts;
  const {marginStandard} = hints;
  return (
    <ScrollView style={[StyleSheet.flatten(style), {padding: marginStandard}]}>
      {/* TODO: intl */}
      <Text children="Create a Collection" style={h1} />
      <View style={{height: marginStandard}} />
      <Text
        children="Collections control what you're looking for. When you scan a wallet, we show you all the NFTs in your wallet that matches the collection."
        style={p1}
      />
      <View style={{height: marginStandard}} />
      <Text children="Search" style={h2} />
      <View style={{height: marginStandard}} />
      <TextInput
        placeholder="i.e. RumbleKongs..."
        placeholderTextColor={disabledColor}
        style={p1}
      />
    </ScrollView>
  );
}
