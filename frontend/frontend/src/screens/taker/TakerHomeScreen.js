import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import { Card, Button, Chip, Searchbar, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'react-native-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { taskAPI } from '../../api/axiosInstance';
import { colors, shadows } from '../../styles/theme';

const TakerHomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const categories = ['All', 'Shopping', 'Home Repair', 'Delivery', 'Cleaning', 'Other'];
  const urgencyLevels = ['All', 'Low', 'Medium', 'High'];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchQuery, selectedCategory, selectedUrgency]);

  const loadData = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch data from the API
      // const response = await taskAPI.getTasks();
      // setTasks(response.data);
      
      // Comprehensive mock data for testing
      const mockTasks = [
        {
          id: 1,
          title: 'Pick up groceries from Walmart',
          description: 'Need milk, bread, eggs, and some vegetables. Please check expiration dates and get organic if available.',
          category: 'Shopping',
          urgency: 'Medium',
          reward: 25,
          timeLimit: '2 hours',
          location: 'Walmart, Downtown Mall',
          giverName: 'Sarah M.',
          giverRating: 4.8,
          giverTasks: 12,
          createdAt: '2024-01-16T10:30:00Z',
          image: null,
          distance: '0.8 miles',
        },
        {
          id: 2,
          title: 'Fix leaky kitchen faucet',
          description: 'The kitchen faucet is dripping constantly. Need someone with basic plumbing skills to fix it. Tools provided.',
          category: 'Home Repair',
          urgency: 'High',
          reward: 75,
          timeLimit: '4 hours',
          location: '123 Main St, Apt 4B',
          giverName: 'Mike R.',
          giverRating: 4.5,
          giverTasks: 8,
          createdAt: '2024-01-16T09:20:00Z',
          image: null,
          distance: '1.2 miles',
        },
        {
          id: 3,
          title: 'Deliver package to post office',
          description: 'Small package needs to be dropped off at USPS. Package is ready to go with proper labeling.',
          category: 'Delivery',
          urgency: 'Low',
          reward: 18,
          timeLimit: '1 hour',
          location: 'USPS, 456 Main St',
          giverName: 'John D.',
          giverRating: 4.9,
          giverTasks: 25,
          createdAt: '2024-01-16T11:45:00Z',
          image: null,
          distance: '0.5 miles',
        },
        {
          id: 4,
          title: 'Deep clean apartment kitchen',
          description: 'Need thorough cleaning of kitchen including appliances, countertops, cabinets, and floors. Cleaning supplies provided.',
          category: 'Cleaning',
          urgency: 'Medium',
          reward: 45,
          timeLimit: '3 hours',
          location: '456 Oak Ave, Unit 7',
          giverName: 'Lisa K.',
          giverRating: 4.7,
          giverTasks: 15,
          createdAt: '2024-01-16T08:15:00Z',
          image: null,
          distance: '1.8 miles',
        },
        {
          id: 5,
          title: 'Assemble IKEA desk and chair',
          description: 'Need help assembling a desk and office chair from IKEA. All parts and instructions included. Basic tools needed.',
          category: 'Other',
          urgency: 'Low',
          reward: 55,
          timeLimit: '2 hours',
          location: '789 Pine St, Apt 12',
          giverName: 'David L.',
          giverRating: 4.6,
          giverTasks: 6,
          createdAt: '2024-01-16T12:00:00Z',
          image: null,
          distance: '2.1 miles',
        },
        {
          id: 6,
          title: 'Pick up dry cleaning',
          description: 'Need to pick up dry cleaning from CleanPro. Order number: CP-2024-001. Receipt provided.',
          category: 'Shopping',
          urgency: 'Medium',
          reward: 12,
          timeLimit: '1 hour',
          location: 'CleanPro, 321 Elm St',
          giverName: 'Emma W.',
          giverRating: 4.3,
          giverTasks: 3,
          createdAt: '2024-01-16T13:30:00Z',
          image: null,
          distance: '0.9 miles',
        },
        {
          id: 7,
          title: 'Install new light fixture',
          description: 'Need to replace old ceiling light with new LED fixture. Fixture provided, basic electrical knowledge required.',
          category: 'Home Repair',
          urgency: 'Medium',
          reward: 65,
          timeLimit: '2 hours',
          location: '567 Maple Dr, House 3',
          giverName: 'Alex T.',
          giverRating: 4.4,
          giverTasks: 9,
          createdAt: '2024-01-16T14:15:00Z',
          image: null,
          distance: '1.5 miles',
        },
        {
          id: 8,
          title: 'Deliver flowers to hospital',
          description: 'Need to deliver a bouquet of flowers to St. Mary\'s Hospital, Room 302. Flowers will be ready for pickup.',
          category: 'Delivery',
          urgency: 'High',
          reward: 30,
          timeLimit: '1 hour',
          location: 'St. Mary\'s Hospital, 890 Health Ave',
          giverName: 'Maria G.',
          giverRating: 4.8,
          giverTasks: 18,
          createdAt: '2024-01-16T15:00:00Z',
          image: null,
          distance: '1.7 miles',
        },
        {
          id: 9,
          title: 'Clean and organize garage',
          description: 'Garage needs cleaning and organizing. Items need to be sorted, swept, and organized. Will provide storage bins.',
          category: 'Cleaning',
          urgency: 'Low',
          reward: 80,
          timeLimit: '4 hours',
          location: '234 Cedar Ln, House 5',
          giverName: 'Tom H.',
          giverRating: 4.2,
          giverTasks: 7,
          createdAt: '2024-01-16T16:30:00Z',
          image: null,
          distance: '2.3 miles',
        },
        {
          id: 10,
          title: 'Help move furniture',
          description: 'Need help moving a couch and coffee table from living room to basement. Two people preferred.',
          category: 'Other',
          urgency: 'Medium',
          reward: 40,
          timeLimit: '1 hour',
          location: '678 Birch Rd, Apt 8',
          giverName: 'Rachel S.',
          giverRating: 4.7,
          giverTasks: 11,
          createdAt: '2024-01-16T17:00:00Z',
          image: null,
          distance: '1.0 miles',
        },
        {
          id: 11,
          title: 'Buy birthday cake and decorations',
          description: 'Need a birthday cake and some decorations for a 10-year-old\'s party. Budget around $50 for everything.',
          category: 'Shopping',
          urgency: 'High',
          reward: 20,
          timeLimit: '1 hour',
          location: 'Party City & Bakery, 432 Celebration Blvd',
          giverName: 'Jennifer L.',
          giverRating: 4.9,
          giverTasks: 22,
          createdAt: '2024-01-16T17:30:00Z',
          image: null,
          distance: '0.6 miles',
        },
        {
          id: 12,
          title: 'Fix squeaky door',
          description: 'Front door is making loud squeaking noise when opening/closing. Need someone to oil the hinges.',
          category: 'Home Repair',
          urgency: 'Low',
          reward: 25,
          timeLimit: '30 minutes',
          location: '345 Spruce St, Unit 15',
          giverName: 'Kevin M.',
          giverRating: 4.1,
          giverTasks: 4,
          createdAt: '2024-01-16T18:00:00Z',
          image: null,
          distance: '1.4 miles',
        },
      ];

      // Sort tasks by creation date (newest first)
      const sortedTasks = mockTasks.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTasks(sortedTasks);
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

  const filterTasks = () => {
    let filtered = tasks;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.giverName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Filter by urgency
    if (selectedUrgency !== 'All') {
      filtered = filtered.filter(task => task.urgency === selectedUrgency);
    }

    setFilteredTasks(filtered);
  };

  const handleAcceptTask = async (task) => {
    Alert.alert(
      'Accept Task',
      `Are you sure you want to accept "${task.title}" for $${task.reward}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              // In a real app, you would call the API
              // await taskAPI.acceptTask(task.id);
              
              Alert.alert(
                'Task Accepted! 🎉',
                `You have successfully accepted "${task.title}" for $${task.reward}!\n\nThe task giver will be notified and you can start working on it.`,
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // Remove the task from the list
                      setTasks(prev => prev.filter(t => t.id !== task.id));
                    },
                  },
                ]
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to accept task. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetail', { taskId: task.id });
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
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={12} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={12} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#FFD700" />
      );
    }

    return stars;
  };

  const renderTaskCard = (task) => (
    <Card key={task.id} style={styles.taskCard} onPress={() => handleTaskPress(task)}>
      <Card.Content>
        <View style={styles.taskHeader}>
          <View style={styles.taskTitleContainer}>
            <Text style={styles.taskTitle} numberOfLines={2}>
              {task.title}
            </Text>
            <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(task.urgency) }]}>
              <Text style={styles.urgencyText}>{task.urgency}</Text>
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
            <Text style={styles.distanceText}>{task.distance}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{task.timeLimit}</Text>
            <Text style={styles.timeAgoText}>{formatDate(task.createdAt)}</Text>
          </View>
        </View>

        <View style={styles.giverInfo}>
          <View style={styles.giverDetails}>
            <Text style={styles.giverName}>{task.giverName}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(task.giverRating)}
              <Text style={styles.ratingText}>{task.giverRating}</Text>
              <Text style={styles.tasksCount}>({task.giverTasks} tasks)</Text>
            </View>
          </View>
          <Chip style={styles.categoryChip} textStyle={styles.categoryText}>
            {task.category}
          </Chip>
        </View>
      </Card.Content>
      
      <Card.Actions style={styles.cardActions}>
        <Button
          mode="contained"
          onPress={() => handleAcceptTask(task)}
          style={styles.acceptButton}
          labelStyle={styles.acceptButtonLabel}
        >
          Accept for ${task.reward}
        </Button>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading available tasks...</Text>
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
            <Text style={styles.headerTitle}>Available Tasks</Text>
            <Text style={styles.headerSubtitle}>
              {filteredTasks.length} tasks available • Earn money helping others
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search tasks, locations, or users..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={colors.primary}
        />
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  selectedCategory === category && styles.filterChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedCategory === category && styles.filterTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {urgencyLevels.map((urgency) => (
              <TouchableOpacity
                key={urgency}
                style={[
                  styles.filterChip,
                  selectedUrgency === urgency && styles.filterChipActive,
                ]}
                onPress={() => setSelectedUrgency(urgency)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedUrgency === urgency && styles.filterTextActive,
                  ]}
                >
                  {urgency}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredTasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>No tasks found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        ) : (
          <View style={styles.tasksContainer}>
            {filteredTasks.map(renderTaskCard)}
          </View>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('PostTask')}
        label="Post Task"
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.surface,
    opacity: 0.9,
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    backgroundColor: colors.surface,
    elevation: 2,
    borderRadius: 12,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: colors.surface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tasksContainer: {
    paddingBottom: 20,
  },
  taskCard: {
    marginBottom: 15,
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
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
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
  distanceText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  timeAgoText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  giverInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  giverDetails: {
    flex: 1,
  },
  giverName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  tasksCount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  categoryChip: {
    backgroundColor: colors.primary + '20',
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
  acceptButton: {
    backgroundColor: colors.accent,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  acceptButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
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

export default TakerHomeScreen; 