export type PrimaryAssetContract = {
  readonly address: string;
  readonly asset_contract_type: string;
  readonly created_date: string;
  readonly image_url: string;
  readonly name: string;
  readonly nft_version: string;
  readonly owner: number;
};

export type Collection = {
  readonly primary_asset_contracts: readonly PrimaryAssetContract[];
};

export type OpenSeaData = readonly Collection[];