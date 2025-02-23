
import './gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import WelcomeScreen from './screens/WelcomeScreen'; // Adjust the import path
import HomePage from './screens/Home'; // Adjust the import path
import ChatbotPage from './screens/ChatbotPage';

// Create Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }} // Hide header for the Welcome Screen
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }} // Hide header for the Home Screen
        />
         <Stack.Screen
          name="ChatbotPage"
          component={ChatbotPage}
          options={{ headerShown: false }} // Hide header for the Chatbot Screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;