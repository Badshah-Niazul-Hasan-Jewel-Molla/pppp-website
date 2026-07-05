// ============================================
// PPPP CHAT SYSTEM
// auth.js
// Version 4.0.0 Final Stable
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
    signInAnonymously,

    googleProvider,
    facebookProvider,
    githubProvider

} from "./firebase.js";

import { chatConfig } from "./config.js";

import {

    getVisitorId,
    log

} from "./utils.js";

// ============================================
// Current Visitor
// ============================================

let currentVisitor = null;

// ============================================
// Initialize Visitor
// ============================================

export async function initVisitor() {

    // Anonymous Login

    if (chatConfig.allowGuestChat) {

        try {

            const result = await signInAnonymously(auth);

            return result.user.uid;

        }

        catch (error) {

            log(error);

        }

    }

    // Local Guest

    const visitorId = getVisitorId();

    currentVisitor = {

        id: visitorId,

        name: "Guest",

        email: "",

        photo: "",

        provider: "guest"

    };

    await saveVisitor(currentVisitor);

    return visitorId;

}

// ============================================
// Save Visitor
// ============================================

async function saveVisitor(user) {

    const ref = doc(

        db,

        chatConfig.usersCollection,

        user.id

    );

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

    }

    else {

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

    if (!chatConfig.allowGoogleLogin) return null;

    const result = await signInWithPopup(

        auth,

        googleProvider

    );

    return saveFirebaseUser(

        result.user,

        "google"

    );

}

// ============================================
// Facebook Login
// ============================================

export async function loginFacebook() {

    if (!chatConfig.allowFacebookLogin) return null;

    const result = await signInWithPopup(

        auth,

        facebookProvider

    );

    return saveFirebaseUser(

        result.user,

        "facebook"

    );

}

// ============================================
// GitHub Login
// ============================================

export async function loginGithub() {

    if (!chatConfig.allowGithubLogin) return null;

    const result = await signInWithPopup(

        auth,

        githubProvider

    );

    return saveFirebaseUser(

        result.user,

        "github"

    );

}

// ============================================
// Save Firebase User
// ============================================

async function saveFirebaseUser(

    user,

    provider

) {

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
// Authentication State
// ============================================

onAuthStateChanged(

    auth,

    async (user) => {

        if (!user) return;

        await saveFirebaseUser(

            user,

            user.isAnonymous

                ? "guest"

                : "firebase"

        );

    }

);

// ============================================
// Offline
// ============================================

export async function setOffline() {

    if (!currentVisitor) return;

    try {

        await updateDoc(

            doc(

                db,

                chatConfig.usersCollection,

                currentVisitor.id

            ),

            {

                online: false,

                lastSeen: serverTimestamp()

            }

        );

    }

    catch (error) {

        log(error);

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

window.addEventListener(

    "beforeunload",

    () => {

        setOffline();

    }

);