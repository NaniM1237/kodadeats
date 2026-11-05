/**
 * KodadEats - Realtime Event Bus, Auth & State Sync v4.0
 * Connects Customer, Restaurant Partner, Captain Rider & Admin
 * Zero 'kzip' references. 100% KodadEats.
 */

const RealtimeBus = (function() {
  const CHANNEL_NAME = 'kodadeats_realtime_channel';
  const STORAGE_KEY_ORDERS = 'kodadeats_orders';
  const STORAGE_KEY_CUSTOMERS = 'kodadeats_customers';
  const STORAGE_KEY_ACTIVE_ORDER = 'kodadeats_current_order_id';
  const STORAGE_KEY_CURRENT_USER = 'kodadeats_current_user';
  const STORAGE_KEY_SERVER_URL = 'kodadeats_server_url';
  const STORAGE_KEY_CAPTAINS = 'kodadeats_captains';
  const STORAGE_KEY_CURRENT_CAPTAIN = 'kodadeats_current_captain';
  const STORAGE_KEY_ADMIN_AUTH = 'kodadeats_admin_auth';

  // Authorized Admin Mobile Numbers (Restricted to Owner only)
  const ADMIN_AUTHORIZED_PHONES = ['9640103505', '9182348241'];

  // Configurable Server URL (default to origin or stored URL)
  let serverUrl = '';
  try {
    serverUrl = localStorage.getItem(STORAGE_KEY_SERVER_URL) || (window.location.port ? window.location.origin : '');
  } catch (e) {}

  // Audio Synthesizer Context
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Pure Web Audio Synthesizer (No external sound files required)
  const Sounds = {
    // Loud repeating kitchen buzzer & admin siren
    playIncomingOrderSiren: function() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        [0, 0.3, 0.6, 0.9].forEach((startTime, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(idx % 2 === 0 ? 880 : 660, now + startTime);
          gain.gain.setValueAtTime(0.4, now + startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, now + startTime + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + startTime);
          osc.stop(now + startTime + 0.3);
        });
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    },

    // Pleasant ascending chime for customer order placed / delivered
    playSuccessChime: function() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + (idx * 0.12));
          gain.gain.setValueAtTime(0.3, now + (idx * 0.12));
          gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.12) + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + (idx * 0.12));
          osc.stop(now + (idx * 0.12) + 0.38);
        });
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    },

    // Rider alert beep
    playRiderAlert: function() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        [0, 0.15, 0.3].forEach((startTime) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1050, now + startTime);
          gain.gain.setValueAtTime(0.25, now + startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, now + startTime + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + startTime);
          osc.stop(now + startTime + 0.12);
        });
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    },

    // Soft two-tone chime for craving alerts and gentle notifications
    playBell: function() {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        [880, 1174.66].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + (idx * 0.12));
          gain.gain.setValueAtTime(0.2, now + (idx * 0.12));
          gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.12) + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + (idx * 0.12));
          osc.stop(now + (idx * 0.12) + 0.35);
        });
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    }
  };

  // Broadcast Channel setup for tabs
  let broadcastChannel = null;
  if (typeof BroadcastChannel !== 'undefined') {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
  }

  const listeners = [];

  function emit(eventType, payload) {
    const message = { type: eventType, payload, timestamp: Date.now() };

    if (broadcastChannel) {
      broadcastChannel.postMessage(message);
    }

    try {
      localStorage.setItem('kodadeats_last_event', JSON.stringify(message));
    } catch (e) {}

    listeners.forEach(fn => fn(message));
  }

  if (broadcastChannel) {
    broadcastChannel.onmessage = (event) => {
      listeners.forEach(fn => fn(event.data));
    };
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'kodadeats_last_event' && e.newValue) {
      try {
        const msg = JSON.parse(e.newValue);
        listeners.forEach(fn => fn(msg));
      } catch (err) {}
    }
  });

  // User Profile & Authentication Management
  function getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
      emit('USER_LOGGED_IN', user);
    } catch (e) {}
  }

  function logoutUser() {
    try {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      emit('USER_LOGGED_OUT', null);
    } catch (e) {}
  }

  // Real 6-Digit OTP Generator & SMS Simulator Engine
  function generateOtp(phone) {
    if (!phone) return null;
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const otpData = {
      phone: cleanPhone,
      code: code,
      createdAt: Date.now(),
      expiresAt: Date.now() + (5 * 60 * 1000) // 5 minutes validity
    };
    try {
      localStorage.setItem('kodadeats_otp_' + cleanPhone, JSON.stringify(otpData));
    } catch (e) {}

    showOtpBanner(cleanPhone, code);
    return otpData;
  }

  function verifyOtp(phone, inputOtp) {
    if (!phone || !inputOtp) return { success: false, message: 'Please enter mobile number and 6-digit OTP' };
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const storedStr = localStorage.getItem('kodadeats_otp_' + cleanPhone);
    if (!storedStr) {
      return { success: false, message: 'OTP expired or not requested. Please tap Resend OTP.' };
    }
    try {
      const stored = JSON.parse(storedStr);
      if (Date.now() > stored.expiresAt) {
        localStorage.removeItem('kodadeats_otp_' + cleanPhone);
        return { success: false, message: 'OTP expired! Please generate a new OTP.' };
      }
      if (stored.code !== inputOtp.toString().trim()) {
        return { success: false, message: 'Incorrect OTP! Please check the 6-digit code.' };
      }
      localStorage.removeItem('kodadeats_otp_' + cleanPhone);
      return { success: true };
    } catch (e) {
      return { success: false, message: 'OTP verification error. Please try again.' };
    }
  }

  function showOtpBanner(phone, code) {
    const existing = document.getElementById('kodadOtpToast');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.id = 'kodadOtpToast';
    banner.className = 'fixed top-4 inset-x-4 sm:inset-x-auto sm:right-4 z-[200] max-w-sm bg-slate-950 text-white p-4 rounded-3xl shadow-2xl border-2 border-emerald-500 animate-in fade-in slide-in-from-top-4 space-y-2.5 font-sans';
    banner.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-base">💬</div>
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">SMS Verification • KodadEats</span>
            <h5 class="text-xs font-bold text-slate-200">OTP for +91 ${phone}</h5>
          </div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="text-slate-400 hover:text-white text-xs w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">✕</button>
      </div>
      <div class="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
        <span class="text-slate-400 text-[11px] block font-medium">Your One-Time Password is:</span>
        <span class="text-3xl font-black text-amber-300 tracking-widest block select-all font-mono py-0.5">${code}</span>
        <span class="text-[10px] text-emerald-400 block font-semibold">Valid for 5 minutes</span>
      </div>
      <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
        <button onclick="navigator.clipboard && navigator.clipboard.writeText('${code}'); this.textContent='✓ Copied!';" class="text-blue-400 hover:text-blue-300 font-extrabold flex items-center gap-1">
          <span>📋</span>
          <span>Copy OTP</span>
        </button>
        <a href="https://wa.me/91${phone}?text=${encodeURIComponent('Your KodadEats verification OTP code is: ' + code)}" target="_blank" class="text-emerald-400 hover:text-emerald-300 font-extrabold flex items-center gap-1">
          <span>📲</span>
          <span>WhatsApp OTP</span>
        </a>
      </div>
    `;
    document.body.appendChild(banner);
    Sounds.playBell();

    setTimeout(() => {
      if (banner && banner.parentElement) {
        banner.remove();
      }
    }, 15000);
  }

  // Admin Authorization Gate (Restricted to Owner only)
  function isAdminAuthorized(phone) {
    if (!phone) return false;
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    return ADMIN_AUTHORIZED_PHONES.includes(cleanPhone);
  }

  function getAdminSession() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
      if (!data) return null;
      const parsed = JSON.parse(data);
      if (parsed && isAdminAuthorized(parsed.phone)) {
        return parsed;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function setAdminSession(phone) {
    if (!isAdminAuthorized(phone)) return false;
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const session = {
      phone: cleanPhone,
      name: cleanPhone === '9640103505' ? 'Admin (9640103505)' : 'Admin (9182348241)',
      role: 'admin',
      loginTime: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, JSON.stringify(session));
      emit('ADMIN_LOGGED_IN', session);
    } catch (e) {}
    return session;
  }

  function logoutAdmin() {
    try {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      emit('ADMIN_LOGGED_OUT', null);
    } catch (e) {}
  }

  // Commercial Customer Profiles (No demo names)
  function getRegisteredCustomers() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function getCustomerByPhone(phone) {
    if (!phone) return null;
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const customers = getRegisteredCustomers();
    return customers.find(c => c.phone === cleanPhone) || null;
  }

  function saveCustomerProfile(profile) {
    if (!profile || !profile.phone) return null;
    const cleanPhone = profile.phone.replace(/\D/g, '').slice(-10);
    const customers = getRegisteredCustomers();
    const idx = customers.findIndex(c => c.phone === cleanPhone);
    const fullProfile = {
      phone: cleanPhone,
      name: profile.name || 'Customer (' + cleanPhone.slice(-4) + ')',
      email: profile.email || `${cleanPhone}@kodadeats.com`,
      address: profile.address || 'Kodad',
      landmark: profile.landmark || 'Balaji Nagar, Kodad',
      role: 'customer',
      isLoggedIn: true,
      lastActive: new Date().toISOString()
    };
    if (idx >= 0) {
      customers[idx] = Object.assign(customers[idx], fullProfile);
    } else {
      customers.push(fullProfile);
    }
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(customers));
    } catch (e) {}
    setCurrentUser(fullProfile);
    return fullProfile;
  }

  // Dynamic Captains Management (No hardcoded demo riders)
  function getCaptains() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CAPTAINS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCaptains(captains) {
    try {
      localStorage.setItem(STORAGE_KEY_CAPTAINS, JSON.stringify(captains));
    } catch (e) {}
  }

  function getCurrentCaptain() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CURRENT_CAPTAIN);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentCaptain(captain) {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_CAPTAIN, JSON.stringify(captain));
      emit('CAPTAIN_LOGGED_IN', captain);
    } catch (e) {}
  }

  function logoutCaptain() {
    try {
      localStorage.removeItem(STORAGE_KEY_CURRENT_CAPTAIN);
      emit('CAPTAIN_LOGGED_OUT', null);
    } catch (e) {}
  }

  function registerCaptain(data) {
    const captains = getCaptains();
    const cleanPhone = data.phone.replace(/\D/g, '').slice(-10);
    let cap = captains.find(c => c.phone === cleanPhone);
    if (!cap) {
      const id = 'CAP-' + cleanPhone.slice(-4);
      cap = {
        id: id,
        name: data.name || `Captain (${cleanPhone.slice(-4)})`,
        phone: cleanPhone,
        vehicle: data.vehicle || 'Bike (Kodad Delivery)',
        rating: 5.0,
        ordersCompleted: 0,
        earningsTotal: 0,
        isOnDuty: true,
        registeredAt: new Date().toISOString()
      };
      captains.push(cap);
    } else {
      if (data.name) cap.name = data.name;
      if (data.vehicle) cap.vehicle = data.vehicle;
      cap.isOnDuty = true;
    }
    saveCaptains(captains);
    setCurrentCaptain(cap);
    return cap;
  }

  function captainAcceptOrder(orderId, captain) {
    const order = getOrderById(orderId);
    if (!order) return null;
    order.status = 'CAPTAIN_ASSIGNED';
    order.captain = {
      id: captain.id,
      name: captain.name,
      phone: captain.phone,
      vehicle: captain.vehicle
    };
    order.history.push({
      status: 'CAPTAIN_ASSIGNED',
      title: `Accepted by Captain: ${captain.name} (${captain.vehicle})`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    upsertOrder(order);
    Sounds.playRiderAlert();
    emit('CAPTAIN_ASSIGNED', order);
    emit('ORDER_UPDATED', order);
    return order;
  }

  function captainDeclineOrder(orderId, captainId) {
    const order = getOrderById(orderId);
    if (!order) return null;
    if (!order.declinedCaptains) order.declinedCaptains = [];
    if (!order.declinedCaptains.includes(captainId)) {
      order.declinedCaptains.push(captainId);
    }
    upsertOrder(order);
    emit('ORDER_DECLINED_BY_CAPTAIN', { orderId, captainId });
    return order;
  }

  // Database Management Helpers
  function getAllOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ORDERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function getOrderById(id) {
    const orders = getAllOrders();
    return orders.find(o => o.id === id) || null;
  }

  function saveAllOrders(orders) {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }

  function upsertOrder(order) {
    const orders = getAllOrders();
    const idx = orders.findIndex(o => o.id === order.id);
    if (idx >= 0) {
      orders[idx] = order;
    } else {
      orders.unshift(order);
    }
    saveAllOrders(orders);
    return order;
  }

  // WhatsApp Order Formatter
  function createWhatsAppOrderMessage(order) {
    const itemsText = order.items.map(i => `• ${i.quantity}x ${i.name} (₹${i.price * i.quantity})`).join('\n');
    const gpsLink = (order.customer.lat && order.customer.lng) 
      ? `\n*Live House GPS Navigation:* https://www.google.com/maps/dir/?api=1&destination=${order.customer.lat},${order.customer.lng}` 
      : '';
    return `🛵 *KODADEATS ORDER ALERT* 🛵
━━━━━━━━━━━━━━━━━━
*Order ID:* #${order.id}
*Restaurant:* ${order.restaurant.name}
*Time:* ${order.timeFormatted || 'Now'}

*ITEMS ORDERED:*
${itemsText}

*BILL DETAILS:*
Subtotal: ₹${order.subtotal}
Delivery Fee: ₹${order.deliveryFee}
*TOTAL AMOUNT:* ₹${order.total}
*Payment:* ${order.paymentMethod}

━━━━━━━━━━━━━━━━━━
*CUSTOMER IN KODAD:*
*Name:* ${order.customer.name}
*Phone:* ${order.customer.phone}
*Address:* ${order.customer.address}
*Landmark:* ${order.customer.landmark}${gpsLink}
━━━━━━━━━━━━━━━━━━
_Please prepare and dispatch KodadEats Captain!_`;
  }

  function getWhatsAppUrl(order, targetPhone = '') {
    const text = encodeURIComponent(createWhatsAppOrderMessage(order));
    const phoneParam = targetPhone ? `phone=91${targetPhone.replace(/\D/g, '').slice(-10)}&` : '';
    return `https://api.whatsapp.com/send?${phoneParam}text=${text}`;
  }

  // Order Lifecycle Operations
  function placeOrder(orderData) {
    const orderId = 'KD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'PLACED',
      customer: orderData.customer,
      restaurant: orderData.restaurant,
      items: orderData.items,
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee || 25,
      packagingFee: 10,
      discount: orderData.discount || 0,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery (COD)' ? 'Pending' : 'Paid Online (UPI)',
      notes: orderData.notes || '',
      captain: null,
      history: [
        { status: 'PLACED', title: 'Order Received in Kodad', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]
    };

    upsertOrder(newOrder);
    localStorage.setItem(STORAGE_KEY_ACTIVE_ORDER, orderId);

    // Sync to Cloud Backend if available
    if (serverUrl) {
      fetch(`${serverUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      }).catch(err => console.log('Offline/Local mode active'));
    }

    Sounds.playSuccessChime();
    emit('ORDER_PLACED', newOrder);
    return newOrder;
  }

  function acceptOrder(orderId, prepTimeMinutes = 20) {
    const order = getOrderById(orderId);
    if (!order) return null;

    order.status = 'ACCEPTED';
    order.prepTime = prepTimeMinutes;
    order.history.push({
      status: 'ACCEPTED',
      title: `Accepted by Kitchen (Prep: ~${prepTimeMinutes} mins)`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    upsertOrder(order);

    if (serverUrl) {
      fetch(`${serverUrl}/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ACCEPTED', prepTime: prepTimeMinutes })
      }).catch(e => {});
    }

    Sounds.playIncomingOrderSiren();
    emit('ORDER_ACCEPTED', order);
    return order;
  }

  function assignCaptain(orderId, captainId) {
    const order = getOrderById(orderId);
    if (!order) return null;

    const captain = KODAD_DATA.captains.find(c => c.id === captainId) || KODAD_DATA.captains[0];
    order.status = 'CAPTAIN_ASSIGNED';
    order.captain = captain;
    order.history.push({
      status: 'CAPTAIN_ASSIGNED',
      title: `Captain Assigned: ${captain.name} (${captain.vehicle})`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    upsertOrder(order);

    if (serverUrl) {
      fetch(`${serverUrl}/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CAPTAIN_ASSIGNED', captain })
      }).catch(e => {});
    }

    Sounds.playRiderAlert();
    emit('CAPTAIN_ASSIGNED', order);
    return order;
  }

  function markPickedUp(orderId) {
    const order = getOrderById(orderId);
    if (!order) return null;

    order.status = 'PICKED_UP';
    order.history.push({
      status: 'PICKED_UP',
      title: 'Order Picked Up - Captain En Route to Customer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    upsertOrder(order);

    if (serverUrl) {
      fetch(`${serverUrl}/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PICKED_UP' })
      }).catch(e => {});
    }

    Sounds.playRiderAlert();
    emit('ORDER_PICKED_UP', order);
    return order;
  }

  function markDelivered(orderId) {
    const order = getOrderById(orderId);
    if (!order) return null;

    order.status = 'DELIVERED';
    order.paymentStatus = 'Paid';
    order.deliveredAt = new Date().toISOString();
    order.history.push({
      status: 'DELIVERED',
      title: 'Order Delivered Successfully to Customer!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Credit ₹40 payout to assigned captain
    if (order.captain && order.captain.id) {
      const captains = getCaptains();
      const cap = captains.find(c => c.id === order.captain.id);
      if (cap) {
        cap.ordersCompleted = (cap.ordersCompleted || 0) + 1;
        cap.earningsTotal = (cap.earningsTotal || 0) + 40;
        saveCaptains(captains);
        const currentCap = getCurrentCaptain();
        if (currentCap && currentCap.id === cap.id) {
          setCurrentCaptain(cap);
        }
      }
    }

    upsertOrder(order);

    if (serverUrl) {
      fetch(`${serverUrl}/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DELIVERED' })
      }).catch(e => {});
    }

    Sounds.playSuccessChime();
    emit('ORDER_DELIVERED', order);
    emit('ORDER_UPDATED', order);
    return order;
  }

  function cancelOrder(orderId, reason = 'Cancelled') {
    const order = getOrderById(orderId);
    if (!order) return null;

    order.status = 'CANCELLED';
    order.cancelReason = reason;
    order.history.push({
      status: 'CANCELLED',
      title: `Order Cancelled: ${reason}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    upsertOrder(order);

    if (serverUrl) {
      fetch(`${serverUrl}/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED', cancelReason: reason })
      }).catch(e => {});
    }

    emit('ORDER_CANCELLED', order);
    return order;
  }

  // Customer Order History & Loyalty Operations
  function getUserOrderHistory(phone = '') {
    const all = getAllOrders();
    if (!phone) return all;
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    return all.filter(o => {
      const oPhone = (o.customer?.phone || '').replace(/\D/g, '').slice(-10);
      return !cleanPhone || oPhone === cleanPhone;
    });
  }

  function getUserDeliveredCount(phone = '') {
    const history = getUserOrderHistory(phone);
    return history.filter(o => o.status === 'DELIVERED').length;
  }

  function validateCoupon(code, subtotal, phone = '') {
    const cleanCode = (code || '').toUpperCase().trim();
    const coupon = (typeof KODAD_DATA !== 'undefined' ? KODAD_DATA.coupons : []).find(c => c.code === cleanCode);
    if (!coupon) {
      return { valid: false, message: 'Invalid coupon code.' };
    }
    if (subtotal < coupon.minOrder) {
      return { valid: false, message: `Minimum order of ₹${coupon.minOrder} required for ${coupon.code}.` };
    }
    if (coupon.isVipOnly) {
      const deliveredCount = getUserDeliveredCount(phone);
      if (deliveredCount < 10) {
        return { 
          valid: false, 
          message: `VIP Reward! Complete 10 orders to unlock this coupon (${deliveredCount}/10 completed).` 
        };
      }
    }
    return { valid: true, discount: coupon.discount, coupon };
  }

  function getUpiPaymentDetails(amount, orderId = 'KD-0000') {
    const upiId = (typeof KODAD_DATA !== 'undefined' && KODAD_DATA.upiConfig && KODAD_DATA.upiConfig.upiId) 
      ? KODAD_DATA.upiConfig.upiId 
      : 'manda.nani07-2@okaxis';
    const merchantName = (typeof KODAD_DATA !== 'undefined' && KODAD_DATA.upiConfig && KODAD_DATA.upiConfig.merchantName)
      ? KODAD_DATA.upiConfig.merchantName
      : 'Nani Manda';
    const gpayQr = (typeof KODAD_DATA !== 'undefined' && KODAD_DATA.upiConfig && KODAD_DATA.upiConfig.gpayQrImage)
      ? KODAD_DATA.upiConfig.gpayQrImage
      : 'upi-gpay-qr.jpg';
    const phonePeQr = (typeof KODAD_DATA !== 'undefined' && KODAD_DATA.upiConfig && KODAD_DATA.upiConfig.phonePeQrImage)
      ? KODAD_DATA.upiConfig.phonePeQrImage
      : 'upi-phonepe-qr.jpg';
    
    const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('KodadEats Order #' + orderId)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUri)}`;

    return {
      upiId,
      merchantName,
      amount,
      orderId,
      upiUri,
      qrUrl,
      gpayQrImage: gpayQr,
      phonePeQrImage: phonePeQr,
      intentPhonePe: `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`,
      intentGPay: `gpay://upi/pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`,
      intentPaytm: `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`
    };
  }

  return {
    Sounds,
    emit,
    on: function(callback) {
      listeners.push(callback);
    },
    getCurrentUser,
    setCurrentUser,
    logoutUser,
    generateOtp,
    verifyOtp,
    showOtpBanner,
    isAdminAuthorized,
    getAdminSession,
    setAdminSession,
    logoutAdmin,
    ADMIN_AUTHORIZED_PHONES,
    getRegisteredCustomers,
    getCustomerByPhone,
    saveCustomerProfile,
    getCaptains,
    saveCaptains,
    getCurrentCaptain,
    setCurrentCaptain,
    logoutCaptain,
    registerCaptain,
    captainAcceptOrder,
    captainDeclineOrder,
    getUserOrderHistory,
    getUserDeliveredCount,
    validateCoupon,
    getUpiPaymentDetails,
    getAllOrders,
    getOrderById,
    getActiveOrderId: () => {
      try { return localStorage.getItem(STORAGE_KEY_ACTIVE_ORDER); } catch (e) { return null; }
    },
    setActiveOrderId: (id) => {
      try { localStorage.setItem(STORAGE_KEY_ACTIVE_ORDER, id); } catch (e) {}
    },
    placeOrder,
    acceptOrder,
    assignCaptain,
    markPickedUp,
    markDelivered,
    cancelOrder,
    getWhatsAppUrl,
    setServerUrl: (url) => {
      serverUrl = url;
      localStorage.setItem(STORAGE_KEY_SERVER_URL, url);
    },
    getServerUrl: () => serverUrl
  };
})();
