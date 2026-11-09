# THE SKY SOCIAL
### Premium Rooftop Dining & Haute Cuisine Web Platform

[![React](https://img.shields.io/badge/React-19.0.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-v12-FF4154?logo=framer&logoColor=white)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, high-performance web application designed for **The Sky Social / Skypiea by Hideout Café**—a premier rooftop restaurant and lounge located in Vibhuti Khand, Gomti Nagar, Lucknow.

The platform delivers an elegant dining interface featuring full-spectrum digital menus, interactive table reservations, authentic printed menu card galleries, and customer authentication.

---

## 🍽️ Key Features

### 1. Immersive Cover Experience
* Full-screen visual entrance with interactive gesture and keyboard navigation (scroll down or press arrow key) to enter the dining portal.
* Quick-action shortcuts for direct menu browsing and immediate table reservation.

### 2. Rooftop Ambiance & Hero Carousel
* High-definition visual slider highlighting rooftop seating, skyline views, and culinary signatures.
* Seamless transition controls with auto-play interval handling and touch navigation.

### 3. Comprehensive Digital Menu & Filtering
* Complete catalog across diverse culinary departments:
  * **From The Indian Hearth:** Signature curries, tandoori starters, and artisanal breads.
  * **From The Wok:** Pan-Asian sizzlers, hakka noodles, and Manchurian delicacies.
  * **Artisanal Pizzas & Pastas:** Wood-fired crusts, creamy alfredo, and penne arrabbiata.
  * **Handcrafted Beverages & Mocktails:** Signature coolers, shakes, coffee, and fresh juices.
* Real-time search filter and dietary categorization (Vegetarian and Non-Vegetarian tags with clear visual badges).
* Expandable and compact catalog views for smooth mobile browsing.

### 4. High-Resolution Original Menu Gallery
* Digitized preservation of the restaurant's physical printed menu cards.
* Clean card-based visual gallery with progressive disclosure ("View More / View Less").

### 5. Table Reservation Engine
* Multi-parameter booking modal with zone selection:
  * Main Dining Hall
  * Skyline Terrace
  * Private Lounge & Family Section
* Guest headcount selector, date and timeslot selection, and special dietary requests.
* Instant booking code generation and direct **WhatsApp Table Confirmation** dispatch.

### 6. Authentication System
* Client-side customer authentication suite supporting:
  * **Phone Number + OTP Verification:** Fast mobile login with automated 4-digit code generation.
  * **Email & Password Login:** Standard credentials login with validation and session persistence via `localStorage`.
  * **New User Registration:** Account creation capturing customer details for expedited future reservations.

### 7. Location & Contact Hub
* Integrated business operating hours, direct phone dialing, WhatsApp concierge link, and interactive Google Maps direction routing.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture, state hooks, and client-side lifecycle management |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | Ultra-fast Hot Module Replacement (HMR) and optimized rollup production bundles |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS engine with custom luxury color palette and fluid typography |
| **Animations** | [Motion](https://motion.dev/) | Smooth layout transitions, slide-up entrances, and modal dialog physics |
| **Icons** | [Lucide React](https://lucide.dev/) | Lightweight, customizable SVG icon set |

---

## 📁 Repository Structure

```text
THE-SKY-SOCIAL/
├── frontend/
│   ├── public/
│   │   └── assets/
│   │       ├── images/               # Rooftop photography and hero banner assets
│   │       └── menu/                 # High-resolution original printed menu scans
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── AuthModal.jsx     # OTP and Email/Password authentication modal
│   │   │   ├── booking/
│   │   │   │   └── BookingModal.jsx  # Table reservation form with WhatsApp confirmation
│   │   │   ├── layout/
│   │   │   │   ├── Navigation.jsx    # Sticky navigation header with auth triggers
│   │   │   │   └── Footer.jsx        # Footer links, social handles, and location info
│   │   │   └── sections/
│   │   │       ├── OpeningCover.jsx  # Fullscreen cover entry slide
│   │   │       ├── HeroSection.jsx   # Hero banner slider with CTA buttons
│   │   │       ├── FoodSection.jsx   # Filterable digital menu with search
│   │   │       ├── OriginalMenuSection.jsx # Scanned physical menu card gallery
│   │   │       └── ContactSection.jsx # Timings, address, phone & map routing
│   │   ├── data/
│   │   │   └── restaurantData.js     # Structured culinary items, pricing, and restaurant metadata
│   │   ├── App.jsx                   # Primary layout orchestrator and modal state manager
│   │   ├── index.css                 # Global styling tokens, scrollbars, and font declarations
│   │   └── main.jsx                  # React DOM root entry point
│   ├── index.html                    # HTML document shell with SEO meta tags
│   ├── package.json                  # Application dependencies and execution scripts
│   ├── tsconfig.json                 # TypeScript compiler configuration
│   └── vite.config.ts                # Vite build and plugin configuration
├── .gitignore                        # Standard ignore rules (node_modules, dist, logs, env)
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (version `18.0.0` or higher)
* [npm](https://www.npmjs.com/) (version `9.0.0` or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/mr-rustam-24/THE-SKY-SOCIAL.git
cd THE-SKY-SOCIAL
```

### 2. Navigate to Frontend Directory
```bash
cd frontend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Once launched, open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## 📦 Available Scripts

Inside the `frontend` directory, you can run the following commands:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the local development server at `http://localhost:3000` |
| `npm run build` | Compiles and optimizes assets into production-ready output in `dist/` |
| `npm run preview` | Locally previews the compiled production build |
| `npm run lint` | Runs TypeScript type checking across components without emitting output |
| `npm run clean` | Deletes the compiled `dist/` output folder |

---

## 🌐 Deployment

The production build produces standalone static HTML, CSS, and JS bundles inside the `frontend/dist/` directory.

To build for production:
```bash
npm run build
```

The output can be deployed to any modern web hosting service:
* **Vercel:** Connect the GitHub repository, set Root Directory to `frontend`, and deploy.
* **Netlify:** Set Build command to `npm run build` and Publish directory to `frontend/dist`.
* **GitHub Pages / Cloudflare Pages:** Point build output to the `frontend/dist` directory.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
