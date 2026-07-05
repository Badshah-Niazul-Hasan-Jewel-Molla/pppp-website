// ============================================
// PPPP CHAT SYSTEM
// utils.js
// Version 4.0.0 Final Stable
// ============================================

import { chatConfig } from "./config.js";

// ============================================
// Visitor ID
// ============================================

export function getVisitorId() {

    let id = localStorage.getItem("pppp_visitor_id");

    if (!id) {

        id = crypto.randomUUID
            ? crypto.randomUUID()
            : randomId(32);

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

export function clearLocal() {

    localStorage.clear();

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

    div.textContent = text;

    return div.innerHTML;

}

// ============================================
// Date & Time
// ============================================

export function formatDate(date) {

    if (!date) return "";

    const d =

        date?.toDate

            ? date.toDate()

            : new Date(date);

    return d.toLocaleString(

        chatConfig.locale,

        {

            timeZone: chatConfig.timeZone,

            year: "numeric",

            month: "short",

            day: "numeric",

            hour: "2-digit",

            minute: "2-digit"

        }

    );

}

// ============================================
// Scroll
// ============================================

export function scrollBottom(element) {

    if (!element) return;

    if (chatConfig.autoScroll) {

        element.scrollTop = element.scrollHeight;

    }

}

// ============================================
// Debounce
// ============================================

export function debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(

            () => callback(...args),

            delay

        );

    };

}

// ============================================
// Sleep
// ============================================

export function sleep(ms = 300) {

    return new Promise(

        resolve => setTimeout(resolve, ms)

    );

}

// ============================================
// Online Status
// ============================================

export function isOnline() {

    return navigator.onLine;

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

            message: "Maximum image size exceeded."

        };

    }

    return {

        ok: true,

        message: "OK"

    };

}

// ============================================
// Browser Notification
// ============================================

export function notify(title, body = "") {

    if (!chatConfig.allowNotifications) return;

    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {

        new Notification(title, {

            body,

            icon: chatConfig.notificationIcon

        });

    }

}

// ============================================
// Notification Permission
// ============================================

export async function requestNotificationPermission() {

    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {

        await Notification.requestPermission();

    }

}

// ============================================
// Play Notification Sound
// ============================================

export function playSound() {

    if (!chatConfig.enableSound) return;

    try {

        const audio = new Audio(

            chatConfig.notificationSound

        );

        audio.play().catch(() => {});

    }

    catch {}

}

// ============================================
// Logger
// ============================================

export function log(...args) {

    if (chatConfig.debug) {

        console.log(

            "[PPPP Chat]",

            ...args

        );

    }

}