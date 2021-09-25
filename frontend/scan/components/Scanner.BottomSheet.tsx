import BottomSheet from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useTheme} from "../../theme";

const defaultSnapPoints: readonly string[] = [
  '5%',
  '55%',
  '100%',
];

const defaultRequestDismiss = () => undefined;

export default function ScannerBottomSheet({
  children,
  onRequestDismiss = defaultRequestDismiss,
  snapPoints = defaultSnapPoints,
  visible = false,
}: {
  readonly children: JSX.Element | readonly JSX.Element[];
  readonly snapPoints?: readonly string[];
  // eslint-disable-next-line functional/no-return-void
  readonly onRequestDismiss?: () => void;
  readonly visible?: boolean;
}): JSX.Element {
  const ref = React.useRef<BottomSheet>(null);
  const {hints} = useTheme();
  const {bottomBarHeight, marginExtraShort} = hints;

  React.useEffect(() => {
    if (ref?.current) {
      const {snapTo} = ref.current;
      if (visible) {
        snapTo(1);
      } else {
        snapTo(0);
      }
    }
  }, [visible]);
  const onChange = React.useCallback((nextIndex: number) => {
    (nextIndex < 2) && Keyboard.dismiss();
  }, []);
  return (
    <View style={StyleSheet.absoluteFill}>
      <TouchableOpacity
        onPress={onRequestDismiss}
        style={StyleSheet.absoluteFill}
      />
      <BottomSheet
        animateOnMount={false}
        ref={ref}
        index={0}
        onChange={onChange}
        snapPoints={snapPoints}>
        <View style={{height: bottomBarHeight + marginExtraShort}}/>
        {children}
      </BottomSheet>
    </View>
  );
}
