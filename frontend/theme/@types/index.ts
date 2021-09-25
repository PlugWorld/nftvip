import {StyleProp, TextStyle} from "react-native";

export type ThemeHints = {
  readonly marginExtraShort: number;
  readonly marginShort: number;
  readonly marginStandard: number;
  readonly statusBarHeight: number;
};

export type Colors = {
  readonly primary: string;
  readonly backgroundColor: string;
};

export type Fonts = {
  readonly h1: StyleProp<TextStyle>;
  readonly h2: StyleProp<TextStyle>;
  readonly p1: StyleProp<TextStyle>;
};

export type ThemeContextValue = {
  readonly fonts: Fonts;
  readonly systemColors: Colors;
  readonly hints: ThemeHints;
};
