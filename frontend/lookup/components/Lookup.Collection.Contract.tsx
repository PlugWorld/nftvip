import {BlurView} from '@react-native-community/blur';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TouchableScale from 'react-native-touchable-scale';

import {useTheme} from '../../theme';
import {PrimaryAssetContract} from '../@types';

const styles = StyleSheet.create({
  flexEnd: {alignItems: 'flex-end', justifyContent: 'flex-end'},
  noOverflow: {overflow: 'hidden'},
});

export default function LookupCollectionContract({primaryAssetContract}: {
  readonly primaryAssetContract: PrimaryAssetContract;
}): JSX.Element {
  const {fonts, hints} = useTheme();
  const {h1, h2} = fonts;
  const {marginStandard, marginShort} = hints;
  const {image_url: uri, name, symbol} = primaryAssetContract;
  return (
    <TouchableScale
      style={[styles.noOverflow, {borderRadius: marginStandard}]}>
        <FastImage
          resizeMode="cover"
          source={{uri}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{aspectRatio: 3, width: '100%'}}
        />
        <BlurView style={StyleSheet.absoluteFill} />
        <View style={[styles.flexEnd, {padding: marginShort}]}>
          <Text
            children={name}
            numberOfLines={1}
            // eslint-disable-next-line react-native/no-color-literals,react-native/no-inline-styles
            style={[h1, {color: 'white'}]}
          />
          <Text
            children={symbol}
            numberOfLines={1}
            // eslint-disable-next-line react-native/no-color-literals,react-native/no-inline-styles
            style={[h2, {color: 'white'}]}
          />
        </View>
    </TouchableScale>
  );
}
