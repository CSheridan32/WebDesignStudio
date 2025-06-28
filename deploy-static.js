#!/usr/bin/env node

/**
 * Static deployment build script
 * 
 * This script creates a production build suitable for static deployment by:
 * 1. Building only the frontend (no backend server)
 * 2. Moving files to the correct location for deployment
 * 3. Ensuring index.html is at the dist root
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

function log(message) {
  console.log(`[deploy-static] ${message}`);
}

function error(message) {
  console.error(`[deploy-static] ERROR: ${message}`);
}

async function exists(filePath) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function moveFiles(srcDir, destDir) {
  const items = await fs.promises.readdir(srcDir);
  
  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    
    const stat = await fs.promises.stat(srcPath);
    
    if (stat.isDirectory()) {
      await fs.promises.cp(srcPath, destPath, { recursive: true });
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
    
    log(`Moved: ${item}`);
  }
}

async function buildStaticDeployment() {
  try {
    log('Starting static deployment build...');
    
    // Step 1: Clean existing build
    log('Cleaning previous build...');
    if (await exists('dist')) {
      await fs.promises.rm('dist', { recursive: true, force: true });
    }
    
    // Step 2: Build frontend with Vite (configured to output to dist/public)
    log('Building frontend with Vite...');
    
    // Set environment for production
    const env = { ...process.env, NODE_ENV: 'production' };
    
    // Build with a reasonable timeout
    try {
      const { stdout, stderr } = await execAsync('npx vite build', { 
        env,
        timeout: 180000 // 3 minutes timeout
      });
      
      if (stderr && !stderr.includes('warning') && !stderr.includes('Browserslist')) {
        log(`Build stderr: ${stderr}`);
      }
      
      log('Vite build completed');
      
    } catch (buildError) {
      if (buildError.code === 'TIMEOUT') {
        error('Build timed out after 3 minutes');
      } else {
        error(`Build failed: ${buildError.message}`);
      }
      throw buildError;
    }
    
    // Step 3: Check build output and reorganize for static deployment
    const distPublicExists = await exists('dist/public');
    const distExists = await exists('dist');
    
    if (distPublicExists) {
      log('Moving files from dist/public to dist root...');
      
      // List what we're moving
      const publicFiles = await fs.promises.readdir('dist/public');
      log(`Found ${publicFiles.length} items in dist/public: ${publicFiles.join(', ')}`);
      
      // Move all files/directories from dist/public to dist root
      await moveFiles('dist/public', 'dist');
      
      // Remove the now-empty public directory
      await fs.promises.rm('dist/public', { recursive: true, force: true });
      log('Removed dist/public directory');
      
    } else if (distExists) {
      log('Files already built to dist root (no dist/public found)');
    } else {
      throw new Error('No build output found - build may have failed');
    }
    
    // Step 4: Verify deployment readiness
    log('Verifying deployment readiness...');
    
    const finalFiles = await fs.promises.readdir('dist');
    log(`Files in dist: ${finalFiles.join(', ')}`);
    
    // Check for required files
    const hasIndexHtml = finalFiles.includes('index.html');
    const hasAssets = finalFiles.some(f => f.startsWith('assets') || f.endsWith('.js') || f.endsWith('.css'));
    
    if (hasIndexHtml) {
      log('✅ index.html found at dist root');
    } else {
      error('❌ index.html not found at dist root');
      throw new Error('Missing index.html file');
    }
    
    if (hasAssets) {
      log('✅ Asset files found');
    } else {
      log('⚠️  No obvious asset files found');
    }
    
    // Step 5: Clean up any server files that shouldn't be in static deployment
    const serverFiles = finalFiles.filter(f => 
      f === 'index.js' || 
      f.includes('server') || 
      f.includes('node_modules')
    );
    
    if (serverFiles.length > 0) {
      log(`Removing server files: ${serverFiles.join(', ')}`);
      for (const file of serverFiles) {
        await fs.promises.rm(path.join('dist', file), { recursive: true, force: true });
      }
    }
    
    log('🎉 Static deployment build completed successfully!');
    log('Ready for deployment to static hosting');
    
  } catch (err) {
    error(`Build failed: ${err.message}`);
    process.exit(1);
  }
}

// Run the build
buildStaticDeployment();