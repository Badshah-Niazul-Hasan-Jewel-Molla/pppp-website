// ============================================
// PPPP CHAT SYSTEM
// chat-loader.js
// Version 4.0
// ============================================

(function () {

    // Prevent duplicate loading
    if (window.__PPPP_CHAT_LOADED__) {

        return;

    }

    window.__PPPP_CHAT_LOADED__ = true;

    // ============================================
    // Load CSS
    // ============================================

    const css = document.createElement("link");

    css.rel = "stylesheet";

    css.href = "./chat/chat.css";

    document.head.appendChild(css);

    // ============================================
    // Load Chat Script
    // ============================================

    const script = document.createElement("script");

    script.type = "module";

    script.src = "./chat/chat.js";

    document.body.appendChild(script);

})();
