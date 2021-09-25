import * as React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import {useTheme} from '../../theme';
import {Collection, PrimaryAssetContract} from '../@types';

import Contract from './Lookup.Collection.Contract';

export default function LookupCollection({collection, style}: {
  readonly collection: Collection;
  readonly style?: StyleProp<ViewStyle>;
}): JSX.Element {
  const {hints} = useTheme();
  const {marginShort} = hints;
  const {primary_asset_contracts} = collection;
  return (
    <View style={style}>
      {primary_asset_contracts
        .map((primaryAssetContract: PrimaryAssetContract, i: number, orig: readonly PrimaryAssetContract[]) => (
          <React.Fragment key={i}>
            <Contract primaryAssetContract={primaryAssetContract} />
            {i < orig.length - 1 && (
              <View style={{height: marginShort}} />
            )}
          </React.Fragment>
        ))}
    </View>
  );
}
