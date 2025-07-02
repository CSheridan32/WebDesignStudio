
#!/bin/bash
set -e

echo "🚀 Building for static deployment..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Set production environment
export NODE_ENV=production

# Build frontend with Vite
echo "🔨 Building frontend with Vite..."
if timeout 300 npx vite build; then
    echo "✅ Vite build completed"
else
    echo "❌ Vite build failed or timed out"
    exit 1
fi

# Move files from dist/public to dist root (Vite outputs to dist/public)
if [ -d "dist/public" ]; then
    echo "📁 Moving files from dist/public to dist root..."
    
    # Move all files from dist/public to dist root
    if [ "$(ls -A dist/public)" ]; then
        mv dist/public/* dist/
        echo "✅ Files moved to dist root"
        
        # Remove empty public directory
        rmdir dist/public
        echo "✅ Removed empty dist/public directory"
    else
        echo "❌ No files found in dist/public"
        exit 1
    fi
elif [ -d "dist" ]; then
    echo "📁 Files already in dist root"
else
    echo "❌ No dist directory found after build"
    exit 1
fi

# Verify index.html is in the right place
if [ -f "dist/index.html" ]; then
    echo "✅ index.html found in dist root"
else
    echo "❌ index.html not found in dist root"
    exit 1
fi

echo "✅ Build complete! Ready for static deployment."
