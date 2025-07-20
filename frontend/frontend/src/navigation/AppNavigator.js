import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import TestScreen from '../screens/TestScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Bar Icon Component
const TabBarIcon = ({ focused, color, size, routeName }) => {
  let iconName;

  switch (routeName) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'PostTask':
      iconName = focused ? 'add-circle' : 'add-circle-outline';
      break;
    case 'AcceptedTasks':
      iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
      break;
    case 'Profile':
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = 'help-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

// Giver Tab Navigator
const GiverTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => (
        <TabBarIcon focused={focused} color={color} size={size} routeName={route.name} />
      ),
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={TestScreen}
      options={{ title: 'My Tasks' }}
    />
    <Tab.Screen 
      name="PostTask" 
      component={TestScreen}
      options={{ title: 'Post Task' }}
    />
    <Tab.Screen 
      name="Profile" 
      component={TestScreen}
      options={{ title: 'Profile' }}
    />
  </Tab.Navigator>
);

// Taker Tab Navigator
const TakerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => (
        <TabBarIcon focused={focused} color={color} size={size} routeName={route.name} />
      ),
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={TestScreen}
      options={{ title: 'Browse Tasks' }}
    />
    <Tab.Screen 
      name="AcceptedTasks" 
      component={TestScreen}
      options={{ title: 'My Tasks' }}
    />
    <Tab.Screen 
      name="Profile" 
      component={TestScreen}
      options={{ title: 'Profile' }}
    />
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
  const { isAuthenticated, loading, userRole } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack - for now just show test screen
          <Stack.Screen name="Test" component={TestScreen} />
        ) : (
          // Main App Stack
          <>
            {userRole === 'GIVER' ? (
              <Stack.Screen name="GiverTabs" component={GiverTabNavigator} />
            ) : userRole === 'TAKER' ? (
              <Stack.Screen name="TakerTabs" component={TakerTabNavigator} />
            ) : (
              // Default to Taker for now
              <Stack.Screen name="TakerTabs" component={TakerTabNavigator} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 