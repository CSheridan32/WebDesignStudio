#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function buildStatic() {
  try {
    console.log('Building frontend for static deployment...');
    
    // Clean any existing dist directory
    try {
      await fs.rm('dist', { recursive: true, force: true });
    } catch (error) {
      // Ignore if directory doesn't exist
    }
    
    // Build the frontend using Vite (only frontend)
    console.log('Running Vite build...');
    await execAsync('npx vite build', { cwd: process.cwd() });
    
    console.log('Frontend build completed.');
    
    // The Vite config outputs to dist/public, but we need files in dist root for static deployment
    const publicDir = path.join(process.cwd(), 'dist', 'public');
    const distDir = path.join(process.cwd(), 'dist');
    
    // Check if dist/public exists and move its contents to dist root
    try {
      await fs.access(publicDir);
      
      console.log('Moving static files to dist root...');
      
      // Read all files from dist/public
      const files = await fs.readdir(publicDir);
      
      // Move each file to dist root
      for (const file of files) {
        const srcPath = path.join(publicDir, file);
        const destPath = path.join(distDir, file);
        
        const stat = await fs.stat(srcPath);
        if (stat.isDirectory()) {
          // Move directory recursively
          await fs.cp(srcPath, destPath, { recursive: true });
        } else {
          // Move file
          await fs.copyFile(srcPath, destPath);
        }
      }
      
      // Remove the now-empty public directory
      await fs.rm(publicDir, { recursive: true, force: true });
      
      console.log('Static files organized for deployment in dist/');
      
      // List files to confirm
      const distFiles = await fs.readdir(distDir);
      console.log('Files in dist directory:', distFiles);
      
    } catch (error) {
      console.log('Using direct dist output (no public subdirectory found)');
      
      // List what's actually in dist
      try {
        const distFiles = await fs.readdir(distDir);
        console.log('Files in dist directory:', distFiles);
      } catch (err) {
        console.error('No dist directory found');
      }
    }
    
    console.log('Static build complete!');
    
  } catch (error) {
    console.error('Build failed:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
}

buildStatic();