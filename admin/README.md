# 🛡️ PPPP Chat Admin Panel

PPPP Chat Admin Panel is the secure dashboard for managing visitor conversations in real time.

---

# Features

- Secure Admin Login
- Firebase Authentication
- Real-time Visitor Messages
- Send Reply
- Typing Indicator
- Seen Status
- Online / Offline Status
- Conversation List
- Mobile Friendly
- Firestore Integration

---

# Folder Structure

```
admin/
│
├── login.html
├── admin.html
├── admin.css
├── admin.js
├── auth.js
└── README.md
```

---

# Requirements

Enable Firebase Authentication.

Supported providers

- Email / Password
- Google (Optional)

---

# Firestore

Required Collection

```
admins
```

Document ID

```
Firebase Authentication UID
```

Example

```
admins/
    ABC123456789
```

Fields

```
name
email
role
active
createdAt
```

Example

```
name : Super Admin
email : admin@pppp.org
role : superadmin
active : true
```

---

# Login

```
admin/login.html
```

---

# Dashboard

```
admin/admin.html
```

---

# Security

Only users whose UID exists in the **admins** collection can access the Admin Panel.

All other authenticated users are denied access.

---

# Recommended Roles

```
superadmin
admin
moderator
support
```

---

# Deployment Checklist

- Enable Firebase Authentication
- Deploy Firestore Rules
- Deploy Storage Rules
- Deploy Firestore Indexes
- Create the first Admin document
- Test Login
- Test Visitor Chat
- Test Admin Reply

---

# Version

```
Version 4.0
```

---

# License

This module is part of the PPPP Chat System.

Copyright © PPPP Bangladesh.

All rights reserved.
