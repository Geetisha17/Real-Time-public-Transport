import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

export default function RealtimeScreen() {
  const { mode } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [locations, setLocations] = useState({});
  const [routeNames, setRouteNames] = useState({});

  useEffect(() => {
    const fetchRealtime = async () => {
      try {
        const res = await axios.get(`https://8080-geetisha17-realtimepubl-je8j9g2yf61.ws-us119.gitpod.io/api/realtime?mode=${mode}`);
        const data = res.data.vehicles || [];
        setVehicles(data);

        // Fetch locations
        const locationResults = await Promise.all(
          data.map(async (v) => {
            if (!v.latitude || !v.longitude) return { id: v.id, address: 'Unknown' };
            try {
              const locRes = await axios.get(`https://8080-geetisha17-realtimepubl-je8j9g2yf61.ws-us119.gitpod.io/api/location/place-name`, {
                params: { lat: v.latitude, lng: v.longitude },
              });
              return { id: v.id, address: locRes.data.address || 'Unknown' };
            } catch {
              return { id: v.id, address: 'Unknown' };
            }
          })
        );

        const locMap = {};
        locationResults.forEach((entry) => {
          locMap[entry.id] = entry.address;
        });
        setLocations(locMap);

        const uniqueRouteIds = [...new Set(data.map(v => v.routeId).filter(Boolean))];
        const routeRes = await Promise.all(
          uniqueRouteIds.map(async (id) => {
            try {
              const r = await axios.get(`https://8080-geetisha17-realtimepubl-je8j9g2yf61.ws-us119.gitpod.io/api/static/route-name`, {
                params: { routeId: id },
              });
              return { id, name: r.data.name || id };
            } catch {
              return { id, name: id };
            }
          })
        );

        const routeMap = {};
        routeRes.forEach(entry => {
          routeMap[entry.id] = entry.name;
        });
        setRouteNames(routeMap);

      } catch (err) {
        console.error('Error fetching real-time data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRealtime();
  }, [mode]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Live {mode.toUpperCase()} Arrivals</Text>
      {loading ? (
        <ActivityIndicator color="#00C851" size="large" />
      ) : vehicles.length === 0 ? (
        <Text style={styles.message}>No live data available</Text>
      ) : (
        vehicles.map((v, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.line}>Vehicle ID: {v.id || 'N/A'}</Text>
            <Text style={styles.detail}>Route: {routeNames[v.routeId] || v.routeId || 'N/A'}</Text>
            <Text style={styles.detail}>Location: {locations[v.id] || 'Fetching...'}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20,
    minHeight: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    marginTop:30,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  line: {
    color: '#00C851',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail: {
    color: '#ccc',
    marginTop: 4,
  },
  message: {
    color: '#aaa',
    textAlign: 'center',
  },
});