
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function migrateButtons() {
  console.log('🔄 Starting button migration...');
  
  // Find all TSX files
  const files = await glob('src/**/*.{tsx,ts}', { ignore: 'node_modules/**' });
  
  let totalReplacements = 0;
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Replace custom button classes
    const replacements = [
      { from: /className="[^"]*btn-gradient[^"]*"/g, to: 'variant="gradient"' },
      { from: /btn-gradient/g, to: 'variant="gradient"' },
      { from: /className="[^"]*glass-card[^"]*"[^>]*><button/g, to: 'variant="glass"' },
    ];
    
    replacements.forEach(({ from, to }) => {
      const matches = content.match(from);
      if (matches) {
        content = content.replace(from, to);
        totalReplacements += matches.length;
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(file, content);
      console.log(`✅ Updated: ${file}`);
    }
  }
  
  console.log(`🎉 Migration complete! ${totalReplacements} replacements made.`);
}

migrateButtons().catch(console.error);
