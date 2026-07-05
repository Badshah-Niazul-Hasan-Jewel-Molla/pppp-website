// ============================================
// PPPP CHAT SYSTEM
// chat-loader.js
// Version 4.0.0 Final Stable
// ============================================

(function () {

    "use strict";

    // ============================================
    // Prevent Duplicate Loading
    // ============================================

    if (window.__PPPP_CHAT_LOADED__) {

        return;

    }

    window.__PPPP_CHAT_LOADED__ = true;

    // ============================================
    // Load CSS
    // ============================================

    if (!document.querySelector('link[data-pppp-chat-css]')) {

        const css = document.createElement("link");

        css.rel = "stylesheet";

        css.href = "./chat/chat.css";

        css.dataset.ppppChatCss = "true";

        css.onerror = () => {

            console.error("PPPP Chat CSS failed to load.");

        };

        document.head.appendChild(css);

    }

    // ============================================
    // Load Script
    // ============================================

    if (!document.querySelector('script[data-pppp-chat-js]')) {

        const script = document.createElement("script");

        script.type = "module";

        script.defer = true;

        script.src = "./chat/chat.js";

        script.dataset.ppppChatJs = "true";

        script.onerror = () => {

            console.error("PPPP Chat JS failed to load.");

        };

        document.body.appendChild(script);

    }

    // ============================================
    // Ready
    // ============================================

    console.log("PPPP Chat Loader Ready");

})();