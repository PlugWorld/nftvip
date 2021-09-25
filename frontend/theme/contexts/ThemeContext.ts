import * as React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {ThemeContextValue} from '../@types';

export const defaultValue: ThemeContextValue = {
  fonts: {
    h1: {
      fontSize: 35,
    },
    h2: {
      fontSize: 25,
    },
    p1: {
      fontSize: 18,
    },
  },
  hints: {
    marginExtraShort: 5,
    marginShort: 10,
    marginStandard: 15,
    statusBarHeight: getStatusBarHeight(false),
  },
  // https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/
  systemColors: {
    backgroundColor: 'rgb(242,242,247)',
    primary: 'rgb(0,122,255)',
  },
};

export default React.createContext<ThemeContextValue>(defaultValue);