import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import BottomNav from '../components/BottomNav';
import axios from 'axios';

export default function EmergencyScreen() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('emergency');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'hospital', 'police', 'doctor'];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      try {
        const res = await axios.get(
          'https://8080-geetisha17-realtimepubl-je8j9g2yf61.ws-us119.gitpod.io/api/emergency',
          {
            params: {
              lat: loc.coords.latitude,
              lng: loc.coords.longitude,
            },
          }
        );
        setPlaces(res.data.places);
      } catch (err) {
        console.error('Error fetching emergency places:', err.message);
        alert('Could not fetch emergency places.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCall = (place) => {
    const phone = place?.vicinity?.match(/\d{6,}/)?.[0];
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    } else {
      alert('No phone number found. Try visiting the place.');
    }
  };

  const filteredPlaces = selectedCategory === 'all'
    ? places
    : places.filter((p) => p.types?.includes(selectedCategory));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Emergency Help Near You</Text>

      <View style={styles.filterBar}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              selectedCategory === cat && styles.activeFilter,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={styles.filterText}>{cat.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator color="#00C851" size="large" />
      ) : filteredPlaces.length === 0 ? (
        <Text style={{ color: '#aaa', marginTop: 20, textAlign: 'center' }}>
          No results found for "{selectedCategory}"
        </Text>
      ) : (
        filteredPlaces.map((place, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.address}>{place.vicinity}</Text>
            <TouchableOpacity style={styles.callBtn} onPress={() => handleCall(place)}>
              <Text style={styles.callText}>Call Now</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <View style={styles.bottomBar}>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20,
    paddingBottom: 100,
    minHeight: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#2c2c2c',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#00C851',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  address: {
    color: '#ccc',
    marginVertical: 4,
  },
  callBtn: {
    backgroundColor: '#00C851',
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  callText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});