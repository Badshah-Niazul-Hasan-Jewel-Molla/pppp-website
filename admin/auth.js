// ============================================
// PPPP CHAT SYSTEM
// admin/auth.js
// Version 4.0.0 Final Stable
// ============================================

import { chatConfig } from "../chat/config.js";

import {
    auth,
    db,
    doc,
    getDoc,
    signOut,
    onAuthStateChanged
} from "../chat/firebase.js";

// ============================================
// Current Admin
// ============================================

let currentAdmin = null;

// ============================================
// Check Admin Login
// ============================================

export function requireAdmin(callback) {

    onAuthStateChanged(auth, async (user) => {

        if (!user) {

            location.href = "login.html";

            return;

        }

        try {

            const adminRef = doc(

                db,

                chatConfig.adminsCollection,

                user.uid

            );

            const adminSnap = await getDoc(adminRef);

            if (!adminSnap.exists()) {

                alert("Access Denied");

                await signOut(auth);

                location.href = "login.html";

                return;

            }

            currentAdmin = {

                uid: user.uid,

                email: user.email,

                name: user.displayName || "Administrator",

                photo: user.photoURL || "",

                role: adminSnap.data().role || "admin"

            };

            callback(currentAdmin);

        }

        catch (error) {

            console.error(error);

            alert("Authentication Error");

            location.href = "login.html";

        }

    });

}

// ============================================
// Logout
// ============================================

export async function logoutAdmin() {

    try {

        await signOut(auth);

    }

    catch (e) {

        console.error(e);

    }

    location.href = "login.html";

}

// ============================================
// Current Admin
// ============================================

export function getCurrentAdmin() {

    return currentAdmin;

}

// ============================================
// Role Check
// ============================================

export function isSuperAdmin() {

    if (!currentAdmin) return false;

    return currentAdmin.role === "superadmin";

}

export function isAdmin() {

    return currentAdmin !== null;

}

// ============================================
// Ready
// ============================================

console.log("PPPP Admin Auth Ready");