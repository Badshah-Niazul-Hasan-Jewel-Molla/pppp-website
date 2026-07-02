// ============================================
// PPPP CHAT SYSTEM
// chat.js
// Final Version
// Part 1
// ============================================

import {
    db,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    onSnapshot,
    orderBy,
    serverTimestamp
} from "./firebase.js";

import { initVisitor } from "./auth.js";
import { createChatWidget, bindUIEvents } from "./ui.js";

let visitorId = "";
let conversationId = "";

const chatMessages = () => document.getElementById("chat-messages");
const chatInput = () => document.getElementById("chat-text");
const sendBtn = () => document.getElementById("chat-send");

document.addEventListener("DOMContentLoaded", initializeChat);

async function initializeChat() {

    createChatWidget();

    bindUIEvents();

    visitorId = await initVisitor();

    await loadConversation();

    sendBtn().addEventListener("click", sendMessage);

    chatInput().addEventListener("keydown", e => {

        if (e.key === "Enter") {

            e.preventDefault();

            sendMessage();

        }

    });

}

async function loadConversation() {

    const q = query(

        collection(db, "conversations"),

        where("visitorId", "==", visitorId)

    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

        const ref = await addDoc(

            collection(db, "conversations"),

            {

                visitorId,

                adminId: "",

                status: "open",

                lastMessage: "",

                lastSender: "",

                unreadAdmin: false,

                unreadVisitor: false,

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            }

        );

        conversationId = ref.id;

    }

    else {

        conversationId = snapshot.docs[0].id;

    }

    listenMessages();

}

function listenMessages() {

    const q = query(

        collection(db, "messages"),

        where("conversationId", "==", conversationId),

        orderBy("createdAt")

    );

    onSnapshot(q, snapshot => {

        chatMessages().innerHTML = "";

        if (snapshot.empty) {

            chatMessages().innerHTML =

            `<div class="loading-chat">

                Start your conversation 👋

            </div>`;

            return;

        }

        snapshot.forEach(doc => {

            const data = doc.data();

            renderMessage(data);

        });

        scrollBottom();

    });

}

function renderMessage(data) {

    const div = document.createElement("div");

    div.className = "pppp-message " + data.senderType;

    div.innerHTML = `

        <div class="bubble">

            ${escapeHTML(data.message)}

        </div>

    `;

    chatMessages().appendChild(div);

}

function scrollBottom() {

    chatMessages().scrollTop =

    chatMessages().scrollHeight;

}

function escapeHTML(text) {

    const div = document.createElement("div");

    div.innerText = text;

    return div.innerHTML;

}
// ============================================
// PPPP CHAT SYSTEM
// chat.js
// Final Version
// Part 2
// ============================================

// Send Message
async function sendMessage() {

    const text = chatInput().value.trim();

    if (!text) return;

    sendBtn().disabled = true;

    try {

        await addDoc(
            collection(db, "messages"),
            {
                conversationId,
                senderId: visitorId,
                senderType: "visitor",
                message: text,
                messageType: "text",
                seen: false,
                createdAt: serverTimestamp()
            }
        );

        await updateConversation(text);

        chatInput().value = "";

    } catch (err) {

        console.error("Send Error:", err);

        alert("Message could not be sent.");

    }

    sendBtn().disabled = false;

}

// Update Conversation
async function updateConversation(lastMessage) {

    await updateDoc(

        doc(db, "conversations", conversationId),

        {

            lastMessage,

            lastSender: "visitor",

            unreadAdmin: true,

            updatedAt: serverTimestamp()

        }

    );

}

// Typing Status

let typingTimeout;

chatInput().addEventListener("input", () => {

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {

        stopTyping();

    }, 1500);

    startTyping();

});

async function startTyping() {

    try {

        await updateDoc(

            doc(db, "typing", conversationId),

            {

                visitorTyping: true

            }

        );

    } catch(e){}

}

async function stopTyping() {

    try {

        await updateDoc(

            doc(db, "typing", conversationId),

            {

                visitorTyping: false

            }

        );

    } catch(e){}

}

// Connection Status

window.addEventListener("online", () => {

    console.log("Online");

});

window.addEventListener("offline", () => {

    console.log("Offline");

});

// Auto Focus

window.addEventListener("load", () => {

    setTimeout(() => {

        if(chatInput()){

            chatInput().focus();

        }

    },500);

});