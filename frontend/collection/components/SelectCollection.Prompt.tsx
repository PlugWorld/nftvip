import {useWalletConnect} from '@walletconnect/react-native-dapp';
import * as React from 'react';
import {Button, Text, View} from 'react-native';

import {useTheme} from '../../theme';

export default function SelectCollectionPrompt(): JSX.Element {
  const connector = useWalletConnect();
  const {fonts, hints} = useTheme();
  const {marginStandard} = hints;
  const onPressConnectWallet = React.useCallback(() => {
    void (async () => {
      try {
        await connector.connect();
      } catch (e) {
        console.error(e);
      }
    })();
  }, [connector]);
  const {h1, h2, p1} = fonts;
  return (
    <>
      {/* TODO: intl */}
      <Text children="Hey there. 👋" style={h1} />
      <Text
        children="You look new around here. Add some collections to get started."
        style={p1}
      />
      <View style={{height: marginStandard}}/>
      <Text children="Connect" style={h2} />
      <Text
        children="You can also connect your wallet to compare all of the NFTs in your collection versus someone else's."
        style={p1}
      />
      <View style={{height: marginStandard}}/>
      <Text
        children="By the way, the blockchain just needs read-only access. You won't have to make any transactions on nftvip."
        style={p1}
      />
      <View style={{height: marginStandard}}/>
      <View style={{height: marginStandard}}/>
      <Button onPress={onPressConnectWallet} title="Connect Wallet" />
    </>
  );
}
