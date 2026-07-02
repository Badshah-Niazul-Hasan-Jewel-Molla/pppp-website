// =====================================
// PPPP CHAT
// chat.js
// Part 1
// =====================================

import {
    db,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    onSnapshot,
    serverTimestamp
} from "./firebase.js";

import { initVisitor } from "./auth.js";

import { createChatWidget, bindUIEvents } from "./ui.js";

let visitorId = null;
let conversationId = null;

const widget = () => document.getElementById("pppp-chat-widget");
const messages = () => document.getElementById("chat-messages");
const input = () => document.getElementById("chat-text");
const sendButton = () => document.getElementById("chat-send");

document.addEventListener("DOMContentLoaded", init);

async function init() {

    createChatWidget();

    bindUIEvents();

    visitorId = await initVisitor();

    await loadConversation();

    sendButton().addEventListener("click", sendMessage);

    input().addEventListener("keypress", function(e){

        if(e.key==="Enter"){

            sendMessage();

        }

    });

}

async function loadConversation(){

    const q = query(

        collection(db,"conversations"),

        where("visitorId","==",visitorId)

    );

    const snap = await getDocs(q);

    if(snap.empty){

        const ref = await addDoc(

            collection(db,"conversations"),

            {

                visitorId:visitorId,

                adminId:"",

                status:"open",

                lastMessage:"",

                createdAt:serverTimestamp(),

                updatedAt:serverTimestamp()

            }

        );

        conversationId = ref.id;

    }

    else{

        conversationId = snap.docs[0].id;

    }

    listenMessages();

}

function listenMessages(){

    const q = query(

        collection(db,"messages"),

        where("conversationId","==",conversationId)

    );

    onSnapshot(q,function(snapshot){

        messages().innerHTML="";

        snapshot.forEach(function(doc){

            const data = doc.data();

            appendMessage(

                data.message,

                data.senderType

            );

        });

    });

}

function appendMessage(text,type){

    const div=document.createElement("div");

    div.className="message "+type;

    div.innerHTML=text;

    messages().appendChild(div);

    messages().scrollTop=messages().scrollHeight;

}

async function sendMessage(){

    const text=input().value.trim();

    if(text==="") return;

    await addDoc(

        collection(db,"messages"),

        {

            conversationId:conversationId,

            senderId:visitorId,

            senderType:"visitor",

            message:text,

            createdAt:serverTimestamp(),

            seen:false

        }

    );

    input().value="";

}
// =====================================
// PPPP CHAT
// chat.js
// Part 2
// =====================================

// Update conversation after sending message
async function updateConversation(lastMessage){

    const { doc, updateDoc } = await import("./firebase.js");

    await updateDoc(

        doc(db,"conversations",conversationId),

        {

            lastMessage:lastMessage,

            lastSender:"visitor",

            unreadAdmin:true,

            updatedAt:serverTimestamp()

        }

    );

}

// Replace sendMessage() with this version
async function sendMessage(){

    const text=input().value.trim();

    if(text==="") return;

    await addDoc(

        collection(db,"messages"),

        {

            conversationId:conversationId,

            senderId:visitorId,

            senderType:"visitor",

            message:text,

            messageType:"text",

            seen:false,

            createdAt:serverTimestamp()

        }

    );

    await updateConversation(text);

    input().value="";

}

// Better message bubble
function appendMessage(text,type){

    const bubble=document.createElement("div");

    bubble.className="pppp-message "+type;

    bubble.innerHTML=`

        <div class="bubble">

            ${text}

        </div>

    `;

    messages().appendChild(bubble);

    messages().scrollTop=messages().scrollHeight;

}

// Loading screen
function showLoading(){

    messages().innerHTML=`

        <div class="loading-chat">

            Loading conversation...

        </div>

    `;

}

// Empty conversation
function emptyConversation(){

    messages().innerHTML=`

        <div class="loading-chat">

            Start your conversation 👋

        </div>

    `;

}

// Listen improvements
function listenMessages(){

    showLoading();

    const q=query(

        collection(db,"messages"),

        where("conversationId","==",conversationId)

    );

    onSnapshot(q,function(snapshot){

        messages().innerHTML="";

        if(snapshot.empty){

            emptyConversation();

            return;

        }

        snapshot.forEach(function(doc){

            const data=doc.data();

            appendMessage(

                data.message,

                data.senderType

            );

        });

    });

}