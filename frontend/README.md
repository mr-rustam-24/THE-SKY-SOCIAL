# The Sky Social — Client Architecture

Detailed engineering and developer reference for the **The Sky Social** single-page application.

---

## 🛠️ Technology Stack Breakdown

* **React 19 (`react: ^19.0.1`, `react-dom: ^19.0.1`):** Functional component architecture utilizing hooks (`useState`, `useEffect`, `useCallback`, `useMemo`) for screen orchestration and reactive modal handling.
* **Vite 8 (`vite: ^8.3.0`):** Next-generation frontend tooling providing native ESM development server with sub-millisecond HMR and Rollup production compilation.
* **Tailwind CSS v4 (`@tailwindcss/vite: ^4.3.3`):** High-performance utility CSS engine integrated directly as a Vite plugin.
* **Motion (`motion: ^12.23.24`):** Production-ready animation engine for screen entry physics, modal transitions, and accordion collapses.
* **Lucide React (`lucide-react: ^0.546.0`):** Modular icon system with individual icon tree-shaking.

---

## 🔌 Integrated APIs & Browser Protocols

1. **WhatsApp Business Direct API:**
   * URL Scheme: `https://wa.me/{phone}?text={encoded_message}`
   * Handles table reservation submissions and live customer concierge routing without third-party SMS providers.
2. **Google Maps Geolocation Scheme:**
   * URL Scheme: `https://maps.google.com/?q={address_or_coordinates}`
   * Launches native mobile turn-by-turn routing to Gomti Nagar, Lucknow.
3. **Web Storage API (`localStorage`):**
   * Persists client session data under key `restaurant_active_user` and saved account records under `restaurant_users`.
4. **Touch & Gesture Event Listeners:**
   * Evaluates `touchstart`, `touchmove`, `touchend`, and wheel `deltaY` events to trigger screen transitions from the Opening Cover.
5. **Google Fonts API:**
   * Preconnected font delivery for `Inter` (sans-serif) and `Playfair Display` (editorial serif).

---

## 🚀 Development Workflow

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Accessible at `http://localhost:3000`.

### Compile for Production
```bash
npm run build
```
Generates production-ready distribution in `dist/`.

### Run TypeScript Type Check
```bash
npm run lint
```

### Preview Compiled Build Locally
```bash
npm run preview
```

---

## 📂 Source Code Structure

```text
src/
├── components/
│   ├── auth/
│   │   └── AuthModal.jsx       # OTP & Password login/registration dialog
│   ├── booking/
│   │   └── BookingModal.jsx    # Reservation modal with WhatsApp dispatch
│   ├── layout/
│   │   ├── Navigation.jsx      # Top header with dynamic auth triggers
│   │   └── Footer.jsx          # Business hours, social links & copyright
│   └── sections/
│       ├── OpeningCover.jsx    # Fullscreen cover entry with gestures
│       ├── HeroSection.jsx     # Ambiance carousel with auto-interval
│       ├── FoodSection.jsx     # 86-item menu with live search & dietary filter
│       ├── OriginalMenuSection.jsx # Original scanned printed menu cards gallery
│       └── ContactSection.jsx  # Operating hours, map links & contact details
├── data/
│   └── restaurantData.js       # Complete menu schema, pricing & seating options
├── App.jsx                     # Top-level screen manager and state container
├── index.css                   # Tailwind v4 theme definitions and custom scrollbars
└── main.jsx                    # React application mount point
```
