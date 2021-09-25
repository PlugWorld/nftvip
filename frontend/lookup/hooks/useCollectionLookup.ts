import axios from 'axios';
import * as React from 'react';
import {useDebouncedCallback} from 'use-debounce';

import { OpenSeaData } from '../@types';

const invalidAddressError
  = new Error('Unable to lookup tokens because the supplied address is invalid.');

type State = {
  readonly data: OpenSeaData | null;
  readonly error?: Error;
  readonly loading: boolean;
};

// TODO: support different formats i.e.:
//       Missing 0x prefix
//       wyre-style ethereum://
//       multiple chains i.e. Tezos
export default function useCollectionLookup({
  duration = 500,
  maybeEthereumAddress,
}: {
  readonly duration?: number;
  readonly maybeEthereumAddress?: string | null;
}): State {
  const [state, setState] = React.useState({
    data: null,
    error: invalidAddressError,
    loading: false,
  });

  const shouldUpdateTokens = useDebouncedCallback(
    React.useCallback(async (withAssetOwner: string) => {
      try {
        if (
          typeof withAssetOwner === 'string' && !!withAssetOwner.length
        ) {
            setState(e => ({
              ...e,
              error: null,
              loading: true,
            }));
            const url = `https://api.opensea.io/api/v1/collections?asset_owner=${withAssetOwner}&offset=0`;
            const {data} = await axios({
              method: 'get',
              url,
            });
            return setState({
              data: data as OpenSeaData,
              error: undefined,
              loading: false,
            });
        }
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error('Invalid asset owner.');
      } catch (error) {
         setState(e => ({
           ...e,
           error,
           loading: false,
         }));
      }
    }, []),
    duration
  );

  React.useEffect(() => {
    if (typeof maybeEthereumAddress === 'string') {
      void shouldUpdateTokens(maybeEthereumAddress);
    }
  }, [maybeEthereumAddress, shouldUpdateTokens]);

  return state;
};
