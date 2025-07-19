import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { colors, shadows } from '../styles/theme';
import Logo from '../components/Logo';
import AnimatedCharacter from '../components/AnimatedCharacter';

const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
  const [isYawning, setIsYawning] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const characterFadeAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Fade-in animation on load
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Yawning animation loop
  useEffect(() => {
    const yawningInterval = setInterval(() => {
      // Fade out current character
      Animated.timing(characterFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        // Switch character state
        setIsYawning(prev => !prev);
        // Fade in new character
        Animated.timing(characterFadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }, 1500);

    return () => clearInterval(yawningInterval);
  }, []);

  // Pulse animation for loading effect
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const renderAnimatedCharacter = () => {
    try {
      // Try to use the actual image files from assets
      const relaxedImage = require('../../assets/lazydo-relaxed.png');
      const yawningImage = require('../../assets/lazydo-yawning.png');
      
      return (
        <View style={styles.characterContainer}>
          <Animated.Image
            source={isYawning ? yawningImage : relaxedImage}
            style={[
              styles.characterImage,
              { opacity: characterFadeAnim },
            ]}
            resizeMode="contain"
          />
          <View style={styles.characterGlow} />
        </View>
      );
    } catch (error) {
      // Fallback to animated component if images don't exist
      return (
        <View style={styles.characterContainer}>
          <Animated.View style={{ opacity: characterFadeAnim }}>
            <AnimatedCharacter isYawning={isYawning} style={styles.characterImage} />
          </Animated.View>
          <View style={styles.characterGlow} />
        </View>
      );
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Logo size="large" showTagline={true} style={styles.logo} />
          </Animated.View>
        </View>

        <View style={styles.characterSection}>
          {renderAnimatedCharacter()}
        </View>

        <View style={styles.loadingSection}>
          <Text style={styles.loadingText}>Loading LazyDo...</Text>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>The lazy way to get things done</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  logo: {
    transform: [{ scale: 1.5 }],
  },
  characterSection: {
    marginBottom: 60,
    alignItems: 'center',
  },
  characterContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  characterGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  loadingSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  loadingText: {
    fontSize: 18,
    color: colors.surface,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface,
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.surface,
    opacity: 0.8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LoadingScreen; 