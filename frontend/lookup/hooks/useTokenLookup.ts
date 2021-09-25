import {gql, useQuery} from '@apollo/client';
import * as React from 'react';

// TODO: support different formats i.e.:
//       Missing 0x prefix
//       wyre-style ethereum://
//       multiple chains i.e. Tezos
export default function useTokenLookup({maybeEthereumAddress}: {
    readonly maybeEthereumAddress?: string | null;
}): {
    readonly data: number;
    readonly error?: Error;
    readonly loading: boolean;
} {
  const {error, loading, data} = useQuery(gql`
  {
    accounts(first: 5) {
      id
      asERC721 {
        id
      }
      ERC721tokens {
        id
      }
      ERC721operatorOwner {
        id
      }
    }
    erc721Contracts(first: 5) {
      id
      asAccount {
        id
      }
      supportsMetadata
      name
    }
  }
  `, {skip: typeof maybeEthereumAddress !== 'string'});

  return React.useMemo(() => {
    if (!error && !loading && data) {
      return {
        data: 0,
        error,
        loading,
      };
    }
    return {data: 0, error, loading};
  }, [error, loading, data]);
}
