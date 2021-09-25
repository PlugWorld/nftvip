import {useWalletConnect} from "@walletconnect/react-native-dapp";
import * as React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useTheme} from '../../theme';
import {useAccountsWalletCollections} from '../hooks';

const styles = StyleSheet.create({
  centerEnd: {alignItems: 'center', justifyContent: 'flex-end'},
});

import Prompt from './SelectCollection.Prompt';

// Responsible for picking the active Collection to compare against during scanning.
// If the user has no Collections, they should be able to create a new one here.
export default function SelectCollection(): JSX.Element {
  const connector = useWalletConnect();
  const {accounts, connected} = connector;
  const {maybeWalletCollection} = useAccountsWalletCollections();
  const {fonts, hints} = useTheme();
  const {marginStandard, marginShort} = hints;
  const onPressLink = React.useCallback(() => void (async () => {
    try {
      // TODO: intl
      await Linking.openURL('https://github.com/PlugWorld/nftvip');
    } catch (e) {
      console.error(e);
    }
  })(), []);
  const {h1, h2, p1} = fonts;
  // TODO: Needs to disconnect a specific wallet conditionally for the list to work properly.
  const onPressDisconnectWallet = React.useCallback(() => {
    connector.killSession();
  }, [connector]);
    return (
    <>
      <ScrollView style={[StyleSheet.absoluteFill, {padding: marginStandard}]}>
        <Text
          children="Collections"
          style={h1}
        />
        {maybeWalletCollection ? (
          <Text children="show collections"/>
        ) : (
            <>
              {/* TODO: intl */}
              <View style={{height: marginShort}} />
              <Text
                children="Collections select the types of NFTs you're searching for. You can create these by tapping the + button."
                style={p1}
              />
            </>
        )}
        {connected ? (
          <>
            {/* TODO: intl */}
            <Text
              children="Connected wallets 👛"
              style={h1}
            />
            <View style={{height: marginShort}} />
            <Text
              style={p1}
              children="The list below shows the wallets you've connected. Tap on any to quit the session at any time:"
            />
            <View style={{height: marginShort}} />
            {!!Array.isArray(accounts) &&   accounts.map((account: string, key: number) => (
              // TODO: note that clicking will kill the session for all connected wallets
               <TouchableOpacity key={key} onPress={onPressDisconnectWallet}>
                 <Text children={account} style={h2} />
               </TouchableOpacity>
            ))}
          </>
        ): (
          <View style={{paddingTop: marginStandard}}>
            <Prompt />
          </View>
        )}
      </ScrollView>
      <View
        pointerEvents="box-none"
        style={[
          StyleSheet.absoluteFill,
          styles.centerEnd,
          {padding: 3 * marginStandard},
        ]}>
        <TouchableOpacity onPress={onPressLink}>
          {/* TODO: intl */}
          <Text children="Powered by open source. ⚡" />
        </TouchableOpacity>
      </View>

    </>
  );
}
