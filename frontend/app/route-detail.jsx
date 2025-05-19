import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const stops = [
  { name: 'Stop A', eta: '2 mins', crowd: 'Low' },
  { name: 'Stop B', eta: '6 mins', crowd: 'Moderate' },
  { name: 'Stop C', eta: '12 mins', crowd: 'High' },
  { name: 'Stop D', eta: '15 mins', crowd: 'Low' },
];

export default function RouteDetailScreen() {
    const { route } = useLocalSearchParams();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.routeTitle}>
        {route ? `${route} - Details` : 'Route Info'}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeline}>
        {stops.map((stop, index) => (
          <View key={index} style={styles.stopItem}>
            <Text style={styles.stopText}>{stop.name}</Text>
            <View style={styles.stopDot} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.detailsSection}>
        {stops.map((stop, index) => (
          <View key={index} style={styles.stopDetail}>
            <Text style={styles.stopLabel}>{stop.name}</Text>
            <Text style={styles.eta}>ETA: {stop.eta}</Text>
            <Text style={styles.crowd}>
              Crowd: <Text style={{
                color: stop.crowd === 'High' ? 'red' : stop.crowd === 'Moderate' ? 'orange' : 'green',
              }}>{stop.crowd}</Text>
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.reminderButton}>
        <Text style={styles.reminderText}>Set Reminder</Text>
      </TouchableOpacity>

      <View style={styles.altRoutes}>
        <Text style={styles.altTitle}>Alternate Routes:</Text>
        <TouchableOpacity style={styles.altCard}>
          <Text>Route 102B - Less crowded</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.altCard}>
          <Text>Route 89 - Faster by 5 mins</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding:30,
    backgroundColor: '#121212',
    minHeight: '100%',
  },
  routeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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
  altRoutes: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 20,
  },
  altTitle: {
    color: 'white',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  altCard: {
    backgroundColor: '#1c1c1c',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    color:'white',
  },
});