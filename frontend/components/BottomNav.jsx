import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BottomNav({ activeTab, setActiveTab }) {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            setActiveTab('home');
            router.push('/home');
          }}
        >
          <Ionicons
            name="home"
            size={24}
            color={activeTab === 'home' ? '#00C851' : '#aaa'}
          />
          <Text style={activeTab === 'home' ? styles.navItemActive : styles.navItem}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            setActiveTab('map');
            router.push('/map');
          }}
        >
          <Ionicons
            name="map"
            size={24}
            color={activeTab === 'map' ? '#00C851' : '#aaa'}
          />
          <Text style={activeTab === 'map' ? styles.navItemActive : styles.navItem}>
            Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => setActiveTab('favorites')}
        >
          <Ionicons
            name="heart"
            size={24}
            color={activeTab === 'favorites' ? '#00C851' : '#aaa'}
          />
          <Text style={activeTab === 'favorites' ? styles.navItemActive : styles.navItem}>
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => setActiveTab('profile')}
        >
          <Ionicons
            name="person"
            size={24}
            color={activeTab === 'profile' ? '#00C851' : '#aaa'}
          />
          <Text style={activeTab === 'profile' ? styles.navItemActive : styles.navItem}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#121212',
  },
  bottomNav: {
    backgroundColor: '#1c1c1c',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  navItemActive: {
    color: '#00C851',
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
});