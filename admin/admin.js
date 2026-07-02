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
// =============================================
// PPPP CHAT SYSTEM
// admin.js
// Final Version
// Part 2
// =============================================

// Live Messages
function listenMessages() {

    if (!selectedConversation) return;

    const q = query(

        collection(db, "messages"),

        where("conversationId", "==", selectedConversation),

        orderBy("createdAt")

    );

    onSnapshot(q, (snapshot) => {

        messageBox.innerHTML = "";

        snapshot.forEach((item) => {

            renderMessage(item.id, item.data());

        });

        scrollBottom();

    });

}

// Render Message

function renderMessage(id, data) {

    const div = document.createElement("div");

    div.className = "message " + data.senderType;

    div.innerHTML = `

        <div class="bubble">

            ${escapeHTML(data.message)}

        </div>

    `;

    messageBox.appendChild(div);

}

// Send Reply

async function sendReply() {

    if (!selectedConversation) return;

    const text = messageInput.value.trim();

    if (text === "") return;

    sendButton.disabled = true;

    try {

        await addDoc(

            collection(db, "messages"),

            {

                conversationId: selectedConversation,

                senderId: "admin",

                senderType: "admin",

                message: text,

                messageType: "text",

                seen: false,

                createdAt: serverTimestamp()

            }

        );

        await updateConversation(text);

        messageInput.value = "";

    }

    catch (err) {

        console.error(err);

        alert("Reply failed.");

    }

    sendButton.disabled = false;

}

// Update Conversation

async function updateConversation(lastMessage) {

    await updateDoc(

        doc(db, "conversations", selectedConversation),

        {

            lastMessage,

            lastSender: "admin",

            unreadVisitor: true,

            unreadAdmin: false,

            updatedAt: serverTimestamp()

        }

    );

}

// Auto Scroll

function scrollBottom() {

    messageBox.scrollTop = messageBox.scrollHeight;

}

// Escape HTML

function escapeHTML(text) {

    const div = document.createElement("div");

    div.innerText = text;

    return div.innerHTML;

}
// =============================================
// PPPP CHAT SYSTEM
// admin.js
// Final Version
// Part 3
// =============================================

// ================================
// Search Conversation
// ================================

const searchInput = document.getElementById("searchUser");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        document.querySelectorAll(".conversation").forEach(item => {

            const text = item.innerText.toLowerCase();

            item.style.display = text.includes(keyword)
                ? ""
                : "none";

        });

    });

}

// ================================
// Selected Conversation Highlight
// ================================

function selectConversation(card){

    document
        .querySelectorAll(".conversation")
        .forEach(c=>c.classList.remove("active"));

    card.classList.add("active");

}

// Update previous function
const oldCreateConversationCard = createConversationCard;

createConversationCard = function(id,data){

    const div=document.createElement("div");

    div.className="conversation";

    div.innerHTML=`

        <h4>${data.visitorId}</h4>

        <p>${data.lastMessage || "No Message Yet"}</p>

    `;

    div.onclick=function(){

        selectConversation(div);

        openConversation(id,data);

    };

    conversationList.appendChild(div);

};

// ================================
// Visitor Online Status
// ================================

function watchVisitor(){

    if(!selectedVisitor) return;

    onSnapshot(

        doc(db,"users",selectedVisitor),

        function(docSnap){

            if(!docSnap.exists()) return;

            const data=docSnap.data();

            document.getElementById("visitorStatus").innerHTML=

                data.online
                ? "🟢 Online"
                : "⚪ Offline";

        }

    );

}

// Override openConversation

const oldOpenConversation = openConversation;

openConversation = function(id,data){

    selectedConversation=id;

    selectedVisitor=data.visitorId;

    document.getElementById("visitorName").innerHTML=

        data.visitorId;

    watchVisitor();

    listenMessages();

};

// ================================
// Admin Typing
// ================================

let typingTimer;

messageInput.addEventListener("input",()=>{

    clearTimeout(typingTimer);

    startTyping();

    typingTimer=setTimeout(stopTyping,1500);

});

async function startTyping(){

    if(!selectedConversation) return;

    try{

        await updateDoc(

            doc(db,"typing",selectedConversation),

            {

                adminTyping:true

            }

        );

    }catch(e){}

}

async function stopTyping(){

    if(!selectedConversation) return;

    try{

        await updateDoc(

            doc(db,"typing",selectedConversation),

            {

                adminTyping:false

            }

        );

    }catch(e){}

}

// ================================
// Dashboard Ready
// ================================

console.log("PPPP Admin Dashboard Ready");