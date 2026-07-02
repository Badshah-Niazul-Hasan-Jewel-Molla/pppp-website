// ============================================
// PPPP CHAT SYSTEM
// config.js
// Version 4.0
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

    // Website / Organization
    siteName: "People's Power & Peace Party (PPPP)",

    shortName: "PPPP",

    adminName: "PPPP Admin",

    // Chat Settings
    welcomeMessage:
        "👋 Welcome to PPPP! How can we help you today?",

    placeholder:
        "Type your message...",

    sendButtonText:
        "Send",

    // Features
    allowGuestChat: true,

    allowGoogleLogin: true,

    allowFacebookLogin: true,

    allowGithubLogin: true,

    allowImageUpload: true,

    allowTypingIndicator: true,

    allowSeenStatus: true,

    allowOnlineStatus: true,

    allowNotifications: true,

    // Upload
    maxImageSize: 5 * 1024 * 1024, // 5 MB

    allowedImageTypes: [

        "image/png",

        "image/jpeg",

        "image/webp",

        "image/gif"

    ],

    // Theme
    primaryColor: "#0066ff",

    secondaryColor: "#0052cc",

    backgroundColor: "#ffffff"

};