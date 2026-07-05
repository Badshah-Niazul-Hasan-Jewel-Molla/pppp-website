// ============================================
// PPPP CHAT SYSTEM
// messageService.js
// Version 4.0.0 Final Stable
// ============================================

import {

    db,

    collection,
    addDoc,

    updateDoc,

    doc,

    serverTimestamp

} from "./firebase.js";

import { chatConfig } from "./config.js";

import { log } from "./utils.js";

// ============================================
// Send Message
// ============================================

export async function sendMessage({

    conversationId,

    senderId,

    senderType,

    message,

    messageType = "text"

}) {

    if (!conversationId) {

        throw new Error("Conversation ID is required.");

    }

    if (!message || !message.trim()) {

        throw new Error("Message cannot be empty.");

    }

    const ref = await addDoc(

        collection(

            db,

            chatConfig.messagesCollection

        ),

        {

            conversationId,

            senderId,

            senderType,

            message: message.trim(),

            messageType,

            seen: false,

            createdAt: serverTimestamp()

        }

    );

    await updateConversation({

        conversationId,

        lastMessage: message.trim(),

        lastSender: senderType

    });

    return ref.id;

}

// ============================================
// Update Conversation
// ============================================

export async function updateConversation({

    conversationId,

    lastMessage,

    lastSender

}) {

    if (!conversationId) return;

    await updateDoc(

        doc(

            db,

            chatConfig.conversationsCollection,

            conversationId

        ),

        {

            lastMessage,

            lastSender,

            unreadAdmin: lastSender === "visitor",

            unreadVisitor: lastSender === "admin",

            updatedAt: serverTimestamp()

        }

    );

}

// ============================================
// Seen Status
// ============================================

export async function markMessageSeen(messageId) {

    if (!messageId) return;

    await updateDoc(

        doc(

            db,

            chatConfig.messagesCollection,

            messageId

        ),

        {

            seen: true,

            seenAt: serverTimestamp()

        }

    );

}

// ============================================
// Typing Status
// ============================================

export async function setTyping(

    conversationId,

    sender,

    status

) {

    if (!chatConfig.allowTypingIndicator) return;

    if (!conversationId) return;

    const data = {};

    if (sender === "visitor") {

        data.visitorTyping = status;

    }

    else {

        data.adminTyping = status;

    }

    data.typingUpdatedAt = serverTimestamp();

    await updateDoc(

        doc(

            db,

            chatConfig.conversationsCollection,

            conversationId

        ),

        data

    );

}

// ============================================
// Stop Typing
// ============================================

export async function stopTyping(

    conversationId,

    sender

) {

    return setTyping(

        conversationId,

        sender,

        false

    );

}

// ============================================
// Future Features
// ============================================

export async function deleteMessage() {

    log("deleteMessage() will be available in Version 4.1");

}

export async function editMessage() {

    log("editMessage() will be available in Version 4.1");

}

// ============================================
// Ready
// ============================================

log("PPPP Message Service Ready");