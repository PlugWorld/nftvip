import * as React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {ThemeContextValue} from '../@types';

export const defaultValue: ThemeContextValue = {
  hints: {
    marginExtraShort: 5,
    marginShort: 10,
    marginStandard: 15,
    statusBarHeight: getStatusBarHeight(false),
  },
  // https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/
  systemColors: {
    primary: 'rgb(0,122,255)',
  },
};

export default React.createContext<ThemeContextValue>(defaultValue);