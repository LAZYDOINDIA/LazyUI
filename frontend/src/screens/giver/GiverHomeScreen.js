import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Card, Button, Chip, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'react-native-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { taskAPI } from '../../api/axiosInstance';
import { colors, shadows } from '../../styles/theme';

const GiverHomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalPosted: 0,
    activeTasks: 0,
    completedTasks: 0,
    totalSpent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch data from the API
      // const response = await taskAPI.getPostedTasks();
      // setTasks(response.data);
      
      // Comprehensive mock data for testing
      const mockTasks = [
        {
          id: 1,
          title: 'Pick up groceries from Walmart',
          description: 'Need milk, bread, eggs, and some vegetables. Please check expiration dates.',
          category: 'Shopping',
          urgency: 'Medium',
          reward: 25,
          status: 'Active',
          createdAt: '2024-01-16T10:30:00Z',
          acceptedBy: 'John D.',
          acceptedAt: '2024-01-16T11:15:00Z',
          location: 'Walmart, Downtown Mall',
          takerRating: 4.8,
        },
        {
          id: 2,
          title: 'Fix leaky kitchen faucet',
          description: 'The kitchen faucet is dripping constantly. Need someone with basic plumbing skills.',
          category: 'Home Repair',
          urgency: 'High',
          reward: 75,
          status: 'Completed',
          createdAt: '2024-01-15T09:20:00Z',
          completedAt: '2024-01-16T14:30:00Z',
          acceptedBy: 'Mike R.',
          acceptedAt: '2024-01-15T10:45:00Z',
          location: 'My Home',
          takerRating: 4.5,
        },
        {
          id: 3,
          title: 'Deliver package to post office',
          description: 'Small package needs to be dropped off at USPS. Package is ready to go.',
          category: 'Delivery',
          urgency: 'Low',
          reward: 18,
          status: 'Active',
          createdAt: '2024-01-16T11:45:00Z',
          acceptedBy: null,
          acceptedAt: null,
          location: 'USPS, 456 Main St',
          takerRating: null,
        },
        {
          id: 4,
          title: 'Deep clean apartment kitchen',
          description: 'Need thorough cleaning of kitchen including appliances, countertops, and floors.',
          category: 'Cleaning',
          urgency: 'Medium',
          reward: 45,
          status: 'Completed',
          createdAt: '2024-01-14T08:15:00Z',
          completedAt: '2024-01-15T16:20:00Z',
          acceptedBy: 'Lisa K.',
          acceptedAt: '2024-01-14T09:30:00Z',
          location: 'My Apartment',
          takerRating: 4.7,
        },
        {
          id: 5,
          title: 'Assemble IKEA desk and chair',
          description: 'Need help assembling a desk and office chair from IKEA. All parts included.',
          category: 'Other',
          urgency: 'Low',
          reward: 55,
          status: 'Active',
          createdAt: '2024-01-16T12:00:00Z',
          acceptedBy: 'David L.',
          acceptedAt: '2024-01-16T13:20:00Z',
          location: 'My Office',
          takerRating: 4.6,
        },
        {
          id: 6,
          title: 'Pick up dry cleaning',
          description: 'Need to pick up dry cleaning from CleanPro. Order number: CP-2024-001.',
          category: 'Shopping',
          urgency: 'Medium',
          reward: 12,
          status: 'Cancelled',
          createdAt: '2024-01-16T13:30:00Z',
          completedAt: null,
          acceptedBy: null,
          acceptedAt: null,
          location: 'CleanPro, 321 Elm St',
          takerRating: null,
        },
        {
          id: 7,
          title: 'Install new light fixture',
          description: 'Need to replace old ceiling light with new LED fixture. Fixture provided.',
          category: 'Home Repair',
          urgency: 'Medium',
          reward: 65,
          status: 'Completed',
          createdAt: '2024-01-13T14:15:00Z',
          completedAt: '2024-01-14T11:45:00Z',
          acceptedBy: 'Alex T.',
          acceptedAt: '2024-01-13T15:30:00Z',
          location: 'My Home',
          takerRating: 4.4,
        },
        {
          id: 8,
          title: 'Deliver flowers to hospital',
          description: 'Need to deliver a bouquet of flowers to St. Mary\'s Hospital, Room 302.',
          category: 'Delivery',
          urgency: 'High',
          reward: 30,
          status: 'Active',
          createdAt: '2024-01-16T15:00:00Z',
          acceptedBy: 'Maria G.',
          acceptedAt: '2024-01-16T15:45:00Z',
          location: 'St. Mary\'s Hospital',
          takerRating: 4.8,
        },
      ];

      // Sort tasks by creation date (newest first)
      const sortedTasks = mockTasks.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTasks(sortedTasks);
      
      // Calculate stats
      const totalPosted = sortedTasks.length;
      const activeTasks = sortedTasks.filter(task => task.status === 'Active').length;
      const completedTasks = sortedTasks.filter(task => task.status === 'Completed').length;
      const totalSpent = sortedTasks
        .filter(task => task.status === 'Completed')
        .reduce((sum, task) => sum + task.reward, 0);

      setStats({ totalPosted, activeTasks, completedTasks, totalSpent });
    } catch (error) {
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return colors.primary;
      case 'Completed':
        return colors.secondary;
      case 'Cancelled':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High':
        return colors.error;
      case 'Medium':
        return colors.accent;
      case 'Low':
        return colors.secondary;
      default:
        return colors.textSecondary;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleTaskPress = (task) => {
    // Navigate to task detail screen
    Alert.alert('Task Details', `Viewing details for: ${task.title}`);
  };

  const handlePostNewTask = () => {
    navigation.navigate('PostTask');
  };

  const handleCancelTask = (task) => {
    Alert.alert(
      'Cancel Task',
      `Are you sure you want to cancel "${task.title}"?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            // Update task status to cancelled
            setTasks(prev => prev.map(t => 
              t.id === task.id ? { ...t, status: 'Cancelled' } : t
            ));
            // Recalculate stats
            loadData();
          },
        },
      ]
    );
  };

  const renderTaskCard = (task) => (
    <Card key={task.id} style={styles.taskCard} onPress={() => handleTaskPress(task)}>
      <Card.Content>
        <View style={styles.taskHeader}>
          <View style={styles.taskTitleContainer}>
            <Text style={styles.taskTitle} numberOfLines={2}>
              {task.title}
            </Text>
            <View style={styles.badgesContainer}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                <Text style={styles.statusText}>{task.status}</Text>
              </View>
              <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(task.urgency) }]}>
                <Text style={styles.urgencyText}>{task.urgency}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rewardContainer}>
            <Text style={styles.rewardAmount}>${task.reward}</Text>
            <Text style={styles.rewardLabel}>Reward</Text>
          </View>
        </View>

        <Text style={styles.taskDescription} numberOfLines={2}>
          {task.description}
        </Text>

        <View style={styles.taskDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{task.location}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>Posted: {formatDate(task.createdAt)}</Text>
          </View>

          {task.acceptedBy && (
            <View style={styles.detailRow}>
              <Ionicons name="person-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>Accepted by: {task.acceptedBy}</Text>
              {task.takerRating && (
                <Text style={styles.ratingText}>⭐ {task.takerRating}</Text>
              )}
            </View>
          )}
        </View>

        <Chip style={styles.categoryChip} textStyle={styles.categoryText}>
          {task.category}
        </Chip>
      </Card.Content>
      
      {task.status === 'Active' && !task.acceptedBy && (
        <Card.Actions style={styles.cardActions}>
          <Button
            mode="outlined"
            onPress={() => handleCancelTask(task)}
            style={styles.cancelButton}
            labelStyle={styles.cancelButtonLabel}
          >
            Cancel Task
          </Button>
        </Card.Actions>
      )}
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name || 'Lazy User'}!</Text>
            <Text style={styles.subtitle}>Manage your posted tasks</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <Card.Content style={styles.statContent}>
              <Ionicons name="add-circle" size={24} color={colors.surface} />
              <Text style={styles.statNumber}>{stats.totalPosted}</Text>
              <Text style={styles.statLabel}>Total Posted</Text>
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

        {/* Tasks Section */}
        <View style={styles.tasksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Your Tasks ({tasks.length})
            </Text>
          </View>

          {tasks.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Ionicons name="add-circle-outline" size={60} color={colors.textSecondary} />
                <Text style={styles.emptyTitle}>No tasks posted yet</Text>
                <Text style={styles.emptySubtitle}>
                  Start by posting your first task and let others help you!
                </Text>
                <Button
                  mode="contained"
                  onPress={handlePostNewTask}
                  style={styles.postFirstButton}
                >
                  Post Your First Task
                </Button>
              </Card.Content>
            </Card>
          ) : (
            <View style={styles.tasksContainer}>
              {tasks.map(renderTaskCard)}
            </View>
          )}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handlePostNewTask}
        label="Post New Task"
      />
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.surface,
    opacity: 0.9,
  },
  profileButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    ...shadows.small,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.surface,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: colors.surface,
    opacity: 0.9,
    marginTop: 2,
  },
  tasksSection: {
    marginBottom: 100,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  tasksContainer: {
    gap: 15,
  },
  taskCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  taskTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  urgencyText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
  },
  rewardContainer: {
    alignItems: 'center',
  },
  rewardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
  },
  rewardLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  taskDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  taskDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  ratingText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '500',
  },
  categoryChip: {
    backgroundColor: colors.primary + '20',
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  cardActions: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cancelButton: {
    borderColor: colors.error,
  },
  cancelButtonLabel: {
    color: colors.error,
  },
  emptyCard: {
    marginTop: 20,
    ...shadows.small,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 15,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  postFirstButton: {
    backgroundColor: colors.accent,
    borderRadius: 25,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.accent,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default GiverHomeScreen; 