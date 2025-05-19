import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';

const recentSearches = [
  'Sector 22 to Rajiv Chowk',
  'Home to Cyberhub',
  'Noida City Center to Connaught Place',
];

export default function HomeScreen() {
  const [destination, setDestination] = useState('');
  const [activeTab,setActiveTab] = useState('home');
  
  const router = useRouter();

  const handleSearch = () => {
    if (destination.trim() !== '') {
      router.push({
        pathname: '/route-detail',
        params: { route: destination },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.greeting}>Hey Geetisha, where to?</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Where are you going?"
        placeholderTextColor="#aaa"
        value={destination}
        onChangeText={setDestination}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search Route</Text>
      </TouchableOpacity>

      <View style={styles.quickButtonsContainer}>
        <TouchableOpacity style={styles.quickButton}>
          <Text style={styles.quickButtonText}>Home → Office</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton}>
          <Text style={styles.quickButtonText}>Saved Routes</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.liveMapButton} onPress={() => router.push('/map')}>
        <Text style={styles.liveMapText}>Open Live Map</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Recent Searches</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recentItem}>
            <Text style={styles.recentText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#00C851',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickButton: {
    backgroundColor: '#2c2c2c',
    padding: 12,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  quickButtonText: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  liveMapButton: {
    backgroundColor: '#0099ff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  liveMapText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 10,
  },
  recentItem: {
    paddingVertical: 12,
    borderBottomColor: '#2e2e2e',
    borderBottomWidth: 1,
  },
  recentText: {
    color: '#ccc',
    fontSize: 15,
  },
});