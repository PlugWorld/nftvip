import axios from 'axios';

import {OpenSeaData} from '../@types';

export default async function getCollectionByAssetOwner(
  withAssetOwner: string
): Promise<OpenSeaData> {
  const url = `https://api.opensea.io/api/v1/collections?asset_owner=${withAssetOwner}&offset=0`;
  const {data} = await axios({
    method: 'get',
    url,
  });
  return data as OpenSeaData;
}