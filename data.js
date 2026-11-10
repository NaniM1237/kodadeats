/**
 * Eat.in (కొదాడ ఈట్స్) - Core Catalog, Categories, Geo-Data & Store Registry
 * Ultra-Fast 15-20 Min Delivery across Kodad Town
 */

const KODAD_DATA = {
  appName: 'Eat.in',
  brandName: 'Eat.in',
  tagline: 'Instant Delivery across Kodad (Food • Dhabas • Meat • Essentials)',
  currency: '₹',
  themeColor: '#FF5A36', // Warm Coral / Orange
  liteTheme: {
    bgLight: '#FBFBFD',
    cardLight: '#FFFFFF',
    primary: '#FF5A36',
    primaryHover: '#E84A27',
    primaryLight: '#FFF1EE',
    accentGreen: '#10B981',
    accentDark: '#1E293B',
    accentMuted: '#64748B'
  },

  // Razorpay Gateway Config
  razorpayKey: 'rzp_test_eatin_kodad', // Standard Razorpay Key

  // Official UPI Payment Configuration
  upiConfig: {
    upiId: 'manda.nani07-2@okaxis',
    merchantName: 'Nani Manda (Eat.in)',
    businessLabel: 'Eat.in Kodad Official',
    gpayQrImage: 'upi-gpay-qr.jpg',
    phonePeQrImage: 'upi-phonepe-qr.jpg'
  },

  // Kodad Center Coordinates
  center: { lat: 16.9972, lng: 79.9678 },

  // Kodad Landmarks with High-Precision Coordinates for Drop Locations
  landmarks: [
    { name: 'Bus Stand Circle, Kodad', lat: 16.9990, lng: 79.9710 },
    { name: 'Balaji Nagar, Kodad', lat: 16.9930, lng: 79.9630 },
    { name: 'Huzurnagar Road, Kodad', lat: 16.9945, lng: 79.9690 },
    { name: 'Khammam Cross Road, Kodad', lat: 17.0010, lng: 79.9665 },
    { name: 'Gandhi Chowk, Kodad', lat: 16.9975, lng: 79.9675 },
    { name: 'Main Bazar, Kodad', lat: 16.9980, lng: 79.9685 },
    { name: 'Srinivasa Nagar, Kodad', lat: 16.9920, lng: 79.9650 },
    { name: 'Venkateswara Theatre Area, Kodad', lat: 16.9960, lng: 79.9700 },
    { name: 'Mellacheruvu Road, Kodad', lat: 16.9900, lng: 79.9680 },
    { name: 'NH-65 Bypass Junction, Kodad', lat: 17.0040, lng: 79.9630 }
  ],

  // Comprehensive Category Registry (Requirement 2)
  categories: [
    { id: 'all', name: 'All Stores & Menus', icon: '✨', subtitle: 'Everything in Kodad' },
    { id: 'restaurants', name: 'Restaurants', icon: '🍽️', subtitle: 'Biryani, Meals & Dining', badge: 'Top Rated' },
    { id: 'dhabas', name: 'Highway Dhabas', icon: '🫓', subtitle: 'Tandoori Roti & Curries', badge: 'Late Night' },
    { id: 'tiffins', name: 'Tiffin Centres', icon: '🥞', subtitle: 'Idli, Dosa, Vada & Poori', badge: 'Morning & Night' },
    { id: 'fastfood', name: 'Fast Food Centres', icon: '🍜', subtitle: 'Fried Rice, Noodles, Rolls', badge: 'Fast Prep' },
    { id: 'chickenshop', name: 'Chicken Shop', icon: '🍗', subtitle: 'Fresh Dressed Live Chicken', badge: 'Farm Fresh' },
    { id: 'meat', name: 'Meat & Mutton', icon: '🥩', subtitle: 'Tender Goat Mutton & Cuts', badge: 'Fresh Daily' },
    { id: 'bakery', name: 'Bakery & Ice Creams', icon: '🍰', subtitle: 'Cakes, Pastries, Scoops', badge: 'Celebrations' },
    { id: 'fruits', name: 'Fruits & Juices', icon: '🍎', subtitle: 'Seasonal Fruits & Juices', badge: '100% Healthy' },
    { id: 'medicine', name: 'Medicine & Pharmacy', icon: '💊', subtitle: 'Emergency Medicines & Baby Care', badge: '24/7 Fast' },
    { id: 'grocery', name: 'Daily Essentials', icon: '🥛', subtitle: 'Dairy, Milk, Bread & Snacks', badge: '15 Mins' },
    { id: 'beverages', name: 'Tea & Beverages', icon: '☕', subtitle: 'Irani Chai, Coffee, Sodas', badge: 'Refreshing' }
  ],

  // Owner & Admin Security Settings
  adminAuthorizedPhones: ['9640103505', '9182348241'],
  ownerSupportPhones: ['9640103505', '9182348241'],
  ownerPrimaryPhone: '9640103505',

  // Pricing & Commission Policy
  pricing: {
    deliveryFee: 30,       // Flat ₹30 delivery fee across Kodad
    riderCommission: 30,   // ₹30 rider earnings per delivery
    packingCharges: 0      // Free packaging
  },

  // Slide Show for Food Items (Left-to-Right / Right-to-Left Showcase) (Requirement 1)
  foodShowcase: [
    { name: 'Chicken Dum Biryani', price: 220, isVeg: false, tag: 'Bestseller in Kodad', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80' },
    { name: 'Ghee Karam Podi Dosa', price: 60, isVeg: true, tag: 'Steaming Morning Hit', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80' },
    { name: 'Butter Tandoori Roti & Paneer', price: 180, isVeg: true, tag: 'Highway Dhaba Special', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80' },
    { name: 'Crispy Chicken 65 & Rolls', price: 150, isVeg: false, tag: 'Evening Hot Starter', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=80' },
    { name: 'Black Forest Cake & Pastry', price: 70, isVeg: true, tag: 'Fresh Bakery Bake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80' },
    { name: 'Cold Thick Chocolate Shake', price: 80, isVeg: true, tag: 'Thick & Creamy', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80' },
    { name: 'Fresh Cut Fruit Bowl', price: 90, isVeg: true, tag: 'Hydrating & Fresh', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=80' },
    { name: 'Desi Ghee Gulab Jamun', price: 40, isVeg: true, tag: 'Hot Sweets Special', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&auto=format&fit=crop&q=80' }
  ],

  // Slide Show for Restaurant Advertisements & Offers (Requirement 5)
  banners: [
    {
      id: 'banner-welcome',
      title: '⚡ Welcome to Eat.in Kodad',
      subtitle: 'Order from Restaurants, Highway Dhabas, Tiffins, Chicken & Bakery delivered in 20 mins!',
      badge: 'FLAT ₹30 DELIVERY',
      bgGradient: 'from-orange-500 via-rose-500 to-amber-600',
      actionText: 'Explore Stores',
      actionType: 'category',
      categoryId: 'all'
    },
    {
      id: 'banner-dhaba',
      title: '🫓 Kaveri Highway Dhaba Live',
      subtitle: 'Steaming Tandoori Roti, Butter Chicken, Dal Tadka & Biryani till late night.',
      badge: 'HIGHWAY SPECIAL',
      bgGradient: 'from-amber-600 via-orange-600 to-red-600',
      actionText: 'Order Dhaba',
      actionType: 'category',
      categoryId: 'dhabas'
    },
    {
      id: 'banner-tiffins',
      title: '🥞 Morning & Night Tiffin Specials',
      subtitle: 'Ghee Karam Dosa, Idli Sambar, Medu Vada & Poori from top tiffin centres.',
      badge: 'FRESH TIFFINS',
      bgGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      actionText: 'Order Tiffins',
      actionType: 'category',
      categoryId: 'tiffins'
    },
    {
      id: 'banner-chicken',
      title: '🍗 Farm Fresh Chicken & Mutton',
      subtitle: 'Skinless tender chicken & fresh mutton cleaned and delivered right to your kitchen.',
      badge: 'FARM FRESH',
      bgGradient: 'from-red-600 via-rose-600 to-pink-700',
      actionText: 'View Meat Shop',
      actionType: 'category',
      categoryId: 'chickenshop'
    },
    {
      id: 'banner-support',
      title: '📞 24/7 Helpline & Store Onboarding',
      subtitle: 'Got a question or want to list your restaurant? Call founder directly: 9640103505',
      badge: 'FOUNDER HELPLINE',
      bgGradient: 'from-slate-800 via-slate-900 to-black',
      actionText: 'Call 9640103505',
      actionType: 'call'
    }
  ],

  // Curated Partner Stores Across All Categories (Requirement 2)
  // Has live open/close timings, active status, distance and delivery time
  restaurants: [
    {
      id: 'rest-1',
      name: 'Sri Kanya Family Restaurant',
      category: 'restaurants',
      cuisine: 'Dum Biryani, Andhra Thali, Chinese',
      location: 'Bus Stand Road, Kodad',
      timings: '11:00 AM - 11:00 PM',
      distance: '0.9 km',
      deliveryTime: '20 mins',
      rating: 4.8,
      isOpen: true,
      isVeg: false,
      ownerName: 'Srinivas Rao',
      phone: '9640103505',
      badge: 'Bestseller Restaurant',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80',
      lat: 16.9990,
      lng: 79.9710
    },
    {
      id: 'rest-2',
      name: 'Kaveri Highway Dhaba',
      category: 'dhabas',
      cuisine: 'Tandoori Roti, Butter Chicken, Dal Tadka',
      location: 'NH-65 Bypass Junction, Kodad',
      timings: '12:00 PM - 1:00 AM',
      distance: '1.8 km',
      deliveryTime: '25 mins',
      rating: 4.9,
      isOpen: true,
      isVeg: false,
      ownerName: 'Kaveri Raju',
      phone: '9640103505',
      badge: 'Late Night Dhaba',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80',
      lat: 17.0040,
      lng: 79.9630
    },
    {
      id: 'rest-3',
      name: 'Sri Venkateshwara Tiffin Centre',
      category: 'tiffins',
      cuisine: 'Ghee Karam Dosa, Idli, Vada, Poori',
      location: 'Old Bus Stand Circle, Kodad',
      timings: '6:30 AM - 10:30 PM',
      distance: '0.5 km',
      deliveryTime: '15 mins',
      rating: 4.9,
      isOpen: true,
      isVeg: true,
      ownerName: 'Venkatesh',
      phone: '9640103505',
      badge: 'Morning & Night Tiffins',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80',
      lat: 16.9985,
      lng: 79.9700
    },
    {
      id: 'rest-4',
      name: 'Kodad Fast Food & Chinese Hub',
      category: 'fastfood',
      cuisine: 'Chicken Fried Rice, Veg Manchurian, Egg Noodles',
      location: 'Huzurnagar Road, Kodad',
      timings: '1:00 PM - 11:00 PM',
      distance: '1.1 km',
      deliveryTime: '20 mins',
      rating: 4.7,
      isOpen: true,
      isVeg: false,
      ownerName: 'Mahesh',
      phone: '9640103505',
      badge: 'Hot & Spicy Fast Food',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=80',
      lat: 16.9945,
      lng: 79.9690
    },
    {
      id: 'rest-5',
      name: 'Fresh Farm Live Chicken Centre',
      category: 'chickenshop',
      cuisine: 'Skinless Chicken, Boneless Breast, Country Natu Kodi',
      location: 'Main Bazar, Kodad',
      timings: '7:00 AM - 9:00 PM',
      distance: '0.8 km',
      deliveryTime: '20 mins',
      rating: 4.8,
      isOpen: true,
      isVeg: false,
      ownerName: 'Rasool',
      phone: '9640103505',
      badge: 'Clean Cut Chicken',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&auto=format&fit=crop&q=80',
      lat: 16.9980,
      lng: 79.9685
    },
    {
      id: 'rest-6',
      name: 'Al-Madina Fresh Meat & Mutton',
      category: 'meat',
      cuisine: 'Tender Fresh Goat Mutton, Keema, Rib Cuts',
      location: 'Khammam Cross Road, Kodad',
      timings: '7:00 AM - 8:30 PM',
      distance: '1.2 km',
      deliveryTime: '25 mins',
      rating: 4.9,
      isOpen: true,
      isVeg: false,
      ownerName: 'Ibrahim',
      phone: '9640103505',
      badge: '100% Fresh Daily',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80',
      lat: 17.0010,
      lng: 79.9665
    },
    {
      id: 'rest-7',
      name: 'Karachi Bakery & Scoop Ice Creams',
      category: 'bakery',
      cuisine: 'Fresh Pastries, Birthday Cakes, Puffs, Cold Scoops',
      location: 'Gandhi Chowk, Kodad',
      timings: '8:00 AM - 10:30 PM',
      distance: '0.6 km',
      deliveryTime: '15 mins',
      rating: 4.8,
      isOpen: true,
      isVeg: true,
      ownerName: 'Satish',
      phone: '9640103505',
      badge: 'Pure Veg Bakery',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80',
      lat: 16.9975,
      lng: 79.9675
    },
    {
      id: 'rest-8',
      name: 'Kodad Fresh Fruit Mart & Juice Bar',
      category: 'fruits',
      cuisine: 'Fresh Apples, Bananas, Papaya, Mosambi & Anar Juices',
      location: 'Balaji Nagar, Kodad',
      timings: '7:30 AM - 9:30 PM',
      distance: '0.7 km',
      deliveryTime: '15 mins',
      rating: 4.8,
      isOpen: true,
      isVeg: true,
      ownerName: 'Govind',
      phone: '9640103505',
      badge: 'Fresh & Chilled Juices',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=80',
      lat: 16.9930,
      lng: 79.9630
    },
    {
      id: 'rest-9',
      name: 'Apollo / 24x7 Emergency Medicals',
      category: 'medicine',
      cuisine: 'First Aid, Pain Relief, Baby Care, Healthcare Essentials',
      location: 'Venkateswara Theatre Area, Kodad',
      timings: '24 Hours Open',
      distance: '1.0 km',
      deliveryTime: '15 mins',
      rating: 4.9,
      isOpen: true,
      isVeg: true,
      ownerName: 'Dr. Prasad',
      phone: '9640103505',
      badge: '24/7 Delivery',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
      lat: 16.9960,
      lng: 79.9700
    }
  ],

  // Curated Signature Dishes & Products Across All Categories (Requirement 2 & 6)
  products: [
    {
      id: 'item-1',
      restId: 'rest-1',
      restName: 'Sri Kanya Family Restaurant',
      category: 'restaurants',
      name: 'Special Chicken Dum Biryani',
      price: 220,
      originalPrice: 250,
      isVeg: false,
      rating: 4.9,
      isFrequentlyOrdered: true,
      description: 'Slow-cooked aromatic basmati rice with tender marinated chicken pieces, served with spicy salan and curd raita.',
      badge: '🔥 Kodad Bestseller',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-2',
      restId: 'rest-1',
      restName: 'Sri Kanya Family Restaurant',
      category: 'restaurants',
      name: 'Paneer Butter Masala (Full)',
      price: 180,
      originalPrice: 200,
      isVeg: true,
      rating: 4.8,
      isFrequentlyOrdered: true,
      description: 'Rich creamy tomato gravy with soft malai paneer cubes, butter and fresh coriander.',
      badge: '🌱 Pure Veg Hit',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-3',
      restId: 'rest-2',
      restName: 'Kaveri Highway Dhaba',
      category: 'dhabas',
      name: 'Butter Tandoori Roti (3 Pcs) & Dal Tadka',
      price: 130,
      originalPrice: 150,
      isVeg: true,
      rating: 4.9,
      isFrequentlyOrdered: true,
      description: 'Clay-oven baked crisp tandoori rotis slathered with amul butter and smoky garlic dal tadka.',
      badge: '🫓 Dhaba Special',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-4',
      restId: 'rest-2',
      restName: 'Kaveri Highway Dhaba',
      category: 'dhabas',
      name: 'Dhaba Kadai Chicken (Boneless)',
      price: 210,
      originalPrice: 240,
      isVeg: false,
      rating: 4.8,
      isFrequentlyOrdered: true,
      description: 'Thick spicy highway curry cooked with capsicum, freshly pounded dhaba spices and juicy chicken.',
      badge: '🍗 Late Night Favorite',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-5',
      restId: 'rest-3',
      restName: 'Sri Venkateshwara Tiffin Centre',
      category: 'tiffins',
      name: 'Ghee Karam Podi Dosa',
      price: 60,
      originalPrice: 70,
      isVeg: true,
      rating: 4.9,
      isFrequentlyOrdered: true,
      description: 'Crispy golden dosa topped with roasted spicy red karam podi and pure desi ghee, served with ginger & coconut chutneys.',
      badge: '🥞 Morning Bestseller',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-6',
      restId: 'rest-3',
      restName: 'Sri Venkateshwara Tiffin Centre',
      category: 'tiffins',
      name: 'Steaming Idli (4 Pcs) & Crispy Medu Vada (1 Pc)',
      price: 50,
      originalPrice: 60,
      isVeg: true,
      rating: 4.8,
      isFrequentlyOrdered: true,
      description: 'Piping hot fluffy idlis and crunchy cumin medu vada dipped in piping hot drumstick sambar.',
      badge: '🌱 Fresh Steaming',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-7',
      restId: 'rest-4',
      restName: 'Kodad Fast Food & Chinese Hub',
      category: 'fastfood',
      name: 'Chicken Fried Rice & Veg Manchurian Combo',
      price: 140,
      originalPrice: 160,
      isVeg: false,
      rating: 4.7,
      isFrequentlyOrdered: true,
      description: 'Wok-tossed aromatic basmati rice with shredded chicken, eggs, accompanied by crispy manchurian balls in garlic sauce.',
      badge: '🍜 Fast Food Combo',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-8',
      restId: 'rest-5',
      restName: 'Fresh Farm Live Chicken Centre',
      category: 'chickenshop',
      name: 'Fresh Skinless Chicken (Curry Cut 1 Kg)',
      price: 220,
      originalPrice: 240,
      isVeg: false,
      rating: 4.8,
      isFrequentlyOrdered: false,
      description: 'Dressed live tender broiler chicken, cleaned in RO water, precision cut into medium curry pieces.',
      badge: '🍗 100% Farm Fresh',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-9',
      restId: 'rest-6',
      restName: 'Al-Madina Fresh Meat & Mutton',
      category: 'meat',
      name: 'Premium Tender Mutton (500g Fresh Cut)',
      price: 450,
      originalPrice: 480,
      isVeg: false,
      rating: 4.9,
      isFrequentlyOrdered: false,
      description: 'Daily fresh halal tender goat meat cut with bone, tender ribs, ideal for slow-cooked mutton curry or biryani.',
      badge: '🥩 Tender Goat Mutton',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-10',
      restId: 'rest-7',
      restName: 'Karachi Bakery & Scoop Ice Creams',
      category: 'bakery',
      name: 'Black Forest Fresh Cream Pastry (2 Pcs)',
      price: 70,
      originalPrice: 90,
      isVeg: true,
      rating: 4.8,
      isFrequentlyOrdered: true,
      description: 'Layers of moist chocolate sponge soaked with cherry syrup, topped with rich fresh cream and chocolate flakes.',
      badge: '🍰 Bakery Hit',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-11',
      restId: 'rest-8',
      restName: 'Kodad Fresh Fruit Mart & Juice Bar',
      category: 'fruits',
      name: 'Fresh Mosambi (Sweet Lime) Juice (350ml Chilled)',
      price: 50,
      originalPrice: 60,
      isVeg: true,
      rating: 4.8,
      isFrequentlyOrdered: true,
      description: 'Cold-pressed fresh sweet limes with a pinch of black salt and roasted cumin. 100% pure juice with no added water.',
      badge: '🍎 Pure Cold-Pressed',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'item-12',
      restId: 'rest-9',
      restName: 'Apollo / 24x7 Emergency Medicals',
      category: 'medicine',
      name: 'First Aid Emergency Kit & Pain Relief Spray',
      price: 110,
      originalPrice: 130,
      isVeg: true,
      rating: 4.9,
      isFrequentlyOrdered: false,
      description: 'Fast pain relief spray (55g) + waterproof adhesive bandages (10 strips) + Dettol antiseptic liquid (50ml).',
      badge: '💊 24x7 Emergency Delivery',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80'
    }
  ],

  // Related Add-on Items ("Customers Also Added")
  addOns: [
    { id: 'add-1', name: 'Spicy Mirchi Ka Salan (Extra Cup)', price: 30, isVeg: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-2', name: 'Chilled Thick Curd Raita', price: 20, isVeg: true, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-3', name: 'Thick Badam Milk (Chilled 300ml)', price: 45, isVeg: true, image: 'https://images.unsplash.com/photo-1558857563-b371f32a7620?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-4', name: 'Hot Desi Ghee Gulab Jamun (2 Pcs)', price: 40, isVeg: true, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-5', name: 'Crispy Medu Vada (1 Pc)', price: 20, isVeg: true, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80' },
    { id: 'add-6', name: 'Mineral Water Bottle (1L Chilled)', price: 20, isVeg: true, image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=300&q=80' }
  ],

  // Milestone Loyalty Coupons
  coupons: [
    {
      code: 'EATIN50',
      discount: 50,
      minOrder: 500,
      requiredOrders: 10,
      milestoneTitle: '11th Order Special',
      description: 'Flat ₹50 OFF on your 11th order (Min bill ₹500)'
    },
    {
      code: 'EATIN75',
      discount: 75,
      minOrder: 700,
      requiredOrders: 14,
      milestoneTitle: '15th Order Special',
      description: 'VIP Reward: ₹75 OFF on your 15th order (Min bill ₹700)'
    },
    {
      code: 'EATIN100',
      discount: 100,
      minOrder: 1000,
      requiredOrders: 19,
      milestoneTitle: '20th Order Milestone',
      description: 'Diamond Member: ₹100 OFF on your 20th order (Min bill ₹1000)'
    }
  ],

  captains: []
};

// Export for Node/CommonJS environment if applicable
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KODAD_DATA;
}
