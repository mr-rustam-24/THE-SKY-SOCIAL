// Restaurant Information
export const RESTAURANT_INFO = {
  name: "Skypiea",
  fullName: "Skypiea by Hideout Café",
  tagline: "When Flavours meet Passion, Magic happens",
  subTagline: "Come Join Us For A Magical Experience",
  established: "Since 2015",
  city: "Lucknow",
  neighborhood: "Gomti Nagar",
  address: "Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  hours: {
    weekdays: "12:00 PM – 11:30 PM",
    weekends: "12:00 PM – Midnight"
  }
};

// Hero Carousel Slides (Featuring the owner's uploaded restaurant images)
export const HERO_SLIDES = [
  {
    id: 1,
    title: "Come Join Us For A Magical Experience.",
    subtitle: "When Flavours meet Passion, Magic happens.",
    image: "/assets/images/hero_slide_01.png",
    buttonText: "View Menu",
    buttonAction: "menu"
  },
  {
    id: 2,
    title: "From The Indian Hearth & Kitchen.",
    subtitle: "When Flavours meet Passion, Magic happens.",
    image: "/assets/images/hero_slide_02.png",
    buttonText: "View Menu",
    buttonAction: "menu"
  }
];

// All 9 Scanned Original Menu Cards uploaded by the owner
export const ORIGINAL_MENU_PAGES = [
  {
    id: 1,
    pageNumber: "01",
    title: "Menu Cover",
    subtitle: "An Escape Above The City · Since 2015",
    image: "/assets/menu/menu_cover.webp"
  },
  {
    id: 2,
    pageNumber: "02",
    title: "Small Plates, Soups & Salads",
    subtitle: "Bruschetta, Cheese Garlic Bread & Fresh Salads",
    image: "/assets/menu/menu_page_02.webp"
  },
  {
    id: 3,
    pageNumber: "03",
    title: "From The Wok & Thin-Crust Pizzas",
    subtitle: "Chilli Garlic Noodles, Dimsums, Margherita & Tikka Pizza",
    image: "/assets/menu/menu_page_03.webp"
  },
  {
    id: 4,
    pageNumber: "04",
    title: "Pasta, Bowls & Sandwiches",
    subtitle: "Alfredo Penne, Korean Bowls, Grilled Sandwiches",
    image: "/assets/menu/menu_page_04.webp"
  },
  {
    id: 5,
    pageNumber: "05",
    title: "Sides & Hideout Signatures",
    subtitle: "Stuffed Cheese Chicken, Butter Garlic Prawns & Crispy Paneer",
    image: "/assets/menu/menu_page_05.webp"
  },
  {
    id: 6,
    pageNumber: "06",
    title: "From The Indian Hearth & Hot Coffee",
    subtitle: "Butter Chicken, Paneer Lababdar, Dal Tadka, Espresso, Cappuccino",
    image: "/assets/menu/menu_page_06.webp"
  },
  {
    id: 7,
    pageNumber: "07",
    title: "Cold Coffee, Hot Tea & Ice Tea",
    subtitle: "Cold Brew, Classic Cold Coffee, Sulemani Chai, Peach Ice Tea",
    image: "/assets/menu/menu_page_07.webp"
  },
  {
    id: 8,
    pageNumber: "08",
    title: "Mocktails, Shakes, Smoothies & Matcha",
    subtitle: "Virgin Mojito, Blue Lagoon, Kit-Kat Shake, Berry Blast",
    image: "/assets/menu/menu_page_08.webp"
  },
  {
    id: 9,
    pageNumber: "09",
    title: "Fresh Juices, Essentials & Desserts",
    subtitle: "Fresh Watermelon Juice, Brownie with Ice Cream & Mousse",
    image: "/assets/menu/menu_page_09.webp"
  }
];

