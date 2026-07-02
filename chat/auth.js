// ============================================
// PPPP CHAT SYSTEM
// auth.js
// Final Version
// ============================================

import {
    db,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
} from "./firebase.js";

import { getVisitorId } from "./utils.js";

let visitorId = "";

// ===============================
// Initialize Visitor
// ===============================

export async function initVisitor() {

    visitorId = getVisitorId();

    const userRef = doc(db, "users", visitorId);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {

        await setDoc(userRef, {

            visitorId,

            name: "Guest",

            email: "",

            photo: "",

            provider: "guest",

            online: true,

            lastSeen: serverTimestamp(),

            createdAt: serverTimestamp()

        });

    } else {

        await updateDoc(userRef, {

            online: true,

            lastSeen: serverTimestamp()

        });

    }

    return visitorId;

}

// ===============================
// Online
// ===============================

export async function setOnline() {

    if (!visitorId) return;

    await updateDoc(

        doc(db, "users", visitorId),

        {

            online: true,

            lastSeen: serverTimestamp()

        }

    );

}

// ===============================
// Offline
// ===============================

export async function setOffline() {

    if (!visitorId) return;

    await updateDoc(

        doc(db, "users", visitorId),

        {

            online: false,

            lastSeen: serverTimestamp()

        }

    );

}

// ===============================
// Window Events
// ===============================

window.addEventListener("focus", () => {

    setOnline();

});

window.addEventListener("blur", () => {

    setOffline();

});

window.addEventListener("beforeunload", () => {

    setOffline();

});