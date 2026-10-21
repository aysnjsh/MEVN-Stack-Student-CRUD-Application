# Deploying the application

The easiest configuration for this project serves the built Vue app and Express API together. Your source still retains separate backend and frontend folders.

## Single Render web service

1. Push the completed source to your public GitHub repository.
2. Create a Node web service from that repository.
3. Keep the root directory at the repository root.
4. Set build command: `npm ci --include=dev && npm run build`.
5. Set start command: `npm start`.
6. Set `MONGODB_URI` to your own Atlas URI and `NODE_ENV` to `production` in the service environment settings.
7. Use Node 24 or a compatible Node 22 version (22.12+).
8. Set `CLIENT_URL` to your actual public app origin, without a trailing slash.
9. Allow the hosting service's connections in Atlas network access.

Do not set a localhost frontend API URL. The default `/api` value automatically calls the API on the same host. The platform supplies `PORT`; the backend reads it. Express serves `frontend/dist` and handles Vue history-mode routes.

After deployment, verify `/`, `/view`, `/profile`, direct page refreshes, `/api/health`, and a complete CRUD round trip. Hosting plans and availability are controlled by the provider.

## Optional: Netlify frontend + separately hosted backend

The included `netlify.toml` builds only Vue from the repository root and provides history-mode fallback. Deploy the Express backend to a Node host first.

- Set Netlify's `VITE_API_URL` to `https://YOUR-BACKEND-HOST/api` before building.
- Set the backend's `CLIENT_URL` to your exact Netlify frontend origin.
- Keep `MONGODB_URI` only in the backend service's environment.
- Rebuild the frontend after changing `VITE_API_URL` because Vite substitutes it at build time.

This project uses Vite, so the environment variable is `VITE_API_URL`, not `VUE_APP_API_URL`. The tutorial's Vercel snippet is not included as a verified deployment configuration; use one of the paths documented here.

Deployment has not been performed on your account. Do not treat the configuration files as proof of a working public deployment.
