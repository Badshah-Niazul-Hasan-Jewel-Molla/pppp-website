// ============================================
// PPPP CHAT SYSTEM
// messageService.js
// Version 4.0
// ============================================

import {
    db,
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp
} from "./firebase.js";

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

    if (!conversationId || !message) {

        throw new Error("Invalid message.");

    }

    const ref = await addDoc(

        collection(db, "messages"),

        {

            conversationId,

            senderId,

            senderType,

            message,

            messageType,

            seen: false,

            createdAt: serverTimestamp()

        }

    );

    await updateConversation({

        conversationId,

        lastMessage: message,

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

        doc(db, "conversations", conversationId),

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

        doc(db, "messages", messageId),

        {

            seen: true

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

    if (!conversationId) return;

    const data = {};

    if (sender === "visitor") {

        data.visitorTyping = status;

    }

    else {

        data.adminTyping = status;

    }

    await updateDoc(

        doc(db, "conversations", conversationId),

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
// Message Placeholder
// ============================================

export async function deleteMessage(messageId) {

    console.warn(

        "deleteMessage() will be available in Version 4.1"

    );

}

export async function editMessage(

    messageId,

    newMessage

) {

    console.warn(

        "editMessage() will be available in Version 4.1"

    );

}

// ============================================
// Ready
// ============================================

console.log("PPPP Message Service Ready");
