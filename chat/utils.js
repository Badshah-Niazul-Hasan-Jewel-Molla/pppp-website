// =====================================
// PPPP CHAT - Utility Functions
// Version 1.0
// =====================================

// Generate Visitor ID
export function getVisitorId() {

    let visitorId = localStorage.getItem("pppp_visitor_id");

    if (!visitorId) {

        visitorId = crypto.randomUUID();

        localStorage.setItem("pppp_visitor_id", visitorId);
    }

    return visitorId;
}

// Save Data
export function save(key, value) {

    localStorage.setItem(key, JSON.stringify(value));
}

// Load Data
export function load(key) {

    const value = localStorage.getItem(key);

    if (!value) return null;

    return JSON.parse(value);
}

// Current Time
export function now() {

    return new Date().toLocaleTimeString([], {

        hour: "2-digit",
        minute: "2-digit"

    });

}

// Current Date
export function today() {

    return new Date().toLocaleDateString();

}

// Random ID
export function randomId(length = 20) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let id = "";

    for (let i = 0; i < length; i++) {

        id += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );

    }

    return id;

}

// Scroll Bottom
export function scrollBottom(element) {

    element.scrollTop = element.scrollHeight;

}

// Escape HTML
export function escapeHTML(text) {

    const div = document.createElement("div");

    div.innerText = text;

    return div.innerHTML;

}
