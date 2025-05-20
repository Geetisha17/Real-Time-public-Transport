import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialAlerts = [
  {
    id: 'a1',
    type: 'Delay',
    message: 'Bus 102 is delayed by 12 minutes',
    icon: 'time-outline',
  },
  {
    id: 'a2',
    type: 'Road Closure',
    message: 'MG Road closed due to construction',
    icon: 'alert-circle-outline',
  },
  {
    id: 'a3',
    type: 'Crowd Alert',
    message: 'Metro Blue Line is currently overcrowded',
    icon: 'people-outline',
  },
];

export default function NotificationsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);

  const togglePush = () => setPushEnabled(!pushEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <View style={styles.pushRow}>
        <Text style={styles.pushText}>Enable Push Notifications</Text>
        <Switch
          value={pushEnabled}
          onValueChange={togglePush}
          thumbColor={pushEnabled ? '#00C851' : '#888'}
          trackColor={{ true: '#00C851', false: '#444' }}
        />
      </View>

      <FlatList
        data={initialAlerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertCard}>
            <Ionicons name={item.icon} size={24} color="#00C851" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>{item.type}</Text>
              <Text style={styles.alertMessage}>{item.message}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No current alerts</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pushRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 12,
  },
  pushText: {
    color: '#ccc',
    fontSize: 14,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  alertTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#00C851',
    marginBottom: 4,
  },
  alertMessage: {
    color: '#ccc',
    fontSize: 13,
  },
  empty: {
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
});
