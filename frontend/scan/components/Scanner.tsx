import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useImmediateLayoutAnimation} from 'use-layout-animation';

import {Collection, PrimaryAssetContract, useCollectionLookup} from '../../lookup';
import {LookupCollection} from "../../lookup/components";
import {useTheme} from "../../theme";

import ScannerBottomSheet from './Scanner.BottomSheet';

const styles = StyleSheet.create({
  fullWidth: {width: '100%'},
});

export default function Scanner(): JSX.Element {
  const [hasPermission, setHasPermission] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const [maybeEthereumAddress, setMaybeEthereumAddress] = React.useState<string>('');
  const {
    data,
    loading,
    error,
  } = useCollectionLookup({maybeEthereumAddress});

  useImmediateLayoutAnimation([data, loading, error]);

  const [
    visible,
    setVisible,
  ] = React.useState<boolean>(false);
  const {hints} = useTheme();
  const {bottomBarHeight, marginStandard} = hints;

  const onBarCodeScanned = React.useCallback(({data}) => {
    setMaybeEthereumAddress(data);
  }, []);

  const onRequestDismiss = React.useCallback(() => {
    setVisible(false);
  }, []);

  React.useEffect(() => {
    if (!loading  && Array.isArray(data) && !!data.length) {
      setVisible(true);
    }
  }, [visible, loading, error]);

  const {width} = useWindowDimensions();

  return (
    <View style={StyleSheet.absoluteFill}>
      {hasPermission ? (
        <BarCodeScanner
          onBarCodeScanned={onBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : hasPermission === null ? (
          <Text>Requesting for camera permission</Text>
      ) : (
          <Text>No access to camera</Text>
      )}
      <ScannerBottomSheet
        onRequestDismiss={onRequestDismiss}
        visible={visible}>
        {Array.isArray(data) && (
          <BottomSheetScrollView style={[styles.fullWidth, {padding: marginStandard}]}>
            {data
                .map((collection: Collection) => {
                  const {primary_asset_contracts} = collection;
                  if (Array.isArray(primary_asset_contracts)) {
                    const contractsWithAddresses = primary_asset_contracts.filter(
           ({address}: PrimaryAssetContract) => {
                        return typeof address === 'string' && !!address.length;
                      });
                    if (contractsWithAddresses.length > 0) {
                      return {
                        ...collection,
                        primary_asset_contracts: contractsWithAddresses,
                      };
                    }
                  }
                  return null;
                })
                .filter(Boolean)
                .map((collection: Collection, i: number, orig: readonly Collection[]): JSX.Element => (
                  <React.Fragment key={i}>
                    <LookupCollection
                      collection={collection}
                      key={i}
                      style={{
                        width: width - 2 * marginStandard,
                      }}
                    />
                    {i < orig.length - 1 && (
                      <View style={{height: marginStandard}} />
                    )}
                  </React.Fragment>
                ))}
            <View style={{height: bottomBarHeight + marginStandard}} />
          </BottomSheetScrollView>
        )}
      </ScannerBottomSheet>
    </View>
  );
}

