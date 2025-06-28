import { promises as fs } from 'fs';
import path from 'path';

/**
 * Simple static deployment fixer
 * This script assumes Vite has already built to dist/public and moves files to dist root
 */

async function moveFilesToRoot() {
  try {
    console.log('Moving files from dist/public to dist root...');
    
    const distPublic = 'dist/public';
    const distRoot = 'dist';
    
    // Check if dist/public exists
    try {
      await fs.access(distPublic);
    } catch {
      console.error('❌ dist/public directory not found');
      console.log('Make sure to run a regular build first with: npm run build or npx vite build');
      return false;
    }
    
    // Get all files and directories in dist/public
    const items = await fs.readdir(distPublic);
    console.log(`Found ${items.length} items to move: ${items.join(', ')}`);
    
    // Move each item to dist root
    for (const item of items) {
      const srcPath = path.join(distPublic, item);
      const destPath = path.join(distRoot, item);
      
      // Remove destination if it exists
      try {
        await fs.rm(destPath, { recursive: true, force: true });
      } catch {
        // Ignore if doesn't exist
      }
      
      // Copy the item
      const stat = await fs.stat(srcPath);
      if (stat.isDirectory()) {
        await fs.cp(srcPath, destPath, { recursive: true });
      } else {
        await fs.copyFile(srcPath, destPath);
      }
      
      console.log(`Moved: ${item}`);
    }
    
    // Remove the now-empty dist/public directory
    await fs.rm(distPublic, { recursive: true });
    console.log('Removed dist/public directory');
    
    // Verify index.html is in place
    try {
      await fs.access(path.join(distRoot, 'index.html'));
      console.log('✅ index.html found in dist root');
    } catch {
      console.error('❌ index.html not found in dist root');
      return false;
    }
    
    // List final contents
    const finalItems = await fs.readdir(distRoot);
    console.log(`Final dist contents: ${finalItems.join(', ')}`);
    
    console.log('✅ Static deployment structure ready!');
    return true;
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return false;
  }
}

// If run as a script
if (import.meta.url === `file://${process.argv[1]}`) {
  moveFilesToRoot().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export default moveFilesToRoot;