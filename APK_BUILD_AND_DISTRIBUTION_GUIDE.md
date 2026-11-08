# 📱 KodadEats - Real SMS OTP, Android APK Build & PhonePe Indus Appstore Guide

This guide explains how to:
1. Deliver **real SMS OTPs** directly to mobile phones like Zomato & Swiggy.
2. Turn KodadEats into a **proper installable Mobile App (with APK)** instead of just a website.
3. Publish KodadEats on **PhonePe's Indus Appstore** and **PhonePe Mini Apps**.
4. Operate the complete **Restaurant Partner (Kitchen) Portal** (`restaurant.html`).

---

## 1. 💬 Real SMS OTP Setup (Zomato & Swiggy Style)

To send real SMS to mobile phones in India, you need an SMS Gateway API key. KodadEats has built-in native integration for **Fast2SMS** (India's easiest & most affordable SMS gateway, ~₹0.15/SMS).

### Quick Setup (3 Minutes):
1. Go to [https://www.fast2sms.com](https://www.fast2sms.com) and create a free account.
2. Under **Dev API** / **Settings**, copy your **API Authorization Key**.
3. Open the `.env` file in the project folder and paste your key:
   ```env
   FAST2SMS_API_KEY=paste_your_fast2sms_api_key_here
   ```
4. Restart the server (`npm start` or `node server.js`).
5. **Done!** Whenever a customer or captain enters their 10-digit mobile number, Fast2SMS will deliver a real SMS OTP directly to their phone.
6. **Native WebOTP Auto-Fill**: On Android devices running Chrome, when the SMS arrives, Android automatically pops up: *"Auto-fill code from SMS?"* and auto-types the 6 digits—exactly like Zomato!

---

## 2. 📲 Turning KodadEats into a Proper Mobile App (Not a Website)

You don't want customers typing `localhost` or opening a website URL with a browser address bar. You want an **app installed on their phone home screen with the Scooty icon**.

There are 2 official ways to do this:

### Option A: 1-Tap Direct Install (Progressive Web App - PWA)
KodadEats has a fully configured Service Worker (`sw.js`) and Web Manifest (`manifest.json`).
1. Host your project online for free on **Vercel** (`npx vercel`), **Render**, or **Netlify**.
2. You get a clean link: `https://kodadeats.vercel.app`.
3. When customers open this link on their Android phone:
   - A floating prompt pops up: **"📲 Install KodadEats App"**.
   - They tap **Install**, and the app is installed directly on their phone home screen!
   - When opened, it runs in **standalone app mode**: NO browser URL bar, full screen, offline support, and smooth app animations.

### Option B: Build a Real Android `.apk` File (`KodadEats.apk`)
If you want an actual `.apk` file to send over WhatsApp or publish:
1. **Using PWABuilder (Easiest - 2 Minutes)**:
   - Deploy your link to Vercel (e.g. `https://kodadeats.vercel.app`).
   - Go to [https://www.pwabuilder.com](https://www.pwabuilder.com).
   - Enter your URL.
   - Click **Package for Android** -> Download the signed `KodadEats.apk`!
2. **Using Google's Bubblewrap CLI (Terminal)**:
   ```bash
   npx @bubblewrap/cli init --manifest=manifest.json
   npx @bubblewrap/cli build
   ```
   This generates `app-release-signed.apk` directly on your computer!
3. You can send this `.apk` directly on WhatsApp to all Kodad customers and riders.

---

## 3. 🛍️ Publishing on PhonePe's Indus Appstore & PhonePe Mini Apps

### What is PhonePe's Indus Appstore?
In 2024, PhonePe launched the **Indus Appstore** ([indusappstore.com](https://www.indusappstore.com/)), India's official app marketplace built specifically for Indian businesses.

### Why Indus Appstore is Ideal for KodadEats:
- **0% Commission (Zero Platform Fee)** for Indian businesses.
- **Free Developer Account Registration**.
- Native support for **Telugu (తెలుగు)** and English.
- Direct distribution to millions of PhonePe users across Andhra Pradesh and Telangana.

### Step-by-Step Submission:
1. Visit [https://developer.indusappstore.com](https://developer.indusappstore.com) and register with your mobile number/business details.
2. Upload the `KodadEats.apk` (built in Step 2).
3. Upload app icons (`icon-512.png` included in workspace) and app screenshots.
4. Set categories: *Food & Drink / Local Delivery*.
5. Set target location: *India / Telangana*.
6. Submit for review! Indus Appstore approves apps in 24-48 hours.

### PhonePe Switch / Mini-App Integration:
- Since you already have your PhonePe Merchant UPI ID (`manda.nani07-2@okaxis`), you can register as a PhonePe Merchant partner.
- PhonePe allows verified merchants to embed their PWA link inside the main PhonePe app under the **Switch** or **Mini Apps** section so users never leave PhonePe to order!

---

## 4. 👨‍🍳 Restaurant Partner (Kitchen) Portal (`restaurant.html`)

The Kitchen Portal is designed specifically for restaurant kitchen staff and cooks in Kodad.

### Key Features:
1. **Owner Phone Login with Real OTP**:
   - Tap **"Switch Kitchen"** or visit `restaurant.html`.
   - Enter registered owner mobile number (e.g. `9848011111` for Kodad Biryani House, `9848022222` for Reddy Tiffins, etc.).
   - Receive and enter 6-digit OTP to open the kitchen dashboard.
2. **Time Period Filters**:
   - **📅 Today's Orders**: Orders placed today.
   - **🗓️ This Week**: Orders in the last 7 days.
   - **📆 This Month**: Orders in the last 30 days.
   - **📊 Entire Orders**: All-time order records.
   - KPI counters (Total Orders, Food Sales ₹, Items in Cooking, Handed Over) update dynamically for each period.
3. **Loud Audio Buzzer**:
   - Rings a continuous loud alarm when any new order arrives for this restaurant until accepted or muted.
4. **Order Details & Customer Requirements**:
   - Large food items with quantity badges (`2x Chicken Biryani`).
   - Customer Requirements / Special Cooking Notes (e.g. *"Extra spicy, send extra spoons"*).
   - Customer name, phone (click-to-call), and delivery landmark.
5. **Accept with Prep Time**:
   - `[✓ Accept (15 Min Prep)]`, `[✓ Accept (25 Min Prep)]`, or `[✕ Reject]`.
   - Displays cooking countdown to the customer and admin.
6. **Delivery Boy (Captain) Live Details**:
   - Shows assigned rider name, bike model, and phone with direct Call & WhatsApp buttons.
7. **"Food Cooked & Given to Rider" Button**:
   - Once food is prepared and rider arrives at counter, tap **"📦 Food Cooked & Given to Rider ➔"**.
   - Status updates to `PICKED_UP`.
   - Chime sound plays and order moves to the Completed / Handed Over section.
