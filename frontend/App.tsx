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
import {
    Platform,
    StyleSheet,
    useWindowDimensions,
    View, ViewStyle,
} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';

import { expo } from '../app.json';

import {SelectCollection, SelectCollectionCreate} from './collection';
import {RouteNames} from "./navigation";
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
      const {primary, backgroundColor} = systemColors;
      return deepmerge(defaultThemeValue, {
          hints: {},
          systemColors: {
            backgroundColor: isDarkMode ? `rgb(28,28,30)` : backgroundColor,
            primary: isDarkMode ? `rgb(10,132,255)` : primary
          },
      });
    },
    [isDarkMode]
  );
  const {hints} = value;
  const {statusBarHeight} = hints;
  const {width} = useWindowDimensions();
  const hideStatusBar: ViewStyle = {
    left: width * -0.5,
    position: 'absolute',
    top: -statusBarHeight,
  };
  return (
    <ThemeContext.Provider value={value}>
      <NavigationContainer>
        <ApolloProvider client={client}>
          <View style={StyleSheet.absoluteFill}>
             <Stack.Navigator initialRouteName={RouteNames.SCAN}>
               <Stack.Screen
                 component={Scanner}
                 name={RouteNames.SCAN}
                 options={{
                   headerStyle,
                   headerTitle: () => (
                     <ScannerTitle
                       height={headerHeight}
                       style={hideStatusBar}
                     />
                   ),
                 }}
               />
               <Stack.Screen
                 component={SelectCollection}
                 name={RouteNames.SELECT_COLLECTION}
                 options={{
                   headerStyle,
                   headerTitle: () => <React.Fragment />,
                 }}
               />
               <Stack.Screen
                 component={SelectCollectionCreate}
                 name={RouteNames.CREATE_COLLECTION}
                 options={{
                   headerStyle,
                   headerTitle: () => <React.Fragment />,
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