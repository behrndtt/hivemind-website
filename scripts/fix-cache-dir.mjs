import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const clientPath = join(__dirname, '..', 'tina', '__generated__', 'client.ts');

try {
  let content = readFileSync(clientPath, 'utf8');
  
  // Replace the cacheDir with undefined to disable caching
  content = content.replace(
    /cacheDir:\s*'[^']+'/,
    'cacheDir: undefined'
  );
  
  writeFileSync(clientPath, content, 'utf8');
  console.log('✓ Fixed cache directory in client.ts');
} catch (error) {
  console.error('Failed to fix cache directory:', error);
  process.exit(1);
}
