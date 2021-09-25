import {useWalletConnect} from '@walletconnect/react-native-dapp';
import * as React from 'react';

import {Collection} from '../@types';

type State = {
  readonly error?: Error;
  readonly loading: boolean;
  readonly maybeWalletCollection: Collection | null;
};

export default function useAccountsWalletCollections(): State {
  const connector = useWalletConnect();
  const {connected} = connector;
  // TODO: make work
  const [state, setState] = React.useState<State>({
    loading: true,
    // We don't know their wallet address, so we can't recommend a collection.
    maybeWalletCollection: null,
  });
  React.useEffect(() => {
    if (connected) {
      void (async () => {
        const {accounts} = connector;
        if (Array.isArray(accounts)) {
          return accounts;
        }
      })();
    }
  }, [connected, setState, connector]);
  return state;
}
