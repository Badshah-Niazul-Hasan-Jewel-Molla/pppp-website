// PPPP Chat Firebase
// Version 1.0

import { firebaseConfig } from "./config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
    getFirestore,
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

export {
    app,
    db,
    auth,
    storage,
    analytics,
    googleProvider,

    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,

    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    onAuthStateChanged
};
