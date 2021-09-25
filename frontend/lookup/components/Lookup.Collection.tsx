import {BlurView} from '@react-native-community/blur';
import * as React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import TouchableScale from 'react-native-touchable-scale';

import {useTheme} from '../../theme';
import {Collection, PrimaryAssetContract} from '../@types';

const styles = StyleSheet.create({
  flexEnd: {alignItems: 'flex-end', justifyContent: 'flex-end'},
  noOverflow: {overflow: 'hidden'},
});

export default function LookupCollection({collection, style}: {
  readonly collection: Collection;
  readonly style?: StyleProp<ViewStyle>;
}): JSX.Element {
  const {fonts, hints} = useTheme();
  const {h1} = fonts;
  const {marginShort, marginStandard} = hints;
  const {primary_asset_contracts} = collection;
  return (
    <View style={style}>
      {primary_asset_contracts
        .map(({name, image_url: uri}: PrimaryAssetContract, i: number, orig: readonly PrimaryAssetContract[]) => (
          <React.Fragment key={i}>
            <TouchableScale style={[styles.noOverflow, {borderRadius: marginStandard}]}>
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
              </View>
            </TouchableScale>
            {i < orig.length - 1 && (
              <View style={{height: marginShort}} />
            )}
          </React.Fragment>
        ))}
    </View>
  );
}
