import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function ReportAlertScreen() {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const alertTypes = ['delay', 'breakdown', 'construction', 'crowd'];

  const handleSubmit = async () => {
    if (!type || !message || !location) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post('https://8080-geetisha17-realtimepubl-je8j9g2yf61.ws-us119.gitpod.io/api/alerts', {
        type,
        message,
        location,
      });

      Alert.alert('Alert submitted');
      router.back();
    } catch (err) {
      console.error('Submit error:', err.message);
      Alert.alert('Failed to submit alert');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report an Alert</Text>

      <Text style={styles.label}>Type</Text>
      {alertTypes.map((t) => (
        <TouchableOpacity
          key={t}
          style={[styles.typeButton, type === t && styles.typeButtonActive]}
          onPress={() => setType(t)}
        >
          <Text style={styles.typeText}>{t.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter affected location"
        placeholderTextColor="#aaa"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Describe the issue..."
        placeholderTextColor="#aaa"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Alert</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 24,
    paddingTop: 60,
    minHeight: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#ccc',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    marginBottom: 20,
  },
  typeButton: {
    padding: 12,
    borderRadius: 10,
    borderColor: '#444',
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#00C851',
    borderColor: '#00C851',
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: '#00C851',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});