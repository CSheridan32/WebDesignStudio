#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function buildFrontend() {
  try {
    console.log('Building frontend for static deployment...');
    
    // Clean any existing dist directory first
    console.log('Cleaning previous build...');
    try {
      await fs.rm('dist', { recursive: true, force: true });
    } catch (error) {
      // Directory doesn't exist, that's fine
    }
    
    // Build with Vite
    console.log('Building with Vite...');
    
    // Use a timeout and simpler build approach
    const { stdout, stderr } = await execAsync('timeout 120 npx vite build --mode production', {
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    if (stderr && !stderr.includes('warning')) {
      console.warn('Build warnings:', stderr);
    }
    
    console.log('Build output:', stdout);
    
    // Check the build result
    const distExists = await fs.access('dist').then(() => true).catch(() => false);
    const distPublicExists = await fs.access('dist/public').then(() => true).catch(() => false);
    
    if (distPublicExists) {
      console.log('Moving files from dist/public to dist root...');
      
      // List files in dist/public
      const publicFiles = await fs.readdir('dist/public');
      console.log('Files in dist/public:', publicFiles);
      
      // Move all files from dist/public to dist
      for (const file of publicFiles) {
        const srcPath = path.join('dist/public', file);
        const destPath = path.join('dist', file);
        
        try {
          const stat = await fs.stat(srcPath);
          if (stat.isDirectory()) {
            await fs.cp(srcPath, destPath, { recursive: true });
          } else {
            await fs.copyFile(srcPath, destPath);
          }
          console.log(`Moved: ${file}`);
        } catch (error) {
          console.error(`Failed to move ${file}:`, error.message);
        }
      }
      
      // Remove the empty public directory
      await fs.rm('dist/public', { recursive: true, force: true });
      console.log('Removed dist/public directory');
    }
    
    // Verify the final structure
    if (distExists || await fs.access('dist').then(() => true).catch(() => false)) {
      const finalFiles = await fs.readdir('dist');
      console.log('Final files in dist:', finalFiles);
      
      // Check for index.html
      if (finalFiles.includes('index.html')) {
        console.log('✅ index.html found in dist root - ready for static deployment');
      } else {
        console.warn('⚠️  No index.html found in dist root');
      }
    } else {
      console.error('❌ No dist directory created');
    }
    
    console.log('Build complete!');
    
  } catch (error) {
    console.error('Build failed:', error.message);
    
    // Try to provide helpful information
    try {
      const distExists = await fs.access('dist').then(() => true).catch(() => false);
      if (distExists) {
        const files = await fs.readdir('dist', { recursive: true });
        console.log('Partial build files:', files);
      }
    } catch (e) {
      // Ignore cleanup errors
    }
    
    process.exit(1);
  }
}

buildFrontend();