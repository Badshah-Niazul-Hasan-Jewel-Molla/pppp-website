// ============================================
// PPPP CHAT SYSTEM
// chat.js
// Version 4.0.0 Final Stable
// Part 1 / 4
// ============================================

import { chatConfig } from "./config.js";

import {

    db,

    collection,

    query,

    where,

    getDocs,

    addDoc,

    serverTimestamp

} from "./firebase.js";

import {

    initVisitor,

    getCurrentVisitor

} from "./auth.js";

import {

    createChatWidget,

    bindUIEvents,

    addMessage,

    clearMessages,

    setStatus,

    showTyping

} from "./ui.js";

import {

    sendMessage as sendChatMessage,

    setTyping,

    stopTyping,

    markMessageSeen

} from "./messageService.js";

import {

    listenConversation,

    listenMessages,

    listenTyping,

    stopAllRealtimeListeners

} from "./realtime.js";

import {

    requestNotificationPermission,

    notifyNewMessage

} from "./notification.js";

import {

    scrollBottom,

    log

} from "./utils.js";

import {

    setConversationId,

    getConversationId,

    setVisitor,

    setInitialized,

    isInitialized

} from "./state.js";

// ============================================
// Global
// ============================================

let visitorId = "";

let typingTimer = null;

// ============================================
// DOM
// ============================================

const input = () =>

    document.getElementById("chat-text");

const sendButton = () =>

    document.getElementById("chat-send");

// ============================================
// Start
// ============================================

document.addEventListener(

    "DOMContentLoaded",

    initializeChat

);

// ============================================
// Initialize
// ============================================

async function initializeChat() {

    if (isInitialized()) return;

    createChatWidget();

    bindUIEvents();

    await requestNotificationPermission();

    visitorId = await initVisitor();

    setVisitor(getCurrentVisitor());

    await loadConversation();

    registerEvents();

    setInitialized(true);

    log("PPPP Chat Initialized");

}

// ============================================
// Register Events
// ============================================

function registerEvents() {

    sendButton()?.addEventListener(

        "click",

        handleSend

    );

    input()?.addEventListener(

        "keydown",

        e => {

            if (e.key === "Enter") {

                e.preventDefault();

                handleSend();

            }

        }

    );

    input()?.addEventListener(

        "input",

        typingHandler

    );

}
// ============================================
// Load Conversation
// ============================================

async function loadConversation() {

    const q = query(

        collection(

            db,

            chatConfig.conversationsCollection

        ),

        where(

            "visitorId",

            "==",

            visitorId

        )

    );

    const snapshot = await getDocs(q);

    let conversationId = "";

    if (snapshot.empty) {

        const ref = await addDoc(

            collection(

                db,

                chatConfig.conversationsCollection

            ),

            {

                visitorId,

                adminId: "",

                status: "open",

                lastMessage: "",

                lastSender: "",

                unreadAdmin: false,

                unreadVisitor: false,

                visitorTyping: false,

                adminTyping: false,

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            }

        );

        conversationId = ref.id;

    }

    else {

        conversationId = snapshot.docs[0].id;

    }

    setConversationId(conversationId);

    initializeRealtime();

}

// ============================================
// Realtime
// ============================================

function initializeRealtime() {

    const conversationId = getConversationId();

    if (!conversationId) return;

    // Conversation

    listenConversation(

        conversationId,

        data => {

            setStatus(

                data.status === "closed"

                    ? "🔴 Offline"

                    : "🟢 Online"

            );

        }

    );

    // Typing

    listenTyping(

        conversationId,

        data => {

            showTyping(

                data.adminTyping

            );

        }

    );

    // Messages

    listenMessages(

        conversationId,

        async messages => {

            clearMessages();

            if (!messages.length) {

                addMessage(

                    chatConfig.welcomeMessage,

                    "system"

                );

                return;

            }

            for (const message of messages) {

                addMessage(

                    message.message,

                    message.senderType

                );

                if (

                    message.senderType === "admin" &&

                    !message.seen

                ) {

                    await markMessageSeen(

                        message.id

                    );

                }

            }

            scrollBottom(

                document.getElementById(

                    "chat-messages"

                )

            );

            const last =

                messages[

                    messages.length - 1

                ];

            if (

                last &&

                last.senderType === "admin"

            ) {

                notifyNewMessage(

                    last.message

                );

            }

        }

    );

}
// ============================================
// Send Message
// ============================================

async function handleSend() {

    const conversationId = getConversationId();

    if (!conversationId) return;

    const text = input()?.value.trim();

    if (!text) return;

    sendButton().disabled = true;

    try {

        await sendChatMessage({

            conversationId,

            senderId: visitorId,

            senderType: "visitor",

            message: text,

            messageType: "text"

        });

        input().value = "";

        await stopTyping(

            conversationId,

            "visitor"

        );

    }

    catch (error) {

        console.error(error);

        alert("Unable to send message.");

    }

    finally {

        sendButton().disabled = false;

        input().focus();

    }

}

// ============================================
// Typing Handler
// ============================================

function typingHandler() {

    const conversationId =

        getConversationId();

    if (!conversationId) return;

    startTyping();

    clearTimeout(typingTimer);

    typingTimer = setTimeout(

        () => {

            stopTyping(

                conversationId,

                "visitor"

            );

        },

        chatConfig.typingTimeout

    );

}

// ============================================
// Start Typing
// ============================================

async function startTyping() {

    const conversationId =

        getConversationId();

    if (!conversationId) return;

    try {

        await setTyping(

            conversationId,

            "visitor",

            true

        );

    }

    catch (error) {

        console.error(error);

    }

}

// ============================================
// Stop Typing Immediately
// ============================================

async function stopTypingNow() {

    const conversationId =

        getConversationId();

    if (!conversationId) return;

    try {

        await stopTyping(

            conversationId,

            "visitor"

        );

    }

    catch (error) {

        console.error(error);

    }

}
// ============================================
// Connection Events
// ============================================

window.addEventListener("online", () => {

    log("PPPP Chat Connected");

    if (!isInitialized()) return;

    initializeRealtime();

});

window.addEventListener("offline", () => {

    log("PPPP Chat Offline");

    setStatus("🔴 Offline");

});

// ============================================
// Window Focus
// ============================================

window.addEventListener("focus", () => {

    showTyping(false);

});

// ============================================
// Cleanup
// ============================================

window.addEventListener(

    "beforeunload",

    async () => {

        try {

            const conversationId =

                getConversationId();

            if (conversationId) {

                await stopTyping(

                    conversationId,

                    "visitor"

                );

            }

        }

        catch (error) {

            log(error);

        }

        stopAllRealtimeListeners();

    }

);

// ============================================
// Public Helpers
// ============================================

export function getVisitorId() {

    return visitorId;

}

export function getChatConversationId() {

    return getConversationId();

}

export function isChatReady() {

    return isInitialized();

}

// ============================================
// Reset Conversation
// ============================================

export async function resetConversation() {

    stopAllRealtimeListeners();

    clearMessages();

    setConversationId("");

    await loadConversation();

}

// ============================================
// Version
// ============================================

export const CHAT_VERSION = "4.0.0 Final Stable";

// ============================================
// Ready
// ============================================

log("===================================");

log("PPPP Chat System v4.0.0 Final Stable");

log("Visitor:", getCurrentVisitor());

log("Conversation:", getConversationId());

log("===================================");