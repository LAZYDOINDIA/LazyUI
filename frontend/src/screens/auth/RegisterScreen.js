import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { colors, shadows } from '../../styles/theme';
import Logo from '../../components/Logo';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'TAKER',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await register(formData);
      if (!result.success) {
        Alert.alert('Registration Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.logoContainer}>
              <Logo size="large" style={styles.logo} />
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join LazyDo and embrace the lazy life</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  label="Full Name"
                  value={formData.name}
                  onChangeText={(value) => updateFormData('name', value)}
                  mode="outlined"
                  autoCapitalize="words"
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                      background: colors.surface,
                    },
                  }}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  label="Email"
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                      background: colors.surface,
                    },
                  }}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  label="Phone Number"
                  value={formData.phone}
                  onChangeText={(value) => updateFormData('phone', value)}
                  mode="outlined"
                  keyboardType="phone-pad"
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                      background: colors.surface,
                    },
                  }}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  label="Password"
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                      background: colors.surface,
                    },
                  }}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                      color={colors.textSecondary}
                    />
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                  mode="outlined"
                  secureTextEntry={!showConfirmPassword}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: colors.primary,
                      background: colors.surface,
                    },
                  }}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                  right={
                    <TextInput.Icon
                      icon={showConfirmPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      color={colors.textSecondary}
                    />
                  }
                />
              </View>

              <View style={styles.roleContainer}>
                <Text style={styles.roleTitle}>Choose Your Role</Text>
                <View style={styles.roleOptions}>
                  <View style={styles.roleOption}>
                    <RadioButton
                      value="TAKER"
                      status={formData.role === 'TAKER' ? 'checked' : 'unchecked'}
                      onPress={() => updateFormData('role', 'TAKER')}
                      color={colors.primary}
                    />
                    <View style={styles.roleTextContainer}>
                      <Text style={styles.roleText}>Earn money from lazy people</Text>
                      <Text style={styles.roleSubtext}>Complete tasks while others relax</Text>
                    </View>
                  </View>
                  <View style={styles.roleOption}>
                    <RadioButton
                      value="GIVER"
                      status={formData.role === 'GIVER' ? 'checked' : 'unchecked'}
                      onPress={() => updateFormData('role', 'GIVER')}
                      color={colors.primary}
                    />
                    <View style={styles.roleTextContainer}>
                      <Text style={styles.roleText}>Too lazy? Let others do it</Text>
                      <Text style={styles.roleSubtext}>Post tasks and relax while they work</Text>
                    </View>
                  </View>
                </View>
              </View>

              <Button
                mode="contained"
                onPress={handleRegister}
                loading={loading}
                disabled={loading}
                style={styles.registerButton}
                contentStyle={styles.registerButtonContent}
                labelStyle={styles.registerButtonLabel}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginButtonText}>
                  Already have an account? <Text style={styles.loginButtonHighlight}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.surface,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.surface,
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  input: {
    backgroundColor: colors.surface,
    paddingLeft: 40,
    ...shadows.small,
  },
  roleContainer: {
    marginBottom: 30,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 15,
    textAlign: 'center',
  },
  roleOptions: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 15,
    ...shadows.small,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  roleTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  roleText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  roleSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  registerButton: {
    backgroundColor: colors.accent,
    borderRadius: 25,
    marginBottom: 20,
    ...shadows.medium,
  },
  registerButtonContent: {
    paddingVertical: 8,
  },
  registerButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.surface,
    opacity: 0.3,
  },
  dividerText: {
    color: colors.surface,
    marginHorizontal: 15,
    fontSize: 14,
    opacity: 0.8,
  },
  loginButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  loginButtonText: {
    color: colors.surface,
    fontSize: 16,
  },
  loginButtonHighlight: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen; 