// =====================================
// PPPP ADMIN AUTH
// Version 1.0
// =====================================

import {
    auth,
    signInWithEmailAndPassword,
    signInWithPopup,
    googleProvider,
    onAuthStateChanged,
    signOut
} from "../chat/firebase.js";

// ----------------------------
// Email Login
// ----------------------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        const message = document.getElementById("loginMessage");

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            window.location.href = "admin.html";

        }

        catch (error) {

            message.innerHTML = error.message;

        }

    });

}

// ----------------------------
// Google Login
// ----------------------------

const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {

    googleBtn.addEventListener("click", async () => {

        try {

            await signInWithPopup(
                auth,
                googleProvider
            );

            window.location.href = "admin.html";

        }

        catch (error) {

            document.getElementById("loginMessage").innerHTML =
                error.message;

        }

    });

}

// ----------------------------
// Check Login
// ----------------------------

onAuthStateChanged(auth, (user) => {

    if (!user) {

        if (
            !window.location.pathname.endsWith("login.html")
        ) {

            window.location.href = "login.html";

        }

    }

});

// ----------------------------
// Logout
// ----------------------------

window.logout = async function () {

    await signOut(auth);

    window.location.href = "login.html";

};
