import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const suggestions = [
  {
    id: 1,
    title: 'Fastest Route Today',
    summary: 'Bus 102 via MG Road (20 mins)',
    route: 'Bus 102',
  },
  {
    id: 2,
    title: 'Least Crowded Right Now',
    summary: 'Metro Blue Line (light crowd)',
    route: 'Metro Blue Line',
  },
  {
    id: 3,
    title: 'Alternate Route via Train',
    summary: 'Train 8A + walk (22 mins)',
    route: 'Train 8A',
  },
];

export default function SmartSuggestionsScreen() {
  const router = useRouter();

  const handleOpenMap = () => {
    router.push('/map');
  };

  const handleRouteDetail = (routeName) => {
    router.push({
      pathname: '/route-detail',
      params: { route: routeName },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Smart Suggestions</Text>

      {suggestions.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSummary}>{item.summary}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
              <Ionicons name="map-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Open in Map</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => handleRouteDetail(item.route)}
            >
              <Ionicons name="information-circle-outline" size={18} color="#00C851" />
              <Text style={[styles.buttonText, { color: '#00C851' }]}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    color: '#00C851',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardSummary: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapButton: {
    backgroundColor: '#00C851',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailButton: {
    backgroundColor: '#1c1c1c',
    borderColor: '#00C851',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});