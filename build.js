const fs = require('fs');
const path = require('path');

const replacements = {
  '__SUPABASE_URL__': process.env.SUPABASE_URL || '__SUPABASE_URL__',
  '__SUPABASE_ANON_KEY__': process.env.SUPABASE_ANON_KEY || '__SUPABASE_ANON_KEY__',
  '__ADMIN_PASSWORD__': process.env.ADMIN_PASSWORD || (() => { throw new Error('ADMIN_PASSWORD env var is required'); })(),
};

const targets = ['index.html', 'admin/index.html', 'blueprint/index.html'];

targets.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  Object.entries(replacements).forEach(([placeholder, value]) => {
    content = content.split(placeholder).join(value);
  });
  fs.writeFileSync(fullPath, content);
  console.log(`✓ ${file} processed`);
});
