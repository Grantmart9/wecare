# EC2 Fix Commands

Copy and paste this entire block into your EC2 terminal:

```bash
cd /var/www/wecare && git fetch --all && git reset --hard origin/main && rm -f package-lock.json && rm -rf node_modules && yarn cache clean && yarn install
```

If the above fails due to git issues, run this version:

```bash
cd /var/www/wecare && \
git fetch --all && \
git reset --hard origin/main && \
rm -f package-lock.json && \
rm -rf node_modules && \
yarn cache clean && \
yarn install && \
echo "✓ Installation complete!"
```

## What this does:
1. Pulls latest code from your repository
2. Removes package-lock.json (prevents Yarn from loading old CRA/node-sass dependencies)
3. Cleans out all dependencies and cache
4. Installs fresh with Yarn only
5. Ensures node-sass stays gone and Next.js v16 + Turbopack work

## After success:
```bash
npm run dev
```

## Verify node-sass is gone:
```bash
grep -r "node-sass" package.json yarn.lock || echo "✓ node-sass NOT found"