import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Button, Chip } from 'react-native-paper';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors, shadows } from '../styles/theme';
import Logo from '../components/Logo';

const TestScreen = () => {
  const { 
    user, 
    userRole, 
    availableRoles, 
    switchRole, 
    addRole, 
    logout,
    canActAsGiver,
    canActAsTaker 
  } = useAuth();

  const handleRoleSwitch = (newRole) => {
    Alert.alert(
      'Switch Role',
      `Switch to ${newRole} mode?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Switch', onPress: () => switchRole(newRole) },
      ]
    );
  };

  const handleAddRole = (newRole) => {
    Alert.alert(
      'Add Role',
      `Add ${newRole} role to your account?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add', onPress: () => addRole(newRole) },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Logo size="large" style={styles.logo} />
          <Text style={styles.title}>LazyDo Test Screen</Text>
          <Text style={styles.subtitle}>Dual Role Functionality Demo</Text>
        </View>

        {/* User Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>👤 User Information</Text>
            <View style={styles.userInfo}>
              <Text style={styles.userText}>Name: {user?.name || 'Not logged in'}</Text>
              <Text style={styles.userText}>Email: {user?.email || 'N/A'}</Text>
              <Text style={styles.userText}>Current Role: <Text style={styles.highlight}>{userRole || 'None'}</Text></Text>
            </View>
          </Card.Content>
        </Card>

        {/* Current Role Status */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>🎭 Current Role Status</Text>
            <View style={styles.roleStatus}>
              <View style={styles.roleItem}>
                <Ionicons 
                  name={canActAsGiver ? "checkmark-circle" : "close-circle"} 
                  size={24} 
                  color={canActAsGiver ? colors.secondary : colors.error} 
                />
                <Text style={styles.roleText}>Can act as Giver</Text>
              </View>
              <View style={styles.roleItem}>
                <Ionicons 
                  name={canActAsTaker ? "checkmark-circle" : "close-circle"} 
                  size={24} 
                  color={canActAsTaker ? colors.secondary : colors.error} 
                />
                <Text style={styles.roleText}>Can act as Taker</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Available Roles */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>🔄 Available Roles</Text>
            <View style={styles.rolesContainer}>
              {availableRoles.map((role) => (
                <Chip
                  key={role}
                  mode={userRole === role ? "flat" : "outlined"}
                  style={[
                    styles.roleChip,
                    userRole === role && { backgroundColor: colors.primary }
                  ]}
                  textStyle={userRole === role ? { color: colors.surface } : { color: colors.primary }}
                >
                  {role}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Role Switching */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>🔄 Switch Role</Text>
            <Text style={styles.description}>
              Switch between your available roles to access different features
            </Text>
            <View style={styles.buttonContainer}>
              {availableRoles.map((role) => (
                <Button
                  key={role}
                  mode={userRole === role ? "contained" : "outlined"}
                  onPress={() => handleRoleSwitch(role)}
                  style={styles.roleButton}
                  disabled={userRole === role}
                >
                  {userRole === role ? `Current: ${role}` : `Switch to ${role}`}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Add New Role */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>➕ Add New Role</Text>
            <Text style={styles.description}>
              Add additional roles to your account
            </Text>
            <View style={styles.buttonContainer}>
              {!canActAsGiver && (
                <Button
                  mode="outlined"
                  onPress={() => handleAddRole('GIVER')}
                  style={styles.roleButton}
                  icon="plus"
                >
                  Add Giver Role
                </Button>
              )}
              {!canActAsTaker && (
                <Button
                  mode="outlined"
                  onPress={() => handleAddRole('TAKER')}
                  style={styles.roleButton}
                  icon="plus"
                >
                  Add Taker Role
                </Button>
              )}
              {canActAsGiver && canActAsTaker && (
                <Text style={styles.allRolesText}>✅ You have all available roles!</Text>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Role Features */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>🎯 Role Features</Text>
            <View style={styles.featuresContainer}>
              <View style={styles.featureSection}>
                <Text style={styles.featureTitle}>As a GIVER:</Text>
                <Text style={styles.featureText}>• Post tasks you're too lazy to do</Text>
                <Text style={styles.featureText}>• Track your posted tasks</Text>
                <Text style={styles.featureText}>• View spending statistics</Text>
                <Text style={styles.featureText}>• Manage task payments</Text>
              </View>
              <View style={styles.featureSection}>
                <Text style={styles.featureTitle}>As a TAKER:</Text>
                <Text style={styles.featureText}>• Browse available tasks</Text>
                <Text style={styles.featureText}>• Accept tasks to earn money</Text>
                <Text style={styles.featureText}>• Track your earnings</Text>
                <Text style={styles.featureText}>• View completed tasks</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* App Status */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>📱 App Status</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.secondary} />
                <Text style={styles.statusText}>Authentication System</Text>
              </View>
              <View style={styles.statusItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.secondary} />
                <Text style={styles.statusText}>Navigation Structure</Text>
              </View>
              <View style={styles.statusItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.secondary} />
                <Text style={styles.statusText}>Dual Role Support</Text>
              </View>
              <View style={styles.statusItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.secondary} />
                <Text style={styles.statusText}>UI Components</Text>
              </View>
              <View style={styles.statusItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.secondary} />
                <Text style={styles.statusText}>Design System</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          labelStyle={styles.logoutButtonLabel}
          icon="logout"
        >
          Logout
        </Button>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.surface,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.surface,
    textAlign: 'center',
    opacity: 0.9,
  },
  card: {
    marginBottom: 20,
    backgroundColor: colors.surface,
    ...shadows.medium,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  userInfo: {
    gap: 8,
  },
  userText: {
    fontSize: 16,
    color: colors.text,
  },
  highlight: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  roleStatus: {
    gap: 15,
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  roleText: {
    fontSize: 16,
    color: colors.text,
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  roleChip: {
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 15,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 10,
  },
  roleButton: {
    marginBottom: 5,
  },
  allRolesText: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  featuresContainer: {
    gap: 20,
  },
  featureSection: {
    gap: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  statusContainer: {
    gap: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusText: {
    fontSize: 14,
    color: colors.text,
  },
  logoutButton: {
    borderColor: colors.error,
    marginBottom: 30,
  },
  logoutButtonLabel: {
    color: colors.error,
  },
});

export default TestScreen; 