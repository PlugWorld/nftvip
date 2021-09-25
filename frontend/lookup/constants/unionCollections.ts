import {Collection, PrimaryAssetContract} from '../@types';

import collectionsToPrimaryAssetContractIds from './collectionsToPrimaryAssetContractIds';

// Returns the overlap between two collections.
export default function unionCollections({a, b}: {
  readonly a: readonly Collection[];
  readonly b: readonly Collection[];
}): readonly Collection[] {
  const a_0 = collectionsToPrimaryAssetContractIds(a);
  const b_0 = collectionsToPrimaryAssetContractIds(b);
  const sharedPrimaryAssetContractIds = [
    ...(a_0.filter((e: string) => b_0.indexOf(e) >= 0)),
    ...(b_0.filter((e: string) => a_0.indexOf(e) >= 0)),
  ].filter((e, i, orig) => orig.indexOf(e) === i);

  const allCollections = [...a, ...b];
  // Iterate through all of the found shared identifiers and filter to return contracts that only both
  // wallets share.
  return sharedPrimaryAssetContractIds
    .map((supportedContractId: string) => allCollections.find(
       ({primary_asset_contracts}: Collection) => {
         const addresses = primary_asset_contracts.map(({address}: PrimaryAssetContract) => address);
         return addresses.indexOf(supportedContractId) >= 0;
       },
     ))
    .filter(Boolean);
}