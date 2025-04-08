// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCeF4eUPyOigUuqvYSkaCYehJobfWK9okE",
  authDomain: "filoxenia-35136.firebaseapp.com",
  projectId: "filoxenia-35136",
  storageBucket: "filoxenia-35136.firebasestorage.app",
  messagingSenderId: "373641445474",
  appId: "1:373641445474:web:1e1d34509dd196f147513b",
  measurementId: "G-WV3XXPV8H2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);