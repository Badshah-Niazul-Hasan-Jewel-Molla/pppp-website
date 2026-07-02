# 💬 PPPP Chat System v4.0.0

A lightweight, modern, real-time live chat system built with **Firebase Authentication**, **Cloud Firestore**, **Firebase Storage**, and **Vanilla JavaScript**.

Designed for static websites, including **GitHub Pages**.

---

# 📖 Table of Contents

- Features
- Folder Structure
- Firebase Services
- Authentication
- Firestore Collections
- Admin Setup
- Installation
- Deployment
- GitHub Pages Integration
- Browser Support
- Version
- License

---

# ✨ Features

- 💬 Real-time Chat
- 👤 Guest Visitor Support
- 🔐 Firebase Authentication
- 🛡️ Admin Dashboard
- ☁️ Cloud Firestore Database
- 📁 Firebase Storage Support
- ⌨️ Typing Indicator
- 👁️ Seen Status
- 🟢 Online / Offline Status
- 🔔 Browser Notification
- 📎 File & Image Upload
- 📱 Mobile Responsive
- 🧩 Modular Architecture
- 🚀 GitHub Pages Ready

---

# 📂 Folder Structure

```text
chat/
│
├── chat-loader.js
├── chat.html
├── chat.css
├── chat.js
├── auth.js
├── ui.js
├── utils.js
├── config.js
├── firebase.js
├── realtime.js
├── messageService.js
├── upload.js
├── notification.js
├── state.js
└── README.md
```

---

# 🔥 Firebase Services

Enable the following Firebase services.

- Authentication
- Cloud Firestore
- Firebase Storage

---

# 🔐 Authentication

Enable at least:

- Anonymous
- Email / Password

Optional:

- Google
- GitHub
- Facebook

---

# 🗂️ Firestore Collections

```text
admins
conversations
messages
typing
users
```

---

# 👨‍💼 Admin Setup

Create a document inside the **admins** collection.

```text
admins/{ADMIN_UID}
```

Example:

```text
name: Super Admin
email: admin@example.com
role: superadmin
active: true
```

---

# ⚙️ Installation

Clone the repository.

```bash
git clone https://github.com/<your-username>/<repository>.git
```

Configure Firebase.

```text
chat/config.js
```

---

# 🚀 Deployment

Deploy Firestore Rules.

```bash
firebase deploy --only firestore:rules
```

Deploy Firestore Indexes.

```bash
firebase deploy --only firestore:indexes
```

Deploy Storage Rules.

```bash
firebase deploy --only storage
```

---

# 🌐 GitHub Pages Integration

Add the following line before the closing `</body>` tag on every public page.

```html
<script type="module" src="chat/chat-loader.js"></script>
```

The loader automatically:

- Loads `chat.css`
- Loads `chat.js`
- Creates the chat widget
- Initializes PPPP Chat

---

# 💻 Standalone Chat Page

You can also access the chat directly.

```text
chat/chat.html
```

---

# 🛡️ Admin Panel

Login Page

```text
admin/login.html
```

Dashboard

```text
admin/admin.html
```

---

# 📦 Required Files

```text
chat/
admin/
firestore.rules
firestore.indexes.json
storage.rules
firebase.json
```

---

# 🌍 Browser Support

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Brave
- Opera

---

# 📌 Version

```text
Version 4.0.0
```

---

# 📄 License

This project is publicly available on GitHub.

Copyright © 2014-Present PPPP Bangladesh.

All rights reserved.