// ============================================
// PPPP CHAT SYSTEM
// firebase.js
// Final Version
// ============================================

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
    getFirestore,
    collection,
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
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import { firebaseConfig } from "./config.js";

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Firestore

const db = getFirestore(app);

// Authentication

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();

const facebookProvider = new FacebookAuthProvider();

// Export

export {

    app,

    db,

    auth,

    googleProvider,

    githubProvider,

    facebookProvider,

    collection,

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

    onSnapshot,

    serverTimestamp,

    signInWithPopup,

    signInWithEmailAndPassword,

    createUserWithEmailAndPassword,

    signOut,

    onAuthStateChanged

};