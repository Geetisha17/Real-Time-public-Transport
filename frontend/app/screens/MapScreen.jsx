import React, { useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

export default function MapScreen() {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '80%'], []);

  return (
    <Animated.View  style={styles.container}>
      <Text style={{ color: 'white' }}>Hello Background</Text>
      
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: 'white' }}
        enablePanDownToClose={false}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.label}>From</Text>
          <TextInput style={styles.input} placeholder="Enter Source" />
          <Text style={styles.label}>To</Text>
          <TextInput style={styles.input} placeholder="Enter Destination" />
          <Text style={styles.label}>Transport</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton}>
              <Text>Metro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text>Bus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </Animated.View >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'red' },
  sheetContent: {
    padding: 20,
    backgroundColor: 'blue',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#eee',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
});
