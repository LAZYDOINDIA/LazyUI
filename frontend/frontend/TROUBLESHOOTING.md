# LazyDo Frontend Troubleshooting Guide

## Current Issues Fixed

### 1. "main" has not been registered Error
**Problem**: Metro bundler couldn't find the main component registration.
**Solution**: Created `index.js` file that properly registers the App component using Expo's `registerRootComponent`.

### 2. Android Permissions Error
**Problem**: `java.lang.SecurityException: Permission Denial: registerScreenCaptureObserver requires android.permission.DETECT_SCREEN_CAPTURE`
**Solution**: Added comprehensive Android permissions to `app.json`.

## Setup Instructions

### Prerequisites
1. Node.js (v16 or higher)
2. npm or yarn
3. Expo CLI: `npm install -g @expo/cli`
4. Android Studio (for Android development)
5. Xcode (for iOS development, macOS only)

### Installation Steps

1. **Navigate to the frontend directory**:
   ```bash
   cd C:\lazydo-project\frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Clear any existing cache**:
   ```bash
   npm run clear
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

### Alternative Commands

- **Clear cache and reset**: `npm run reset`
- **Android specific**: `npm run android`
- **iOS specific**: `npm run ios`
- **Web version**: `npm run web`

## Common Issues and Solutions

### 1. Metro Bundler Issues
**Symptoms**: "main" has not been registered, bundler errors
**Solutions**:
- Clear cache: `npm run clear`
- Reset cache: `npm run reset`
- Kill all Node processes and restart
- Check if Metro is running on the correct port

### 2. Android Permission Issues
**Symptoms**: SecurityException, permission denials
**Solutions**:
- Permissions are now configured in `app.json`
- For development, use Expo Go app
- For production builds, ensure all permissions are properly configured

### 3. Dependencies Issues
**Symptoms**: Module not found, import errors
**Solutions**:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check for version conflicts in `package.json`

### 4. Network Issues
**Symptoms**: API calls failing, connection errors
**Solutions**:
- Check if backend server is running on `http://localhost:8080`
- Update `baseURL` in `src/api/axiosInstance.js` if needed
- Ensure device/emulator can reach the backend URL

### 5. Expo Go Issues
**Symptoms**: App not loading in Expo Go
**Solutions**:
- Ensure Expo Go app is up to date
- Check if QR code is scanned correctly
- Try switching between Tunnel, LAN, and Local connection modes

## Development Workflow

### 1. Starting Development
```bash
cd C:\lazydo-project\frontend
npm install
npm start
```

### 2. Making Changes
- Edit files in `src/` directory
- Changes will auto-reload in Expo Go
- Use `npm run clear` if changes don't appear

### 3. Testing on Different Platforms
- **Android**: Use Android Studio emulator or physical device with Expo Go
- **iOS**: Use Xcode simulator or physical device with Expo Go (macOS only)
- **Web**: Use `npm run web` for web browser testing

## File Structure

```
frontend/
├── index.js              # Main entry point (FIXED)
├── App.js                # Root component
├── app.json              # Expo configuration (PERMISSIONS ADDED)
├── package.json          # Dependencies (UPDATED)
├── src/
│   ├── api/
│   │   └── axiosInstance.js
│   ├── components/
│   ├── context/
│   │   └── AuthContext.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── LoadingScreen.js
│   │   └── TestScreen.js
│   └── styles/
│       └── theme.js
└── assets/
```

## Backend Integration

The frontend is configured to connect to a backend server at `http://localhost:8080/api`. 

**To change the backend URL**:
1. Edit `src/api/axiosInstance.js`
2. Update the `baseURL` property
3. Restart the development server

## Testing

The app currently uses mock data for authentication and API calls. To test with real backend:

1. Ensure backend server is running
2. Update API endpoints in `src/api/axiosInstance.js`
3. Replace mock implementations in `AuthContext.js`

## Production Build

For production builds:
1. Configure proper backend URLs
2. Update app configuration in `app.json`
3. Use `expo build` or `eas build` commands

## Support

If you encounter issues not covered here:
1. Check Expo documentation: https://docs.expo.dev/
2. Check React Navigation documentation: https://reactnavigation.org/
3. Check React Native Paper documentation: https://callstack.github.io/react-native-paper/ 