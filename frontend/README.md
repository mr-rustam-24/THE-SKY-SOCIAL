# The Sky Social — Frontend

The client-side single page application (SPA) for **The Sky Social / Skypiea Rooftop Restaurant**. Built with React 19, Vite, Tailwind CSS v4, and Motion.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Optimized assets will be generated in `dist/`.

---

## Available Commands

* `npm run dev`: Starts Vite dev server on port 3000.
* `npm run build`: Bundles the application with Vite.
* `npm run preview`: Serves the production build locally.
* `npm run lint`: Runs type checks via `tsc --noEmit`.
* `npm run clean`: Clears the `dist/` directory.

---

## Project Structure

```text
src/
├── components/
│   ├── auth/           # Login (Phone OTP / Password) & Registration modal
│   ├── booking/        # Table reservation modal with WhatsApp integration
│   ├── layout/         # Navigation bar & Footer
│   └── sections/       # Hero slider, Digital menu, Original cards, Contact
├── data/
│   └── restaurantData.js # Menu courses, pricing, seating zones, and info
├── App.jsx             # Main application layout & modal controller
├── index.css           # Tailwind CSS directives & global scrollbar styling
└── main.jsx            # Application entry point
```
