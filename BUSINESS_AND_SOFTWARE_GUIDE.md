# 🛵 KodadEats (కొదాడ ఈట్స్) - Complete Business, Software & Deployment Guide

Welcome to your food delivery business roadmap for **Kodad, Telangana**! This guide details all the software, business setup, multi-role portals (Customer, Restaurant Partner, Captain Rider, Admin), real-time notification mechanics, and hosting steps.

---

## 🏷️ 1. Brand Identity & Colors

| Property | Details |
| :--- | :--- |
| **Brand Name** | **KodadEats** *(కొదాడ ఈట్స్)* |
| **Theme & Logo** | **Electric Royal Blue Scooter (🛵)** with clean, appetizing light backgrounds (`#f8fafc` / `#ffffff`) |
| **Local Appeal** | *కొదాడ నంబర్ 1 ఫుడ్ డెలివరీ (Kodad's #1 Food App)* |

---

## 👥 2. Multi-Role Portal Architecture

The platform has 4 isolated roles tailored for commercial operation:

1. **Customer App (`/index.html`):**
   - Clean Zomato-style interface.
   - **NO admin or captain tabs visible** to customers.
   - Profile avatar with initial letter (e.g., `R` for Ravi Teja).
   - Location icon 📍 with Kodad landmark selector.
   - Zomato-style floating bottom checkout bar.
   - **Interactive Live GPS Route Map (Leaflet.js)** showing scooter moving from restaurant to house in Kodad.

2. **Restaurant Partner Kitchen Portal (`/restaurant.html`):**
   - Dedicated kitchen dashboard for local restaurant owners (e.g. *Kodad Biryani House, Sri Raghavendra Tiffins*).
   - **Loud Kitchen Buzzer** rings when an order is placed for their kitchen.
   - One-tap "Accept & Start Cooking (15m / 25m)" or "Reject".
   - Shows food items in extra-large fonts for cooks with customer address and pickup rider name.

3. **Captain / Rider Portal (`/captain.html`):**
   - Delivery partner interface.
   - Duty On/Off toggle.
   - **Live Kodad GPS Route Map** showing pickup restaurant and customer drop landmark.
   - One-click "Call Customer" & "WhatsApp Customer".
   - Step actions: "Picked Up from Kitchen" ➔ "Delivered to Customer".

4. **Admin Central Command Center (`/admin.html`):**
   - Realtime radar of all Kodad town operations.
   - Live Leaflet map displaying all 5 restaurants and active riders.
   - Loud incoming siren alert for every placed order.
   - 1-click **WhatsApp Order Dispatch** to riders.
   - Customer CRM database and menu stock toggle.

---

## 💻 3. Software You Need on Your Laptop

1. **Node.js (LTS Version):** Download free from [nodejs.org](https://nodejs.org/).
2. **VS Code (Visual Studio Code):** Download from [code.visualstudio.com](https://code.visualstudio.com/).
3. **Git for Windows:** Download from [git-scm.com](https://git-scm.com/).
4. **Cloud Database (MongoDB Atlas):** Active at `cluster0.au8wsnf.mongodb.net`.
5. **Cloud Hosting (Render.com):** Runs your backend 24/7 in the cloud.

---

## 🌐 4. Realtime Notification Flow

```
[Customer in Kodad]
   │ Places Order (Chicken Dum Biryani)
   ▼
[Realtime WebSocket Engine]
   ├─► 👨‍🍳 [Restaurant Kitchen]: Loud kitchen buzzer rings!
   │      - Chef clicks "Accept (20 min prep)".
   │
   ├─► ⚡ [Admin Dashboard]: Loud siren rings!
   │      - Admin assigns Captain Ramesh G. (Hero Splendor).
   │      - Clicks "WhatsApp Dispatch" to send instant details.
   │
   ├─► 🛵 [Captain / Rider App]: Loud dispatch chime rings on phone!
   │      - Map shows route: Khammam X Road ➔ Balaji Nagar.
   │      - Rider picks up food & delivers.
   │
   └─► 📱 [Customer Screen]: Live Kodad Leaflet Map shows scooter moving to house!
```

---

## 📱 5. Hardware & Business Equipment

1. **Your Laptop / Phone:** Central operations command center.
2. **Delivery Captain Equipment:** Two-wheeler (Splendor, Activa, etc.), Android smartphone, and insulated thermal delivery bag.
3. **Payment Collection:** PhonePe / Google Pay QR standee for delivery riders so customers can scan and pay upon arrival.
