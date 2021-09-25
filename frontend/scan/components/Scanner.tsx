import {BarCodeScanner} from 'expo-barcode-scanner';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useTokenLookup} from '../../lookup';

export default function Scanner(): JSX.Element {
  const [hasPermission, setHasPermission] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const [maybeEthereumAddress, setMaybeEthereumAddress] = React.useState<string>('');
  useTokenLookup({maybeEthereumAddress});

  const onBarCodeScanned = React.useCallback(({data}) => {
    setMaybeEthereumAddress(data);
  }, []);

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
    </View>
  );
}

