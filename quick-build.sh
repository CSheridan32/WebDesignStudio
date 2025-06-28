#!/bin/bash

echo "Building frontend for static deployment..."

# Clean previous build
rm -rf dist
mkdir -p dist

# Set production environment
export NODE_ENV=production

# Build frontend only (without backend compilation)
echo "Running vite build..."
npx vite build --outDir dist

# Check if build was successful
if [ -f "dist/index.html" ]; then
    echo "✅ Build successful - index.html found in dist/"
    echo "Files in dist:"
    ls -la dist/
else
    echo "❌ Build failed - no index.html found"
    echo "Contents of dist:"
    ls -la dist/ 2>/dev/null || echo "No dist directory"
fi

echo "Build complete!"