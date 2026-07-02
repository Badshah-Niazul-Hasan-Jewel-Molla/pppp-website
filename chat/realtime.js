// ============================================
// PPPP CHAT SYSTEM
// realtime.js
// Version 4.0
// ============================================

import {
    db,
    doc,
    collection,
    query,
    where,
    orderBy,
    onSnapshot
} from "./firebase.js";

// ============================================
// Listener References
// ============================================

let conversationListener = null;
let messageListener = null;
let typingListener = null;

// ============================================
// Conversation Listener
// ============================================

export function listenConversation(conversationId, callback) {

    stopConversationListener();

    conversationListener = onSnapshot(

        doc(db, "conversations", conversationId),

        (snapshot) => {

            if (!snapshot.exists()) return;

            callback(snapshot.data());

        },

        (error) => {

            console.error("Conversation Listener:", error);

        }

    );

}

// ============================================
// Message Listener
// ============================================

export function listenMessages(conversationId, callback) {

    stopMessageListener();

    const q = query(

        collection(db, "messages"),

        where("conversationId", "==", conversationId),

        orderBy("createdAt")

    );

    messageListener = onSnapshot(

        q,

        (snapshot) => {

            const messages = [];

            snapshot.forEach((doc) => {

                messages.push({

                    id: doc.id,

                    ...doc.data()

                });

            });

            callback(messages);

        },

        (error) => {

            console.error("Message Listener:", error);

        }

    );

}

// ============================================
// Typing Listener
// ============================================

export function listenTyping(conversationId, callback) {

    stopTypingListener();

    typingListener = onSnapshot(

        doc(db, "conversations", conversationId),

        (snapshot) => {

            if (!snapshot.exists()) return;

            callback({

                visitorTyping: snapshot.data().visitorTyping || false,

                adminTyping: snapshot.data().adminTyping || false

            });

        }

    );

}

// ============================================
// Presence Listener
// ============================================

export function listenPresence(conversationId, callback) {

    return onSnapshot(

        doc(db, "conversations", conversationId),

        (snapshot) => {

            if (!snapshot.exists()) return;

            callback({

                status: snapshot.data().status || "offline",

                updatedAt: snapshot.data().updatedAt || null

            });

        }

    );

}

// ============================================
// Stop Conversation Listener
// ============================================

export function stopConversationListener() {

    if (conversationListener) {

        conversationListener();

        conversationListener = null;

    }

}

// ============================================
// Stop Message Listener
// ============================================

export function stopMessageListener() {

    if (messageListener) {

        messageListener();

        messageListener = null;

    }

}

// ============================================
// Stop Typing Listener
// ============================================

export function stopTypingListener() {

    if (typingListener) {

        typingListener();

        typingListener = null;

    }

}

// ============================================
// Stop All
// ============================================

export function stopAllRealtimeListeners() {

    stopConversationListener();

    stopMessageListener();

    stopTypingListener();

}

// ============================================
// Ready
// ============================================

console.log("PPPP Realtime Ready");
