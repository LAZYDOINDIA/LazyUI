import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { TextInput, Button, Chip, SegmentedButtons, ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'react-native-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useAuth } from '../../context/AuthContext';
import { taskAPI } from '../../api/axiosInstance';
import { colors, shadows } from '../../styles/theme';

const { width } = Dimensions.get('window');

const PostTaskScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Shopping',
    urgency: 'Medium',
    reward: '',
    timeLimit: '2 hours',
    location: '',
    includeLocation: false,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = ['Shopping', 'Home Repair', 'Delivery', 'Cleaning', 'Other'];
  const urgencyLevels = ['Low', 'Medium', 'High'];
  const timeLimits = ['1 hour', '2 hours', '4 hours', '1 day', 'Custom'];
  const maxImages = 5; // Maximum number of images allowed

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a task description');
      return false;
    }
    if (!formData.reward || parseFloat(formData.reward) <= 0) {
      Alert.alert('Error', 'Please enter a valid reward amount');
      return false;
    }
    if (formData.includeLocation && !formData.location.trim()) {
      Alert.alert('Error', 'Please enter a location');
      return false;
    }
    return true;
  };

  const compressImage = async (imageUri) => {
    try {
      const result = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 1024 } }], // Resize to max 1024px width
        {
          compress: 0.8, // 80% quality
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
      return result.uri;
    } catch (error) {
      console.error('Image compression failed:', error);
      return imageUri; // Return original if compression fails
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Gallery permission is required to select images');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        selectionLimit: maxImages - images.length,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newImages = [];
        for (const asset of result.assets) {
          const compressedUri = await compressImage(asset.uri);
          newImages.push({
            uri: compressedUri,
            id: Date.now() + Math.random(),
            name: `image_${Date.now()}.jpg`,
          });
        }
        setImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick images');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission is required to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const compressedUri = await compressImage(result.assets[0].uri);
        const newImage = {
          uri: compressedUri,
          id: Date.now() + Math.random(),
          name: `photo_${Date.now()}.jpg`,
        };
        setImages(prev => [...prev, newImage]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const showImagePicker = () => {
    if (images.length >= maxImages) {
      Alert.alert('Maximum Images', `You can only upload up to ${maxImages} images`);
      return;
    }

    Alert.alert(
      'Add Images',
      'Choose how you want to add images',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const uploadImages = async () => {
    const uploadedUrls = [];
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      
      // Simulate upload progress
      setUploadProgress((i + 1) / images.length);
      
      try {
        // In a real app, you would upload to your server/cloud storage
        // const formData = new FormData();
        // formData.append('image', {
        //   uri: image.uri,
        //   type: 'image/jpeg',
        //   name: image.name,
        // });
        // const response = await fetch('YOUR_UPLOAD_ENDPOINT', {
        //   method: 'POST',
        //   body: formData,
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
        // const result = await response.json();
        // uploadedUrls.push(result.imageUrl);
        
        // Mock upload for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        uploadedUrls.push(`https://example.com/images/${image.name}`);
      } catch (error) {
        console.error('Image upload failed:', error);
        throw new Error(`Failed to upload image ${i + 1}`);
      }
    }
    
    return uploadedUrls;
  };

  const handlePostTask = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setUploadProgress(0);
    
    try {
      // Upload images first
      let imageUrls = [];
      if (images.length > 0) {
        imageUrls = await uploadImages();
      }

      const taskData = {
        ...formData,
        reward: parseFloat(formData.reward),
        giverId: user.id,
        imageUrls: imageUrls,
        imageCount: images.length,
      };

      // In a real app, you would create the task with the API
      // const response = await taskAPI.createTask(taskData);
      
      // Mock success for demonstration - Create a new task object
      const newTask = {
        id: Date.now(), // Generate unique ID
        title: formData.title,
        description: formData.description,
        category: formData.category,
        urgency: formData.urgency,
        reward: parseFloat(formData.reward),
        timeLimit: formData.timeLimit,
        location: formData.location,
        status: 'Active',
        giverId: user.id,
        giverName: user.name || 'You',
        giverRating: 4.5,
        giverTasks: 1,
        createdAt: new Date().toISOString(),
        acceptedBy: null,
        acceptedAt: null,
        images: imageUrls,
        distance: '0.0 miles',
      };
      
      // Mock success for demonstration
      setTimeout(() => {
        Alert.alert(
          'Success! 🎉',
          `Your task "${formData.title}" has been posted successfully!${images.length > 0 ? `\n\n${images.length} image(s) uploaded.` : ''}\n\nIt will appear at the top of the available tasks list.`,
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }, 1000);

    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to post task. Please try again.');
    } finally {
      setLoading(false);
      setUploadProgress(0);
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.surface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post New Task</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Task Title */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Task Title *</Text>
            <TextInput
              label="What needs to be done?"
              value={formData.title}
              onChangeText={(value) => updateFormData('title', value)}
              mode="outlined"
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

          {/* Task Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description *</Text>
            <TextInput
              label="Provide detailed instructions"
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              mode="outlined"
              multiline
              numberOfLines={4}
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

          {/* Category Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      formData.category === category && styles.categoryChipActive,
                    ]}
                    onPress={() => updateFormData('category', category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        formData.category === category && styles.categoryTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Urgency Level */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Urgency Level</Text>
            <View style={styles.urgencyContainer}>
              {urgencyLevels.map((urgency) => (
                <TouchableOpacity
                  key={urgency}
                  style={[
                    styles.urgencyChip,
                    formData.urgency === urgency && {
                      backgroundColor: getUrgencyColor(urgency),
                    },
                  ]}
                  onPress={() => updateFormData('urgency', urgency)}
                >
                  <Text
                    style={[
                      styles.urgencyText,
                      formData.urgency === urgency && styles.urgencyTextActive,
                    ]}
                  >
                    {urgency}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Reward Amount */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reward Amount *</Text>
            <View style={styles.rewardContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                label="Amount"
                value={formData.reward}
                onChangeText={(value) => updateFormData('reward', value)}
                mode="outlined"
                keyboardType="numeric"
                style={[styles.input, styles.rewardInput]}
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
          </View>

          {/* Time Limit */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Time Limit</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.timeLimitContainer}>
                {timeLimits.map((timeLimit) => (
                  <TouchableOpacity
                    key={timeLimit}
                    style={[
                      styles.timeLimitChip,
                      formData.timeLimit === timeLimit && styles.timeLimitChipActive,
                    ]}
                    onPress={() => updateFormData('timeLimit', timeLimit)}
                  >
                    <Text
                      style={[
                        styles.timeLimitText,
                        formData.timeLimit === timeLimit && styles.timeLimitTextActive,
                      ]}
                    >
                      {timeLimit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <View style={styles.locationHeader}>
              <Text style={styles.sectionTitle}>Location</Text>
              <TouchableOpacity
                style={styles.locationToggle}
                onPress={() => updateFormData('includeLocation', !formData.includeLocation)}
              >
                <Ionicons
                  name={formData.includeLocation ? 'location' : 'location-outline'}
                  size={20}
                  color={formData.includeLocation ? colors.primary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.locationToggleText,
                    formData.includeLocation && styles.locationToggleTextActive,
                  ]}
                >
                  Include Location
                </Text>
              </TouchableOpacity>
            </View>
            {formData.includeLocation && (
              <TextInput
                label="Where should this task be done?"
                value={formData.location}
                onChangeText={(value) => updateFormData('location', value)}
                mode="outlined"
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
            )}
          </View>

          {/* Image Upload */}
          <View style={styles.section}>
            <View style={styles.imageHeader}>
              <Text style={styles.sectionTitle}>Add Images (Optional)</Text>
              <Text style={styles.imageCount}>
                {images.length}/{maxImages}
              </Text>
            </View>
            
            {images.length > 0 && (
              <View style={styles.imagesGrid}>
                {images.map((image, index) => (
                  <View key={image.id} style={styles.imageItem}>
                    <Image source={{ uri: image.uri }} style={styles.uploadedImage} />
                    <TouchableOpacity 
                      style={styles.removeImageButton} 
                      onPress={() => removeImage(image.id)}
                    >
                      <Ionicons name="close-circle" size={24} color={colors.error} />
                    </TouchableOpacity>
                    <View style={styles.imageNumber}>
                      <Text style={styles.imageNumberText}>{index + 1}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
            
            {images.length < maxImages && (
              <TouchableOpacity style={styles.imageUploadButton} onPress={showImagePicker}>
                <Ionicons name="camera-outline" size={40} color={colors.textSecondary} />
                <Text style={styles.imageUploadText}>
                  {images.length === 0 ? 'Add Photos' : 'Add More Photos'}
                </Text>
                <Text style={styles.imageUploadSubtext}>
                  Camera or Gallery • Up to {maxImages - images.length} more
                </Text>
              </TouchableOpacity>
            )}
            
            {images.length > 0 && (
              <View style={styles.imageInfo}>
                <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.imageInfoText}>
                  Images help takers understand your task better. Tap to remove any image.
                </Text>
              </View>
            )}
          </View>

          {/* Upload Progress */}
          {loading && uploadProgress > 0 && (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>Uploading images...</Text>
              <ProgressBar 
                progress={uploadProgress} 
                color={colors.primary}
                style={styles.progressBar}
              />
            </View>
          )}

          {/* Commission Info */}
          <View style={styles.commissionInfo}>
            <Ionicons name="information-circle-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.commissionText}>
              Platform commission: 10% of task reward will be deducted
            </Text>
          </View>

          {/* Post Button */}
          <Button
            mode="contained"
            onPress={handlePostTask}
            loading={loading}
            disabled={loading}
            style={styles.postButton}
            contentStyle={styles.postButtonContent}
            labelStyle={styles.postButtonLabel}
          >
            {loading ? 'Posting Task...' : 'Post Task'}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.surface,
    ...shadows.small,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: colors.surface,
  },
  urgencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urgencyChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.surface,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  urgencyText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  urgencyTextActive: {
    color: colors.surface,
    fontWeight: 'bold',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 10,
  },
  rewardInput: {
    flex: 1,
  },
  timeLimitContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  timeLimitChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  timeLimitChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeLimitText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  timeLimitTextActive: {
    color: colors.surface,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationToggleText: {
    marginLeft: 5,
    color: colors.textSecondary,
    fontSize: 14,
  },
  locationToggleTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  imageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageCount: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  imageItem: {
    position: 'relative',
    width: (width - 60) / 3, // 3 images per row with gaps
    height: (width - 60) / 3,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    ...shadows.small,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  imageNumber: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageNumberText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageUploadButton: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: colors.surface,
    ...shadows.small,
  },
  imageUploadText: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  imageUploadSubtext: {
    marginTop: 5,
    color: colors.textSecondary,
    fontSize: 12,
  },
  imageInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    ...shadows.small,
  },
  imageInfoText: {
    marginLeft: 8,
    color: colors.textSecondary,
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  progressContainer: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    ...shadows.small,
  },
  progressText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  commissionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    ...shadows.small,
  },
  commissionText: {
    marginLeft: 10,
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1,
  },
  postButton: {
    backgroundColor: colors.accent,
    borderRadius: 25,
    marginBottom: 30,
    ...shadows.medium,
  },
  postButtonContent: {
    paddingVertical: 8,
  },
  postButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostTaskScreen; 