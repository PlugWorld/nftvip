import {Collection, PrimaryAssetContract} from '../@types';

export default function collectionsToPrimaryAssetContractIds(
  collections: readonly Collection[]
): readonly string[] {
  return collections.reduce(
    (arr: readonly string[], {primary_asset_contracts}: Collection) => [
      ...arr,
      ...primary_asset_contracts.map(({address}: PrimaryAssetContract) => address),
    ],
    [],
  );
}
