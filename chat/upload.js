// ============================================
// PPPP CHAT SYSTEM
// upload.js
// Version 4.0
// ============================================

import {
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "./firebase.js";

// ============================================
// Configuration
// ============================================

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];

const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "text/plain",
    "application/zip"
];

// ============================================
// Validation
// ============================================

export function validateFile(file, imageOnly = false) {

    if (!file) {

        throw new Error("No file selected.");

    }

    if (file.size > MAX_FILE_SIZE) {

        throw new Error("Maximum file size is 10MB.");

    }

    if (imageOnly) {

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {

            throw new Error("Unsupported image format.");

        }

    }

    return true;

}

// ============================================
// Upload Image
// ============================================

export function uploadImage(

    conversationId,

    file,

    onProgress = () => {}

) {

    validateFile(file, true);

    const path =

        `chat-images/${conversationId}/${Date.now()}-${file.name}`;

    const storageRef = ref(storage, path);

    const task = uploadBytesResumable(

        storageRef,

        file

    );

    return new Promise((resolve, reject) => {

        task.on(

            "state_changed",

            (snapshot) => {

                const progress =

                    Math.round(

                        (snapshot.bytesTransferred /

                        snapshot.totalBytes) * 100

                    );

                onProgress(progress);

            },

            reject,

            async () => {

                const url =

                    await getDownloadURL(task.snapshot.ref);

                resolve({

                    path,

                    url

                });

            }

        );

    });

}

// ============================================
// Upload File
// ============================================

export function uploadFile(

    conversationId,

    file,

    onProgress = () => {}

) {

    validateFile(file);

    const path =

        `chat-files/${conversationId}/${Date.now()}-${file.name}`;

    const storageRef = ref(storage, path);

    const task = uploadBytesResumable(

        storageRef,

        file

    );

    return new Promise((resolve, reject) => {

        task.on(

            "state_changed",

            (snapshot) => {

                const progress =

                    Math.round(

                        (snapshot.bytesTransferred /

                        snapshot.totalBytes) * 100

                    );

                onProgress(progress);

            },

            reject,

            async () => {

                const url =

                    await getDownloadURL(task.snapshot.ref);

                resolve({

                    path,

                    url

                });

            }

        );

    });

}

// ============================================
// File Information
// ============================================

export function getFileInfo(file) {

    return {

        name: file.name,

        size: file.size,

        type: file.type,

        lastModified: file.lastModified

    };

}

// ============================================
// Future Placeholder
// ============================================

export async function compressImage(file) {

    console.warn(

        "Image compression will be available in Version 4.1"

    );

    return file;

}

// ============================================
// Ready
// ============================================

console.log("PPPP Upload Service Ready");
