// ============================================
// PPPP CHAT SYSTEM
// realtime.js
// Version 4.0.0 Final Stable
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

import { chatConfig } from "./config.js";

import { log } from "./utils.js";

// ============================================
// Listener References
// ============================================

let conversationListener = null;

let messageListener = null;

let typingListener = null;

let presenceListener = null;

// ============================================
// Conversation Listener
// ============================================

export function listenConversation(

    conversationId,

    callback

) {

    stopConversationListener();

    conversationListener = onSnapshot(

        doc(

            db,

            chatConfig.conversationsCollection,

            conversationId

        ),

        snapshot => {

            if (!snapshot.exists()) return;

            callback(snapshot.data());

        },

        error => log(error)

    );

}

// ============================================
// Message Listener
// ============================================

export function listenMessages(

    conversationId,

    callback

) {

    stopMessageListener();

    const q = query(

        collection(

            db,

            chatConfig.messagesCollection

        ),

        where(

            "conversationId",

            "==",

            conversationId

        ),

        orderBy("createdAt")

    );

    messageListener = onSnapshot(

        q,

        snapshot => {

            const messages = [];

            snapshot.forEach(doc => {

                messages.push({

                    id: doc.id,

                    ...doc.data()

                });

            });

            callback(messages);

        },

        error => log(error)

    );

}

// ============================================
// Typing Listener
// ============================================

export function listenTyping(

    conversationId,

    callback

) {

    if (!chatConfig.allowTypingIndicator) return;

    stopTypingListener();

    typingListener = onSnapshot(

        doc(

            db,

            chatConfig.conversationsCollection,

            conversationId

        ),

        snapshot => {

            if (!snapshot.exists()) return;

            const data = snapshot.data();

            callback({

                visitorTyping:

                    data.visitorTyping || false,

                adminTyping:

                    data.adminTyping || false

            });

        },

        error => log(error)

    );

}

// ============================================
// Presence Listener
// ============================================

export function listenPresence(

    conversationId,

    callback

) {

    if (!chatConfig.allowOnlineStatus) return;

    stopPresenceListener();

    presenceListener = onSnapshot(

        doc(

            db,

            chatConfig.conversationsCollection,

            conversationId

        ),

        snapshot => {

            if (!snapshot.exists()) return;

            const data = snapshot.data();

            callback({

                status:

                    data.status || "offline",

                updatedAt:

                    data.updatedAt || null

            });

        },

        error => log(error)

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
// Stop Presence Listener
// ============================================

export function stopPresenceListener() {

    if (presenceListener) {

        presenceListener();

        presenceListener = null;

    }

}

// ============================================
// Stop All Listeners
// ============================================

export function stopAllRealtimeListeners() {

    stopConversationListener();

    stopMessageListener();

    stopTypingListener();

    stopPresenceListener();

}

// ============================================
// Ready
// ============================================

log("PPPP Realtime Ready");