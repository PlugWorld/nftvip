import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import {EIP721_SUBGRAPH_API_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {withWalletConnect} from '@walletconnect/react-native-dapp';
import deepmerge from 'deepmerge';
import React from 'react';
import {Platform, StyleSheet, View } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { expo } from '../app.json';

import {SelectCollection} from './collection';
import {Scanner, ScannerTitle} from './scan'
import {defaultThemeValue, ThemeContext, ThemeContextValue} from './theme';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `https://gateway.thegraph.com/api/${EIP721_SUBGRAPH_API_KEY}/subgraphs/id/0x7859821024e633c5dc8a4fcf86fc52e7720ce525-0`,
});


const headerHeight = 100;

const Stack = createStackNavigator();
const headerStyle = {
  height: headerHeight,
};

function App() {
  const isDarkMode = useDarkMode();
  const value = React.useMemo<ThemeContextValue>(
    () => {
      const {systemColors} = defaultThemeValue;
      const {primary} = systemColors;
      return deepmerge(defaultThemeValue, {
          hints: {},
          systemColors: {
            primary: isDarkMode ? `rgb(10,132,255)` : primary
          },
      });
    },
    [isDarkMode]
  );
  return (
    <ThemeContext.Provider value={value}>
      <NavigationContainer>
        <ApolloProvider client={client}>
          <View style={StyleSheet.absoluteFill}>
             <Stack.Navigator initialRouteName="/scan">
               <Stack.Screen
                 component={Scanner}
                 name="/scan"
                 options={{
                   headerStyle,
                   headerTitle: () => <ScannerTitle height={headerHeight} />,
                 }}
               />
               <Stack.Screen
                 component={SelectCollection}
                 name="/collection/select-collection"
                 options={{
                   headerStyle,
                   headerTitle: () => <ScannerTitle height={headerHeight} />,
                 }}
               />
             </Stack.Navigator>
          </View>
        </ApolloProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const {scheme} = expo;

export default withWalletConnect(App, {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
});