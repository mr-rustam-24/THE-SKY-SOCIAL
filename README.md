# THE-SKY-SOCIAL
A responsive restaurant website with an online menu, food ordering, user authentication, and restaurant management features.
# Skypiea Restaurant

## Run the app with the API

Use two terminals from the project root.

Terminal 1 — start the backend API:

```powershell
cd backend
npm run dev
```

Terminal 2 — install frontend dependencies once, then start Vite:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000. Vite forwards `/api` requests to the backend on port 4000. The API currently serves menu data from the frontend's bundled dataset and keeps reservations in memory; reservations are cleared when the backend restarts.

## Razorpay reservation deposits

Clients can choose to pay at the restaurant or prepay a ₹300 per guest reservation deposit through Razorpay Checkout. To enable online payments, set these environment variables in the backend terminal before starting the API:

```powershell
$env:RAZORPAY_KEY_ID="your_razorpay_key_id"
$env:RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
npm run dev
```

Use Razorpay test keys during development and live keys only for production. The API creates each payment order and verifies the Razorpay signature and captured amount before confirming a prepaid reservation.
