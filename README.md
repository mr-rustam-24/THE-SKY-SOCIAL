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
