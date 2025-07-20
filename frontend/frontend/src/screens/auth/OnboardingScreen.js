import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../styles/theme';
import Logo from '../../components/Logo';
import AnimatedCharacter from '../../components/AnimatedCharacter';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isYawning, setIsYawning] = useState(false);
  const [useImages, setUseImages] = useState(true);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const characterFadeAnim = useRef(new Animated.Value(1)).current;

  const pages = [
    {
      title: 'Welcome to LazyDo',
      subtitle: 'The Lazy Way to Get Things Done',
      description: 'Too lazy to do it yourself? Let others do it for you, or earn money helping the lazy ones!',
      icon: 'leaf',
      color: colors.primary,
      showLogo: true,
    },
    {
      title: 'Too Lazy to Do It?',
      subtitle: 'Post a Task',
      description: 'From groceries to home repairs, post any task and let someone else handle it while you relax.',
      icon: 'bed-outline',
      color: colors.secondary,
      showLogo: false,
    },
    {
      title: 'Want to Earn While Others Laze?',
      subtitle: 'Accept Tasks',
      description: 'Browse available tasks, choose what you can do, and earn money from the lazy ones.',
      icon: 'cash',
      color: colors.accent,
      showLogo: false,
    },
  ];

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

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / width);
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentPage + 1) * width,
        animated: true,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentPage ? colors.primary : colors.border,
                width: index === currentPage ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderAnimatedCharacter = () => {
    try {
      // Try to use the actual image files from assets
      const relaxedImage = require('../../../assets/lazydo-relaxed.png');
      const yawningImage = require('../../../assets/lazydo-yawning.png');
      
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
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {pages.map((page, index) => (
            <View key={index} style={styles.page}>
              <View style={styles.iconContainer}>
                {page.showLogo ? (
                  <View style={styles.logoContainer}>
                    <Logo size="large" showTagline={false} style={styles.logo} />
                    {renderAnimatedCharacter()}
                  </View>
                ) : (
                  <View style={[styles.iconCircle, { backgroundColor: page.color + '20' }]}>
                    <Ionicons name={page.icon} size={80} color={colors.surface} />
                  </View>
                )}
              </View>
              
              <Text style={styles.title}>{page.title}</Text>
              <Text style={styles.subtitle}>{page.subtitle}</Text>
              <Text style={styles.description}>{page.description}</Text>
            </View>
          ))}
        </ScrollView>

        {renderDots()}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <LinearGradient
              colors={[colors.accent, colors.primary]}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {currentPage === pages.length - 1 ? 'Get Started' : 'Next'}
              </Text>
              <Ionicons 
                name={currentPage === pages.length - 1 ? 'arrow-forward' : 'chevron-forward'} 
                size={20} 
                color={colors.surface} 
              />
            </LinearGradient>
          </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    ...shadows.large,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    transform: [{ scale: 1.2 }],
    marginBottom: 20,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.surface,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: colors.surface,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: colors.surface,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    transition: 'all 0.3s ease',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipText: {
    color: colors.surface,
    fontSize: 16,
    opacity: 0.8,
  },
  nextButton: {
    borderRadius: 25,
    overflow: 'hidden',
    ...shadows.medium,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  nextButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default OnboardingScreen; 