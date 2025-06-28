# Static Deployment Instructions

This project is configured for static deployment, but requires a specific build process due to the Vite configuration.

## Quick Start

To build for static deployment, run:

```bash
./build-for-static-deployment.sh
```

This will:
1. Clean any previous build
2. Build the frontend with Vite
3. Move files from `dist/public` to `dist` root
4. Verify `index.html` is in the correct location
5. Show the final structure

## Alternative Methods

### Method 1: Two-step process
```bash
# Step 1: Build with Vite
npx vite build

# Step 2: Reorganize files
node create-static-deployment.js
```

### Method 2: Quick shell script
```bash
./quick-build.sh
```

## What Gets Fixed

The issue was that Vite builds to `dist/public/` but static deployment expects files at `dist/` root. The scripts automatically:

- Move `dist/public/index.html` → `dist/index.html`
- Move `dist/public/assets/` → `dist/assets/`
- Move all other files to the correct location
- Remove the empty `dist/public/` directory

## Verification

After running any build script, you should see:

```
dist/
├── index.html          ← Main HTML file
├── assets/            ← CSS, JS, and other assets
└── [other files]      ← Any additional static files
```

## Troubleshooting

### Build times out
The Vite build can take a while due to the large number of dependencies. The scripts include timeouts to prevent hanging.

### Files not in right place
If you see `dist/public/index.html` instead of `dist/index.html`, run:
```bash
node create-static-deployment.js
```

### Permission errors
Make scripts executable:
```bash
chmod +x build-for-static-deployment.sh
chmod +x quick-build.sh
```

## For Replit Deployment

1. Run `./build-for-static-deployment.sh`
2. Verify `dist/index.html` exists
3. Deploy the `dist/` directory
4. Configure your hosting to serve `index.html` for all routes (SPA routing)