export enum EBlockchainType {
  ETHEREUM = 'ethereum',
}

export enum ETokenType {
  ERC_721 = 'erc-721',
  ERC_1155 = 'erc-1155',
}

export type Identifiable = {
  readonly id: string;
};

export type Serializable = Identifiable & {
  readonly created: number;
  readonly lastModified: number;
};

export type Token = {
  readonly blockchain: EBlockchainType;
  readonly type: ETokenType;
  readonly address: string;
};

export type TokenListItem = Serializable & {
  readonly token: Token;
  readonly title: string;
  readonly description: string;
};

export type Collection = Serializable & {
  readonly name: string;
  readonly description: string;
  readonly items: readonly TokenListItem[];
};
