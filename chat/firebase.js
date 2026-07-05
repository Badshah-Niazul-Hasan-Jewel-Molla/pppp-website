// ============================================
// PPPP CHAT SYSTEM
// firebase.js
// Version 4.0.1 Final Stable
// ============================================

// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

// Firestore
import {
    getFirestore,
    collection,
    collectionGroup,
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    onSnapshot,
    serverTimestamp,
    Timestamp
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Authentication
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInAnonymously,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Storage
import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

import { firebaseConfig } from "./config.js";

// ============================================
// Initialize Firebase
// ============================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

// ============================================
// Providers
// ============================================

const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();

const githubProvider = new GithubAuthProvider();

// ============================================
// Export
// ============================================

export {

    app,
    db,
    auth,
    storage,

    googleProvider,
    facebookProvider,
    githubProvider,

    // Firestore
    collection,
    collectionGroup,
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    onSnapshot,
    serverTimestamp,
    Timestamp,

    // Authentication
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInAnonymously,
    signOut,
    onAuthStateChanged,

    // Storage
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject

};