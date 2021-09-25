export type ThemeHints = {
  readonly marginExtraShort: number;
  readonly marginShort: number;
  readonly marginStandard: number;
  readonly statusBarHeight: number;
};

export type Colors = {
  readonly primary: string;

};

export type ThemeContextValue = {
  readonly systemColors: Colors;
  readonly hints: ThemeHints;
};
