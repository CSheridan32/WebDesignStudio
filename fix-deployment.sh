
#!/usr/bin/env bash
# Fix static deployment structure
# 1. Build into dist/public
npm run build           # or npx vite build
# 2. Move everything up one level
mv dist/public/* dist/
# 3. Clean up
rm -rf dist/public

echo "✅ Deployment structure fixed!"
echo "Files moved from dist/public/ to dist/ root"
