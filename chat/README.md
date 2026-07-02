# PPPP Chat System v4.0

A lightweight, modern, real-time live chat system built with **Firebase Authentication**, **Cloud Firestore**, and **Vanilla JavaScript**.

Designed for static websites including **GitHub Pages**.

---

# Features

- Real-time Chat
- Guest Visitor Support
- Firebase Authentication
- Admin Dashboard
- Firestore Database
- Typing Indicator
- Seen Status
- Online / Offline Status
- Browser Notification
- Upload Module Ready
- Mobile Responsive
- Modular Architecture

---

# Folder Structure

```
chat/
│
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

# Firebase Services

Enable the following services.

- Authentication
- Cloud Firestore
- Firebase Storage (Optional)

---

# Authentication

Enable at least:

- Anonymous
- Email / Password

Optional:

- Google
- Facebook
- GitHub

---

# Firestore Collections

```
admins
conversations
messages
users
typing
```

---

# Admin Setup

Create a document:

```
admins/{ADMIN_UID}
```

Example:

```
role : superadmin
name : Admin
email : admin@example.com
```

---

# Installation

Clone the repository.

```
git clone https://github.com/your-repository.git
```

Configure Firebase.

```
chat/config.js
```

Deploy Firestore Rules.

```
firebase deploy --only firestore:rules
```

---

# GitHub Pages

Include the chat widget.

```html
<link rel="stylesheet" href="chat/chat.css">

<script type="module" src="chat/chat.js"></script>
```

---

# Admin Panel

```
admin/login.html
```

Dashboard

```
admin/admin.html
```

---

# Required Files

```
chat/
admin/
firestore.rules
firebase.json
```

---

# Browser Support

- Chrome
- Firefox
- Edge
- Safari

---

# Version

```
Version 4.0
```

---

# License

This project is publicly available for viewing on GitHub.

Copyright © PPPP Bangladesh.

All rights reserved.