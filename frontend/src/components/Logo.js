import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

const Logo = ({ size = 'medium', showTagline = true, style }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { iconSize: 24, textSize: 18, containerHeight: 32 };
      case 'large':
        return { iconSize: 48, textSize: 32, containerHeight: 64 };
      default: // medium
        return { iconSize: 32, textSize: 24, containerHeight: 40 };
    }
  };

  const { iconSize, textSize, containerHeight } = getSize();

  return (
    <View style={[styles.container, { height: containerHeight }, style]}>
      {/* LazyDo Icon - Man relaxing on checkmark */}
      <View style={[styles.iconContainer, { width: iconSize, height: iconSize }]}>
        {/* Checkmark base */}
        <View style={[styles.checkmark, { width: iconSize * 0.8, height: iconSize * 0.6 }]}>
          {/* Checkmark shape */}
          <View style={styles.checkmarkLine1} />
          <View style={styles.checkmarkLine2} />
        </View>
        
        {/* Relaxing man */}
        <View style={[styles.man, { width: iconSize * 0.6, height: iconSize * 0.4 }]}>
          {/* Head */}
          <View style={styles.head} />
          {/* Body */}
          <View style={styles.body} />
          {/* Arms */}
          <View style={styles.arm1} />
          <View style={styles.arm2} />
          {/* Legs */}
          <View style={styles.leg1} />
          <View style={styles.leg2} />
        </View>
      </View>
      
      {/* App Name */}
      <View style={styles.textContainer}>
        <Text style={[styles.appName, { fontSize: textSize }]}>
          Lazy<Text style={styles.highlight}>Do</Text>
        </Text>
        {showTagline && (
          <Text style={styles.tagline}>
            The Lazy Way to Get Things Done
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    position: 'absolute',
    backgroundColor: '#10b981', // Muted green
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  checkmarkLine1: {
    position: 'absolute',
    width: '60%',
    height: 3,
    backgroundColor: '#10b981',
    top: '40%',
    left: '20%',
    borderRadius: 2,
  },
  checkmarkLine2: {
    position: 'absolute',
    width: 3,
    height: '80%',
    backgroundColor: '#10b981',
    top: '10%',
    left: '30%',
    borderRadius: 2,
  },
  man: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fbbf24', // Light skin tone
    borderWidth: 1,
    borderColor: '#92400e', // Dark brown outline
  },
  body: {
    width: 12,
    height: 16,
    backgroundColor: '#10b981', // Muted green shirt
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#92400e',
    marginTop: 2,
  },
  arm1: {
    position: 'absolute',
    width: 3,
    height: 8,
    backgroundColor: '#fbbf24',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#92400e',
    top: 4,
    left: -2,
    transform: [{ rotate: '-30deg' }],
  },
  arm2: {
    position: 'absolute',
    width: 3,
    height: 8,
    backgroundColor: '#fbbf24',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#92400e',
    top: 4,
    right: -2,
    transform: [{ rotate: '30deg' }],
  },
  leg1: {
    position: 'absolute',
    width: 4,
    height: 10,
    backgroundColor: '#92400e', // Dark brown pants
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#92400e',
    bottom: -8,
    left: 2,
    transform: [{ rotate: '-15deg' }],
  },
  leg2: {
    position: 'absolute',
    width: 4,
    height: 10,
    backgroundColor: '#92400e',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#92400e',
    bottom: -8,
    right: 2,
    transform: [{ rotate: '15deg' }],
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  appName: {
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 0.5,
  },
  highlight: {
    color: colors.primary,
  },
  tagline: {
    fontSize: 10,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: -2,
  },
});

export default Logo; 