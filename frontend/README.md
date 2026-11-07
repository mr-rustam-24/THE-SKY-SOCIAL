# Skipee: The Rooftop Restaurant

A luxury modern Indian & Awadhi haute cuisine rooftop restaurant experience located in Gomti Nagar, Lucknow. Built with React 19, Vite, Tailwind CSS v4, and Motion.

---

## Project Structure

```text
├── public/                       # Static brand photography & media assets
│   └── assets/
├── src/                          # Pure Frontend Architecture (React 19)
│   ├── components/               # Modular UI components
│   │   ├── booking/              # Table reservation modal
│   │   │   └── BookingModal.jsx
│   │   ├── layout/               # Header navigation & footer
│   │   │   ├── Navigation.jsx
│   │   │   └── Footer.jsx
│   │   └── sections/             # Food menu, cocktails, rooftop zones, opening cover
│   │       ├── OpeningCover.jsx
│   │       ├── FoodSection.jsx
│   │       ├── BeveragesSection.jsx
│   │       └── SeasonalitySection.jsx
│   ├── data/
│   │   └── restaurantData.js     # Tasting menu courses, à la carte & seating zones
│   ├── utils/
│   │   └── ambientAudio.js       # Web Audio API ambient rooftop resonance
│   ├── App.jsx                   # Main application shell
│   ├── index.css                 # Tailwind theme tokens & typography
│   └── main.jsx                  # React DOM entry point
├── index.html                    # HTML entry point
├── package.json                  # Scripts & dependencies
└── vite.config.ts                # Vite build configuration
```

---

## Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Frontend Development Server
```bash
npm run dev
```

The app will start at **http://localhost:3000**.

### 3. Build for Production
```bash
npm run build
```
The optimized production output will be generated in `dist/`.