// Complete Real Menu Items with accurate Veg / Non-Veg tags and prices
export const MENU_ITEMS = [
  // ==========================================
  // PAGE 06: FROM THE INDIAN HEARTH (CURRIES & BREADS)
  // ==========================================
  {
    id: "ih-1",
    name: "Paneer Lababdar",
    category: "indian_hearth",
    subCategory: "Indian Curries (Paneer)",
    price: 380,
    priceDisplay: "₹380",
    isVeg: true,
    description: "Fresh paneer cubes simmered in a velvety, tangy tomato-cashew gravy with grated paneer and butter."
  },
  {
    id: "ih-2",
    name: "Paneer Makhani",
    category: "indian_hearth",
    subCategory: "Indian Curries (Paneer)",
    price: 360,
    priceDisplay: "₹360",
    isVeg: true,
    description: "Soft cottage cheese in a rich, creamy, mildly spiced tomato-cashew gravy with fenugreek aromatics."
  },
  {
    id: "ih-3",
    name: "Kadai Paneer",
    category: "indian_hearth",
    subCategory: "Indian Curries (Paneer)",
    price: 350,
    priceDisplay: "₹350",
    isVeg: true,
    description: "Paneer, crunchy capsicum and onions in a thick, tangy tomato gravy seasoned with freshly pounded kadai masala."
  },
  {
    id: "ih-4",
    name: "Classic Butter Chicken",
    category: "indian_hearth",
    subCategory: "Indian Curries (Chicken)",
    price: 460,
    priceDisplay: "₹460",
    isVeg: false,
    description: "Marinated roasted tandoori chicken simmered in a silky, mildly spiced tomato, butter and cream gravy."
  },
  {
    id: "ih-5",
    name: "Chicken Lababdar",
    category: "indian_hearth",
    subCategory: "Indian Curries (Chicken)",
    price: 420,
    priceDisplay: "₹420",
    isVeg: false,
    description: "Tender chicken simmered in a rich onion-tomato-cashew gravy enriched with butter, cream and ginger juliennes."
  },
  {
    id: "ih-6",
    name: "Chicken Masala",
    category: "indian_hearth",
    subCategory: "Indian Curries (Chicken)",
    price: 420,
    priceDisplay: "₹420",
    isVeg: false,
    description: "Succulent chicken cooked homestyle in a thick onion-tomato gravy with freshly roasted Indian whole spices."
  },
  {
    id: "ih-7",
    name: "Dal Tadka",
    category: "indian_hearth",
    subCategory: "Dal",
    price: 220,
    priceDisplay: "₹220",
    isVeg: true,
    description: "Yellow lentils slow-cooked and tempered with desi ghee, cumin, garlic, red chillies and fresh coriander."
  },
  {
    id: "ih-8",
    name: "Dal Sultani",
    category: "indian_hearth",
    subCategory: "Dal",
    price: 280,
    priceDisplay: "₹280",
    isVeg: true,
    description: "Awadhi royal dal simmered with milk, cream and aromatic cloves, finished with a smoky charcoal dhungar."
  },
  {
    id: "ih-9",
    name: "Tawa Roti (Plain / Butter)",
    category: "indian_hearth",
    subCategory: "Breads",
    price: 40,
    priceDisplay: "₹40 / ₹50",
    isVeg: true,
    description: "Freshly puffed whole wheat roti cooked on the tawa, served plain or brushed with melted white butter."
  },
  {
    id: "ih-10",
    name: "Crispy Laccha Paratha",
    category: "indian_hearth",
    subCategory: "Breads",
    price: 90,
    priceDisplay: "₹90",
    isVeg: true,
    description: "Multi-layered flaky whole wheat paratha crisped on the tawa with pure desi ghee."
  },

  // ==========================================
  // PAGE 02: SMALL PLATES, SOUPS & SALADS
  // ==========================================
  {
    id: "sp-1",
    name: "Italian Salsa Bruschetta (2 pcs)",
    category: "small_plates",
    subCategory: "Bruschetta",
    price: 220,
    priceDisplay: "₹220",
    isVeg: true,
    description: "Crisp garlic-rubbed bread, diced ripe tomato, fresh basil, extra virgin olive oil and Italian seasoning."
  },
  {
    id: "sp-2",
    name: "Cheese Garlic Bread (4 pcs)",
    category: "small_plates",
    subCategory: "Bruschetta",
    price: 260,
    priceDisplay: "₹260",
    isVeg: true,
    description: "Crisp French baguette layered with rich garlic butter, herbs and a generous blanket of melted cheese."
  },
  {
    id: "sp-3",
    name: "Chilli Cheese Toast (4 pcs)",
    category: "small_plates",
    subCategory: "Bruschetta",
    price: 260,
    priceDisplay: "₹260",
    isVeg: true,
    description: "Golden toasted bread topped with spicy minced green chillies, bell peppers, herbs and melted cheese."
  },
  {
    id: "sp-4",
    name: "Mushroom Bruschetta (2 pcs)",
    category: "small_plates",
    subCategory: "Bruschetta",
    price: 280,
    priceDisplay: "₹280",
    isVeg: true,
    description: "Toasted garlic bread topped with tender button mushrooms sautéed in olive oil, garlic and fresh herbs."
  },
  {
    id: "sp-5",
    name: "Chicken Bruschetta (2 pcs)",
    category: "small_plates",
    subCategory: "Bruschetta",
    price: 280,
    priceDisplay: "₹280",
    isVeg: false,
    description: "Toasted garlic bread layered with savoury shredded chicken, melted mozzarella and herbs."
  },
  {
    id: "soup-1",
    name: "Hot & Sour Soup",
    category: "small_plates",
    subCategory: "Soups",
    price: 210,
    priceDisplay: "₹210 (Veg) / ₹260 (Chicken)",
    isVeg: true,
    description: "Velvety Indo-Chinese broth that balances hot black pepper spice and sour vinegar. Available in Veg and Chicken."
  },
  {
    id: "soup-2",
    name: "Manchow Soup",
    category: "small_plates",
    subCategory: "Soups",
    price: 220,
    priceDisplay: "₹220 (Veg) / ₹270 (Chicken)",
    isVeg: true,
    description: "Indo-Chinese deep brown soup with garlic, ginger, and vegetables. Served with crunchy fried noodles."
  },
  {
    id: "soup-3",
    name: "Cream of Tomato Soup",
    category: "small_plates",
    subCategory: "Soups",
    price: 240,
    priceDisplay: "₹240",
    isVeg: true,
    description: "Rich blended ripe red tomatoes with fresh cream. Served with golden crunchy bread croutons."
  },
  {
    id: "soup-4",
    name: "Sweet Corn Soup",
    category: "small_plates",
    subCategory: "Soups",
    price: 210,
    priceDisplay: "₹210",
    isVeg: true,
    description: "Comforting, creamy, mildly sweet soup loaded with crushed golden American sweet corn."
  },
  {
    id: "soup-5",
    name: "Cream of Chicken Soup",
    category: "small_plates",
    subCategory: "Soups",
    price: 290,
    priceDisplay: "₹290",
    isVeg: false,
    description: "Velvety smooth chicken broth with tender shredded chicken, garlic butter and fresh cream."
  },
  {
    id: "sal-1",
    name: "Classic Caesar Salad",
    category: "small_plates",
    subCategory: "Salads",
    price: 240,
    priceDisplay: "₹240 (Veg) / ₹290 (Chicken)",
    isVeg: true,
    description: "Crisp iceberg lettuce, crunchy garlic croutons, parmesan shavings and classic creamy Caesar dressing."
  },
  {
    id: "sal-2",
    name: "Watermelon, Feta & Basil Salad",
    category: "small_plates",
    subCategory: "Salads",
    price: 350,
    priceDisplay: "₹350",
    isVeg: true,
    description: "Chilled fresh watermelon cubes, crumbled creamy feta cheese, fresh garden basil and sweet balsamic glaze."
  },
  {
    id: "sal-3",
    name: "Mediterranean Salad",
    category: "small_plates",
    subCategory: "Salads",
    price: 320,
    priceDisplay: "₹320",
    isVeg: true,
    description: "Diced tomato, cucumber, black olives, feta cheese and legumes, tossed in extra virgin olive oil and lemon."
  },
  {
    id: "sal-4",
    name: "Grilled Chicken Salad",
    category: "small_plates",
    subCategory: "Salads",
    price: 380,
    priceDisplay: "₹380",
    isVeg: false,
    description: "High-protein bowl of marinated herb-grilled chicken breast over crisp lettuce, cucumber and bell peppers."
  },

  // ==========================================
  // PAGE 03: FROM THE WOK
  // ==========================================
  {
    id: "wok-1",
    name: "Chilli Garlic Noodles / Rice",
    category: "wok",
    subCategory: "Noodles & Rice",
    price: 320,
    priceDisplay: "₹320",
    isVeg: true,
    description: "Wok-tossed noodles or fragrant long-grain rice with burnt garlic, red chillies, spring onions and soy."
  },
  {
    id: "wok-2",
    name: "Veg Hakka Noodles",
    category: "wok",
    subCategory: "Noodles & Rice",
    price: 260,
    priceDisplay: "₹260",
    isVeg: true,
    description: "Classic street-style Hakka noodles tossed with crunchy shredded cabbage, carrots, capsicum and mild spices."
  },
  {
    id: "wok-3",
    name: "Chilli Chicken / Paneer / Mushroom",
    category: "wok",
    subCategory: "Wok Appetizers",
    price: 360,
    priceDisplay: "₹360",
    isVeg: false,
    description: "Crispy batter-fried chicken, cottage cheese paneer, or fresh mushrooms tossed in a savoury dark chilli garlic sauce."
  },
  {
    id: "wok-4",
    name: "Dimsum — Assorted Veg (4 pcs)",
    category: "wok",
    subCategory: "Dimsum & Bao",
    price: 320,
    priceDisplay: "₹320",
    isVeg: true,
    description: "Delicate translucent steamed wrappers filled with finely minced seasonal vegetables and mild herbs."
  },
  {
    id: "wok-5",
    name: "Dimsum — Chicken Basil (4 pcs)",
    category: "wok",
    subCategory: "Dimsum & Bao",
    price: 380,
    priceDisplay: "₹380",
    isVeg: false,
    description: "Steamed chicken dumplings infused with fragrant Thai holy basil, garlic, black pepper and spicy red chilli dip."
  },
  {
    id: "wok-6",
    name: "Bao — Paneer (2 pcs)",
    category: "wok",
    subCategory: "Dimsum & Bao",
    price: 320,
    priceDisplay: "₹320",
    isVeg: true,
    description: "Fluffy cloud-like steamed lotus buns stuffed with crispy spiced cottage cheese and Asian coleslaw."
  },
  {
    id: "wok-7",
    name: "Bao — Chicken (2 pcs)",
    category: "wok",
    subCategory: "Dimsum & Bao",
    price: 380,
    priceDisplay: "₹380",
    isVeg: false,
    description: "Fluffy steamed Asian bao buns packed with tender chicken, sriracha mayo and pickled scallions."
  },
  {
    id: "wok-8",
    name: "Chicken Lollipop Drumsticks (4 pcs)",
    category: "wok",
    subCategory: "Wok Appetizers",
    price: 320,
    priceDisplay: "₹320",
    isVeg: false,
    description: "Crispy chicken wingettes frenched into lollipops, deep-fried crunchy and tossed in spicy Schezwan glaze."
  },
  {
    id: "wok-9",
    name: "Schezwan Chicken Wings (4 pcs)",
    category: "wok",
    subCategory: "Wok Appetizers",
    price: 320,
    priceDisplay: "₹320",
    isVeg: false,
    description: "Crispy golden chicken wings tossed in fiery, tangy homemade Schezwan sauce with toasted sesame."
  },
  {
    id: "wok-10",
    name: "Chilli Prawns (6 pcs)",
    category: "wok",
    subCategory: "Wok Appetizers",
    price: 460,
    priceDisplay: "₹460",
    isVeg: false,
    description: "Juicy bay prawns tossed in wok with dark soya, fiery red chillies, bell peppers and scallions."
  },

  // ==========================================
  // PAGE 03 & 04: PIZZA & PASTA
  // ==========================================
  {
    id: "pz-1",
    name: "Classic Margherita Pizza",
    category: "pizza_pasta",
    subCategory: "Pizza",
    price: 390,
    priceDisplay: "₹390",
    isVeg: true,
    description: "Hand-stretched thin crust with Italian San Marzano tomato sauce, fresh mozzarella cheese and basil."
  },
  {
    id: "pz-2",
    name: "Farm Green Pizza",
    category: "pizza_pasta",
    subCategory: "Pizza",
    price: 440,
    priceDisplay: "₹440",
    isVeg: true,
    description: "Loaded with mozzarella, bell peppers, sweet corn, button mushrooms, black olives and sliced red onions."
  },
  {
    id: "pz-3",
    name: "Paneer & Sweet Corn Pizza",
    category: "pizza_pasta",
    subCategory: "Pizza",
    price: 430,
    priceDisplay: "₹430",
    isVeg: true,
    description: "Soft marinated paneer cubes, sweet American corn kernels and melted mozzarella on crispy thin crust."
  },
  {
    id: "pz-4",
    name: "Sautéed Mushroom Pizza",
    category: "pizza_pasta",
    subCategory: "Pizza",
    price: 460,
    priceDisplay: "₹460",
    isVeg: true,
    description: "Garlic herb sautéed button mushrooms with rich tomato passata and gooey melted mozzarella cheese."
  },
  {
    id: "pz-5",
    name: "Chicken Tikka / Paneer Tikka Pizza",
    category: "pizza_pasta",
    subCategory: "Pizza",
    price: 480,
    priceDisplay: "₹480",
    isVeg: false,
    description: "Famous Indian fusion pizza: clay-oven tikka spiced chicken or paneer, green capsicum, onion and mozzarella."
  },
  {
    id: "pz-6",
    name: "Peri-Peri Chicken Pizza",
    category: "pizza_pasta",
    subCategory: "Pizza",
    price: 480,
    priceDisplay: "₹480",
    isVeg: false,
    description: "Zesty spicy peri-peri marinated chicken chunks, red paprika, jalapenos and melted mozzarella."
  },
  {
    id: "pa-1",
    name: "White Sauce Penne (Alfredo)",
    category: "pizza_pasta",
    subCategory: "Pasta",
    price: 340,
    priceDisplay: "₹340",
    isVeg: true,
    description: "Rich and creamy parmesan cheese sauce tossed with penne, broccoli, mushrooms and bell peppers. Garlic toast."
  },
  {
    id: "pa-2",
    name: "Arrabbiata Penne (Red Sauce)",
    category: "pizza_pasta",
    subCategory: "Pasta",
    price: 320,
    priceDisplay: "₹320",
    isVeg: true,
    description: "Penne pasta in a spicy garlic and Italian herb tomato sauce with vegetables. Served with crunchy garlic toast."
  },
  {
    id: "pa-3",
    name: "Aglio E Olio Spaghetti",
    category: "pizza_pasta",
    subCategory: "Pasta",
    price: 350,
    priceDisplay: "₹350",
    isVeg: true,
    description: "Traditional Italian spaghetti tossed in extra virgin olive oil, sliced golden garlic and red chilli flakes. Garlic toast."
  },
  {
    id: "pa-4",
    name: "Wild Mushroom Fettuccine",
    category: "pizza_pasta",
    subCategory: "Pasta",
    price: 390,
    priceDisplay: "₹390",
    isVeg: true,
    description: "Flat ribbon fettuccine pasta folded in a rich sauce of wild sautéed mushrooms, herbs and garlic. Garlic toast."
  },

  // ==========================================
  // PAGE 04: BOWLS & SANDWICHES
  // ==========================================
  {
    id: "bw-1",
    name: "Korean Noodle Bowl",
    category: "bowls_sandwiches",
    subCategory: "Warm Bowls",
    price: 430,
    priceDisplay: "₹430 (Veg) / ₹460 (Chicken)",
    isVeg: true,
    description: "Spicy Korean gochujang broth with noodles, fresh greens, sesame seeds and choice of paneer or chicken."
  },
  {
    id: "bw-2",
    name: "Italian Bowl",
    category: "bowls_sandwiches",
    subCategory: "Warm Bowls",
    price: 430,
    priceDisplay: "₹430 (Veg) / ₹460 (Chicken)",
    isVeg: true,
    description: "Herbed rice or pasta tossed with Mediterranean veggies, pesto sauce, olives and choice of paneer or chicken."
  },
  {
    id: "bw-3",
    name: "Chinese Bowl (Rice / Noodle)",
    category: "bowls_sandwiches",
    subCategory: "Warm Bowls",
    price: 430,
    priceDisplay: "₹430 (Veg) / ₹460 (Chicken)",
    isVeg: true,
    description: "Comforting wok-tossed fried rice or noodles topped with hot garlic gravy and choice of paneer or chicken."
  },
  {
    id: "sw-1",
    name: "Cheese & Corn Sandwich",
    category: "bowls_sandwiches",
    subCategory: "Sandwiches",
    price: 290,
    priceDisplay: "₹290",
    isVeg: true,
    description: "Toasted sandwich layered with sweet corn, melted mozzarella cheese and oregano. Served with wedges and salad."
  },
  {
    id: "sw-2",
    name: "Paneer Grilled Sandwich",
    category: "bowls_sandwiches",
    subCategory: "Sandwiches",
    price: 310,
    priceDisplay: "₹310",
    isVeg: true,
    description: "Spiced cottage cheese filling grilled to golden perfection with mint chutney. Served with salad and wedges."
  },
  {
    id: "sw-3",
    name: "Mushroom Sandwich",
    category: "bowls_sandwiches",
    subCategory: "Sandwiches",
    price: 310,
    priceDisplay: "₹310",
    isVeg: true,
    description: "Grilled garlic button mushrooms, Thousand Island sauce, cheese. Served with house salad and potato wedges."
  },
  {
    id: "sw-4",
    name: "Grilled Chicken Sandwich",
    category: "bowls_sandwiches",
    subCategory: "Sandwiches",
    price: 310,
    priceDisplay: "₹310",
    isVeg: false,
    description: "Tender herb-grilled chicken breast, Thousand Island dressing and melted cheese. Served with wedges."
  },
  {
    id: "sw-5",
    name: "Smoked Chicken Sandwich",
    category: "bowls_sandwiches",
    subCategory: "Sandwiches",
    price: 330,
    priceDisplay: "₹330",
    isVeg: false,
    description: "Slow-cooked shredded chicken tossed in smoky sauce with cheese on toasted bread with house salad and wedges."
  },
  {
    id: "sd-1",
    name: "Fries — Salted / Peri-Peri",
    category: "bowls_sandwiches",
    subCategory: "Sides",
    price: 180,
    priceDisplay: "₹180 / ₹220",
    isVeg: true,
    description: "Golden crisp fried potato batons with sea salt or spicy African peri-peri dust."
  },
  {
    id: "sd-2",
    name: "American Potato Wedges",
    category: "bowls_sandwiches",
    subCategory: "Sides",
    price: 260,
    priceDisplay: "₹260",
    isVeg: true,
    description: "Thick-cut potato wedges fried with rosemary and garlic seasoning. Served with house dip."
  },
  {
    id: "sd-3",
    name: "Mexican Nachos",
    category: "bowls_sandwiches",
    subCategory: "Sides",
    price: 260,
    priceDisplay: "₹260",
    isVeg: true,
    description: "Nacho chips generously topped with melted warm cheese, salsa and jalapenos."
  },

  // ==========================================
  // PAGE 05: HIDEOUT SIGNATURES
  // ==========================================
  {
    id: "sig-1",
    name: "Stuffed Cheese Breast Chicken",
    category: "signatures",
    subCategory: "Signatures",
    price: 520,
    priceDisplay: "₹520",
    isVeg: false,
    description: "Chicken breast filled with melted cheese, baked in the oven. Served with mashed potato and house salad."
  },
  {
    id: "sig-2",
    name: "Butter Garlic Prawns",
    category: "signatures",
    subCategory: "Signatures",
    price: 520,
    priceDisplay: "₹520",
    isVeg: false,
    description: "Pan-seared jumbo prawns in butter, garlic and lemon — savoury, zesty and bright. Served with mashed potato."
  },
  {
    id: "sig-3",
    name: "Butter Garlic Fish",
    category: "signatures",
    subCategory: "Signatures",
    price: 420,
    priceDisplay: "₹420",
    isVeg: false,
    description: "Pan-seared fish fillets in butter, garlic and lemon. Served with mashed potato and house salad."
  },
  {
    id: "sig-4",
    name: "Fish and Chips",
    category: "signatures",
    subCategory: "Signatures",
    price: 420,
    priceDisplay: "₹420",
    isVeg: false,
    description: "Battered deep-fried fish fillets paired with thick-cut hand-cut fries and tartar sauce."
  },
  {
    id: "sig-5",
    name: "Crispy Chicken",
    category: "signatures",
    subCategory: "Signatures",
    price: 360,
    priceDisplay: "₹360",
    isVeg: false,
    description: "Deeply crunchy, golden-brown exterior, tender and juicy inside with house dipping sauce."
  },
  {
    id: "sig-6",
    name: "Black Pepper Chicken",
    category: "signatures",
    subCategory: "Signatures",
    price: 360,
    priceDisplay: "₹360",
    isVeg: false,
    description: "Tender batter-fried chicken with an emphasis on freshly cracked Malabar black pepper."
  },
  {
    id: "sig-7",
    name: "Creamy Lemon Coriander Chicken",
    category: "signatures",
    subCategory: "Signatures",
    price: 330,
    priceDisplay: "₹330",
    isVeg: false,
    description: "Tangy tender chicken marinated in lemon, garlic, cream and fresh coriander leaves."
  },
  {
    id: "sig-8",
    name: "Chicken Popcorn",
    category: "signatures",
    subCategory: "Signatures",
    price: 280,
    priceDisplay: "₹280",
    isVeg: false,
    description: "Boneless chicken marinated, coated in seasoned breading and deep-fried until golden and crunchy."
  },
  {
    id: "sig-9",
    name: "Quesadilla — Veg",
    category: "signatures",
    subCategory: "Signatures",
    price: 280,
    priceDisplay: "₹280",
    isVeg: true,
    description: "Soft flour tortilla folded around melted cheese and sautéed seasonal vegetables."
  },
  {
    id: "sig-10",
    name: "Quesadilla — Chicken",
    category: "signatures",
    subCategory: "Signatures",
    price: 320,
    priceDisplay: "₹320",
    isVeg: false,
    description: "Spiced shredded chicken with melted cheddar inside a folded grilled flour tortilla."
  },
  {
    id: "sig-11",
    name: "Pan Grilled Cottage Cheese",
    category: "signatures",
    subCategory: "Signatures",
    price: 320,
    priceDisplay: "₹320",
    isVeg: true,
    description: "Paneer blocks grilled until golden. Served with mashed potato and house salad."
  },
  {
    id: "sig-12",
    name: "Crispy Cottage Cheese",
    category: "signatures",
    subCategory: "Signatures",
    price: 310,
    priceDisplay: "₹310",
    isVeg: true,
    description: "Paneer pan-seared to a smoky, charred exterior — soft and juicy within."
  },
  {
    id: "sig-13",
    name: "Baked Broccoli",
    category: "signatures",
    subCategory: "Signatures",
    price: 290,
    priceDisplay: "₹290",
    isVeg: true,
    description: "Broccoli florets coated in a creamy marinade of yoghurt, cream, cheese and spices."
  },
  {
    id: "sig-14",
    name: "Exotic Sauté Vegetables",
    category: "signatures",
    subCategory: "Signatures",
    price: 280,
    priceDisplay: "₹280",
    isVeg: true,
    description: "Broccoli, zucchini, carrot, beans, mushroom and bell pepper, lightly cooked in butter."
  },

  // ==========================================
  // PAGE 06 & 07: COFFEE & TEA
  // ==========================================
  {
    id: "cof-1",
    name: "Classic Cappuccino",
    category: "beverages",
    subCategory: "Hot Coffee",
    price: 190,
    priceDisplay: "₹190",
    isVeg: true,
    description: "Espresso under equal parts rich steamed milk and velvety airy foam."
  },
  {
    id: "cof-2",
    name: "Café Latte",
    category: "beverages",
    subCategory: "Hot Coffee",
    price: 190,
    priceDisplay: "₹190",
    isVeg: true,
    description: "Espresso folded into silky steamed milk, lightly capped with froth."
  },
  {
    id: "cof-3",
    name: "Hot Mocha",
    category: "beverages",
    subCategory: "Hot Coffee",
    price: 190,
    priceDisplay: "₹190",
    isVeg: true,
    description: "Espresso, rich steamed milk and dark chocolate — warm and indulgent."
  },
  {
    id: "cof-4",
    name: "Classic Cold Coffee",
    category: "beverages",
    subCategory: "Cold Coffee",
    price: 180,
    priceDisplay: "₹180",
    isVeg: true,
    description: "Blended cold coffee, creamy and lightly sweet. The Hideout favourite."
  },
  {
    id: "cof-5",
    name: "Cold Press Brew",
    category: "beverages",
    subCategory: "Cold Coffee",
    price: 220,
    priceDisplay: "₹220",
    isVeg: true,
    description: "Slow-steeped for hours — exceptionally smooth and naturally low in bitterness."
  },
  {
    id: "tea-1",
    name: "Classic Indian Masala Milk Tea",
    category: "beverages",
    subCategory: "Hot Tea",
    price: 110,
    priceDisplay: "₹110",
    isVeg: true,
    description: "Brewed strong with milk, the Indian way with ginger and cardamom."
  },
  {
    id: "tea-2",
    name: "Sulemani Chai",
    category: "beverages",
    subCategory: "Hot Tea",
    price: 160,
    priceDisplay: "₹160",
    isVeg: true,
    description: "Spiced black tea, brewed clear with a squeeze of fresh lemon and mint."
  },
  {
    id: "tea-3",
    name: "Peach Ice Tea",
    category: "beverages",
    subCategory: "Ice Tea",
    price: 160,
    priceDisplay: "₹160",
    isVeg: true,
    description: "Chilled iced tea sweetened with ripe aromatic peach syrup."
  },

  // ==========================================
  // PAGE 08: MOCKTAILS & SHAKES
  // ==========================================
  {
    id: "mock-1",
    name: "Virgin Mojito (Classic / Watermelon)",
    category: "beverages",
    subCategory: "Mocktails",
    price: 190,
    priceDisplay: "₹190",
    isVeg: true,
    description: "Fresh mint and lime over soda — cooling, crisp and refreshing."
  },
  {
    id: "mock-2",
    name: "Blue Lagoon",
    category: "beverages",
    subCategory: "Mocktails",
    price: 190,
    priceDisplay: "₹190",
    isVeg: true,
    description: "Blue curacao and lemon soda — cool, sweet and vivid."
  },
  {
    id: "mock-3",
    name: "Piña Colada",
    category: "beverages",
    subCategory: "Mocktails",
    price: 200,
    priceDisplay: "₹200",
    isVeg: true,
    description: "Pineapple juice and rich coconut cream, blended silky smooth."
  },
  {
    id: "shk-1",
    name: "Kit-Kat Thick Shake",
    category: "beverages",
    subCategory: "Shakes",
    price: 200,
    priceDisplay: "₹200",
    isVeg: true,
    description: "Blended thick with real Kit-Kat bars and vanilla chocolate ice cream."
  },
  {
    id: "shk-2",
    name: "Fudge Brownie Shake",
    category: "beverages",
    subCategory: "Shakes",
    price: 200,
    priceDisplay: "₹200",
    isVeg: true,
    description: "Fudgy brownie blended into a thick, rich chocolate shake."
  },
  {
    id: "shk-3",
    name: "Oreo Shake",
    category: "beverages",
    subCategory: "Shakes",
    price: 200,
    priceDisplay: "₹200",
    isVeg: true,
    description: "Cookies-and-cream, blended thick and dark with chocolate drizzle."
  },

  // ==========================================
  // PAGE 09: DESSERTS & FRESH JUICES
  // ==========================================
  {
    id: "des-1",
    name: "Sizzling Brownie with Ice Cream",
    category: "desserts",
    subCategory: "Desserts",
    price: 280,
    priceDisplay: "₹280",
    isVeg: true,
    description: "Fudgy walnut chocolate brownie with a scoop of creamy vanilla ice cream."
  },
  {
    id: "des-2",
    name: "Brownie Mocha Mousse",
    category: "desserts",
    subCategory: "Desserts",
    price: 260,
    priceDisplay: "₹260",
    isVeg: true,
    description: "Layered chocolate brownie infused with velvety whipped coffee cream."
  },
  {
    id: "jce-1",
    name: "Fresh Watermelon Juice",
    category: "desserts",
    subCategory: "Fresh Juice",
    price: 220,
    priceDisplay: "₹220",
    isVeg: true,
    description: "Cold-pressed fresh watermelon — pure, sweet and 100% refreshing."
  }
];

// Clean Seating Options
export const SEATING_OPTIONS = [
  { id: "main_dining", name: "Main Dining Hall (Family & Friends)" },
  { id: "terrace_seating", name: "Open-Air Terrace Seating" },
  { id: "cozy_booth", name: "Cozy Dining Booth" }
];

export const SEATING_ZONES = SEATING_OPTIONS;
