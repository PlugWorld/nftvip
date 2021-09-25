import * as React from 'react';
import {useDebouncedCallback} from 'use-debounce';

import { OpenSeaData } from '../@types';
import {getCollectionByAssetOwner} from "../constants";

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
  ethereumAddresses,
}: {
  readonly duration?: number;
  readonly ethereumAddresses: readonly string[];
}): State {
  const [state, setState] = React.useState({
    data: null,
    error: invalidAddressError,
    loading: false,
  });
  const shouldUpdateCollections = useDebouncedCallback(
    React.useCallback(async (withAssetOwners: readonly string[]) => {
      try {
        setState(e => ({
          ...e,
          error: null,
          loading: true,
        }));
        const nextCollections = await Promise.all(
          withAssetOwners.map(getCollectionByAssetOwner)
        );
        const nextData = nextCollections.reduce(
          (e, i) => [...e, ...i],
          []
        );
        setState({
          data: nextData,
          error: undefined,
          loading: false,
        });
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
    void shouldUpdateCollections(ethereumAddresses);
  }, [ethereumAddresses]);

  return state;
};
