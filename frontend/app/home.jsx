import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';
import { fetchRoutes } from '../utils/fetchRoutes';

export default function HomeScreen() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [mode, setMode] = useState('transit');
  const [transitSubMode, setTransitSubMode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [latestRoute, setLatestRoute] = useState(null);

  const router = useRouter();

  const transportOptions = ['transit', 'walking', 'driving'];
  const transitModes = ['bus', 'train', 'subway'];

  const handleSearch = async () => {
    if (!from.trim() || !to.trim()) {
      Alert.alert('Please enter both source and destination.');
      return;
    }
  
    const selectedMode = mode;
    const selectedTransitMode = mode === 'transit' ? transitSubMode : '';
  
    const route = await fetchRoutes(from.trim(), to.trim(), selectedMode, selectedTransitMode);
  
    if (!route) {
      Alert.alert('No route found');
      return;
    }
  
    setLatestRoute(route);
  
    router.push({
      pathname: '/route-detail',
      params: {
        polyline: route.polyline,
        duration: route.duration,
        steps: JSON.stringify(route.steps),
      },
    });
  };

  const handleMap =()=>{
    if(!latestRoute) 
    {
      Alert.alert("Please search for a route")
      return;
    }
    router.push({
      pathname: '/map',
      params:{
        polyline: latestRoute.polyline,
        duration: latestRoute.duration,
      },
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.greeting}>Hey Geetisha, where to?</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="From"
        placeholderTextColor="#aaa"
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="To"
        placeholderTextColor="#aaa"
        value={to}
        onChangeText={setTo}
      />

      <TouchableOpacity style={styles.modeButton} onPress={() => setShowModal(true)}>
        <Text style={styles.modeText}>
          Mode: {(transitSubMode || mode).toUpperCase()}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search Route</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mapButton} onPress={handleMap}>
        <Text style={styles.buttonText}>View Route In Map</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.quickButton} onPress={() => router.push('/')}>
        <Text style={styles.quickButtonText}>View Smart Suggestions</Text>
      </TouchableOpacity> */}

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            {transportOptions.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setMode(item);
                  setTransitSubMode('');
                  setShowSubOptions(item === 'transit');
                  if (item !== 'transit') setShowModal(false);
                }}
                style={styles.option}
              >
                <Text style={styles.optionText}>{item.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}

            {showSubOptions &&
              transitModes.map((sub) => (
                <TouchableOpacity
                  key={sub}
                  onPress={() => {
                    setTransitSubMode(sub);
                    setShowModal(false);
                  }}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>→ {sub.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}

            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomBar}>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 90,
  },
  greeting: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  modeButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  modeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#00C851',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  mapButton:{
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickButton: {
    backgroundColor: '#2c2c2c',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  quickButtonText: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    paddingVertical: 14,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  cancelBtn: {
    paddingVertical: 14,
    marginTop: 10,
  },
  cancelText: {
    color: '#ff4444',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});