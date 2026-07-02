// ============================================
// PPPP CHAT SYSTEM
// chat.js
// Version 4.0
// Part 1
// ============================================

import {
    db,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    onSnapshot,
    serverTimestamp
} from "./firebase.js";

import {
    initVisitor,
    getCurrentVisitor
} from "./auth.js";

import {
    addMessage,
    clearMessages,
    createChatWidget,
    bindUIEvents,
    setStatus,
    showTyping
} from "./ui.js";

import {
    escapeHTML
} from "./utils.js";

// ============================================
// Global Variables
// ============================================

let visitorId = "";
let conversationId = "";

let unsubscribeConversation = null;
let unsubscribeMessages = null;

let typingTimeout = null;

// ============================================
// DOM
// ============================================

const input = () => document.getElementById("chat-text");
const send = () => document.getElementById("chat-send");

// ============================================
// Start
// ============================================

document.addEventListener("DOMContentLoaded", init);

async function init(){

    createChatWidget();

    bindUIEvents();

    visitorId = await initVisitor();

    await loadConversation();

    registerEvents();

}

// ============================================
// Register Events
// ============================================

function registerEvents(){

    send().addEventListener("click",sendMessage);

    input().addEventListener("keydown",e=>{

        if(e.key==="Enter"){

            e.preventDefault();

            sendMessage();

        }

    });

    input().addEventListener("input",typingHandler);

}

// ============================================
// Load Conversation
// ============================================

async function loadConversation(){

    const q=query(

        collection(db,"conversations"),

        where("visitorId","==",visitorId)

    );

    const snap=await getDocs(q);

    if(snap.empty){

        const ref=await addDoc(

            collection(db,"conversations"),

            {

                visitorId,

                status:"open",

                adminId:"",

                lastMessage:"",

                lastSender:"",

                unreadAdmin:false,

                unreadVisitor:false,

                visitorTyping:false,

                adminTyping:false,

                createdAt:serverTimestamp(),

                updatedAt:serverTimestamp()

            }

        );

        conversationId=ref.id;

    }

    else{

        conversationId=snap.docs[0].id;

    }

    listenConversation();

    listenMessages();

}

// ============================================
// Conversation Listener
// ============================================

function listenConversation(){

    if(unsubscribeConversation){

        unsubscribeConversation();

    }

    unsubscribeConversation=onSnapshot(

        doc(db,"conversations",conversationId),

        snapshot=>{

            if(!snapshot.exists()) return;

            const data=snapshot.data();

            if(data.status==="closed"){

                setStatus("🔴 Offline");

            }

            else{

                setStatus("🟢 Online");

            }

            showTyping(data.adminTyping===true);

        }

    );

}

// ============================================
// Message Listener
// ============================================

function listenMessages(){

    if(unsubscribeMessages){

        unsubscribeMessages();

    }

    const q=query(

        collection(db,"messages"),

        where("conversationId","==",conversationId),

        orderBy("createdAt")

    );

    unsubscribeMessages=onSnapshot(q,snapshot=>{

        clearMessages();

        if(snapshot.empty){

            addMessage(

                "👋 Welcome! Start your conversation.",

                "system"

            );

            return;

        }

        snapshot.forEach(item=>{

            const data=item.data();

            addMessage(

                escapeHTML(data.message),

                data.senderType

            );

        });

    });

}
// ============================================
// PPPP CHAT SYSTEM
// chat.js
// Version 4.0
// Part 2
// ============================================

// ============================================
// Send Message
// ============================================

async function sendMessage() {

    if (!conversationId) return;

    const text = input().value.trim();

    if (!text) return;

    send().disabled = true;

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

        input().value = "";

        await stopTyping();

    }

    catch (error) {

        console.error("Send Message Error:", error);

        alert("Unable to send message.");

    }

    finally {

        send().disabled = false;

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

        console.error(error);

    }

}

// ============================================
// Typing Handler
// ============================================

function typingHandler() {

    startTyping();

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(async () => {

        await stopTyping();

    }, 1200);

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
// Mark Admin Messages as Seen
// ============================================

async function markMessagesSeen(snapshot) {

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

    if (updates.length) {

        await Promise.all(updates);

    }

}

// ============================================
// Replace Message Listener
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

    unsubscribeMessages = onSnapshot(

        q,

        async (snapshot) => {

            clearMessages();

            if (snapshot.empty) {

                addMessage(

                    "👋 Welcome! Start your conversation.",

                    "system"

                );

                return;

            }

            snapshot.forEach(item => {

                const data = item.data();

                addMessage(

                    escapeHTML(data.message),

                    data.senderType

                );

            });

            await markMessagesSeen(snapshot);

            const box = document.getElementById("chat-messages");

            if (box) {

                box.scrollTop = box.scrollHeight;

            }

        }

    );

}