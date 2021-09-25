import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useWalletConnect} from "@walletconnect/react-native-dapp";
import {BarCodeScanner} from 'expo-barcode-scanner';
import FuzzySearch from 'fuzzy-search';
import * as React from 'react';
import {
  ActivityIndicator, LayoutAnimation,
  NativeSyntheticEvent,
  StyleSheet,
  Switch,
  Text,
  TextInputChangeEventData,
  useWindowDimensions,
  View,
} from 'react-native';
import SearchComponent from 'react-native-search-component';
import {useDeepCompareMemo} from 'use-deep-compare';
import {useImmediateLayoutAnimation} from 'use-layout-animation';

import {Collection, PrimaryAssetContract, useCollectionLookup} from '../../lookup';
import {LookupCollection} from "../../lookup/components";
import {unionCollections} from "../../lookup/constants";
import {useTheme} from "../../theme";

import ScannerBottomSheet from './Scanner.BottomSheet';

const styles = StyleSheet.create({
  center: {alignItems: 'center', justifyContent: 'center'},
  flex: {flex: 1},
  fullWidth: {width: '100%'},
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  // eslint-disable-next-line react-native/no-color-literals
  shadow: {
    shadowColor: 'hotpink',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textAlignRight: {textAlign: 'right'},
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
  const ethereumAddresses = React.useMemo<readonly string[]>(() => {
    return typeof maybeEthereumAddress === 'string' && !!maybeEthereumAddress.length
      ? [maybeEthereumAddress]
      : [];
  }, [maybeEthereumAddress]);

  const connector = useWalletConnect();
  const {connected, accounts} = connector;

  const {
    data,
    loading,
    error,
  } = useCollectionLookup({ethereumAddresses});

  const signerEthereumAddresses = React.useMemo<readonly string[]>(() => {
    if (connected) {
      const {accounts} = connector;
      return accounts;
    }
    return [];
  }, [connector, connected]);

  const {
    data: signerData,
    loading: signerLoading,
    error: signerError,
  } = useCollectionLookup({
    ethereumAddresses: signerEthereumAddresses,
  });
  const [
    visible,
    setVisible,
  ] = React.useState<boolean>(false);
  const {systemColors, hints} = useTheme();
  const {disabledColor} = systemColors;
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
  const [value, onChange] = React.useState<string>('');
  const [
    showOnlySharedAssets,
    setShowOnlySharedAssets,
  ] = React.useState<boolean>(false);

  const sourceDataToReference = React.useMemo(() => {
    const externalData = data || [];
    if (showOnlySharedAssets) {
      const internalData = signerData || [];
      return unionCollections({a: externalData, b: internalData});
    }
    return externalData;
  }, [data, signerData, showOnlySharedAssets]);


  const filteredData = useDeepCompareMemo(() => (
    sourceDataToReference.map((collection: Collection) => {
      const {primary_asset_contracts} = collection;
      if (Array.isArray(primary_asset_contracts)) {
        const contractsWithAddresses = primary_asset_contracts.filter(
          ({address, name}: PrimaryAssetContract) => {
            if (typeof address === 'string' && !!address.length) {
              // fuzzy search
              if (typeof value === 'string' && !!value.length) {
                const searcher = new FuzzySearch([{name}], ['name']);
                const {length} = searcher.search(value);
                return !!length;
              } else {
                return true;
              }
            }
            return false;
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
  ), [
      sourceDataToReference,
      value,
  ]);

  useImmediateLayoutAnimation([filteredData], LayoutAnimation.Presets.easeInEaseOut);

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
        {Array.isArray(data) && !!data.length ? (
          <React.Fragment>
            <SearchComponent
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                const {nativeEvent} = e;
                const {text} = nativeEvent;
                onChange(text);
              }}
              onSearchClear={() => onChange('')}
              value={value}
            />
            <View style={{height: marginStandard}}/>
            {!!connected && (
              <>
                <View style={[styles.row, {paddingHorizontal: marginStandard}]}>
                  <Text
                    children="Show only shared collections"
                    style={[styles.flex, styles.textAlignRight]}
                  />
                  <View style={{width: marginStandard}} />
                  <Switch
                    onValueChange={setShowOnlySharedAssets}
                    value={showOnlySharedAssets}
                  />
                </View>
                <View style={{height: marginStandard}}/>
              </>
            )}
            <BottomSheetScrollView
              keyboardShouldPersistTaps="always"
              style={[styles.fullWidth, {padding: marginStandard}]}>
              {filteredData.map((collection: Collection, i: number, orig: readonly Collection[]): JSX.Element => {
                return (
                  <React.Fragment key={i}>
                    <LookupCollection
                      collection={collection}
                      key={i}
                      style={[styles.shadow, {width: width - 2 * marginStandard}]}
                    />
                    {i < orig.length - 1 && (
                      <View style={{height: marginStandard}} />
                    )}
                  </React.Fragment>
                );
              })}
              <View style={{height: bottomBarHeight + marginStandard}} />
            </BottomSheetScrollView>
          </React.Fragment>
        ) : (
          <View style={[styles.center, styles.fullWidth]}>
            <ActivityIndicator />
            <View style={{height: marginStandard}} />
            <Text
              children="Scan a wallet address to get started."
              style={{color: disabledColor}}
            />
          </View>
        )}
      </ScannerBottomSheet>
    </View>
  );
}

