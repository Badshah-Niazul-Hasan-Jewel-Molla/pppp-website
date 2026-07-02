// ============================================
// PPPP CHAT SYSTEM
// admin.js
// Version 4.0
// Part 1
// ============================================

import {
    db,
    auth,
    collection,
    query,
    where,
    orderBy,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    onSnapshot,
    signOut,
    serverTimestamp
} from "../chat/firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// ============================================
// Global Variables
// ============================================

let currentAdmin = null;
let currentConversation = null;
let unsubscribeMessages = null;

// ============================================
// DOM
// ============================================

const conversationList = document.getElementById("conversation-list");
const messageBox = document.getElementById("admin-messages");
const replyInput = document.getElementById("reply-text");
const sendButton = document.getElementById("sendReply");
const logoutButton = document.getElementById("logoutBtn");
const visitorName = document.getElementById("visitor-name");
const visitorStatus = document.getElementById("visitor-status");
const typingIndicator = document.getElementById("typing-indicator");

// ============================================
// Auth Check
// ============================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        location.href = "login.html";
        return;

    }

    const adminRef = doc(db, "admins", user.uid);

    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {

        alert("Access Denied");

        await signOut(auth);

        location.href = "login.html";

        return;

    }

    currentAdmin = user;

    loadConversations();

});

// ============================================
// Load Conversations
// ============================================

function loadConversations() {

    const q = query(

        collection(db, "conversations"),

        orderBy("updatedAt", "desc")

    );

    onSnapshot(q, (snapshot) => {

        conversationList.innerHTML = "";

        if (snapshot.empty) {

            conversationList.innerHTML =
                "<p>No conversations.</p>";

            return;

        }

        snapshot.forEach((item) => {

            const data = item.data();

            const div = document.createElement("div");

            div.className = "conversation-item";

            div.innerHTML = `
                <strong>${data.visitorId}</strong>
                <br>
                <small>${data.lastMessage || ""}</small>
            `;

            div.onclick = () => {

                openConversation(item.id, data);

            };

            conversationList.appendChild(div);

        });

    });

}

// ============================================
// Open Conversation
// ============================================

function openConversation(id, data) {

    currentConversation = id;

    visitorName.textContent = data.visitorId;

    visitorStatus.textContent =
        data.status === "open"
            ? "🟢 Online"
            : "🔴 Offline";

    listenMessages();

}

// ============================================
// Listen Messages
// ============================================

function listenMessages() {

    if (!currentConversation) return;

    if (unsubscribeMessages) {

        unsubscribeMessages();

    }

    const q = query(

        collection(db, "messages"),

        where("conversationId", "==", currentConversation),

        orderBy("createdAt")

    );

    unsubscribeMessages = onSnapshot(

        q,

        (snapshot) => {

            messageBox.innerHTML = "";

            snapshot.forEach((item) => {

                const data = item.data();

                const div = document.createElement("div");

                div.className =
                    "admin-message " + data.senderType;

                div.innerHTML = `
                    <div class="bubble">
                        ${data.message}
                    </div>
                `;

                messageBox.appendChild(div);

            });

            messageBox.scrollTop =
                messageBox.scrollHeight;

        }

    );

}