import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';


export default function AlertsScreen() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('alerts');
  const router = useRouter();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('https://8080-geetisha17-realtimepubl-je8j9g2yf61.ws-us118.gitpod.io/api/alerts');
        setAlerts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching alerts:', err.message);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Live Alerts</Text>
        <TouchableOpacity onPress={() => router.push('/report-alert-screen')}>
          <Text style={styles.plus}>＋</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00C851" />
      ) : alerts.length === 0 ? (
        <Text style={{ color: '#aaa' }}>No alerts found.</Text>
      ) : (
        alerts.map((alert, i) => (
          <View key={i} style={styles.alertCard}>
            <Text style={styles.alertType}>{alert.type.toUpperCase()}</Text>
            <Text style={styles.alertMessage}>{alert.message}</Text>
            <Text style={styles.alertLocation}>Location: {alert.location}</Text>
            <Text style={styles.alertTime}>{new Date(alert.timestamp).toLocaleString()}</Text>
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
    minHeight: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  plus: {
    fontSize: 28,
    color: '#00C851',
    paddingRight: 4,
  },
  alertCard: {
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  alertType: {
    color: '#00C851',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  alertMessage: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  alertLocation: {
    color: '#ccc',
    marginBottom: 2,
  },
  alertTime: {
    color: '#777',
    fontSize: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});