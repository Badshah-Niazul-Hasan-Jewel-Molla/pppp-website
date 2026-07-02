// ============================================
// PPPP CHAT SYSTEM
// chat.js
// Version 3.0
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
import {
    createChatWidget,
    bindUIEvents,
    showTyping,
    setStatus
} from "./ui.js";

// ============================================
// Global Variables
// ============================================

let visitorId = "";
let conversationId = "";
let unsubscribeMessages = null;
let unsubscribeConversation = null;
let typingTimer = null;

// ============================================
// DOM Helpers
// ============================================

const messagesBox = () => document.getElementById("chat-messages");
const inputBox = () => document.getElementById("chat-text");
const sendButton = () => document.getElementById("chat-send");

// ============================================
// Start
// ============================================

document.addEventListener("DOMContentLoaded", startChat);

async function startChat() {

    createChatWidget();

    bindUIEvents();

    visitorId = await initVisitor();

    await loadConversation();

    registerEvents();

}

// ============================================
// UI Events
// ============================================

function registerEvents() {

    sendButton().addEventListener("click", sendMessage);

    inputBox().addEventListener("keydown", e => {

        if (e.key === "Enter") {

            e.preventDefault();

            sendMessage();

        }

    });

    inputBox().addEventListener("input", handleTyping);

}

// ============================================
// Conversation
// ============================================

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

                visitorTyping: false,

                adminTyping: false,

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            }

        );

        conversationId = ref.id;

    } else {

        conversationId = snapshot.docs[0].id;

    }

    listenConversation();

    listenMessages();

}

// ============================================
// Conversation Listener
// ============================================

function listenConversation() {

    if (unsubscribeConversation) {

        unsubscribeConversation();

    }

    unsubscribeConversation = onSnapshot(

        doc(db, "conversations", conversationId),

        snapshot => {

            if (!snapshot.exists()) return;

            const data = snapshot.data();

            showTyping(data.adminTyping === true);

            setStatus(data.status === "closed"
                ? "🔴 Offline"
                : "🟢 Online");

        }

    );

}

// ============================================
// Messages Listener
// ============================================

function listenMessages() {

    if (unsubscribeMessages) {

        unsubscribeMessages();

    }

    const q = query(

        collection(db, "messages"),

        where("conversationId", "==", conversationId),

        orderBy("createdAt")

    );

    unsubscribeMessages = onSnapshot(q, snapshot => {

        messagesBox().innerHTML = "";

        if (snapshot.empty) {

            messagesBox().innerHTML = `

                <div class="loading-chat">

                    Start your conversation 👋

                </div>

            `;

            return;

        }

        snapshot.forEach(item => {

            renderMessage(item.data());

        });

        scrollBottom();

    });

}

// ============================================
// Render Message
// ============================================

function renderMessage(data) {

    const div = document.createElement("div");

    div.className = "pppp-message " + data.senderType;

    div.innerHTML = `

        <div class="bubble">

            ${escapeHTML(data.message)}

        </div>

    `;

    messagesBox().appendChild(div);

}

// ============================================
// Helpers
// ============================================

function scrollBottom() {

    messagesBox().scrollTop = messagesBox().scrollHeight;

}

function escapeHTML(text = "") {

    const div = document.createElement("div");

    div.innerText = text;

    return div.innerHTML;

}
// ============================================
// PPPP CHAT SYSTEM
// chat.js
// Version 3.0
// Part 2
// ============================================

// ============================================
// Send Message
// ============================================

async function sendMessage() {

    const text = inputBox().value.trim();

    if (!text) return;

    sendButton().disabled = true;

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

        inputBox().value = "";

        stopTyping();

    }

    catch (error) {

        console.error("Send Message Error:", error);

        alert("Unable to send message.");

    }

    finally {

        sendButton().disabled = false;

    }

}

// ============================================
// Update Conversation
// ============================================

