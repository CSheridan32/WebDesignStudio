#!/bin/bash

echo "Building frontend for static deployment..."

# Clean previous build
rm -rf dist
mkdir -p dist

# Set production environment
export NODE_ENV=production

# Build frontend (this will output to dist/public due to vite config)
echo "Running vite build..."
timeout 120 npx vite build

# Check if build was successful and move files
if [ -d "dist/public" ]; then
    echo "Moving files from dist/public to dist root..."
    
    # Move all files from dist/public to dist
    mv dist/public/* dist/
    
    # Remove empty public directory
    rmdir dist/public
    
    echo "Files moved successfully"
else
    echo "❌ Build failed - no dist/public directory found"
    exit 1
fi

# Verify index.html is in the right place
if [ -f "dist/index.html" ]; then
    echo "✅ Build successful - index.html found in dist root"
    echo "Files in dist:"
    ls -la dist/
else
    echo "❌ Build failed - no index.html found in dist root"
    echo "Contents of dist:"
    ls -la dist/ 2>/dev/null || echo "No dist directory"
    exit 1
fi

echo "Build complete! Ready for static deployment."te!"