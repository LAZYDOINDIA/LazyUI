# 🦥 LazyDo Character Images Setup Guide

## 📸 **Image Requirements**

To use your actual character images instead of the animated component, follow these steps:

### **1. Image Specifications:**
- **Format**: PNG (recommended) or JPG
- **Size**: 240x240px minimum (120x120px display size)
- **Background**: Transparent or white
- **Style**: Should match your LazyDo branding

### **2. Required Images:**
You need **2 images** of your LazyDo character:

1. **`lazydo-relaxed.png`** - Character in relaxed state
   - Eyes: Open or slightly closed
   - Mouth: Small smile or neutral
   - Pose: Comfortable, relaxed

2. **`lazydo-yawning.png`** - Character in yawning state
   - Eyes: Closed or squinting
   - Mouth: Wide open (yawning)
   - Pose: Same as relaxed but with yawning expression

### **3. File Placement:**
Place your images in the `assets` folder:
```
lazydo-project/frontend/assets/
├── lazydo-relaxed.png
├── lazydo-yawning.png
└── ... (other assets)
```

### **4. Update the Code:**
To use your actual images, update the `OnboardingScreen.js`:

```javascript
// Replace the AnimatedCharacter component with:
const renderAnimatedCharacter = () => {
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
};
```

### **5. Animation Timing:**
The animation currently runs every **1.5 seconds**:
- **Relaxed state**: 1.5 seconds
- **Yawning state**: 1.5 seconds
- **Transition**: 200ms fade

You can adjust the timing in the `useEffect` hook:
```javascript
const yawningInterval = setInterval(() => {
  // Animation logic
}, 1500); // Change this value to adjust timing
```

### **6. Alternative: Use Image URLs**
If you prefer to host images online:

```javascript
const renderAnimatedCharacter = () => {
  const relaxedImage = { uri: 'https://your-domain.com/lazydo-relaxed.png' };
  const yawningImage = { uri: 'https://your-domain.com/lazydo-yawning.png' };
  
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
};
```

## 🎨 **Design Tips:**

### **Character Design:**
- Keep the character **simple and recognizable**
- Use **consistent colors** with your app theme
- Ensure the **yawning expression** is clear and cute
- Make sure both images have the **same pose/position**

### **Animation Effect:**
- The **fade transition** creates a smooth blinking/yawning effect
- The **1.5-second interval** mimics natural yawning frequency
- The **glow effect** adds visual appeal

### **Performance:**
- **Optimize images** for mobile (compress if needed)
- **Use PNG** for transparency support
- **Keep file sizes** under 100KB each

## 🚀 **Current Implementation:**

The app currently uses a **programmatically created character** that:
- ✅ Animates between relaxed and yawning states
- ✅ Has smooth fade transitions
- ✅ Matches the LazyDo branding
- ✅ Works without external image files

## 📱 **Testing:**

1. Run the app: `npm start`
2. Navigate to the welcome/onboarding screen
3. Watch the character animate every 1.5 seconds
4. The animation should be smooth and engaging

## 🔧 **Customization Options:**

### **Change Animation Speed:**
```javascript
// Faster animation (1 second)
}, 1000);

// Slower animation (2 seconds)
}, 2000);
```

### **Change Transition Duration:**
```javascript
// Faster transition (100ms)
duration: 100,

// Slower transition (500ms)
duration: 500,
```

### **Add More Animation States:**
You can extend this to have more character states by adding more images and states.

---

**Note**: The current animated component provides a great fallback and works immediately without needing external images. You can replace it with your actual character images whenever they're ready! 🦥✨ 