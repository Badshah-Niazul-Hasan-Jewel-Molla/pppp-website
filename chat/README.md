# 💬 PPPP Chat System v1.0.0

📘 A lightweight, modern, real-time live chat system built with **Firebase Authentication**, **Cloud Firestore**, **Firebase Storage**, and **Vanilla JavaScript**.

🌐 Designed for static hosting platforms like **GitHub Pages**.

---

# 📖 Table of Contents

✨ Features  
📂 Folder Structure  
🔥 Firebase Services  
🔐 Authentication  
🗂️ Firestore Collections  
👨‍💼 Admin Setup  
⚙️ Installation  
🚀 Deployment  
🌐 GitHub Pages Integration  
💻 Standalone Chat Page  
🛡️ Admin Panel  
📦 Required Files  
🌍 Browser Support  
📌 Version  
⚖️ License  

---

# ✨ Features

💬 Real-time Chat  
👤 Guest Visitor Support  
🔐 Firebase Authentication  
🛡️ Admin Dashboard  
☁️ Cloud Firestore Database  
📦 Firebase Storage Support  
⌨️ Typing Indicator  
👀 Seen Status  
🟢 Online / Offline Status  
🔔 Browser Notifications  
📎 File & Image Upload  
📱 Mobile Responsive  
🧩 Modular Architecture  
🚀 GitHub Pages Ready  

---

# 👥 PPPP Chat Structure

<pre>
chat/
│
├── 📄 chat.html
├── 🎨 chat.css
├── ⚡ chat-loader.js
├── 💬 chat.js
├── 🔐 auth.js
├── 🖥️ ui.js
├── 🛠️ utils.js
├── ⚙️ config.js
├── 🔥 firebase.js
├── ☁️ realtime.js
├── ✉️ messageService.js
├── 📤 upload.js
├── 🔔 notification.js
├── 📊 state.js
├── 📖 README.md
│
└── 📁 assets/
    │
    ├── 🖼️ logo.svg
    ├── 👤 avatar.svg
    ├── ⏳ loading.svg
    └── 🔊 notification.mp3
</pre>

---

# 🔥 Firebase Services

⚡ Enable the following Firebase services:

🔐 Authentication  
☁️ Cloud Firestore  
📦 Firebase Storage  

---

# 🔐 Authentication

⚡ Enable:

👤 Anonymous  
📧 Email / Password  

✨ Optional:

🔵 Google  
🐙 GitHub  
📘 Facebook  

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

📌 Create a document inside:

```text
admins/{ADMIN_UID}
```

📝 Example:

```text
name: Super Admin
email: admin@example.com
role: superadmin
active: true
```

---

# ⚙️ Installation

📥 Clone repository:

```bash
git clone https://github.com/<your-username>/<repository>.git
```

⚙️ Configure Firebase:

```text
chat/config.js
```

---

# 🚀 Deployment

🔥 Firestore Rules

```bash
firebase deploy --only firestore:rules
```

📊 Firestore Indexes

```bash
firebase deploy --only firestore:indexes
```

📦 Storage Rules

```bash
firebase deploy --only storage
```

---

# 🌐 GitHub Pages Integration

📌 Add this before `</body>` in public pages:

```html
<script type="module" src="chat/chat-loader.js"></script>
```

✨ This automatically:

⚡ Loads chat.css  
⚡ Loads chat.js  
⚡ Initializes chat widget  
⚡ Enables PPPP Chat system  

---

# 💻 Standalone Chat Page

```text
chat/chat.html
```

---

# 🛡️ Admin Panel

🔐 Login Page:

```text
admin/login.html
```

🖥️ Dashboard:

```text
admin/admin.html
```

---

# 📦 Required Files

<pre>
chat/
admin/
firestore.rules
firestore.indexes.json
storage.rules
firebase.json
</pre>

---

# 🌍 Browser Support

🌐 Google Chrome  
🦊 Mozilla Firefox  
🔷 Microsoft Edge  
🧭 Safari  
🦁 Brave  
🎭 Opera  

---

# 📌 Version

📦 Version 1.0.0

---

# ⚖️ License

📘 This project is publicly available on GitHub.

© 2014–Present  
**People's Power & Peace Party (PPPP) Bangladesh**  
All rights reserved.