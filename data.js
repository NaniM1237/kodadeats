/**
 * KodadEats (కొదాడ ఈట్స్) - Core Catalog & Local Kodad Geo-Data
 * High-accuracy Kodad town coordinates for Live Leaflet Map Tracking
 */

const KODAD_DATA = {
  appName: 'KodadEats',
  tagline: 'కొదాడ నంబర్ 1 ఫుడ్ డెలివరీ యాప్ (Kodad Fast Food Delivery)',
  currency: '₹',
  themeColor: '#2563eb', // Professional Royal Blue

  // Official KodadEats UPI Payment Configuration
  upiConfig: {
    upiId: 'manda.nani07-2@okaxis',
    merchantName: 'Nani Manda',
    businessLabel: 'KodadEats Official',
    gpayQrImage: 'upi-gpay-qr.jpg',
    phonePeQrImage: 'upi-phonepe-qr.jpg'
  },

  // Kodad Center Coordinates
  center: { lat: 16.9972, lng: 79.9678 },

  // Kodad Landmarks with Real Geo-coordinates for Drop Locations
  landmarks: [
    { name: 'Balaji Nagar, Kodad', lat: 16.9930, lng: 79.9630 },
    { name: 'Bus Stand Circle, Kodad', lat: 16.9990, lng: 79.9710 },
    { name: 'Huzurnagar Road, Kodad', lat: 16.9945, lng: 79.9690 },
    { name: 'Khammam Cross Road, Kodad', lat: 17.0010, lng: 79.9665 },
    { name: 'Gandhi Chowk, Kodad', lat: 16.9975, lng: 79.9675 },
    { name: 'Main Bazar, Kodad', lat: 16.9980, lng: 79.9685 },
    { name: 'Srinivasa Nagar, Kodad', lat: 16.9920, lng: 79.9650 },
    { name: 'Venkateswara Theatre Area, Kodad', lat: 16.9960, lng: 79.9700 },
    { name: 'Mellacheruvu Road, Kodad', lat: 16.9900, lng: 79.9680 },
    { name: 'NH-65 Bypass Junction, Kodad', lat: 17.0040, lng: 79.9630 }
  ],

  categories: [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'biryani', name: 'Biryani & Mandi', icon: '🍗' },
    { id: 'tiffins', name: 'Morning & Night Tiffins', icon: '🥞' },
    { id: 'dhabas', name: 'Highway Dhabas & Roti', icon: '🫓' },
    { id: 'meals', name: 'Andhra Meals & Curries', icon: '🍛' },
    { id: 'fastfood', name: 'Fast Food & Snacks', icon: '🍜' },
    { id: 'sweets', name: 'Bakery & Sweets', icon: '🍰' },
    { id: 'beverages', name: 'Tea, Coffee & Juices', icon: '🧋' }
  ],

  // Authorized Admin Mobile Numbers (Restricted to Owner only)
  adminAuthorizedPhones: ['9640103505', '9182348241'],

  // Customer Enquiry & Support Numbers (Shown to Customers in App)
  ownerSupportPhones: ['9640103505', '9182348241'],
  ownerPrimaryPhone: '9640103505',

  // Official Pricing & Commission Policy
  pricing: {
    deliveryFee: 30,       // Flat ₹30 delivery fee across Kodad
    riderCommission: 30,   // ₹30 rider earnings per delivery
    packingCharges: 0      // Free restaurant packaging
  },

  // Real Captains Pool (Populated dynamically when delivery riders register & log in)
  captains: [],

  // =========================================================================
  // REAL RESTAURANTS, DHABAS & TIFFIN CENTRES POOL
  // Cleared pending user collecting official list from Kodad restaurants,
  // dhabas, and morning-to-night tiffin centres.
  // =========================================================================
  restaurants: [],

  // =========================================================================
  // REAL MENU ITEMS POOL
  // Cleared pending user collecting official menus and prices.
  // =========================================================================
  products: [],

  // Zomato-style Promo Slides Carousel
  banners: [
    {
      id: 'banner-onboarding',
      title: '🏪 Partnering with Kodad Restaurants & Dhabas',
      subtitle: 'Onboarding Highway Dhabas, Morning-to-Night Tiffin Centres & Biryani Houses! Real menus launching soon.',
      badge: 'ONBOARDING IN PROGRESS',
      bgGradient: 'from-amber-600 via-orange-600 to-rose-700',
      actionText: 'Partner with Us',
      actionType: 'partner'
    },
    {
      id: 'banner-vip',
      title: '🎁 KodadEats Loyalty Club',
      subtitle: 'Complete 10 orders to unlock VIP Coupons: ₹50 (11th), ₹75 (15th), ₹100 (20th)!',
      badge: 'MILESTONE REWARDS',
      bgGradient: 'from-amber-500 via-orange-600 to-red-600',
      actionText: 'VIP Details',
      actionType: 'coupons'
    },
    {
      id: 'banner-support',
      title: '📞 Need Help or Partner Enquiry?',
      subtitle: 'Call KodadEats Owner directly: 9640103505 / 9182348241',
      badge: '24/7 HELPLINE',
      bgGradient: 'from-blue-600 via-indigo-600 to-blue-800',
      actionText: 'Call Now',
      actionType: 'call'
    },
    {
      id: 'banner-fast',
      title: '⚡ Flat ₹30 Local Delivery',
      subtitle: 'Zero packaging fees! Steaming food across Balaji Nagar, Khammam X Road & Kodad',
      badge: 'TRANSPARENT PRICING',
      bgGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      actionText: 'Order Food',
      actionType: 'category',
      categoryId: 'all'
    }
  ],

  // Related Add-on Items ("Customers Also Added")
  addOns: [
    { id: 'add-1', name: 'Spicy Mirchi Ka Salan (Extra)', price: 30, isVeg: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-2', name: 'Chilled Thick Curd Raita', price: 20, isVeg: true, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-3', name: 'Thick Badam Milk (Chilled 300ml)', price: 45, isVeg: true, image: 'https://images.unsplash.com/photo-1558857563-b371f32a7620?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-4', name: 'Hot Desi Ghee Gulab Jamun (2 Pcs)', price: 40, isVeg: true, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-5', name: 'Crispy Medu Vada (1 Pc)', price: 20, isVeg: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-6', name: 'Mineral Water Bottle (1L)', price: 20, isVeg: true, image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=300&q=80' }
  ],

  // Strict Milestone Loyalty Coupons (Locked until 10 completed orders)
  coupons: [
    {
      code: 'KODAD50',
      discount: 50,
      minOrder: 500,
      requiredOrders: 10,
      milestoneTitle: '11th Order Special',
      description: 'Flat ₹50 OFF on your 11th order (Min bill ₹500)'
    },
    {
      code: 'KODAD75',
      discount: 75,
      minOrder: 700,
      requiredOrders: 14,
      milestoneTitle: '15th Order Special',
      description: 'VIP Reward: ₹75 OFF on your 15th order (Min bill ₹700)'
    },
    {
      code: 'KODAD100',
      discount: 100,
      minOrder: 1000,
      requiredOrders: 19,
      milestoneTitle: '20th Order Mega Reward',
      description: 'VIP Mega Reward: ₹100 OFF on your 20th order (Min bill ₹1000)'
    }
  ]
};
