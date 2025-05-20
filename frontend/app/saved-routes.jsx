import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';

const initialRoutes = [
  {
    id: 'r1',
    name: 'Home to Office',
    summary: 'Bus 102 via Cyberhub',
    autoNotify: true,
  },
  {
    id: 'r2',
    name: 'College to CP',
    summary: 'Metro Blue Line',
    autoNotify: false,
  },
  {
    id: 'r3',
    name: 'Sector 22 to Rajiv Chowk',
    summary: 'Train Route 8A',
    autoNotify: false,
  },
];

export default function SavedRoutesScreen() {
  const [routes, setRoutes] = useState(initialRoutes);
  const router = useRouter();

  const toggleNotify = (id) => {
    const updated = routes.map((route) =>
      route.id === id ? { ...route, autoNotify: !route.autoNotify } : route
    );
    setRoutes(updated);
  };

  const handleRoutePress = (routeName) => {
    router.push({
      pathname: '/route-detail',
      params: { route: routeName },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Routes</Text>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleRoutePress(item.name)}
            style={styles.routeCard}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.routeName}>{item.name}</Text>
              <Text style={styles.routeSummary}>{item.summary}</Text>
            </View>
            <View style={styles.notifyRow}>
              <Text style={styles.notifyText}>Notify</Text>
              <Switch
                value={item.autoNotify}
                onValueChange={() => toggleNotify(item.id)}
                thumbColor={item.autoNotify ? '#00C851' : '#ccc'}
                trackColor={{ true: '#00C851', false: '#555' }}
              />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#999', marginTop: 20, textAlign: 'center' }}>
            No saved routes yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  routeCard: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeName: {
    color: '#00C851',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  routeSummary: {
    color: '#ccc',
    fontSize: 14,
  },
  notifyRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  notifyText: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
});