async function updateConversation(lastMessage) {

    try {

        await updateDoc(

            doc(db, "conversations", conversationId),

            {

                lastMessage,

                lastSender: "visitor",

                unreadAdmin: true,

                unreadVisitor: false,

                visitorTyping: false,

                updatedAt: serverTimestamp()

            }

        );

    }

    catch (error) {

        console.error("Conversation Update Error:", error);

    }

}

// ============================================
// Typing Events
// ============================================

function handleTyping() {

    startTyping();

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {

        stopTyping();

    }, 1500);

}

// ============================================
// Start Typing
// ============================================

async function startTyping() {

    if (!conversationId) return;

    try {

        await updateDoc(

            doc(db, "conversations", conversationId),

            {

                visitorTyping: true

            }

        );

    }

    catch (error) {

        console.log(error);

    }

}

// ============================================
// Stop Typing
// ============================================

async function stopTyping() {

    if (!conversationId) return;

    try {

        await updateDoc(

            doc(db, "conversations", conversationId),

            {

                visitorTyping: false

            }

        );

    }

    catch (error) {

        console.log(error);

    }

}

// ============================================
// Connection Status
// ============================================

window.addEventListener("online", () => {

    console.log("PPPP Chat Connected");

});

window.addEventListener("offline", () => {

    console.log("PPPP Chat Offline");

});

// ============================================
// Cleanup
// ============================================

window.addEventListener("beforeunload", () => {

    stopTyping();

    if (unsubscribeMessages) {

        unsubscribeMessages();

    }

    if (unsubscribeConversation) {

        unsubscribeConversation();

    }

});
// ============================================
// PPPP CHAT SYSTEM
// chat.js
// Version 3.0
// Part 3 (Final)
// ============================================

// ============================================
// Mark Admin Messages as Seen
// ============================================

async function markMessagesAsSeen(snapshot) {

    try {

        const updates = [];

        snapshot.forEach(item => {

            const data = item.data();

            if (
                data.senderType === "admin" &&
                data.seen !== true
            ) {

                updates.push(

                    updateDoc(

                        doc(db, "messages", item.id),

                        {

                            seen: true

                        }

                    )

                );

            }

        });

        await Promise.all(updates);

    }

    catch(error){

        console.error(error);

    }

}

// ============================================
// Replace listenMessages()
// ============================================

function listenMessages() {

    if (unsubscribeMessages) {

        unsubscribeMessages();

    }

    const q = query(

        collection(db, "messages"),

        where("conversationId", "==", conversationId),

        orderBy("createdAt")

    );

    unsubscribeMessages = onSnapshot(q, async(snapshot)=>{

        messagesBox().innerHTML="";

        if(snapshot.empty){

            messagesBox().innerHTML=`

                <div class="loading-chat">

                    Start your conversation 👋

                </div>

            `;

            return;

        }

        snapshot.forEach(item=>{

            renderMessage(item.data());

        });

        scrollBottom();

        await markMessagesAsSeen(snapshot);

    });

}

// ============================================
// Conversation Status
// ============================================

async function closeConversation(){

    try{

        await updateDoc(

            doc(db,"conversations",conversationId),

            {

                status:"closed",

                updatedAt:serverTimestamp()

            }

        );

    }

    catch(error){

        console.log(error);

    }

}

// ============================================
// Open Conversation
// ============================================

async function openConversation(){

    try{

        await updateDoc(

            doc(db,"conversations",conversationId),

            {

                status:"open",

                updatedAt:serverTimestamp()

            }

        );

    }

    catch(error){

        console.log(error);

    }

}

// ============================================
// Reconnect
// ============================================

window.addEventListener("online",()=>{

    if(conversationId){

        listenConversation();

        listenMessages();

    }

});

// ============================================
// Cleanup
// ============================================

window.addEventListener("beforeunload",async()=>{

    try{

        await stopTyping();

    }catch(e){}

});

// ============================================
// Chat Ready
// ============================================

console.log("PPPP Chat v3.0 Ready");