import * as React from 'react';

import {ThemeContextValue} from '../@types';
import {ThemeContext} from '../contexts';

export default function useTheme(): ThemeContextValue {
  return React.useContext<ThemeContextValue>(ThemeContext);
}