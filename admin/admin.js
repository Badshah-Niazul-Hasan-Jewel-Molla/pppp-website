// ============================================
// PPPP CHAT SYSTEM
// admin.js
// Version 4.0.0 Final Stable
// ============================================

import { chatConfig } from "../chat/config.js";

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

import {
    sendMessage,
    setTyping,
    stopTyping
} from "../chat/messageService.js";

import {
    log,
    escapeHTML
} from "../chat/utils.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// ============================================
// Global
// ============================================

let currentAdmin = null;
let currentConversation = null;

let unsubscribeConversation = null;
let unsubscribeMessages = null;

let typingTimer = null;

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
// Authentication
// ============================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        location.href = "login.html";
        return;

    }

    const adminDoc = await getDoc(

        doc(db, chatConfig.adminsCollection, user.uid)

    );

    if (!adminDoc.exists()) {

        alert("Access Denied");

        await signOut(auth);

        location.href = "login.html";

        return;

    }

    currentAdmin = user;

    loadConversations();

});

// ============================================
// Conversations
// ============================================

function loadConversations() {

    const q = query(

        collection(db, chatConfig.conversationsCollection),

        orderBy("updatedAt", "desc")

    );

    onSnapshot(q, snapshot => {

        conversationList.innerHTML = "";

        if (snapshot.empty) {

            conversationList.innerHTML = "<p>No conversations.</p>";

            return;

        }

        snapshot.forEach(item => {

            const data = item.data();

            const div = document.createElement("div");

            div.className = "conversation-item";

            div.innerHTML = `
                <strong>${escapeHTML(data.visitorId)}</strong>
                <br>
                <small>${escapeHTML(data.lastMessage || "")}</small>
            `;

            div.onclick = () => openConversation(item.id, data);

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

    if (unsubscribeConversation) unsubscribeConversation();

    unsubscribeConversation = onSnapshot(

        doc(db, chatConfig.conversationsCollection, id),

        snap => {

            if (!snap.exists()) return;

            const d = snap.data();

            typingIndicator.textContent =
                d.visitorTyping
                    ? "Visitor is typing..."
                    : "";

        }

    );

    listenMessages();

}

// ============================================
// Messages
// ============================================

function listenMessages() {

    if (unsubscribeMessages) {

        unsubscribeMessages();

    }

    const q = query(

        collection(db, chatConfig.messagesCollection),

        where("conversationId", "==", currentConversation),

        orderBy("createdAt")

    );

    unsubscribeMessages = onSnapshot(q, snapshot => {

        messageBox.innerHTML = "";

        snapshot.forEach(item => {

            const data = item.data();

            const div = document.createElement("div");

            div.className = "admin-message " + data.senderType;

            div.innerHTML = `
                <div class="bubble">
                    ${escapeHTML(data.message)}
                </div>
            `;

            messageBox.appendChild(div);

        });

        messageBox.scrollTop = messageBox.scrollHeight;

    });

}

// ============================================
// Send Reply
// ============================================

sendButton.addEventListener("click", sendReply);

replyInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        e.preventDefault();

        sendReply();

    }

});

async function sendReply() {

    if (!currentConversation) return;

    const text = replyInput.value.trim();

    if (!text) return;

    sendButton.disabled = true;

    try {

        await sendMessage({

            conversationId: currentConversation,

            senderId: currentAdmin.uid,

            senderType: "admin",

            message: text,

            messageType: "text"

        });

        replyInput.value = "";

        await stopTyping(currentConversation, "admin");

    }

    catch (error) {

        console.error(error);

        alert("Unable to send message.");

    }

    finally {

        sendButton.disabled = false;

        replyInput.focus();

    }

}

// ============================================
// Typing
// ============================================

replyInput.addEventListener("input", () => {

    if (!currentConversation) return;

    setTyping(currentConversation, "admin", true);

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {

        stopTyping(currentConversation, "admin");

    }, chatConfig.typingTimeout);

});

// ============================================
// Logout
// ============================================

logoutButton.addEventListener("click", async () => {

    if (!confirm("Logout now?")) return;

    await signOut(auth);

    location.href = "login.html";

});

// ============================================
// Cleanup
// ============================================

window.addEventListener("beforeunload", async () => {

    try {

        if (currentConversation) {

            await stopTyping(currentConversation, "admin");

        }

    } catch {}

    unsubscribeMessages?.();

    unsubscribeConversation?.();

});

// ============================================
// Ready
// ============================================

log("==================================");

log("PPPP Admin Panel v4.0.0 Final Stable");

log("==================================");