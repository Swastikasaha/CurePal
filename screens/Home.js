import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch, 
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomePage = () => {
    const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);
  
  // Dynamic theme styles
  const theme = {
    backgroundColor: isDarkMode ? '#121212' : '#FFECA1',
    cardColor: isDarkMode ? '#1e1e1e' : '#ffffff',
    textColor: isDarkMode ? '#ffffff' : '#333333',
    subTextColor: isDarkMode ? '#b3b3b3' : '#666666',
    accentColor: '#4A90E2',
    secondaryAccent: '#50C878',
    highlightColor: isDarkMode ? '#2c2c2c' : '#f0f0f0',
    statusBarStyle: isDarkMode ? 'light-content' : 'dark-content',
    chatbotColor: '#9C27B0',
    calendarColor: '#FF9800',
    exerciseColor: '#F44336',
  };
  
  const BentoCard = ({ title, description, color, onPress,useNavigation }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.cardColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Text style={styles.iconText}>{title[0]}</Text>
      </View>
      <Text style={[styles.cardTitle, { color: theme.textColor }]}>{title}</Text>
      <Text style={[styles.cardDescription, { color: theme.subTextColor }]}>{description}</Text>
    </TouchableOpacity>
  );
  

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar barStyle={theme.statusBarStyle} backgroundColor={theme.backgroundColor} />
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.appName, { color: theme.textColor }]}>CUREPAL</Text>
              <Text style={[styles.greeting, { color: theme.subTextColor }]}>Hello, Sarah</Text>
            </View>
            
            <View style={styles.themeToggle}>
              <Text style={{ color: isDarkMode ? theme.subTextColor : theme.accentColor }}>☀️</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#D3D3D3', true: '#2c2c2c' }}
                thumbColor={isDarkMode ? theme.accentColor : '#ffffff'}
                style={styles.switch}
              />
              <Text style={{ color: isDarkMode ? theme.accentColor : theme.subTextColor }}>🌙</Text>
            </View>
          </View>
          
          {/* Bento Grid Layout */}
          <View style={styles.bentoGrid}>
            {/* Larger card for upcoming appointments */}
            <View style={[styles.largeCard, { backgroundColor: theme.cardColor }]}>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Upcoming Appointment</Text>
              <View style={[styles.appointmentCard, { backgroundColor: theme.highlightColor }]}>
                <View style={styles.appointmentInfo}>
                  <Text style={[styles.appointmentDoctor, { color: theme.textColor }]}>Dr. Michael Chen</Text>
                  <Text style={[styles.appointmentSpecialty, { color: theme.subTextColor }]}>Cardiologist</Text>
                  <View style={styles.dateTimeContainer}>
                    <Text style={[styles.appointmentDate, { color: theme.accentColor }]}>Today, 2:00 PM</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={[styles.viewButton, { backgroundColor: theme.accentColor }]}
                  activeOpacity={0.8}
                  onPress={() => {}}
                >
                  <Text style={styles.viewButtonText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Main services in bento style - First Row */}
            <Text style={[styles.sectionSubtitle, { color: theme.textColor }]}>Core Services</Text>
            <View style={styles.serviceGrid}>
              <BentoCard 
                title="Doctor Consultation"
                description="Connect with specialists"
                color={theme.accentColor}
                onPress={() => {
                  // Navigation would go here
                  // navigation.navigate('DoctorConsultation')
                }}
              />
              
              <BentoCard 
                title="Grocery Shopping"
                description="Health foods delivery"
                color={theme.secondaryAccent}
                onPress={() => {
                  // Navigation would go here
                  // navigation.navigate('GroceryShopping')
                }}
              />
              
              <BentoCard 
                title="Calendar"
                description="Manage appointments"
                color={theme.calendarColor}
                onPress={() => {
                  // Navigation would go here
                  // navigation.navigate('Calendar')
                }}
              />
              
              <BentoCard 
                title="Chatbot"
                description="24/7 health assistance"
                color={theme.chatbotColor}
                onPress={() => {
                  navigation.navigate('ChatbotPage')
                }}
              />
              
              <BentoCard 
                title="Exercise"
                description="Workout plans & tracking"
                color={theme.exerciseColor}
                onPress={() => {
                  // Navigation would go here
                  // navigation.navigate('Exercise')
                }}
              />
              
              <BentoCard 
                title="Appointments"
                description="Book & track visits"
                color="#FF7E67"
                onPress={() => {
                  // Navigation would go here
                  // navigation.navigate('Appointments')
                }}
              />
            </View>
            
            {/* Health stats section */}
            <View style={[styles.statsContainer, { backgroundColor: theme.cardColor }]}>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Health Stats</Text>
              <View style={styles.statsRow}>
                <View style={[styles.statItem, { backgroundColor: theme.highlightColor }]}>
                  <Text style={[styles.statValue, { color: theme.accentColor }]}>72 bpm</Text>
                  <Text style={[styles.statLabel, { color: theme.subTextColor }]}>Heart Rate</Text>
                </View>
                <View style={[styles.statItem, { backgroundColor: theme.highlightColor }]}>
                  <Text style={[styles.statValue, { color: theme.secondaryAccent }]}>6,238</Text>
                  <Text style={[styles.statLabel, { color: theme.subTextColor }]}>Steps</Text>
                </View>
                <View style={[styles.statItem, { backgroundColor: theme.highlightColor }]}>
                  <Text style={[styles.statValue, { color: "#FF7E67" }]}>98%</Text>
                  <Text style={[styles.statLabel, { color: theme.subTextColor }]}>Oxygen</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 16,
    marginTop: 4,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    marginHorizontal: 8,
  },
  bentoGrid: {
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 5,
  },
  largeCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      }
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  appointmentCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentDoctor: {
    fontSize: 16,
    fontWeight: '600',
  },
  appointmentSpecialty: {
    fontSize: 14,
    marginTop: 2,
  },
  dateTimeContainer: {
    marginTop: 6,
  },
  appointmentDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  viewButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: width * 0.44,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      }
    }),
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
  },
  statsContainer: {
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      }
    }),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '31%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
});

export default HomePage;