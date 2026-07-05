// ============================================
// PPPP CHAT SYSTEM
// config.js
// Version 4.0.0 Final Stable
// ============================================

// ============================================
// Firebase Configuration
// ============================================

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
    // Application
    // ========================================

    appName: "PPPP Chat",

    version: "4.0.0 Final Stable",

    siteName: "People's Power & Peace Party (PPPP)",

    shortName: "PPPP",

    adminName: "PPPP Admin",

    // ========================================
    // Assets
    // ========================================

    logo: "./assets/logo.svg",

    avatar: "./assets/avatar.svg",

    loading: "./assets/loading.svg",

    notificationSound: "./assets/notification.mp3",

    notificationIcon: "./assets/logo.svg",

    // ========================================
    // Firestore Collections
    // ========================================

    usersCollection: "users",

    adminsCollection: "admins",

    conversationsCollection: "conversations",

    messagesCollection: "messages",

    typingCollection: "typing",

    // ========================================
    // Storage
    // ========================================

    imageStoragePath: "chat-images",

    fileStoragePath: "chat-files",

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

    allowGoogleLogin: true,

    allowFacebookLogin: false,

    allowGithubLogin: false,

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

    maxImageSize: 5 * 1024 * 1024,

    maxFileSize: 10 * 1024 * 1024,

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
    // Localization
    // ========================================

    locale: "en-BD",

    timeZone: "Asia/Dhaka",

    // ========================================
    // Development
    // ========================================

    debug: false,

    // ========================================
    // Theme
    // ========================================

    primaryColor: "#0066ff",

    secondaryColor: "#0052cc",

    backgroundColor: "#ffffff"

};