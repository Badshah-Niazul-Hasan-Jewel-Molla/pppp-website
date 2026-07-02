// ============================================
// PPPP CHAT SYSTEM
// auth.js
// Version 4.0
// ============================================

import {
    auth,
    db,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    onAuthStateChanged,
    signInWithPopup,
    googleProvider,
    facebookProvider,
    githubProvider
} from "./firebase.js";

import { getVisitorId } from "./utils.js";

// ============================================
// Current User
// ============================================

let currentVisitor = null;

// ============================================
// Initialize Visitor
// ============================================

export async function initVisitor() {

    const visitorId = getVisitorId();

    currentVisitor = {

        id: visitorId,

        name: "Guest",

        photo: "",

        email: "",

        provider: "guest"

    };

    await saveVisitor(currentVisitor);

    return visitorId;

}

// ============================================
// Save Visitor
// ============================================

async function saveVisitor(user) {

    const ref = doc(db, "users", user.id);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        await setDoc(ref, {

            id: user.id,

            name: user.name,

            email: user.email,

            photo: user.photo,

            provider: user.provider,

            online: true,

            createdAt: serverTimestamp(),

            lastSeen: serverTimestamp()

        });

    } else {

        await updateDoc(ref, {

            online: true,

            lastSeen: serverTimestamp()

        });

    }

}

// ============================================
// Google Login
// ============================================

export async function loginGoogle() {

    const result = await signInWithPopup(

        auth,

        googleProvider

    );

    return await saveFirebaseUser(result.user, "google");

}

// ============================================
// Facebook Login
// ============================================

export async function loginFacebook() {

    const result = await signInWithPopup(

        auth,

        facebookProvider

    );

    return await saveFirebaseUser(result.user, "facebook");

}

// ============================================
// GitHub Login
// ============================================

export async function loginGithub() {

    const result = await signInWithPopup(

        auth,

        githubProvider

    );

    return await saveFirebaseUser(result.user, "github");

}

// ============================================
// Save Firebase User
// ============================================

async function saveFirebaseUser(user, provider) {

    currentVisitor = {

        id: user.uid,

        name: user.displayName || "Visitor",

        email: user.email || "",

        photo: user.photoURL || "",

        provider

    };

    await saveVisitor(currentVisitor);

    return currentVisitor.id;

}

// ============================================
// Auth State
// ============================================

onAuthStateChanged(auth, async(user) => {

    if (!user) return;

    await saveFirebaseUser(user, "firebase");

});

// ============================================
// Set Offline
// ============================================

export async function setOffline() {

    if (!currentVisitor) return;

    try {

        await updateDoc(

            doc(db, "users", currentVisitor.id),

            {

                online: false,

                lastSeen: serverTimestamp()

            }

        );

    }

    catch (error) {

        console.error(error);

    }

}

// ============================================
// Current Visitor
// ============================================

export function getCurrentVisitor() {

    return currentVisitor;

}

// ============================================
// Auto Offline
// ============================================

window.addEventListener("beforeunload", () => {

    setOffline();

});