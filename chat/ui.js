// ============================================
// PPPP CHAT SYSTEM
// ui.js
// Version 4.0
// ============================================

import { chatConfig } from "./config.js";

let widget = null;
let isOpen = false;

// ============================================
// Create Widget
// ============================================

export function createChatWidget() {

    if (document.getElementById("pppp-chat-widget")) {

        widget = document.getElementById("pppp-chat-widget");
        return;

    }

    widget = document.createElement("div");

    widget.id = "pppp-chat-widget";

    widget.innerHTML = `

<div id="pppp-chat-button" class="pppp-chat-button">

    💬

</div>

<div id="pppp-chat-window" class="pppp-chat-window">

    <div class="pppp-chat-header">

        <div>

            <div class="title">

                ${chatConfig.siteName}

            </div>

            <div id="chat-status" class="status">

                🟢 Online

            </div>

        </div>

        <button id="chat-close">

            ✕

        </button>

    </div>

    <div id="chat-messages" class="pppp-chat-messages">

    </div>

    <div id="chat-typing" class="pppp-chat-typing">

    </div>

    <div class="pppp-chat-footer">

        <input

            id="chat-text"

            type="text"

            placeholder="${chatConfig.placeholder}"

            autocomplete="off"

        >

        <button id="chat-send">

            ${chatConfig.sendButtonText}

        </button>

    </div>

</div>

`;

    document.body.appendChild(widget);

}

// ============================================
// Bind Events
// ============================================

export function bindUIEvents() {

    const button = document.getElementById("pppp-chat-button");

    const close = document.getElementById("chat-close");

    button.addEventListener("click", toggleChat);

    close.addEventListener("click", toggleChat);

}

// ============================================
// Toggle
// ============================================

export function toggleChat() {

    const win = document.getElementById("pppp-chat-window");

    isOpen = !isOpen;

    win.classList.toggle("open", isOpen);

}

// ============================================
// Status
// ============================================

export function setStatus(text) {

    const status = document.getElementById("chat-status");

    if (status) {

        status.innerText = text;

    }

}

// ============================================
// Typing
// ============================================

export function showTyping(show = true) {

    const typing = document.getElementById("chat-typing");

    if (!typing) return;

    if (show) {

        typing.innerHTML =

            "Admin is typing...";

    }

    else {

        typing.innerHTML = "";

    }

}

// ============================================
// Message
// ============================================

export function addMessage(text, sender) {

    const box = document.getElementById("chat-messages");

    if (!box) return;

    const div = document.createElement("div");

    div.className =

        "pppp-message " + sender;

    div.innerHTML = `

<div class="bubble">

${text}

</div>

`;

    box.appendChild(div);

    box.scrollTop = box.scrollHeight;

}

// ============================================
// Clear Messages
// ============================================

export function clearMessages() {

    const box = document.getElementById("chat-messages");

    if (box) {

        box.innerHTML = "";

    }

}

// ============================================
// Open
// ============================================

export function openChat() {

    if (!isOpen) {

        toggleChat();

    }

}

// ============================================
// Close
// ============================================

export function closeChat() {

    if (isOpen) {

        toggleChat();

    }

}

// ============================================
// Ready
// ============================================

console.log("PPPP UI Ready");