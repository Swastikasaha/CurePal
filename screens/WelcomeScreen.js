import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const CurePalMascot = () => (
  <Svg width="120" height="120" viewBox="0 0 120 120">
    {/* Body */}
    <Path
      d="M30 40 A30 30 0 0 1 90 40 A30 35 0 0 1 90 80 A30 30 0 0 1 30 80 A30 35 0 0 1 30 40"
      fill="#FF6B35"
    />
    {/* Face */}
    <Circle cx="60" cy="60" r="20" fill="#B4E4FF" />
    {/* Eyes */}
    <Circle cx="50" cy="55" r="5" fill="#4CB9E7" />
    <Circle cx="70" cy="55" r="5" fill="#4CB9E7" />
    {/* Chef Hat */}
    <Rect x="45" y="15" width="30" height="10" fill="#FFFFFF" />
    <Path
      d="M45 15 Q60 0 75 15"
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth="2"
    />
    {/* Medical Cross on Hat */}
    <Path
      d="M57 10 L63 10 L63 7 L57 7 Z"
      fill="#FF0000"
    />
    <Path
      d="M60 13 L60 4"
      stroke="#FF0000"
      strokeWidth="2"
    />
  </Svg>
);

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <CurePalMascot />
            <Text style={styles.title}>CurePal</Text>
            <Text style={styles.subtitle}>Your virtual HealthCare Buddy</Text>
          </View>
          
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '300',
    color: '#0066CC',
    marginTop: 20,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#4682B4',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#0033CC',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 40,
    // Add shadow for depth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;