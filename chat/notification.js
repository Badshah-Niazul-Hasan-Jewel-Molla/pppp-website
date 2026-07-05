// ============================================
// PPPP CHAT SYSTEM
// notification.js
// Version 4.0.0 Final Stable
// ============================================

import { chatConfig } from "./config.js";

import { log } from "./utils.js";

// ============================================
// State
// ============================================

let notificationPermission = false;

let originalTitle = document.title;

let blinkInterval = null;

let audio = null;

// ============================================
// Request Permission
// ============================================

export async function requestNotificationPermission() {

    if (!("Notification" in window)) {

        return false;

    }

    if (Notification.permission === "granted") {

        notificationPermission = true;

        return true;

    }

    const permission = await Notification.requestPermission();

    notificationPermission = permission === "granted";

    return notificationPermission;

}

// ============================================
// Browser Notification
// ============================================

export function showNotification(

    title,

    body,

    icon = chatConfig.logo

) {

    if (!chatConfig.allowNotifications) return;

    if (!notificationPermission) return;

    if (document.hasFocus()) return;

    new Notification(title, {

        body,

        icon,

        silent: false

    });

}

// ============================================
// Sound Notification
// ============================================

export function playNotificationSound() {

    if (!chatConfig.enableSound) return;

    try {

        if (!audio) {

            audio = new Audio(

                chatConfig.notificationSound

            );

        }

        audio.currentTime = 0;

        audio.play().catch(() => {});

    }

    catch (error) {

        log(error);

    }

}

// ============================================
// Page Title Blink
// ============================================

export function startTitleBlink(

    text = "💬 New Message"

) {

    if (document.hasFocus()) return;

    stopTitleBlink();

    blinkInterval = setInterval(() => {

        document.title =

            document.title === originalTitle

                ? text

                : originalTitle;

    }, 1000);

}

// ============================================
// Stop Title Blink
// ============================================

export function stopTitleBlink() {

    if (blinkInterval) {

        clearInterval(blinkInterval);

        blinkInterval = null;

    }

    document.title = originalTitle;

}

// ============================================
// Window Focus
// ============================================

window.addEventListener(

    "focus",

    () => {

        stopTitleBlink();

    }

);

// ============================================
// New Message Notification
// ============================================

export function notifyNewMessage(message) {

    showNotification(

        chatConfig.appName,

        message

    );

    playNotificationSound();

    startTitleBlink();

}

// ============================================
// Ready
// ============================================

log("PPPP Notification Ready");