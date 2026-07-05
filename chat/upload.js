// ============================================
// PPPP CHAT SYSTEM
// upload.js
// Version 4.0.0 Final Stable
// ============================================

import {

    storage,

    ref,

    uploadBytesResumable,

    getDownloadURL

} from "./firebase.js";

import { chatConfig } from "./config.js";

import { log } from "./utils.js";

// ============================================
// Validation
// ============================================

export function validateFile(file, imageOnly = false) {

    if (!chatConfig.allowImageUpload) {

        throw new Error("Image upload is disabled.");

    }

    if (!storage) {

        throw new Error("Firebase Storage is not configured.");

    }

    if (!file) {

        throw new Error("No file selected.");

    }

    if (

        file.size >

        chatConfig.maxImageSize

    ) {

        throw new Error(

            "Maximum file size exceeded."

        );

    }

    if (

        imageOnly &&

        !chatConfig.allowedImageTypes.includes(file.type)

    ) {

        throw new Error(

            "Unsupported image format."

        );

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

    const storageRef = ref(

        storage,

        path

    );

    const task = uploadBytesResumable(

        storageRef,

        file

    );

    return new Promise(

        (resolve, reject) => {

            task.on(

                "state_changed",

                snapshot => {

                    const progress = Math.round(

                        snapshot.bytesTransferred /

                        snapshot.totalBytes *

                        100

                    );

                    onProgress(progress);

                },

                error => {

                    log(error);

                    reject(error);

                },

                async () => {

                    const url =

                        await getDownloadURL(

                            task.snapshot.ref

                        );

                    resolve({

                        path,

                        url

                    });

                }

            );

        }

    );

}

// ============================================
// Upload File
// ============================================

export function uploadFile(

    conversationId,

    file,

    onProgress = () => {}

) {

    return uploadImage(

        conversationId,

        file,

        onProgress

    );

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
// Future
// ============================================

export async function compressImage(file) {

    log(

        "Image compression will be available in Version 4.1"

    );

    return file;

}

// ============================================
// Ready
// ============================================

log("PPPP Upload Service Ready");