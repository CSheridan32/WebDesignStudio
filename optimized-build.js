#!/usr/bin/env node
import { build } from 'vite';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Optimized Vite build with chunking strategy to handle large icon libraries
 */

async function optimizedBuild() {
  console.log('🚀 Starting optimized Vite build...');
  
  try {
    // Clean dist directory first
    await fs.rm('dist', { recursive: true, force: true });
    console.log('Cleaned dist directory');
    
    // Run Vite build with optimized settings
    await build({
      configFile: 'vite.config.ts',
      build: {
        outDir: path.resolve(process.cwd(), 'dist/public'),
        emptyOutDir: true,
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'query-vendor': ['@tanstack/react-query'],
              'ui-vendor': ['@radix-ui/react-toast', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
              'icons': ['lucide-react']
            }
          }
        }
      },
      optimizeDeps: {
        include: ['react', 'react-dom', '@tanstack/react-query']
      }
    });
    
    console.log('✅ Vite build completed');
    
    // Move files from dist/public to dist root
    console.log('Moving files from dist/public to dist root...');
    
    const distPublic = 'dist/public';
    const distRoot = 'dist';
    
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
    console.log(`📁 Final dist contents: ${finalItems.join(', ')}`);
    
    console.log('🎉 Optimized build completed successfully!');
    return true;
    
  } catch (error) {
    console.error(`❌ Build failed: ${error.message}`);
    return false;
  }
}

optimizedBuild().then(success => {
  process.exit(success ? 0 : 1);
});