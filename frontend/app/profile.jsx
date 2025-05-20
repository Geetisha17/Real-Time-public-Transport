import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';


export default function ProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState('Geetisha Tandon');
  const [email] = useState('geetisha@email.com');
  const [homeLocation, setHomeLocation] = useState('Sector 22');
  const [workLocation, setWorkLocation] = useState('Cyberhub');
  const [transportType, setTransportType] = useState('Metro');
  const [commuteTime, setCommuteTime] = useState('9:00 AM');
  const [activeTab,setActiveTab] = useState('profile');

  const handleLogout = () => {
    Alert.alert('Logged Out', 'See you soon, queen!');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/300?img=52' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      <Text style={styles.sectionTitle}>Home & Work</Text>
      <TextInput
        style={styles.input}
        placeholder="Home Location"
        value={homeLocation}
        onChangeText={setHomeLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Work Location"
        value={workLocation}
        onChangeText={setWorkLocation}
      />

      <Text style={styles.sectionTitle}>Preferences</Text>
      <TextInput
        style={styles.input}
        placeholder="Preferred Transport"
        value={transportType}
        onChangeText={setTransportType}
      />
      <TextInput
        style={styles.input}
        placeholder="Commute Time"
        value={commuteTime}
        onChangeText={setCommuteTime}
      />
      <TouchableOpacity onPress={() => router.push('/notification')}>
        <Text style={{ color: '#00C851', fontWeight: 'bold', marginTop: 16 }}>
          View Alerts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.bottomNavWrapper}>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 100, height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 24,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    color: '#00C851',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#ff4444',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});