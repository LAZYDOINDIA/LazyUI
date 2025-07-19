# 🦥 LazyDo - Task Sharing App

A React Native mobile application that connects people who need help with tasks (Givers) and those willing to help for a reward (Takers).

## 🎯 **Features**

### **Dual Role System**
- ✅ **Giver Mode** - Post tasks and manage them
- ✅ **Taker Mode** - Browse and accept available tasks
- ✅ **Role Switching** - Switch between roles seamlessly
- ✅ **Multiple Roles** - Add both roles to your account

### **Task Management**
- ✅ **Post Tasks** - Create tasks with images, descriptions, and rewards
- ✅ **Browse Tasks** - Search and filter available tasks
- ✅ **Accept Tasks** - Accept tasks and start working
- ✅ **Task Status** - Track Active, Completed, and Cancelled tasks
- ✅ **Real-time Updates** - Tasks appear at the top when posted

### **User Experience**
- ✅ **Animated Welcome** - Yawning character animation
- ✅ **Smooth Onboarding** - 3-step introduction process
- ✅ **Modern UI** - Clean, intuitive interface
- ✅ **Image Upload** - Multiple images with compression
- ✅ **Search & Filters** - Find tasks by category, urgency, location

### **Testing Ready**
- ✅ **Mock Data** - 12 available tasks, 8 posted tasks
- ✅ **Realistic Content** - Various categories and rewards
- ✅ **Complete Flow** - Test all features immediately

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd lazydo-project/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on device/simulator**
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app

## 📱 **App Structure**

```
src/
├── components/          # Reusable components
├── context/            # React Context (Auth)
├── screens/            # App screens
│   ├── auth/          # Authentication screens
│   ├── giver/         # Giver-specific screens
│   ├── taker/         # Taker-specific screens
│   └── shared/        # Shared screens
├── styles/            # Theme and styling
├── api/               # API configuration
└── utils/             # Utility functions
```

## 🎮 **Testing Guide**

### **1. Welcome Experience**
- Launch app → See animated yawning character
- Complete onboarding → Learn about the app
- Register/Login → Create account

### **2. Taker Mode Testing**
- Switch to Taker role
- Browse 12 available tasks
- Use search: "groceries", "cleaning", "hospital"
- Apply filters: Category, Urgency
- Accept tasks → See confirmation

### **3. Giver Mode Testing**
- Switch to Giver role
- View statistics dashboard
- Browse 8 posted tasks
- Post new task with images
- Cancel unaccepted tasks

### **4. Dual Role Testing**
- Add both roles to account
- Switch between roles
- See different data for each role

## 📊 **Mock Data**

### **Available Tasks (12)**
- 🛒 **Shopping**: Groceries ($25), Dry cleaning ($12), Birthday cake ($20)
- 🔧 **Home Repair**: Faucet fix ($75), Light fixture ($65), Squeaky door ($25)
- 📦 **Delivery**: Package ($18), Flowers to hospital ($30)
- 🧹 **Cleaning**: Kitchen deep clean ($45), Garage organize ($80)
- 🪑 **Other**: IKEA assembly ($55), Furniture moving ($40)

### **Posted Tasks (8)**
- ✅ **Active**: 4 tasks (some accepted, some available)
- ✅ **Completed**: 3 tasks with taker ratings
- ✅ **Cancelled**: 1 task
- 📊 **Statistics**: Total spent $183, 8 total posted

## 🔧 **Technical Stack**

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **UI Components**: React Native Paper
- **State Management**: React Context API
- **Styling**: StyleSheet + LinearGradient
- **Image Handling**: Expo Image Picker + Image Manipulator
- **Storage**: AsyncStorage for local data

## 📋 **API Integration**

The app is ready for backend integration with **28 comprehensive API endpoints**:

- **Authentication**: Register, Login, Role management
- **Task Management**: Create, Read, Update, Delete tasks
- **User Management**: Profile, Statistics, Ratings
- **Communication**: Messaging, Notifications
- **File Upload**: Image upload with compression
- **Search & Discovery**: Advanced search and filtering

See `API_ENDPOINTS.md` for complete API documentation.

## 🎨 **UI/UX Features**

### **Design System**
- **Colors**: Primary, Secondary, Accent, Error themes
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized margins and padding
- **Shadows**: Subtle elevation effects

### **Animations**
- **Welcome Character**: Yawning animation every 1.5s
- **Fade Transitions**: Smooth screen transitions
- **Loading States**: Progress indicators
- **Interactive Feedback**: Button press effects

### **Responsive Design**
- **Adaptive Layout**: Works on different screen sizes
- **Keyboard Handling**: Proper keyboard avoidance
- **Touch Targets**: Adequate button sizes
- **Accessibility**: Screen reader support

## 🔒 **Security Features**

- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Client-side form validation
- **Image Compression**: Optimized file uploads
- **Error Handling**: Graceful error management

## 📱 **Platform Support**

- **iOS**: Full support with native components
- **Android**: Full support with Material Design
- **Web**: Compatible with Expo Web (future)

## 🚀 **Deployment**

### **Development**
```bash
npm start
```

### **Production Build**
```bash
expo build:android
expo build:ios
```

### **Publishing**
```bash
expo publish
```

## 📚 **Documentation**

- **API_ENDPOINTS.md** - Complete API documentation
- **TESTING_DATA.md** - Testing guide and mock data
- **ASSETS_SETUP.md** - Image assets setup guide

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🆘 **Support**

For support and questions:
- Check the documentation files
- Review the API endpoints
- Test with the provided mock data

---

**LazyDo** - Making task sharing lazy and efficient! 🦥✨ 