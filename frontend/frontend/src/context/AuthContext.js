import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]); // Track what roles user can have

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('lazydo_token');
      const storedUser = await AsyncStorage.getItem('lazydo_user');
      const storedRole = await AsyncStorage.getItem('lazydo_current_role');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Set available roles based on user registration
        const userData = JSON.parse(storedUser);
        if (userData.roles && userData.roles.length > 0) {
          setAvailableRoles(userData.roles);
          // Use stored role or default to first available role
          setUserRole(storedRole || userData.roles[0]);
        } else {
          // Legacy support - single role
          setAvailableRoles([userData.role]);
          setUserRole(storedRole || userData.role);
        }
        
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      // Mock login for now - in real app, this would come from API
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: email,
        roles: ['TAKER', 'GIVER'], // User can act as both
        primaryRole: 'TAKER'
      };
      const mockToken = 'mock-jwt-token';
      
      await AsyncStorage.setItem('lazydo_token', mockToken);
      await AsyncStorage.setItem('lazydo_user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('lazydo_current_role', mockUser.primaryRole);
      
      setToken(mockToken);
      setUser(mockUser);
      setUserRole(mockUser.primaryRole);
      setAvailableRoles(mockUser.roles);
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      // In real app, user could select multiple roles during registration
      const mockUser = {
        id: 1,
        name: userData.name,
        email: userData.email,
        roles: [userData.role], // Start with selected role
        primaryRole: userData.role
      };
      const mockToken = 'mock-jwt-token';
      
      await AsyncStorage.setItem('lazydo_token', mockToken);
      await AsyncStorage.setItem('lazydo_user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('lazydo_current_role', mockUser.primaryRole);
      
      setToken(mockToken);
      setUser(mockUser);
      setUserRole(mockUser.primaryRole);
      setAvailableRoles(mockUser.roles);
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('lazydo_token');
      await AsyncStorage.removeItem('lazydo_user');
      await AsyncStorage.removeItem('lazydo_current_role');
      
      setToken(null);
      setUser(null);
      setUserRole(null);
      setAvailableRoles([]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Switch between available roles
  const switchRole = async (newRole) => {
    if (availableRoles.includes(newRole)) {
      setUserRole(newRole);
      await AsyncStorage.setItem('lazydo_current_role', newRole);
    }
  };

  // Add a new role to user's available roles
  const addRole = async (newRole) => {
    if (!availableRoles.includes(newRole)) {
      const updatedRoles = [...availableRoles, newRole];
      setAvailableRoles(updatedRoles);
      
      // Update stored user data
      const updatedUser = { ...user, roles: updatedRoles };
      await AsyncStorage.setItem('lazydo_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    token,
    loading,
    userRole,
    availableRoles,
    login,
    register,
    logout,
    switchRole,
    addRole,
    isAuthenticated: !!token,
    canActAsGiver: availableRoles.includes('GIVER'),
    canActAsTaker: availableRoles.includes('TAKER'),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 