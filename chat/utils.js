// ============================================
// PPPP CHAT SYSTEM
// utils.js
// Version 4.0
// ============================================

import { chatConfig } from "./config.js";

// ============================================
// Visitor ID
// ============================================

export function getVisitorId() {

    let id = localStorage.getItem("pppp_visitor_id");

    if (!id) {

        id = crypto.randomUUID();

        localStorage.setItem("pppp_visitor_id", id);

    }

    return id;

}

// ============================================
// Local Storage
// ============================================

export function saveLocal(key, value) {

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

export function loadLocal(key, defaultValue = null) {

    const value = localStorage.getItem(key);

    if (!value) return defaultValue;

    try {

        return JSON.parse(value);

    }

    catch {

        return defaultValue;

    }

}

export function removeLocal(key) {

    localStorage.removeItem(key);

}

// ============================================
// Random ID
// ============================================

export function randomId(length = 20) {

    const chars =

        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {

        result += chars.charAt(

            Math.floor(Math.random() * chars.length)

        );

    }

    return result;

}

// ============================================
// Escape HTML
// ============================================

export function escapeHTML(text = "") {

    const div = document.createElement("div");

    div.innerText = text;

    return div.innerHTML;

}

// ============================================
// Date Time
// ============================================

export function formatDate(date) {

    if (!date) return "";

    const d =

        date.toDate

            ? date.toDate()

            : new Date(date);

    return d.toLocaleString();

}

// ============================================
// Scroll
// ============================================

export function scrollBottom(element) {

    if (!element) return;

    element.scrollTop = element.scrollHeight;

}

// ============================================
// Debounce
// ============================================

export function debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

// ============================================
// Image Validation
// ============================================

export function validateImage(file) {

    if (!file) {

        return {

            ok: false,

            message: "No file selected."

        };

    }

    if (

        !chatConfig.allowedImageTypes.includes(file.type)

    ) {

        return {

            ok: false,

            message: "Unsupported image format."

        };

    }

    if (

        file.size >

        chatConfig.maxImageSize

    ) {

        return {

            ok: false,

            message: "Maximum image size is 5 MB."

        };

    }

    return {

        ok: true,

        message: "OK"

    };

}

// ============================================
// Notification
// ============================================

export function notify(title, body = "") {

    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {

        new Notification(title, {

            body

        });

    }

}

// ============================================
// Request Notification Permission
// ============================================

export async function requestNotificationPermission() {

    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {

        await Notification.requestPermission();

    }

}