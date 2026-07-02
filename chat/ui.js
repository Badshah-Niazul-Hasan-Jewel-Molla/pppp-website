// ======================================
// PPPP CHAT UI
// Version 1.0
// ======================================

export function createChatWidget() {

    if (document.getElementById("pppp-chat-widget")) return;

    document.body.insertAdjacentHTML("beforeend", `

<div id="pppp-chat-widget">

    <button id="pppp-chat-button">

        💬

    </button>

    <div id="pppp-chat-window" class="hidden">

        <div class="chat-header">

            <div class="chat-title">

                People's Power & Peace Party

            </div>

            <button id="pppp-chat-close">

                ✕

            </button>

        </div>

        <div id="chat-messages">

        </div>

        <div class="chat-input">

            <input
                type="text"
                id="chat-text"
                placeholder="Type your message..."
                autocomplete="off"
            >

            <button id="chat-send">

                ➤

            </button>

        </div>

    </div>

</div>

`);

}

export function openChat() {

    document
        .getElementById("pppp-chat-window")
        .classList.remove("hidden");

}

export function closeChat() {

    document
        .getElementById("pppp-chat-window")
        .classList.add("hidden");

}

export function bindUIEvents() {

    document
        .getElementById("pppp-chat-button")
        .onclick = openChat;

    document
        .getElementById("pppp-chat-close")
        .onclick = closeChat;

}
