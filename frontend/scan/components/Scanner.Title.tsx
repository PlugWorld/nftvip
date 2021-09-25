import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from '../../../assets/image/logo.png';
import {NavigationHeader} from '../../navigation';
import {useTheme} from "../../theme";

const styles = StyleSheet.create({
  flex: {flex: 1},
  flexEnd: {
    justifyContent: 'flex-end',
  },
  logo: {
    height: 50,
    width: 120,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
});

export default function ScannerTitle({height, style}: {
  readonly height: number;
  readonly style?: StyleProp<ViewStyle>;
}): JSX.Element {
  const {systemColors, hints} = useTheme();
  const {marginStandard} = hints;
  const {primary} = systemColors;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const navigation = useNavigation<StackNavigationProp<any>>();
  const onPressAdd = React.useCallback(() => {
    navigation.push('/collection/select-collection');
  }, [navigation]);
  return (
    <NavigationHeader height={height} style={style}>
      <View style={[styles.row, {padding: marginStandard}]}>
        <View style={styles.flex} />
        <FastImage
          source={Logo}
          style={[styles.logo, {transform: [{scale: 0.8}]}]}
        />
        <View style={[styles.flex, styles.row, styles.flexEnd]}>
          <TouchableOpacity>
            <Ionicons onPress={onPressAdd} name="ios-add" size={30} color={primary} />
          </TouchableOpacity>
        </View>
      </View>
    </NavigationHeader>
  );
}
