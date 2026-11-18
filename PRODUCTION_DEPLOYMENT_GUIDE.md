# 🚀 Eat.in Kodad - 24/7 Production & Security Deployment Guide

This guide gives you the exact blueprint to run **Eat.in Kodad** in real-time 24/7 with bank-level security, instant server recovery, and zero customer loss.

---

## 🏆 1. The Best & Lowest-Cost 24/7 Server: Render.com Starter

### Why Render.com Starter is the #1 Pick:
* **Cost:** **$7 / month (~₹580 / month)**.
* **Never Goes to Sleep:** Unlike free tiers, the Starter tier runs 24 hours a day, 365 days a year.
* **Persistent WebSockets:** Essential for real-time kitchen buzzer sirens, live captain GPS routes, and instant dispatch.
* **Free Automatic SSL (HTTPS):** Automatically encrypts all customer names, phone numbers, and addresses with 256-bit encryption.
* **Automatic Restarts:** If an unhandled exception or memory leak occurs, Render restarts the container in seconds.
* **Zero Linux / Terminal Headaches:** Connect your GitHub repository once, and every code update deploys automatically.

---

## 🛠️ 2. Step-by-Step Render.com Setup (5 Minutes)

1. **Sign Up:** Go to [render.com](https://render.com) and create an account.
2. **New Web Service:**
   * Click **New +** ➔ **Web Service**.
   * Connect your GitHub repository containing the `kodad-eats` project.
3. **Configure Service Details:**
   * **Name:** `eatin-kodad`
   * **Region:** `Singapore` (Closest to Hyderabad/Telangana for sub-30ms latency).
   * **Branch:** `main`
   * **Runtime:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
   * **Instance Type:** Select **Starter ($7/mo)**.
4. **Environment Variables (under Environment tab):**
   Add the following variables:
   * `NODE_ENV` = `production`
   * `HIDE_OTP` = `true`
   * `PORT` = `3000`
   * `MONGODB_URI` = `mongodb+srv://kodadeatsadmin:MongoDB%403505@cluster0.au8wsnf.mongodb.net/kodadeats?retryWrites=true&w=majority`
   * `RAZORPAY_KEY_ID` = `your_live_razorpay_key_id`
   * `RAZORPAY_KEY_SECRET` = `your_live_razorpay_secret`
   * `FAST2SMS_API_KEY` = `your_fast2sms_api_key`
5. Click **Create Web Service**!
   Render will deploy your app and give you a permanent live HTTPS URL:
   `https://eatin-kodad.onrender.com`

---

## 🛡️ 3. Bank-Grade Security Measures Built into the Code

### 1. Server-Side Price Verification (No Price Tampering)
* In `/api/orders`, the server recalculates the cost of all items from the verified menu database. Even if a user alters the request body in DevTools, the server rejects tampered values and charges the correct amount.

### 2. Cryptographic Payment Verification (HMAC SHA256)
* In `/api/payments/razorpay/verify`, payments are cryptographically verified using `crypto.createHmac('sha256', secret)`. Orders are only marked `Paid` if the bank signature matches.

### 3. Masked OTPs in Production
* In production mode (`NODE_ENV=production` or `HIDE_OTP=true`), the SMS OTP code is **never returned in JSON responses**, preventing network sniffing attacks.

### 4. Sliding-Window Rate Limiting
* `/api/auth/send-otp-sms` limits requests to **max 4 OTPs per phone number per 15 minutes**, shielding your SMS budget from spambots.

---

## ⚡ 4. Free 24/7 Uptime Monitoring (UptimeRobot)

To know instantly if your server ever slows down:
1. Go to [uptimerobot.com](https://uptimerobot.com) (100% Free).
2. Click **Add New Monitor**.
3. **Monitor Type:** `HTTP(s)`
4. **Friendly Name:** `Eat.in Kodad Health`
5. **URL:** `https://eatin-kodad.onrender.com/api/health`
6. **Monitoring Interval:** `Every 5 minutes`
7. Click **Create Monitor**.
*UptimeRobot will ping your server 24/7. If an outage occurs, it alerts your phone immediately.*

---

## 🤝 5. Failsafe UX: Eliminating Customer Hesitation

In Kodad, if an app lags or payments decline, customers shouldn't be left confused:

1. **1-Tap Emergency WhatsApp Desk:**
   * Both in the cart drawer and in payment fallback modals, customers can tap:
     **"💬 Or Order Instantly on WhatsApp Desk (9640103505)"**
   * The app generates a formatted message with customer name, items, landmark, and total, opening WhatsApp directly.
2. **Offline Detection Banner:**
   * If mobile network drops in Kodad, a banner immediately reassures them:
     *`⚠️ Network reconnecting... Stuck? Tap for WhatsApp Desk`*
3. **Payment Fallback Modal:**
   * If a customer cancels an online payment or their bank declines the UPI pin, the app prompts:
     `[ 🛵 Switch to Cash / UPI on Delivery ]` or `[ 💬 Send via WhatsApp ]`.
   * **Result:** You never lose an order!
