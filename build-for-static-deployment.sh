#!/bin/bash
set -e

echo "🚀 Building for static deployment..."

# Function to show progress
show_progress() {
    echo "  ✓ $1"
}

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist
show_progress "Previous build cleaned"

# Set production environment
export NODE_ENV=production

# Build frontend with Vite (with limited time to avoid infinite hanging)
echo "🔨 Building frontend with Vite..."
if timeout 300 npx vite build; then
    show_progress "Vite build completed"
else
    echo "❌ Vite build failed or timed out"
    exit 1
fi

# Check if build produced the expected structure
if [ -d "dist/public" ]; then
    echo "📁 Moving files from dist/public to dist root..."
    
    # List what we're moving
    echo "Files to move:"
    ls -la dist/public/
    
    # Move all files from dist/public to dist root
    if [ "$(ls -A dist/public)" ]; then
        mv dist/public/* dist/
        show_progress "Files moved to dist root"
        
        # Remove empty public directory
        rmdir dist/public
        show_progress "Removed empty dist/public directory"
    else
        echo "❌ No files found in dist/public"
        exit 1
    fi
    
elif [ -d "dist" ]; then
    echo "📁 Files already in dist root (unexpected but checking...)"
else
    echo "❌ No dist directory found after build"
    exit 1
fi

# Verify index.html is in the right place
if [ -f "dist/index.html" ]; then
    show_progress "index.html found in dist root"
else
    echo "❌ index.html not found in dist root"
    exit 1
fi

# Show final structure
echo "📋 Final dist structure:"
ls -la dist/

echo "✅ Build complete! Ready for static deployment."
echo ""
echo "🎯 Next steps:"
echo "   - Deploy the dist/ directory to your static hosting service"
echo "   - Ensure your hosting serves index.html for all routes (SPA routing)"
echo ""