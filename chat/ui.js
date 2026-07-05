// ============================================
// PPPP CHAT SYSTEM
// ui.js
// Version 4.0.0 Final Stable
// ============================================

import { chatConfig } from "./config.js";

import { escapeHTML } from "./utils.js";

import { playNotificationSound } from "./notification.js";

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

    <img src="${chatConfig.logo}" alt="PPPP">

</div>

<div id="pppp-chat-window" class="pppp-chat-window">

    <div class="pppp-chat-header">

        <div class="header-info">

            <img
                class="avatar"
                src="${chatConfig.avatar}"
                alt="PPPP"
            >

            <div>

                <div class="title">

                    ${chatConfig.appName}

                </div>

                <div
                    id="chat-status"
                    class="status"
                >

                    🟢 Online

                </div>

            </div>

        </div>

        <button id="chat-close">

            ✕

        </button>

    </div>

    <div
        id="chat-messages"
        class="pppp-chat-messages"
    >

    </div>

    <div
        id="chat-typing"
        class="pppp-chat-typing"
    >

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

    document

        .getElementById("pppp-chat-button")

        ?.addEventListener("click", toggleChat);

    document

        .getElementById("chat-close")

        ?.addEventListener("click", toggleChat);

}

// ============================================
// Toggle
// ============================================

export function toggleChat() {

    const win = document.getElementById("pppp-chat-window");

    if (!win) return;

    isOpen = !isOpen;

    win.classList.toggle("open", isOpen);

}

// ============================================
// Status
// ============================================

export function setStatus(text) {

    const status = document.getElementById("chat-status");

    if (status) {

        status.textContent = text;

    }

}

// ============================================
// Typing
// ============================================

export function showTyping(show = true) {

    const typing = document.getElementById("chat-typing");

    if (!typing) return;

    typing.textContent =

        show

            ? "Admin is typing..."

            : "";

}

// ============================================
// Add Message
// ============================================

export function addMessage(

    text,

    sender = "visitor"

) {

    const box = document.getElementById("chat-messages");

    if (!box) return;

    const div = document.createElement("div");

    div.className = `pppp-message ${sender}`;

    div.innerHTML = `

<div class="bubble">

${escapeHTML(text)}

</div>

`;

    box.appendChild(div);

    box.scrollTop = box.scrollHeight;

    if (

        sender === "admin" &&

        !isOpen

    ) {

        playNotificationSound();

    }

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
// Widget State
// ============================================

export function isChatOpen() {

    return isOpen;

}

// ============================================
// Ready
// ============================================

console.log("PPPP UI Ready");