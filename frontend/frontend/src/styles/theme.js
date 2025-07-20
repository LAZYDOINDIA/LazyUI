import { DefaultTheme } from 'react-native-paper';

export const colors = {
  primary: '#6366f1',      // Indigo
  secondary: '#10b981',    // Green
  accent: '#f59e0b',       // Amber
  background: '#ffffff',   // White
  surface: '#f8fafc',      // Light gray
  text: '#1f2937',         // Dark gray
  textSecondary: '#6b7280', // Medium gray
  error: '#ef4444',        // Red
  success: '#10b981',      // Green
  warning: '#f59e0b',      // Amber
  info: '#3b82f6',         // Blue
  disabled: '#d1d5db',     // Light gray
  border: '#e5e7eb',       // Border gray
  shadow: '#000000',       // Black for shadows
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    error: colors.error,
    disabled: colors.disabled,
  },
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};

export const gradients = {
  primary: ['#6366f1', '#8b5cf6'],
  secondary: ['#10b981', '#059669'],
  accent: ['#f59e0b', '#d97706'],
  background: ['#ffffff', '#f8fafc'],
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
}; 