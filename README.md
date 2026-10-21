# StudentDesk — MEVN Student Management

Finals Lab Activity 4 · Eisen Josh Salonga Bangit · WD-303

A Student Management CRUD application using MongoDB, Express, Vue 3, and Node.js. It follows the tutorial's student model, API paths, and separate `backend/` and `frontend/` structure, with an additional static profile page.

## Before submitting

- Add your actual email and barangay in `frontend/src/data/profile.js`. Verify the other profile details.
- Put your own photo at `frontend/public/profile.jpg`, then change `photo: ''` to `photo: '/profile.jpg'` in that same file.
- Configure and test your own MongoDB Atlas connection as described below.
- Create a public GitHub repository and replace the placeholder in `GitHub-Link.txt` with its actual URL.
- Record the running application. The recording is not included in this source package.

## Requirements

- Node.js **22.12+** (Node 24 is suitable) and npm.
- MongoDB Atlas or a running local MongoDB Community Server.
- VS Code or another editor.

The tooling is pinned by `package-lock.json`. The tutorial's older Node 18 guidance does not apply to this project's Vite version.

## Quick start (Windows PowerShell or terminal)

Extract the ZIP first. Open a terminal inside `finals-mevn`, where the root `package.json` is located.

```sh
npm install
npm run setup
```

Edit **`backend/.env`** and set your own connection string:

```dotenv
PORT=4000
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/finals_mevn_db?retryWrites=true&w=majority
CLIENT_URL=http://localhost:8080
NODE_ENV=development
```

Use the actual URI copied from Atlas, not the sample hostname above. URL-encode special characters in the database password. Do not share the URI or commit `.env`.

For Atlas, create a cluster and database user, grant database read/write access, and allow the IP address of the machine connecting to it. Your Atlas login and database user's credentials are separate. For a hosted backend, configure the host's allowed outbound IP addresses as appropriate.

If using local MongoDB, keep the generated default URI instead:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/finals_mevn_db
```

MongoDB Compass is a database client; the local MongoDB **server service must also be running**. The database and `students` collection are created when you save the first student.

Start both parts from the project root:

```sh
npm run dev
```

Open **http://localhost:8080**. The backend uses **http://localhost:4000**. Keep the terminal running; press Ctrl+C to stop. If PowerShell blocks `npm.ps1`, use `npm.cmd` in the same commands or use Command Prompt.

## Pages

| Route | Purpose |
|---|---|
| `/` | Create a student |
| `/view` | View, search, and delete students |
| `/edit/:id` | Load and update a student |
| `/profile` | Static student/developer profile |

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/create-student` | Create a student |
| GET | `/api/` | List students, newest first |
| GET | `/api/edit-student/:id` | Read one student |
| PUT | `/api/update-student/:id` | Update name, email, and phone |
| DELETE | `/api/delete-student/:id` | Delete a student |
| GET | `/api/health` | Check API/database readiness |

Example payload (fictitious demonstration data):

```json
{ "name": "Juan Dela Cruz", "email": "juan@example.com", "phone": 639171234567 }
```

The schema uses a **Number** for phone to match the lab. Numbers do not retain leading zeroes, so enter a country code without `+`, such as `639171234567`. In a real contact-management system, a string is usually more suitable for phone numbers.

## Project structure

- `backend/index.js`: load environment, connect to MongoDB, start the server.
- `backend/app.js`: middleware, API routes, production frontend serving.
- `backend/database/db.js`: Mongoose connection helper.
- `backend/models/Student.js`: student schema and validation.
- `backend/routes/student.route.js`: CRUD operations.
- `backend/middleware/errorHandler.js`: readable API error responses.
- `backend/test/api.test.js`: integration tests using an isolated MongoDB process.
- `frontend/src/components/`: Create, List, Edit, Profile, shared form, alerts, and 404.
- `frontend/src/router/index.js`: Vue Router definitions.
- `frontend/src/services/api.js`: Axios client and error messages.
- `frontend/src/data/profile.js`: editable profile details.
- `frontend/src/style.css`: responsive blue interface.
- `docs/`: upload, deployment, recording, and submission instructions.

## Scripts

| Command (project root) | Purpose |
|---|---|
| `npm install` | Install all frontend/backend dependencies |
| `npm run setup` | Copy example environment files without overwriting existing ones |
| `npm run dev` | Run API and Vue together |
| `npm run build` | Build the Vue frontend |
| `npm start` | Run Express; also serves Vue after a build |
| `npm test` | Test the API with an isolated real MongoDB process |

The first test run may download a MongoDB binary. Tests do not use or change your Atlas database. Normal application startup does not use the test database.

To test the production build locally, stop the development servers, run `npm run build`, then `npm start`, and visit **http://localhost:4000**.

## Implementation notes

- Uses `express.json()` and `express.urlencoded()` instead of adding the separate `body-parser` dependency.
- Maintains the tutorial's five CRUD API paths and `students` collection.
- Uses reusable form markup, visible error alerts, disabled save buttons during submission, and delete confirmation.
- Validates IDs, returns 404 for missing records, rejects invalid fields, and returns 503 during database outages.
- Uses `VITE_API_URL` rather than the tutorial's Vue CLI-style `VUE_APP_API_URL`.
- Vite proxies `/api` to port 4000 locally. After a production build, Express serves the frontend and API on the same origin.
- No login is included because the lab does not require it. This is a coursework demo: anyone with access to the running API can modify its records. Use fictitious student records for a public demonstration.

## Troubleshooting

| Problem | What to check |
|---|---|
| MongoDB connection fails | `backend/.env`, database user/password, Atlas network access, or local MongoDB service |
| API unavailable | Keep `npm run dev` running and inspect the backend terminal output |
| Port already in use | Close the earlier server; ports 4000 and 8080 must be free |
| Profile image missing | Filename/case must match `frontend/public/profile.jpg`; set `photo: '/profile.jpg'` |
| `Missing script: dev` | Open the terminal in `finals-mevn`, not its parent folder |
| Build/runtime version error | Run `node -v`; use Node 22.12+ or 24 |

## References

- Course tutorial: https://esquivellabs.com/mevn_crud/index.html
- Vite setup and Node requirements: https://vite.dev/guide/
- Vite environment variables: https://vite.dev/guide/env-and-mode

See `docs/GITHUB-UPLOAD.md`, `docs/DEPLOYMENT.md`, and `docs/SUBMISSION-CHECKLIST.md` for the remaining steps.
