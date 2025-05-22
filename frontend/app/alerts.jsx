import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Polyline as MapPolyline,
} from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Polyline from '@mapbox/polyline';

export default function LiveMapScreen() {
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('map');
  const router = useRouter();
  const { polyline, duration } = useLocalSearchParams();

  const decodedCoords = polyline
    ? Polyline.decode(polyline).map(([latitude, longitude]) => ({ latitude, longitude }))
    : [];

  const start = decodedCoords[0];
  const end = decodedCoords[decodedCoords.length - 1];

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: start?.latitude || 28.6139,
          longitude: start?.longitude || 77.209,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {decodedCoords.length > 0 && (
          <>
            <MapPolyline coordinates={decodedCoords} strokeColor="#00C851" strokeWidth={5} />

            <Marker coordinate={start} title="Start">
              <Ionicons name="location-sharp" size={28} color="#00C851" />
            </Marker>

            <Marker coordinate={end} title="End">
              <Ionicons name="flag-sharp" size={28} color="#ff4444" />
            </Marker>
          </>
        )}
      </MapView>

      {duration && (
        <View style={styles.durationBox}>
          <Text style={styles.durationText}>Est. Time: {duration}</Text>
        </View>
      )}

      <View style={styles.filterBar}>
        <TouchableOpacity onPress={() => setFilter('all')} style={styles.filterButton}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('bus')} style={styles.filterButton}>
          <Text style={styles.filterText}>Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('metro')} style={styles.filterButton}>
          <Text style={styles.filterText}>Metro</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => router.push('/report-crowd')}
      >
        <Ionicons name="megaphone-outline" size={24} color="#fff" />
        <Text style={styles.floatingText}>Report Crowd</Text>
      </TouchableOpacity>

      <View style={styles.bottomNavWrapper}>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  durationBox: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    backgroundColor: '#1e1e1e',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  durationText: {
    color: '#00C851',
    fontWeight: 'bold',
  },
  filterBar: {
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 8,
  },
  filterText: {
    color: '#ccc',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#00C851',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  floatingText: {
    color: '#fff',
    marginTop: 6,
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});