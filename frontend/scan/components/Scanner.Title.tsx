import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {useWalletConnect} from "@walletconnect/react-native-dapp";
import * as React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from '../../../assets/image/logo.png';
import {NavigationHeader} from '../../navigation';
import {useTheme} from "../../theme";

const styles = StyleSheet.create({
  flex: {flex: 1},
  flexEnd: {
    justifyContent: 'flex-end',
  },
  logo: {
    height: 50,
    width: 120,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
});

export default function ScannerTitle({height, style}: {
  readonly height: number;
  readonly style?: StyleProp<ViewStyle>;
}): JSX.Element {
  const {systemColors, hints} = useTheme();
  const {marginStandard} = hints;
  const {primary} = systemColors;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation<StackNavigationProp<any>>();
  const connector = useWalletConnect();
  const onPress = React.useCallback(() => {
    void (async () => {
      try {
        await connector.connected
          ? connector.killSession()
          : connector.connect();
      } catch (e) {
        console.error(e);
      }
    })();
  }, [connector]);
  const {connected} = connector;
  return (
    <NavigationHeader height={height} style={style}>
      <View style={[styles.row, {padding: marginStandard}]}>
        <View style={styles.flex} />
        <FastImage
          source={Logo}
          style={[styles.logo, {transform: [{scale: 0.8}]}]}
        />
        <View style={[styles.flex, styles.row, styles.flexEnd]}>
          {/* TODO: Something could go here. */}
          <TouchableOpacity onPress={onPress}>
            <Ionicons
              color={primary}
              name={connected ? 'ios-wallet-sharp' : 'ios-wallet-outline'}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </NavigationHeader>
  );
}
