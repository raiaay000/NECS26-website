import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, type User } from 'firebase/auth';

// Firebase configuration
// Users should replace these with their own Firebase project credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Check if Firebase is properly configured
const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY && 
                              import.meta.env.VITE_FIREBASE_API_KEY !== "demo-api-key";

// Initialize Firebase - check if already initialized to prevent duplicate app error
let app;
let auth;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase initialization failed. Using mock authentication.');
  auth = null;
}

export { auth };

// Mock user storage for demo purposes
const mockUsers = new Map<string, { email: string; password: string; displayName: string }>();

// Auth functions with fallback to mock authentication
export const loginWithEmail = async (email: string, password: string) => {
  // Use mock auth if Firebase not configured
  if (!isFirebaseConfigured || !auth) {
    const user = mockUsers.get(email);
    if (user && user.password === password) {
      return { 
        success: true, 
        user: { 
          email, 
          displayName: user.displayName,
          uid: 'mock-' + email 
        } as any 
      };
    }
    return { success: false, error: 'Invalid email or password' };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

export const signupWithEmail = async (email: string, password: string, displayName: string) => {
  // Use mock auth if Firebase not configured
  if (!isFirebaseConfigured || !auth) {
    if (mockUsers.has(email)) {
      return { success: false, error: 'Email already in use' };
    }
    mockUsers.set(email, { email, password, displayName });
    return { 
      success: true, 
      user: { 
        email, 
        displayName,
        uid: 'mock-' + email 
      } as any 
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  if (!isFirebaseConfigured || !auth) {
    // Mock logout - just clear local storage
    localStorage.removeItem('mockAuthUser');
    return { success: true };
  }

  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  if (!isFirebaseConfigured || !auth) {
    // Mock auth state - check localStorage
    const mockUser = localStorage.getItem('mockAuthUser');
    if (mockUser) {
      setTimeout(() => callback(JSON.parse(mockUser)), 0);
    } else {
      setTimeout(() => callback(null), 0);
    }
    return () => {}; // Return empty unsubscribe function
  }

  return onAuthStateChanged(auth, callback);
};