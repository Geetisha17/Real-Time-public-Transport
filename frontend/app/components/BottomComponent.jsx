import React, { useMemo, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomComponent = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['30%', '100%'], []);

  console.log("Bottom component rendered");

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Choose a Public Transport</Text>

        <TextInput style={styles.input} placeholder="Enter Source" />
        <TextInput style={styles.input} placeholder="Enter Destination" />

        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.optionBox}>
            <Text style={styles.optionText}>Bus</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox}>
            <Text style={styles.optionText}>Train</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox}>
            <Text style={styles.optionText}>Metro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  optionBox: {
    flex: 1,
    marginHorizontal: 5,
    padding: 16,
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    alignItems: 'center',
  },
  optionText: {
    fontWeight: 'bold',
  },
});

export default BottomComponent;