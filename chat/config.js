// ============================================
// PPPP CHAT SYSTEM
// config.js
// Version 4.0.0 Final
// ============================================

// Firebase Configuration

export const firebaseConfig = {

    apiKey: "AIzaSyCsvY3vQYLwSwbaS_YT7xwbHGSoREhj9wc",

    authDomain: "pppp-chat.firebaseapp.com",

    projectId: "pppp-chat",

    storageBucket: "pppp-chat.firebasestorage.app",

    messagingSenderId: "272715802614",

    appId: "1:272715802614:web:e1881cd2a0aaf949d549d7",

    measurementId: "G-NNEZLK09R6"

};

// ============================================
// PPPP Chat Configuration
// ============================================

export const chatConfig = {

    // ========================================
    // Organization
    // ========================================

    siteName: "People's Power & Peace Party (PPPP)",

    shortName: "PPPP",

    adminName: "PPPP Admin",

    appName: "PPPP Chat",

    version: "4.0.0",

    // ========================================
    // Assets
    // ========================================

    logo: "./assets/logo.svg",

    avatar: "./assets/avatar.svg",

    loading: "./assets/loading.svg",

    notificationSound: "./assets/notification.mp3",

    // ========================================
    // Chat UI
    // ========================================

    welcomeMessage:
        "👋 Welcome to PPPP! How can we help you today?",

    placeholder:
        "Type your message...",

    sendButtonText:
        "Send",

    // ========================================
    // Features
    // ========================================

    allowGuestChat: true,

    // Enable after Firebase provider setup

    allowGoogleLogin: true,

    allowFacebookLogin: false,

    allowGithubLogin: false,

    // Enable after Firebase Storage setup

    allowImageUpload: false,

    allowTypingIndicator: true,

    allowSeenStatus: true,

    allowOnlineStatus: true,

    allowNotifications: true,

    enableSound: true,

    autoScroll: true,

    // ========================================
    // Upload
    // ========================================

    maxImageSize: 5 * 1024 * 1024, // 5 MB

    allowedImageTypes: [

        "image/png",

        "image/jpeg",

        "image/webp",

        "image/gif"

    ],

    // ========================================
    // Performance
    // ========================================

    messageLimit: 100,

    typingTimeout: 1500,

    reconnectDelay: 3000,

    // ========================================
    // Theme
    // ========================================

    primaryColor: "#0066ff",

    secondaryColor: "#0052cc",

    backgroundColor: "#ffffff"

};