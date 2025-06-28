#!/usr/bin/env python3
"""
Quick static build fix script
Moves files from dist/public to dist root for static deployment
"""

import os
import shutil
import subprocess
import sys
from pathlib import Path

def run_command(cmd, timeout=120):
    """Run a command with timeout"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout)
        return result.returncode == 0, result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        print(f"Command timed out: {cmd}")
        return False, "", "Timeout"

def move_files_to_root():
    """Move files from dist/public to dist root"""
    dist_public = Path("dist/public")
    dist_root = Path("dist")
    
    if not dist_public.exists():
        print("❌ dist/public directory not found")
        return False
    
    print("Moving files from dist/public to dist root...")
    
    try:
        # Move all files and directories from dist/public to dist
        for item in dist_public.iterdir():
            dest = dist_root / item.name
            if dest.exists():
                if dest.is_dir():
                    shutil.rmtree(dest)
                else:
                    dest.unlink()
            
            if item.is_dir():
                shutil.copytree(item, dest)
            else:
                shutil.copy2(item, dest)
        
        # Remove the empty dist/public directory
        shutil.rmtree(dist_public)
        
        print("✅ Files moved successfully")
        return True
        
    except Exception as e:
        print(f"❌ Error moving files: {e}")
        return False

def main():
    print("Building frontend for static deployment...")
    
    # Clean previous build
    if Path("dist").exists():
        shutil.rmtree("dist")
    
    # Set production environment
    os.environ["NODE_ENV"] = "production"
    
    # Build with Vite
    print("Running vite build...")
    success, stdout, stderr = run_command("npx vite build", timeout=180)
    
    if not success:
        print(f"❌ Build failed: {stderr}")
        sys.exit(1)
    
    print("Vite build completed")
    
    # Move files to correct location
    if not move_files_to_root():
        sys.exit(1)
    
    # Verify index.html exists
    index_file = Path("dist/index.html")
    if not index_file.exists():
        print("❌ index.html not found in dist root")
        sys.exit(1)
    
    # List final contents
    dist_files = list(Path("dist").iterdir())
    print(f"Final dist contents: {[f.name for f in dist_files]}")
    
    print("✅ Build complete! Ready for static deployment.")

if __name__ == "__main__":
    main()