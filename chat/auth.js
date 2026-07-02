// ======================================
// PPPP CHAT AUTH
// Version 1.0
// ======================================

import {
    db,
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "./firebase.js";

import { getVisitorId } from "./utils.js";

export async function initVisitor() {

    const visitorId = getVisitorId();

    const ref = doc(db, "users", visitorId);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        await setDoc(ref, {

            visitorId: visitorId,

            name: "Guest",

            email: "",

            photo: "",

            provider: "guest",

            online: true,

            lastSeen: serverTimestamp(),

            createdAt: serverTimestamp()

        });

    } else {

        await setDoc(ref, {

            online: true,

            lastSeen: serverTimestamp()

        }, { merge: true });

    }

    return visitorId;

}

export async function setOffline(visitorId) {

    const ref = doc(db, "users", visitorId);

    await setDoc(ref, {

        online: false,

        lastSeen: serverTimestamp()

    }, { merge: true });

}

window.addEventListener("beforeunload", async () => {

    const id = getVisitorId();

    await setOffline(id);

});
