import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function RouteDetailScreen() {
  const { polyline, duration, steps } = useLocalSearchParams();
  const parsedSteps = steps ? JSON.parse(steps) : [];

  const [crowdData, setCrowdData] = useState([]);

  useEffect(() => {
    const fetchCrowdData = async () => {
      try {
        const stopNames = parsedSteps.map((s) => {
          if (s.transit_details?.departure_stop?.name) return s.transit_details.departure_stop.name;
          if (s.transit_details?.arrival_stop?.name) return s.transit_details.arrival_stop.name;
          return s.html_instructions?.replace(/<[^>]+>/g, '');
        }).filter(Boolean);

        const uniqueStops = [...new Set(stopNames)];

        const responses = await Promise.all(
          uniqueStops.map(stop =>
            axios.get(`https://8080-geetisha17-realtimepubl-je8j9g2yf61.ws-us119.gitpod.io/api/crowd?stopName=${encodeURIComponent(stop)}`)
          )
        );

        const allReports = responses.map((res, i) => {
          const data = res.data;
          if (data.length > 0) {
            const latest = data[data.length - 1];
            return { stopName: uniqueStops[i], ...latest };
          }
          return null;
        }).filter(Boolean);

        setCrowdData(allReports);
      } catch (err) {
        console.error('Crowd fetch error:', err.message);
      }
    };

    fetchCrowdData();
  }, []);

  const getCrowdLevel = (stopName) => {
    const normalized = stopName?.toLowerCase().trim();
    const match = crowdData.find(r => r.stopName?.toLowerCase().trim() === normalized);
    return match ? match.crowdLevel : 'Unknown';
  };

  const getCrowdColor = (level) => {
    if (level === 'HIGH' || level === 'CROWDED') return 'red';
    if (level === 'MODERATE' || level === 'OKAY') return 'orange';
    if (level === 'LOW' || level === 'EMPTY') return 'green';
    return '#888';
  };

  const getIcon = (vehicleType) => {
    if (vehicleType === 'BUS') return '🚌';
    if (vehicleType === 'SUBWAY') return '🚇';
    if (vehicleType === 'RAIL' || vehicleType === 'TRAIN') return '🚆';
    return '';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.routeTitle}>Route Details</Text>
      <Text style={styles.duration}>Estimated Duration: {duration}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeline}>
        {parsedSteps.map((step, index) => {
          const stopName = step.transit_details?.departure_stop?.name ||
                           step.transit_details?.arrival_stop?.name ||
                           step.html_instructions?.replace(/<[^>]+>/g, '');
          return (
            <View key={index} style={styles.stopItem}>
              <Text style={styles.stopText}>{stopName}</Text>
              <View style={styles.stopDot} />
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.detailsSection}>
        {parsedSteps.map((step, index) => {
          const stopName = step.transit_details?.departure_stop?.name ||
                           step.transit_details?.arrival_stop?.name ||
                           step.html_instructions?.replace(/<[^>]+>/g, '');
          const crowd = getCrowdLevel(stopName);
          const color = getCrowdColor(crowd);
          const vehicleType = step.transit_details?.line?.vehicle?.type?.toUpperCase() || '';
          const icon = getIcon(vehicleType);

          return (
            <View key={index} style={styles.stopDetail}>
              <Text style={styles.stopLabel}>{stopName}</Text>
              <Text style={styles.eta}>Duration: {step.duration.text}</Text>
              {step.transit_details && (
                <Text style={styles.crowd}>
                  Vehicle: {icon} <Text style={{ color: '#00C851' }}>{step.transit_details.line.short_name}</Text>
                </Text>
              )}
              <Text style={styles.crowd}>
                Crowd: <Text style={{ color }}>{crowd}</Text>
              </Text>
            </View>
          );
        })}
      </View>

      {crowdData.length > 0 && (
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.altTitle}>Recent Crowd Notes:</Text>
          <ScrollView style={{ maxHeight: 150 }}>
            {crowdData.slice(0, 3).map((r, i) =>
              r.note?.trim() ? (
                <View key={i} style={styles.noteBox}>
                  <Text style={styles.stopLabel}>{r.stopName}</Text>
                  <Text style={{ color: '#ccc' }}>{r.note}</Text>
                </View>
              ) : null
            )}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity style={styles.reminderButton}>
        <Text style={styles.reminderText}>Set Reminder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 30,
    backgroundColor: '#121212',
    minHeight: '100%',
  },
  routeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  duration: {
    color: '#00C851',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 18,
  },
  timeline: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stopItem: {
    alignItems: 'center',
    marginRight: 30,
  },
  stopText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
    maxWidth: 80,
    textAlign: 'center',
  },
  stopDot: {
    width: 12,
    height: 12,
    backgroundColor: '#00C851',
    borderRadius: 6,
  },
  detailsSection: {
    marginBottom: 30,
  },
  stopDetail: {
    backgroundColor: '#1c1c1c',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  stopLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  eta: {
    color: '#ccc',
    marginTop: 4,
  },
  crowd: {
    marginTop: 4,
    fontWeight: 'bold',
  },
  reminderButton: {
    backgroundColor: '#00C851',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  reminderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  altTitle: {
    color: 'white',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteBox: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
});