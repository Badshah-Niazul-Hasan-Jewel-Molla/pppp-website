# 💬 PPPP Chat Admin Panel v4.0.0

The **PPPP Chat Admin Panel** is the secure dashboard for managing visitor conversations in real time.

Built with **Firebase Authentication**, **Cloud Firestore**, and **Vanilla JavaScript**.

---

# 📖 Table of Contents

- Features
- Folder Structure
- Requirements
- Authentication
- Firestore
- Admin Roles
- Login
- Dashboard
- Deployment
- Security
- Browser Support
- Version
- License

---

# ✨ Features

🔐 Secure Admin Login
👥 Multi-Admin Support
💬 Real-time Visitor Messages
📤 Send Reply
⌨️ Typing Indicator
👁️ Seen Status
🟢 Online / Offline Status
📋 Conversation List
🔍 Search Conversations
📱 Mobile Friendly
☁️ Cloud Firestore Integration

---

# 📂 Folder Structure

```text
pppp_bangladesh/
│
├── index.html
├── about.html
├── contact.html
│
├── chat/
│   ├── assets/
│   │   ├── logo.svg
│   │   ├── avatar.svg
│   │   ├── loading.svg
│   │   └── notification.mp3
│   │
│   ├── chat-loader.js
│   ├── chat.html
│   ├── chat.css
│   ├── chat.js
│   ├── auth.js
│   ├── ui.js
│   ├── utils.js
│   ├── config.js
│   ├── firebase.js
│   ├── realtime.js
│   ├── messageService.js
│   ├── upload.js
│   ├── notification.js
│   ├── state.js
│   └── README.md
│
├── admin/
│   ├── login.html
│   ├── admin.html
│   ├── admin.css
│   ├── admin.js
│   ├── auth.js
│   └── README.md
│
├── firestore.rules
├── firestore.indexes.json
├── storage.rules
├── firebase.json
└── README.md
```

---

# 🔥 Requirements

Enable the following Firebase services.

- Authentication
- Cloud Firestore
- Firebase Storage

---

# 🔐 Authentication

Enable:

- Email / Password

Optional:

- Google Sign-In

---

# 🗂️ Firestore

Required Collection

```text
admins
```

Document ID

```text
Firebase Authentication UID
```

Example

```text
admins/
└── ABC123456789XYZ
```

Fields

```text
name: Super Admin
email: admin@example.com
role: superadmin
active: true
createdAt: serverTimestamp()
```

---

# 👥 Admin Roles

Supported roles:

```text
superadmin
admin
moderator
support
```

---

# 🔑 Login

Open:

```text
admin/login.html
```

Login using your Firebase Authentication account.

---

# 🖥️ Dashboard

After successful login:

```text
admin/admin.html
```

From the dashboard you can:

- View conversations
- Reply to visitors
- Monitor typing status
- Mark messages as seen
- Track visitor activity

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

# 🔒 Security

Only authenticated users whose **UID exists in the `admins` collection** can access the Admin Panel.

All other users are denied access.

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

📦 Version 4.0.0 (Stable Release)

---

# 📄 License

This module is part of the PPPP Chat System.

Copyright © 2014–Present PPPP Bangladesh.

All rights reserved.