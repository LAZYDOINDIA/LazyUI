import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/styles/theme';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <StatusBar style="light" backgroundColor={colors.primary} />
        <AppNavigator />
      </AuthProvider>
    </PaperProvider>
  );
} 