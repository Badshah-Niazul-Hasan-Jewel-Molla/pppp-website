// ============================================
// PPPP CHAT SYSTEM
// state.js
// Version 4.0.0 Final Stable
// ============================================

import { chatConfig } from "./config.js";

import { log } from "./utils.js";

// ============================================
// Global State
// ============================================

const state = {

    visitor: null,

    conversationId: "",

    currentConversation: null,

    messages: [],

    online: navigator.onLine,

    visitorTyping: false,

    adminTyping: false,

    unreadCount: 0,

    initialized: false

};

// ============================================
// Visitor
// ============================================

export function setVisitor(visitor) {

    state.visitor = visitor;

}

export function getVisitor() {

    return state.visitor;

}

// ============================================
// Conversation
// ============================================

export function setConversationId(id) {

    state.conversationId = id;

}

export function getConversationId() {

    return state.conversationId;

}

export function setCurrentConversation(data) {

    state.currentConversation = data;

}

export function getCurrentConversation() {

    return state.currentConversation;

}

// ============================================
// Messages
// ============================================

export function setMessages(messages = []) {

    state.messages = messages;

}

export function getMessages() {

    return state.messages;

}

export function addMessage(message) {

    state.messages.push(message);

    if (

        state.messages.length >

        chatConfig.messageLimit

    ) {

        state.messages.shift();

    }

}

export function clearMessages() {

    state.messages = [];

}

// ============================================
// Typing
// ============================================

export function setVisitorTyping(status) {

    state.visitorTyping = Boolean(status);

}

export function getVisitorTyping() {

    return state.visitorTyping;

}

export function setAdminTyping(status) {

    state.adminTyping = Boolean(status);

}

export function getAdminTyping() {

    return state.adminTyping;

}

// ============================================
// Online Status
// ============================================

export function setOnline(status) {

    state.online = Boolean(status);

}

export function isOnline() {

    return state.online;

}

// ============================================
// Unread Messages
// ============================================

export function setUnreadCount(count) {

    state.unreadCount = Math.max(0, count);

}

export function getUnreadCount() {

    return state.unreadCount;

}

export function increaseUnread() {

    state.unreadCount++;

}

export function resetUnread() {

    state.unreadCount = 0;

}

// ============================================
// Initialized
// ============================================

export function setInitialized(status) {

    state.initialized = Boolean(status);

}

export function isInitialized() {

    return state.initialized;

}

// ============================================
// Reset State
// ============================================

export function resetState() {

    state.visitor = null;

    state.conversationId = "";

    state.currentConversation = null;

    state.messages = [];

    state.online = navigator.onLine;

    state.visitorTyping = false;

    state.adminTyping = false;

    state.unreadCount = 0;

    state.initialized = false;

}

// ============================================
// Full State
// ============================================

export function getState() {

    return { ...state };

}

// ============================================
// Network Status
// ============================================

window.addEventListener("online", () => {

    setOnline(true);

    log("Network Online");

});

window.addEventListener("offline", () => {

    setOnline(false);

    log("Network Offline");

});

// ============================================
// Ready
// ============================================

log("PPPP State Ready");