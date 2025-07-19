import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

const AnimatedCharacter = ({ isYawning, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Character body (green checkmark shape) */}
      <View style={styles.checkmarkBody}>
        {/* Character head */}
        <View style={styles.head}>
          {/* Eyes */}
          <View style={styles.eyes}>
            <View style={[styles.eye, isYawning && styles.eyeClosed]} />
            <View style={[styles.eye, isYawning && styles.eyeClosed]} />
          </View>
          
          {/* Mouth */}
          <View style={[styles.mouth, isYawning && styles.mouthYawning]}>
            {isYawning && <View style={styles.tongue} />}
          </View>
        </View>
        
        {/* Character body/arms */}
        <View style={styles.body}>
          <View style={styles.arms} />
        </View>
        
        {/* Character legs */}
        <View style={styles.legs}>
          <View style={styles.leg} />
          <View style={styles.leg} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkBody: {
    width: 100,
    height: 100,
    backgroundColor: '#4CAF50', // Green color
    borderRadius: 20,
    position: 'relative',
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  head: {
    width: 40,
    height: 40,
    backgroundColor: '#FFE0B2', // Light skin tone
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    left: 30,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  eyes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 24,
    marginBottom: 4,
  },
  eye: {
    width: 4,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  eyeClosed: {
    height: 2,
    backgroundColor: '#666',
  },
  mouth: {
    width: 12,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  mouthYawning: {
    width: 16,
    height: 12,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  tongue: {
    width: 8,
    height: 6,
    backgroundColor: '#FFB3BA',
    borderRadius: 4,
    position: 'absolute',
    bottom: -2,
    left: 4,
  },
  body: {
    position: 'absolute',
    top: 35,
    left: 25,
    transform: [{ rotate: '-45deg' }],
  },
  arms: {
    width: 30,
    height: 8,
    backgroundColor: '#8BC34A', // Olive green shirt
    borderRadius: 4,
  },
  legs: {
    position: 'absolute',
    bottom: 15,
    left: 35,
    flexDirection: 'row',
    transform: [{ rotate: '-45deg' }],
  },
  leg: {
    width: 8,
    height: 20,
    backgroundColor: '#795548', // Brown pants
    borderRadius: 4,
    marginHorizontal: 2,
  },
});

export default AnimatedCharacter; 