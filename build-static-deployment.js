import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

/**
 * Static deployment build script
 * 
 * This script creates a production build suitable for static deployment by:
 * 1. Building only the frontend (no backend server)
 * 2. Moving files from dist/public to dist root for deployment
 * 3. Ensuring index.html is at the dist root
 */

function log(message) {
  console.log(`[static-build] ${message}`);
}

function error(message) {
  console.error(`[static-build] ERROR: ${message}`);
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function moveFiles(srcDir, destDir) {
  const files = await fs.readdir(srcDir);
  
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    
    const stat = await fs.stat(srcPath);
    if (stat.isDirectory()) {
      // Recursively copy directory
      await fs.cp(srcPath, destPath, { recursive: true, force: true });
    } else {
      // Copy file
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function buildStaticDeployment() {
  try {
    log('Starting static deployment build...');
    
    // Step 1: Clean existing build
    log('Cleaning previous build...');
    if (await exists('dist')) {
      await fs.rm('dist', { recursive: true, force: true });
    }
    
    // Step 2: Build frontend with Vite
    log('Building frontend with Vite...');
    
    const env = { 
      ...process.env, 
      NODE_ENV: 'production' 
    };
    
    try {
      const { stdout, stderr } = await execAsync('timeout 120 npx vite build', { 
        env,
        timeout: 150000 // 2.5 minutes timeout
      });
      
      if (stderr && !stderr.includes('warning') && !stderr.includes('Browserslist')) {
        log(`Build stderr: ${stderr}`);
      }
      
      log('Vite build completed');
      
    } catch (buildError) {
      if (buildError.code === 'TIMEOUT') {
        error('Build timed out after 2 minutes');
      } else {
        error(`Build failed: ${buildError.message}`);
      }
      throw buildError;
    }
    
    // Step 3: Check build output and reorganize for static deployment
    const distPublicExists = await exists('dist/public');
    
    if (distPublicExists) {
      log('Moving files from dist/public to dist root...');
      
      // List what we're moving for debugging
      const publicFiles = await fs.readdir('dist/public');
      log(`Found files to move: ${publicFiles.join(', ')}`);
      
      // Move all files from dist/public to dist root
      await moveFiles('dist/public', 'dist');
      
      // Remove the now-empty dist/public directory
      await fs.rm('dist/public', { recursive: true, force: true });
      
      log('Files moved successfully');
    } else {
      error('No dist/public directory found after build');
      throw new Error('Build output not found in expected location');
    }
    
    // Step 4: Verify the deployment structure
    const indexExists = await exists('dist/index.html');
    if (!indexExists) {
      error('index.html not found in dist root after build');
      throw new Error('index.html missing from build output');
    }
    
    // List final structure
    const finalFiles = await fs.readdir('dist');
    log(`Final dist contents: ${finalFiles.join(', ')}`);
    
    log('✅ Static deployment build completed successfully!');
    log('Ready for static deployment with index.html at dist root');
    
  } catch (err) {
    error(`Build failed: ${err.message}`);
    process.exit(1);
  }
}

// Run the build
buildStaticDeployment();