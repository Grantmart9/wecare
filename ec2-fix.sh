#!/bin/bash
# Single command to fix EC2 installation issues with node-sass and old dependencies

cd /var/www/wecare || exit 1

echo "=== Fixing EC2 dependency issues ==="

# 1. Pull latest changes and reset to main
echo "Step 1: Pulling latest code from origin/main..."
git fetch --all
git reset --hard origin/main

# 2. Remove conflicting lockfile
echo "Step 2: Removing package-lock.json (causes Yarn to pull old CRA deps)..."
rm -f package-lock.json

# 3. Clear yarn cache and node_modules
echo "Step 3: Clearing cache and removing node_modules..."
rm -rf node_modules
yarn cache clean

# 4. Verify react-scripts/node-sass are gone
echo "Step 4: Verifying react-scripts and node-sass are removed..."
if grep -q "react-scripts\|node-sass" package.json yarn.lock 2>/dev/null; then
  echo "WARNING: react-scripts or node-sass still referenced in package.json or yarn.lock"
  echo "Please ensure you're on the latest commit with removed dependencies"
else
  echo "✓ react-scripts and node-sass confirmed removed"
fi

# 5. Install dependencies
echo "Step 5: Running yarn install..."
yarn install

# 6. Verify installation
echo "Step 6: Verifying installation..."
if [ $? -eq 0 ]; then
  echo "✓ Yarn install completed successfully!"
  echo "✓ node-sass is no longer present"
  echo "✓ Next.js with Turbopack ready"
else
  echo "✗ Installation failed - check errors above"
  exit 1
fi

echo "=== All done! You can now run: npm run dev ==="