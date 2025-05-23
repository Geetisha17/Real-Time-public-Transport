import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MapView, { Marker, Polyline as MapPolyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Polyline from '@mapbox/polyline';
import axios from 'axios';
import * as Location from 'expo-location';

export default function LiveMapScreen() {
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('map');
  const [stations, setStations] = useState([]);
  const [location, setLocation] = useState(null);
  const router = useRouter();
  const mapRef = useRef(null);
  const { polyline , from } = useLocalSearchParams();

  const decodedCoords = polyline
    ? Polyline.decode(polyline).map(([latitude, longitude]) => ({ latitude, longitude }))
    : [];

  useEffect(() => {
    if(from)
    {
      fetchNearbyTransit(from,filter);
    }
  }, [filter,from]);

  const fetchNearbyTransit = async (place,type) => {
    try {
      const res = await axios.get('https://8080-geetisha17-realtimepubl-je8j9g2yf61.ws-us119.gitpod.io/api/codeName', {
        params: { place,type },
      });
      setStations(res.data);
    } catch (err) {
      console.error('Transit fetch error:', err.message);
    }
  };
  useEffect(() => {
    if (mapRef.current && decodedCoords.length > 0) {
      mapRef.current.fitToCoordinates(decodedCoords, {
        edgePadding: {
          top: 100,
          right: 100,
          bottom: 100,
          left: 100,
        },
        animated: true,
      });
    }
  }, [decodedCoords]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        region={location ? {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        } : undefined}
      >
        {decodedCoords.length > 0 && (
          <MapPolyline coordinates={decodedCoords} strokeColor="#00C851" strokeWidth={5} />
        )}

        {stations.map((station, idx) => (
          <Marker
            key={idx}
            coordinate={{
              latitude: station.location.lat,
              longitude: station.location.lng,
            }}
            title={station.name}
            description={station.vicinity}
          />
        ))}
      </MapView>

      <View style={styles.filterBar}>
        {['all', 'bus', 'metro', 'train'].map((type) => (
          <TouchableOpacity key={type} onPress={() => setFilter(type)} style={styles.filterButton}>
            <Text style={styles.filterText}>{type.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.realtimeButton}
        onPress={() => router.push({
          pathname:'/realtime',
          params: {mode:filter}
        })}
      >
        <Ionicons name="megaphone-outline" size={24} color="#fff" />
        <Text style={styles.realTimeText}>View Real-time {filter.toUpperCase()}</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  filterBar: {
    position: 'absolute',
    top: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  filterButton: {
    marginHorizontal: 8,
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  floatingBtn: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#00C851',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 6,
  },
  floatingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  realtimeButton: {
    position: 'absolute',
    bottom: 160,
    left: 20,
    right: 20,
    backgroundColor: '#0099ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  realTimeText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});