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
    { id: 'biryani', name: 'Biryani & Pulao', icon: '🍗' },
    { id: 'tiffins', name: 'Tiffins & Breakfast', icon: '🥞' },
    { id: 'meals', name: 'Andhra Meals & Thali', icon: '🍛' },
    { id: 'chinese', name: 'Chinese & Fast Food', icon: '🍜' },
    { id: 'sweets', name: 'Sweets & Bakery', icon: '🍰' },
    { id: 'beverages', name: 'Tea, Coffee & Juices', icon: '🧋' }
  ],

  captains: [
    { id: 'cap-1', name: 'Ramesh G.', phone: '9848012345', vehicle: 'Hero Splendor (TS-05-AB-1234)', rating: 4.9, active: true, lat: 16.9995, lng: 79.9705, ordersCompleted: 142 },
    { id: 'cap-2', name: 'Suresh K.', phone: '9848054321', vehicle: 'Honda Activa (TS-05-CD-5678)', rating: 4.8, active: true, lat: 16.9940, lng: 79.9685, ordersCompleted: 98 },
    { id: 'cap-3', name: 'Venkatesh M.', phone: '9848098765', vehicle: 'Bajaj Pulsar (TS-05-EF-9012)', rating: 4.9, active: true, lat: 17.0012, lng: 79.9660, ordersCompleted: 210 }
  ],

  restaurants: [
    {
      id: 'rest-1',
      name: 'Kodad Biryani House',
      location: 'Khammam Cross Road, Kodad',
      lat: 17.0015,
      lng: 79.9660,
      phone: '9848011111',
      ownerName: 'Afzal Bhai',
      cuisine: 'Hyderabadi Dum Biryani • Tandoori',
      rating: 4.8,
      deliveryTime: '20-30 min',
      distance: '1.2 km',
      avgPrice: '₹250 for two',
      badge: 'Bestseller',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'rest-2',
      name: 'Sri Raghavendra Tiffin & Meals',
      location: 'Huzurnagar Road, Kodad',
      lat: 16.9940,
      lng: 79.9695,
      phone: '9848022222',
      ownerName: 'Raghavendra Rao',
      cuisine: 'Pure Veg • Ghee Karam Dosa • Idli Vada',
      rating: 4.7,
      deliveryTime: '15-20 min',
      distance: '0.8 km',
      avgPrice: '₹120 for two',
      badge: 'Top Rated Tiffins',
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'rest-3',
      name: 'New Grand Family Restaurant',
      location: 'Main Bazar, Kodad',
      lat: 16.9980,
      lng: 79.9680,
      phone: '9848033333',
      ownerName: 'Nagaraju G.',
      cuisine: 'South Indian • North Indian • Chinese',
      rating: 4.6,
      deliveryTime: '25-35 min',
      distance: '1.5 km',
      avgPrice: '₹300 for two',
      badge: 'Family Favorite',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'rest-4',
      name: 'Balaji Sweets & Bakery',
      location: 'Bus Stand Circle, Kodad',
      lat: 16.9990,
      lng: 79.9710,
      phone: '9848044444',
      ownerName: 'Balaji Prasad',
      cuisine: 'Cakes • Hot Puffs • Laddu • Gulab Jamun',
      rating: 4.9,
      deliveryTime: '15-25 min',
      distance: '0.5 km',
      avgPrice: '₹150 for two',
      badge: 'Fresh Daily',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'rest-5',
      name: 'Highway Spice Dhaba & Fast Food',
      location: 'NH-65 Bypass Junction, Kodad',
      lat: 17.0050,
      lng: 79.9620,
      phone: '9848055555',
      ownerName: 'Gurpreet Singh',
      cuisine: 'Roti & Naan • Kaju Paneer • Chicken Tikka',
      rating: 4.7,
      deliveryTime: '25-35 min',
      distance: '2.4 km',
      avgPrice: '₹350 for two',
      badge: 'Highway Special',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80'
    }
  ],

  products: [
    // Kodad Biryani House
    {
      id: 'item-1',
      restId: 'rest-1',
      restName: 'Kodad Biryani House',
      category: 'biryani',
      name: 'Special Chicken Dum Biryani',
      price: 220,
      originalPrice: 250,
      isVeg: false,
      rating: 4.9,
      description: 'Slow-cooked fragrant Basmati rice with marinated chicken pieces, served with spicy Mirchi Ka Salan and Raita.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      badge: 'Bestseller'
    },
    {
      id: 'item-2',
      restId: 'rest-1',
      restName: 'Kodad Biryani House',
      category: 'biryani',
      name: 'Andhra Chicken 65 (Boneless)',
      price: 180,
      originalPrice: 200,
      isVeg: false,
      rating: 4.8,
      description: 'Crispy fried boneless chicken tossed with spicy curry leaves, green chilies, and crushed garlic.',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
      badge: 'Spicy'
    },
    {
      id: 'item-3',
      restId: 'rest-1',
      restName: 'Kodad Biryani House',
      category: 'biryani',
      name: 'Hyderabadi Veg Dum Biryani',
      price: 160,
      originalPrice: 180,
      isVeg: true,
      rating: 4.7,
      description: 'Layered basmati rice with farm fresh vegetables, paneer cubes, and aromatic saffron spices.',
      image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=600&q=80',
      badge: 'Pure Veg'
    },

    // Sri Raghavendra Tiffins
    {
      id: 'item-4',
      restId: 'rest-2',
      restName: 'Sri Raghavendra Tiffin & Meals',
      category: 'tiffins',
      name: 'Ghee Karam Dosa (Kodad Special)',
      price: 60,
      originalPrice: 70,
      isVeg: true,
      rating: 4.9,
      description: 'Crispy golden roasted dosa smeared with red garlic karam and pure desi ghee, served with ginger & coconut chutney.',
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
      badge: 'Must Try'
    },
    {
      id: 'item-5',
      restId: 'rest-2',
      restName: 'Sri Raghavendra Tiffin & Meals',
      category: 'tiffins',
      name: 'Steamed Idli with Sambar (4 Pcs)',
      price: 45,
      originalPrice: 50,
      isVeg: true,
      rating: 4.8,
      description: 'Ultra soft feather-light rice idlis soaked in piping hot lentil vegetable sambar with fresh podi.',
      image: 'https://images.unsplash.com/photo-1589301773859-bb436b76426c?auto=format&fit=crop&w=600&q=80',
      badge: 'Breakfast Hit'
    },
    {
      id: 'item-6',
      restId: 'rest-2',
      restName: 'Sri Raghavendra Tiffin & Meals',
      category: 'tiffins',
      name: 'Poori with Potato Masala (2 Pcs)',
      price: 55,
      originalPrice: 60,
      isVeg: true,
      rating: 4.7,
      description: 'Fluffy golden fried pooris served with comforting potato curry and spiced Bombay chutney.',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      badge: 'Popular'
    },

    // New Grand Family Restaurant
    {
      id: 'item-7',
      restId: 'rest-3',
      restName: 'New Grand Family Restaurant',
      category: 'chinese',
      name: 'Chicken Fried Rice + Manchurian Bowl',
      price: 170,
      originalPrice: 190,
      isVeg: false,
      rating: 4.8,
      description: 'Wok-tossed aromatic chicken fried rice loaded with egg, veggies, and savory chicken balls in dark soy gravy.',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
      badge: 'Combo'
    },
    {
      id: 'item-8',
      restId: 'rest-3',
      restName: 'New Grand Family Restaurant',
      category: 'meals',
      name: 'Special Andhra Meals Thali',
      price: 140,
      originalPrice: 160,
      isVeg: true,
      rating: 4.9,
      description: 'Steaming white rice, Kodad Pappu, Tomato Rasam, Sambar, Palya curry, Curd, Appalam, and Gongura pickle.',
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
      badge: 'Authentic'
    },
    {
      id: 'item-9',
      restId: 'rest-3',
      restName: 'New Grand Family Restaurant',
      category: 'meals',
      name: 'Paneer Butter Masala',
      price: 190,
      originalPrice: 220,
      isVeg: true,
      rating: 4.8,
      description: 'Rich and creamy tomato-cashew makhani gravy with succulent malai paneer cubes.',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
      badge: 'Rich Gravy'
    },

    // Balaji Sweets & Bakery
    {
      id: 'item-10',
      restId: 'rest-4',
      restName: 'Balaji Sweets & Bakery',
      category: 'sweets',
      name: 'Hot Spicy Egg Puffs (2 Pcs)',
      price: 50,
      originalPrice: 60,
      isVeg: false,
      rating: 4.8,
      description: 'Flaky golden baked puff pastry stuffed with hard-boiled eggs and spiced onion masala.',
      image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80',
      badge: 'Evening Snack'
    },
    {
      id: 'item-11',
      restId: 'rest-4',
      restName: 'Balaji Sweets & Bakery',
      category: 'sweets',
      name: 'Dutch Chocolate Pastry Cake',
      price: 75,
      originalPrice: 85,
      isVeg: true,
      rating: 4.9,
      description: 'Moist layers of dark chocolate sponge topped with silky Belgian chocolate ganache.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      badge: 'Sweet Treat'
    },
    {
      id: 'item-12',
      restId: 'rest-4',
      restName: 'Balaji Sweets & Bakery',
      category: 'sweets',
      name: 'Motichoor Ghee Laddu (250g Box)',
      price: 130,
      originalPrice: 150,
      isVeg: true,
      rating: 4.9,
      description: 'Traditional pure desi ghee melt-in-mouth motichoor laddus made fresh every morning in Kodad.',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
      badge: 'Pure Ghee'
    },

    // Highway Spice Dhaba
    {
      id: 'item-13',
      restId: 'rest-5',
      restName: 'Highway Spice Dhaba & Fast Food',
      category: 'meals',
      name: 'Butter Naan (2) + Kaju Curry Combo',
      price: 210,
      originalPrice: 240,
      isVeg: true,
      rating: 4.8,
      description: 'Clay-oven baked fluffy butter naans paired with rich, roasted cashew nut curry.',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
      badge: 'Dhaba Hit'
    },
    {
      id: 'item-14',
      restId: 'rest-5',
      restName: 'Highway Spice Dhaba & Fast Food',
      category: 'beverages',
      name: 'Thick Badam Milk Chilled (300ml)',
      price: 45,
      originalPrice: 50,
      isVeg: true,
      rating: 4.9,
      description: 'Slow-boiled whole milk infused with almond paste, saffron strands, cardamom, and sliced pistachios.',
      image: 'https://images.unsplash.com/photo-1558857563-b371f32a7620?auto=format&fit=crop&w=600&q=80',
      badge: 'Refreshing'
    },
    {
      id: 'item-15',
      restId: 'rest-1',
      restName: 'Kodad Biryani House',
      category: 'biryani',
      name: 'Special Mutton Dum Biryani',
      price: 290,
      originalPrice: 320,
      isVeg: false,
      rating: 4.9,
      description: 'Tender baby mutton pieces layered in aged aromatic basmati rice with traditional Hyderabadi potli spices, served with Mirchi Ka Salan.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      badge: 'Chef Special'
    },
    {
      id: 'item-16',
      restId: 'rest-1',
      restName: 'Kodad Biryani House',
      category: 'biryani',
      name: 'Paneer Tikka Dum Biryani',
      price: 190,
      originalPrice: 220,
      isVeg: true,
      rating: 4.8,
      description: 'Charcoal-grilled smoky paneer tikka cubes tossed in rich masala and layered over fragrant saffron basmati rice.',
      image: 'https://images.unsplash.com/photo-1567184109411-b28f21ee097a?auto=format&fit=crop&w=600&q=80',
      badge: 'Pure Veg Special'
    },
    {
      id: 'item-17',
      restId: 'rest-3',
      restName: 'New Grand Family Restaurant',
      category: 'biryani',
      name: 'Andhra Chicken Fry Piece Biryani',
      price: 230,
      originalPrice: 260,
      isVeg: false,
      rating: 4.8,
      description: 'Spicy Kodad style Andhra shallow-fried chicken pieces with crispy curry leaves served over steaming biryani rice.',
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
      badge: 'Local Hit'
    },
    {
      id: 'item-18',
      restId: 'rest-3',
      restName: 'New Grand Family Restaurant',
      category: 'biryani',
      name: 'Shahi Kaju Pulao Biryani',
      price: 210,
      originalPrice: 240,
      isVeg: true,
      rating: 4.8,
      description: 'Pure desi ghee roasted whole cashews layered with long-grain basmati rice, fried brown onions, mint, and saffron.',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
      badge: 'Pure Veg'
    },
    {
      id: 'item-19',
      restId: 'rest-2',
      restName: 'Sri Raghavendra Tiffin & Meals',
      category: 'tiffins',
      name: 'Crispy Medu Vada with Sambar (3 Pcs)',
      price: 50,
      originalPrice: 60,
      isVeg: true,
      rating: 4.8,
      description: 'Golden crunchy outside and fluffy inside urad dal vadas served with hot Kodad sambar and fresh allam (ginger) chutney.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
      badge: 'Crispy'
    },
    {
      id: 'item-20',
      restId: 'rest-4',
      restName: 'Balaji Sweets & Bakery',
      category: 'sweets',
      name: 'Desi Ghee Hot Gulab Jamun (4 Pcs)',
      price: 60,
      originalPrice: 70,
      isVeg: true,
      rating: 4.9,
      description: 'Melt-in-mouth khoya dumplings fried in pure desi ghee and soaked in fragrant rose and cardamom syrup.',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
      badge: 'Hot & Sweet'
    }
  ],

  // Zomato-style Promo Slides Carousel
  banners: [
    {
      id: 'banner-vip',
      title: '🎉 VIP Milestone Reward',
      subtitle: 'Complete 10 orders to unlock ₹100, ₹75 & ₹50 OFF VIP Coupons!',
      badge: 'LOYALTY REWARDS',
      bgGradient: 'from-amber-500 via-orange-600 to-red-600',
      actionText: 'Check Coupons',
      actionType: 'coupons'
    },
    {
      id: 'banner-biryani',
      title: '🍗 Kodad Biryani Dhamaka',
      subtitle: 'Flat ₹50 OFF on orders above ₹300 with code KODAD50',
      badge: 'POPULAR OFFER',
      bgGradient: 'from-blue-600 via-indigo-600 to-blue-800',
      actionText: 'Order Biryani',
      actionType: 'category',
      categoryId: 'biryani'
    },
    {
      id: 'banner-fast',
      title: '⚡ 20-Min Flash Delivery',
      subtitle: 'Hot & steaming food across Balaji Nagar, Khammam X Road & Kodad',
      badge: 'HYPERLOCAL SPEED',
      bgGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      actionText: 'Fast Deliveries',
      actionType: 'fast'
    },
    {
      id: 'banner-veg',
      title: '🌱 Pure Veg Specials',
      subtitle: 'Ghee Karam Dosa, Idli & Motichoor Laddu delivered fresh daily',
      badge: '100% PURE VEG',
      bgGradient: 'from-green-600 via-emerald-600 to-lime-700',
      actionText: 'Explore Veg',
      actionType: 'veg'
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

  // Discount Coupons (with 10-orders VIP unlocking)
  coupons: [
    { code: 'KODAD50', discount: 50, minOrder: 300, description: 'Flat ₹50 OFF on orders above ₹300', isVipOnly: false },
    { code: 'KODAD75', discount: 75, minOrder: 400, description: 'VIP Reward: ₹75 OFF on orders above ₹400', isVipOnly: true },
    { code: 'KODAD100', discount: 100, minOrder: 500, description: 'VIP Mega Reward: ₹100 OFF on orders above ₹500', isVipOnly: true }
  ]
};
