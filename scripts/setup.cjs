const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
for (const folder of ['backend', 'frontend']) {
  const target = path.join(root, folder, '.env');
  if (!fs.existsSync(target)) {
    fs.copyFileSync(path.join(root, folder, '.env.example'), target);
    console.log(`Created ${folder}/.env`);
  } else console.log(`Kept existing ${folder}/.env`);
}
console.log('Next: set MONGODB_URI in backend/.env, then run npm run dev.');
