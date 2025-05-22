import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, MapPolyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Polyline from '@mapbox/polyline';

const dummyVehicles = [
  {
    id: 1,
    title: 'Bus #102',
    latitude: 28.6139,
    longitude: 77.209,
    speed: '45 km/h',
    crowd: 'Moderate',
    eta: '5 mins',
  },
  {
    id: 2,
    title: 'Metro #Blue',
    latitude: 28.62,
    longitude: 77.21,
    speed: '60 km/h',
    crowd: 'Crowded',
    eta: '3 mins',
  },
];

export default function LiveMapScreen() {
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('map');
  const router = useRouter(); 
  const { polyline } = useLocalSearchParams();

  const decodedCoords = polyline ? 
  Polyline.decode(polyline).map(([latitude,longitude])=> ({latitude,longitude}))
  :[];

  const filteredVehicles = dummyVehicles.filter(vehicle => {
    if (filter === 'all') return true;
    return vehicle.title.toLowerCase().includes(filter);
  });

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.209,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {
          decodedCoords.length > 0 && (
            <MapPolyline
            coordinates={decodedCoords}
            strokeColor='#00C851'
            strokeWidth={5}
            />
          )
        }
        {filteredVehicles.map(vehicle => (
          <Marker
            key={vehicle.id}
            coordinate={{
              latitude: vehicle.latitude,
              longitude: vehicle.longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() =>
                router.push({
                  pathname: '/route-detail',
                  params: { route: vehicle.title },
                })
              }
            >
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{vehicle.title}</Text>
                <Text>Speed: {vehicle.speed}</Text>
                <Text>Crowd: {vehicle.crowd}</Text>
                <Text>ETA: {vehicle.eta}</Text>
                <Text style={{ color: '#00C851', marginTop: 6 }}>
                  Tap for Route Details
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

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
  callout: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 160,
    elevation: 4,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  filterBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 4,
  },
  filterButton: { paddingHorizontal: 10 },
  filterText: {
    fontWeight: 'bold',
    color: '#333',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    backgroundColor: '#00C851',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 30,
    elevation: 5,
  },
  floatingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  close: {
    color: '#00C851',
    marginTop: 20,
    fontWeight: 'bold',
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  advancedFilters: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 100,
    left: 20,
    right: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterPill: {
    backgroundColor: '#222',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
});
