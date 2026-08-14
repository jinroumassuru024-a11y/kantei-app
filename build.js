const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || '__SUPABASE_URL__';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '__SUPABASE_ANON_KEY__';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

if (!ADMIN_PASSWORD) {
  console.warn('⚠ ADMIN_PASSWORD env var not set. Admin panel will not function.');
}

const targets = ['index.html', 'admin/index.html', 'blueprint/index.html', 'love/index.html'];

targets.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  content = content
    .split('__SUPABASE_URL__').join(SUPABASE_URL)
    .split('__SUPABASE_ANON_KEY__').join(SUPABASE_ANON_KEY)
    .split('__ADMIN_PASSWORD__').join(ADMIN_PASSWORD);

  fs.writeFileSync(fullPath, content);
  console.log(`✓ ${file} processed`);
});
