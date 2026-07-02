// =============================================
// PPPP CHAT SYSTEM
// admin.js
// Final Version
// Part 1
// =============================================

import {
    db,
    collection,
    query,
    getDocs,
    doc,
    updateDoc,
    addDoc,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "../chat/firebase.js";

let selectedConversation = "";
let selectedVisitor = "";

const conversationList = document.getElementById("conversationList");
const messageBox = document.getElementById("adminMessages");
const messageInput = document.getElementById("adminMessage");
const sendButton = document.getElementById("sendReply");

document.addEventListener("DOMContentLoaded", init);

async function init(){

    loadConversations();

    sendButton.addEventListener("click",sendReply);

    messageInput.addEventListener("keydown",e=>{

        if(e.key==="Enter"){

            e.preventDefault();

            sendReply();

        }

    });

}

// =====================================
// Load Conversation List
// =====================================

function loadConversations(){

    const q=query(

        collection(db,"conversations"),

        orderBy("updatedAt","desc")

    );

    onSnapshot(q,(snapshot)=>{

        conversationList.innerHTML="";

        snapshot.forEach((item)=>{

            createConversationCard(item.id,item.data());

        });

    });

}

// =====================================
// Conversation Card
// =====================================

function createConversationCard(id,data){

    const div=document.createElement("div");

    div.className="conversation";

    div.innerHTML=`

        <h4>

            ${data.visitorId}

        </h4>

        <p>

            ${data.lastMessage || "No Message"}

        </p>

    `;

    div.onclick=()=>{

        openConversation(id,data);

    };

    conversationList.appendChild(div);

}

// =====================================
// Open Conversation
// =====================================

function openConversation(id,data){

    selectedConversation=id;

    selectedVisitor=data.visitorId;

    document.getElementById("visitorName").innerHTML=

        data.visitorId;

    listenMessages();

}
