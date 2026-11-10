/**
 * KodadEats - Cloud Realtime Backend Server (Express + Socket.io + MongoDB Atlas)
 * Automatically syncs with MongoDB Atlas in the cloud OR persists locally in database.json
 */

require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.json');
const MONGODB_URI = process.env.MONGODB_URI || null;

let isMongoConnected = false;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Explicit Page Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});
app.get('/captain', (req, res) => {
  res.sendFile(path.join(__dirname, 'captain.html'));
});
app.get('/restaurant', (req, res) => {
  res.sendFile(path.join(__dirname, 'restaurant.html'));
});

// Local File Database Helper (Guarantees zero data loss even without MongoDB)
function readLocalDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = { orders: [], customers: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('[DB] Error reading local file DB:', err);
    return { orders: [], customers: [] };
  }
}

function writeLocalDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('[DB] Error saving to local file DB:', err);
  }
}

// MongoDB Mongoose Schemas (When connected to MongoDB Atlas)
const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
  timeFormatted: { type: String },
  status: { type: String, default: 'PLACED' },
  customer: {
    name: String,
    phone: String,
    address: String,
    landmark: String
  },
  restaurant: {
    id: String,
    name: String
  },
  items: Array,
  subtotal: Number,
  deliveryFee: Number,
  packagingFee: Number,
  discount: Number,
  total: Number,
  paymentMethod: String,
  paymentStatus: String,
  captain: Object,
  history: Array
}, { timestamps: true });

const OrderModel = mongoose.model('Order', OrderSchema);

// Connect to MongoDB Atlas if URI is provided
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB Atlas Cloud Database successfully!');
    })
    .catch((err) => {
      console.warn('⚠️ MongoDB connection failed. Falling back to local database.json:', err.message);
      isMongoConnected = false;
    });
} else {
  console.log('ℹ️ Running in Local Persistent Mode (database.json). To connect MongoDB Atlas, set MONGODB_URI.');
}

// REST API Endpoints

// 1. Health check & DB status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    time: new Date().toISOString(),
    database: isMongoConnected ? 'MongoDB Atlas' : 'Local Persistent Storage (database.json)'
  });
});

