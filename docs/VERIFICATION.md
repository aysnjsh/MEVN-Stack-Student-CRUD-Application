# Verification performed

Checked on 21 October 2026 using Node.js 24 and an isolated real MongoDB 7 test process.

- `npm run build`: passed.
- `npm test`: 4 integration tests passed, 0 failed.
- API tests covered CRUD, persistence after database reconnection, validation, malformed JSON, invalid IDs, missing records, database outage responses, and reconnection.
- Browser checks against the built Vue app and real test API passed: create, reload persisted data, edit, search, cancel deletion, confirm deletion, profile navigation, direct route refresh, invalid ID feedback, and 404 page.
- Checked desktop rendering at 1440px and mobile rendering at 390px; no page-level horizontal overflow on Create, View, or Profile.
- No uncaught browser JavaScript errors in the tested flow.
- Confirmed `.gitignore` excludes real environment files, dependencies, and build output.

Your own MongoDB Atlas credentials, GitHub repository, and public deployment were not configured or tested. The profile still requires your real photo, email, and barangay. This file records development checks, not completion of the assignment's personal details or screen-recording requirements.
