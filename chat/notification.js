// ============================================
// PPPP CHAT SYSTEM
// notification.js
// Version 4.0
// ============================================

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

    icon = ""

) {

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

export function playNotificationSound(

    file = "./notification.mp3"

) {

    try {

        if (!audio) {

            audio = new Audio(file);

        }

        audio.currentTime = 0;

        audio.play().catch(()=>{});

    }

    catch(e){

        console.log(e);

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

    blinkInterval = setInterval(()=>{

        document.title =

            document.title === originalTitle

            ? text

            : originalTitle;

    },1000);

}

// ============================================
// Stop Blink
// ============================================

export function stopTitleBlink(){

    if(blinkInterval){

        clearInterval(blinkInterval);

        blinkInterval = null;

    }

    document.title = originalTitle;

}

// ============================================
// Window Focus
// ============================================

window.addEventListener("focus",()=>{

    stopTitleBlink();

});

// ============================================
// New Message Helper
// ============================================

export function notifyNewMessage(message){

    showNotification(

        "PPPP Chat",

        message

    );

    playNotificationSound();

    startTitleBlink();

}

// ============================================
// Ready
// ============================================

console.log("PPPP Notification Ready");
