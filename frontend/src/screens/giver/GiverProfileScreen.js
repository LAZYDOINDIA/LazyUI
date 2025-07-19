import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { Card, Button, List, Divider, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'react-native-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { colors, shadows } from '../../styles/theme';

const GiverProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalPosted: 12,
    activeTasks: 3,
    completedTasks: 9,
    totalSpent: 245,
    averageRating: 4.8,
  });
  const [settings, setSettings] = useState({
    notifications: true,
    locationServices: true,
    darkMode: false,
  });

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

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing will be implemented soon!');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Payment methods management will be implemented soon!');
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'Help and support features will be implemented soon!');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Privacy policy will be displayed here.');
  };

  const handleTermsConditions = () => {
    Alert.alert('Terms & Conditions', 'Terms and conditions will be displayed here.');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Ionicons name="settings-outline" size={24} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <View style={styles.profileHeader}>
              <Avatar.Text
                size={80}
                label={user?.name?.charAt(0) || 'U'}
                style={styles.avatar}
                color={colors.surface}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.name || 'Lazy User'}</Text>
                <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color={colors.accent} />
                  <Text style={styles.ratingText}>{stats.averageRating}</Text>
                  <Text style={styles.ratingCount}>({stats.completedTasks} reviews)</Text>
                </View>
              </View>
            </View>
            <Button
              mode="outlined"
              onPress={handleEditProfile}
              style={styles.editButton}
              labelStyle={styles.editButtonLabel}
            >
              Edit Profile
            </Button>
          </Card.Content>
        </Card>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <Card.Content style={styles.statContent}>
              <Ionicons name="add-circle" size={24} color={colors.surface} />
              <Text style={styles.statNumber}>{stats.totalPosted}</Text>
              <Text style={styles.statLabel}>Tasks Posted</Text>
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: colors.accent }]}>
            <Card.Content style={styles.statContent}>
              <Ionicons name="time" size={24} color={colors.surface} />
              <Text style={styles.statNumber}>{stats.activeTasks}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: colors.secondary }]}>
            <Card.Content style={styles.statContent}>
              <Ionicons name="checkmark-circle" size={24} color={colors.surface} />
              <Text style={styles.statNumber}>{stats.completedTasks}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: colors.error }]}>
            <Card.Content style={styles.statContent}>
              <Ionicons name="cash" size={24} color={colors.surface} />
              <Text style={styles.statNumber}>${stats.totalSpent}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('PostTask')}>
                <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                  <Ionicons name="add-circle" size={24} color={colors.surface} />
                </View>
                <Text style={styles.actionText}>Post Task</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Home')}>
                <View style={[styles.actionIcon, { backgroundColor: colors.accent }]}>
                  <Ionicons name="list" size={24} color={colors.surface} />
                </View>
                <Text style={styles.actionText}>My Tasks</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={handlePaymentMethods}>
                <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
                  <Ionicons name="card" size={24} color={colors.surface} />
                </View>
                <Text style={styles.actionText}>Payment</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={handleHelpSupport}>
                <View style={[styles.actionIcon, { backgroundColor: colors.error }]}>
                  <Ionicons name="help-circle" size={24} color={colors.surface} />
                </View>
                <Text style={styles.actionText}>Help</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Settings */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <List.Item
              title="Push Notifications"
              description="Get notified about task updates"
              left={(props) => <List.Icon {...props} icon="bell" color={colors.primary} />}
              right={() => (
                <Switch
                  value={settings.notifications}
                  onValueChange={() => handleSettingToggle('notifications')}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.surface}
                />
              )}
            />
            <Divider />

            <List.Item
              title="Location Services"
              description="Allow location access for nearby tasks"
              left={(props) => <List.Icon {...props} icon="map-marker" color={colors.primary} />}
              right={() => (
                <Switch
                  value={settings.locationServices}
                  onValueChange={() => handleSettingToggle('locationServices')}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.surface}
                />
              )}
            />
            <Divider />

            <List.Item
              title="Dark Mode"
              description="Switch to dark theme"
              left={(props) => <List.Icon {...props} icon="moon" color={colors.primary} />}
              right={() => (
                <Switch
                  value={settings.darkMode}
                  onValueChange={() => handleSettingToggle('darkMode')}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.surface}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Legal */}
        <Card style={styles.legalCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Legal</Text>
            
            <List.Item
              title="Privacy Policy"
              left={(props) => <List.Icon {...props} icon="shield" color={colors.primary} />}
              onPress={handlePrivacyPolicy}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            <Divider />

            <List.Item
              title="Terms & Conditions"
              left={(props) => <List.Icon {...props} icon="file-document" color={colors.primary} />}
              onPress={handleTermsConditions}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          </Card.Content>
        </Card>

        {/* Logout */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          labelStyle={styles.logoutButtonLabel}
          icon="logout"
        >
          Logout
        </Button>

        {/* App Version */}
        <Text style={styles.versionText}>LazyDo v1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.surface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    marginTop: 20,
    marginBottom: 20,
    ...shadows.medium,
  },
  profileContent: {
    paddingVertical: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: colors.primary,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 5,
  },
  ratingCount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 5,
  },
  editButton: {
    borderColor: colors.primary,
  },
  editButtonLabel: {
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    ...shadows.medium,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.surface,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 10,
    color: colors.surface,
    opacity: 0.9,
    marginTop: 2,
    textAlign: 'center',
  },
  actionsCard: {
    marginBottom: 20,
    ...shadows.small,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...shadows.small,
  },
  actionText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  settingsCard: {
    marginBottom: 20,
    ...shadows.small,
  },
  legalCard: {
    marginBottom: 20,
    ...shadows.small,
  },
  logoutButton: {
    borderColor: colors.error,
    marginBottom: 20,
  },
  logoutButtonLabel: {
    color: colors.error,
  },
  versionText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 20,
  },
});

export default GiverProfileScreen; 