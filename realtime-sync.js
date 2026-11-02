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

  // Configurable Server URL (default to origin or stored URL)
  let serverUrl = localStorage.getItem(STORAGE_KEY_SERVER_URL) || (window.location.port ? window.location.origin : '');

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
*Landmark:* ${order.customer.landmark}
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
    order.history.push({
      status: 'DELIVERED',
      title: 'Order Delivered Successfully!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

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

  return {
    Sounds,
    emit,
    on: function(callback) {
      listeners.push(callback);
    },
    getCurrentUser,
    setCurrentUser,
    logoutUser,
    getAllOrders,
    getOrderById,
    getActiveOrderId: () => localStorage.getItem(STORAGE_KEY_ACTIVE_ORDER),
    setActiveOrderId: (id) => localStorage.setItem(STORAGE_KEY_ACTIVE_ORDER, id),
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
