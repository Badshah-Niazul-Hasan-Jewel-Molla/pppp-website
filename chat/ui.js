// ============================================
// PPPP CHAT SYSTEM
// ui.js
// Final Version v1.0
// ============================================

export function createChatWidget() {

    if (document.getElementById("pppp-chat-widget")) return;

    document.body.insertAdjacentHTML("beforeend", `

<div id="pppp-chat-widget">

    <!-- Floating Button -->

    <button id="pppp-chat-button">

        💬

        <span id="chat-notification" class="hidden">0</span>

    </button>

    <!-- Chat Window -->

    <div id="pppp-chat-window" class="hidden">

        <div class="chat-header">

            <div class="chat-header-left">

                <div class="chat-avatar">

                    PPPP

                </div>

                <div>

                    <div class="chat-title">

                        People's Power & Peace Party

                    </div>

                    <div
                        id="chat-status"
                        class="chat-status">

                        🟢 Online

                    </div>

                </div>

            </div>

            <button id="pppp-chat-close">

                ✕

            </button>

        </div>

        <div id="chat-messages">

        </div>

        <div
            id="typing-indicator"
            class="hidden">

            Admin is typing...

        </div>

        <div class="chat-input">

            <button
                id="emoji-btn"
                title="Emoji">

                😊

            </button>

            <button
                id="upload-btn"
                title="Upload">

                📎

            </button>

            <input
                type="file"
                id="image-upload"
                accept="image/*"
                hidden
            >

            <input
                type="text"
                id="chat-text"
                placeholder="Write your message..."
                autocomplete="off"
            >

            <button
                id="voice-btn"
                title="Voice">

                🎤

            </button>

            <button
                id="chat-send">

                ➤

            </button>

        </div>

    </div>

</div>

`);

}

export function bindUIEvents() {

    const button = document.getElementById("pppp-chat-button");

    const windowBox = document.getElementById("pppp-chat-window");

    const close = document.getElementById("pppp-chat-close");

    const upload = document.getElementById("upload-btn");

    const image = document.getElementById("image-upload");

    button.onclick = () => {

        windowBox.classList.remove("hidden");

    };

    close.onclick = () => {

        windowBox.classList.add("hidden");

    };

    upload.onclick = () => {

        image.click();

    };

}

export function showTyping(show = true) {

    const typing = document.getElementById("typing-indicator");

    if (!typing) return;

    typing.classList.toggle("hidden", !show);

}

export function setStatus(text) {

    const status = document.getElementById("chat-status");

    if (!status) return;

    status.textContent = text;

}

export function setNotification(count) {

    const badge = document.getElementById("chat-notification");

    if (!badge) return;

    if (count <= 0) {

        badge.classList.add("hidden");

        return;

    }

    badge.classList.remove("hidden");

    badge.textContent = count;

}