import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ReportCrowdScreen() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [note, setNote] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!selectedLevel) {
      showToast('Please select crowd level');
      return;
    }

    console.log('Submitting:', { level: selectedLevel, note });

    showToast('Thank you for your feedback!');
    setTimeout(() => router.back(), 1000);
  };

  const showToast = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Crowd Level</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Empty' && { backgroundColor: '#00C851' },
          ]}
          onPress={() => setSelectedLevel('Empty')}
        >
          <Text style={styles.buttonText}>Empty</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Okay' && { backgroundColor: '#FFBB33' },
          ]}
          onPress={() => setSelectedLevel('Okay')}
        >
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Crowded' && { backgroundColor: '#ff4444' },
          ]}
          onPress={() => setSelectedLevel('Crowded')}
        >
          <Text style={styles.buttonText}>Crowded</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Anything else to report?"
        placeholderTextColor="#aaa"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  levelButton: {
    backgroundColor: '#333',
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    height: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#00C851',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