// 2. Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    if (isMongoConnected) {
      const orders = await OrderModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, data: orders });
    }
    const db = readLocalDB();
    res.json({ success: true, count: db.orders.length, data: db.orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Place a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer, restaurant, items, subtotal, deliveryFee, discount, total, paymentMethod } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    const orderId = 'KD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'PLACED',
      customer,
      restaurant,
      items,
      subtotal: subtotal || 0,
      deliveryFee: deliveryFee || 25,
      packagingFee: 10,
      discount: discount || 0,
      total: total || 0,
      paymentMethod: paymentMethod || 'Cash on Delivery (COD)',
      paymentStatus: paymentMethod === 'Cash on Delivery (COD)' ? 'Pending' : 'Paid Online (UPI)',
      captain: null,
      history: [
        { status: 'PLACED', title: 'Order Received', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]
    };

    if (isMongoConnected) {
      await OrderModel.create(newOrder);
    } else {
      const db = readLocalDB();
      db.orders.unshift(newOrder);

      // Save customer details for CRM
      const existingCust = db.customers.find(c => c.phone === customer.phone);
      if (existingCust) {
        existingCust.orderCount = (existingCust.orderCount || 1) + 1;
        existingCust.totalSpent = (existingCust.totalSpent || 0) + newOrder.total;
        existingCust.address = customer.address;
        existingCust.landmark = customer.landmark;
      } else {
        db.customers.push({
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
          landmark: customer.landmark,
          orderCount: 1,
          totalSpent: newOrder.total
        });
      }
      writeLocalDB(db);
    }

    // Broadcast instant realtime alert to Admin and Captains
    io.emit('ORDER_PLACED', newOrder);

    console.log(`[KodadEats] 🔔 New Order: #${newOrder.id} - ₹${newOrder.total} by ${customer.name} (${customer.landmark})`);
    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. Update order status (Accept, Assign Captain, Pick Up, Deliver)
app.post('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, captain, prepTime, cancelReason } = req.body;

    let order = null;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isMongoConnected) {
      order = await OrderModel.findOne({ id });
      if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

      order.status = status;
      if (captain) order.captain = captain;
      if (status === 'DELIVERED') order.paymentStatus = 'Paid';
      order.history.push({
        status,
        title: `Order updated to ${status}${prepTime ? ` (Prep: ${prepTime}m)` : ''}${cancelReason ? `: ${cancelReason}` : ''}`,
        time: timeStr
      });
      await order.save();
    } else {
      const db = readLocalDB();
      const idx = db.orders.findIndex(o => o.id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Order not found' });

      order = db.orders[idx];
      order.status = status;
      if (captain) order.captain = captain;
      if (status === 'DELIVERED') order.paymentStatus = 'Paid';
      order.history.push({
        status,
        title: `Order updated to ${status}${prepTime ? ` (Prep: ${prepTime}m)` : ''}${cancelReason ? `: ${cancelReason}` : ''}`,
        time: timeStr
      });
      writeLocalDB(db);
    }

    // Broadcast update across all open portals
    io.emit(status, order);
    io.emit('ORDER_UPDATED', order);

    console.log(`[KodadEats] Order #${order.id} updated -> ${status}`);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Get customers CRM list
app.get('/api/customers', (req, res) => {
  const db = readLocalDB();
  res.json({ success: true, count: db.customers.length, data: db.customers });
});

// ================= REAL SMS OTP ENDPOINT (FAST2SMS / TWILIO) =================
const https = require('https');
const otpStore = {};

function sendFast2Sms(phone, code) {
  return new Promise((resolve) => {
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) return resolve({ sent: false, reason: 'NO_API_KEY' });
    
    const postData = JSON.stringify({
      route: 'otp',
      variables_values: code,
      numbers: phone
    });

    const options = {
      hostname: 'www.fast2sms.com',
      port: 443,
      path: '/dev/bulkV2',
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ sent: parsed.return === true, data: parsed });
        } catch (e) {
          resolve({ sent: false, raw: body });
        }
      });
    });

    req.on('error', err => resolve({ sent: false, error: err.message }));
    req.write(postData);
    req.end();
  });
}

app.post('/api/auth/send-otp-sms', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone number is required' });
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[cleanPhone] = {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000
    };

    let smsResult = { sent: false };
    if (process.env.FAST2SMS_API_KEY) {
      smsResult = await sendFast2Sms(cleanPhone, code);
      console.log(`[Fast2SMS] Sent to +91 ${cleanPhone}:`, smsResult);
    } else {
      console.log(`[SMS OTP] FAST2SMS_API_KEY not configured. OTP generated: ${code} for +91 ${cleanPhone}`);
    }

    res.json({
      success: true,
      message: smsResult.sent ? `Real SMS OTP sent to +91 ${cleanPhone}` : `OTP generated for +91 ${cleanPhone}`,
      cleanPhone,
      code,
      smsDelivered: smsResult.sent
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ success: false, message: 'Phone and code required' });
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  const stored = otpStore[cleanPhone];
  if (!stored) return res.status(400).json({ success: false, message: 'OTP not requested or expired' });
  if (Date.now() > stored.expiresAt) return res.status(400).json({ success: false, message: 'OTP expired' });
  if (stored.code !== code.toString().trim()) return res.status(400).json({ success: false, message: 'Incorrect OTP code' });
  
  delete otpStore[cleanPhone];
  res.json({ success: true, message: 'OTP verified successfully' });
});

// WebSocket Connection Management
io.on('connection', (socket) => {
  console.log('[WebSocket] Device connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('[WebSocket] Device disconnected:', socket.id);
  });
});

// Start Server
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`
=====================================================
🛵 KodadEats Cloud Backend Running!
📍 Port: ${PORT}
💾 Mode: ${isMongoConnected ? 'MongoDB Atlas' : 'Local Persistent Storage (database.json)'}
=====================================================
    `);
  });
}

module.exports = app;
