# GitHub Pages Deployment Guide

## Quick Setup (One-Time)

### 1. Install gh-pages package
```bash
npm install -D gh-pages
```

### 2. Update vite.config.ts (Already done!)
Make sure the `base` matches your repo name:
```ts
export default defineConfig({
  base: "/EduAssist-AI-FE/",
  // ... rest of config
});
```

### 3. Update package.json (Already done!)
The deploy script has been added:
```json
"scripts": {
  "deploy": "npm run build && npx gh-pages -d dist"
}
```

---

## Deploy to GitHub Pages

### Step 1: Build and Deploy
```bash
npm run deploy
```

This command will:
1. Build your app (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch

### Step 2: Configure GitHub Pages

1. Go to your GitHub repo: `https://github.com/<your-username>/EduAssist-AI-FE`
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 3: Access Your App

After ~1-2 minutes, your app will be live at:
```
https://<your-username>.github.io/EduAssist-AI-FE/
```

---

## Deploy Updates (Every Time You Make Changes)

```bash
# Make your code changes
# Then run:
npm run deploy
```

That's it! GitHub Pages will automatically update.

---

## Important Notes

### API URL Configuration

Update your `.env.production` before deploying:
```
VITE_API_URL=https://your-api-domain.com
```

**Note:** GitHub Pages uses `.env.production` automatically during build.

### Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file to `public/` folder:
   ```
   your-domain.com
   ```

2. Update DNS records at your domain registrar

3. Your app will be available at `https://your-domain.com`

### Deployment Troubleshooting

**Issue: 404 errors on refresh**
- This is normal for SPAs. GitHub Pages doesn't support client-side routing out of the box.
- Solution: Use hash routing or configure a redirect

**Issue: Assets not loading**
- Make sure `base` in `vite.config.ts` matches your repo name exactly
- Run `npm run build` and check the output paths

**Issue: Deployment not updating**
- Clear browser cache (Ctrl+Shift+R)
- Check GitHub Actions tab for build status

---

## Alternative: GitHub Actions (Automatic Deploy on Push)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then in GitHub: Settings → Pages → Build and deployment → Source: **GitHub Actions**

---

## Quick Reference

| Task | Command |
|------|---------|
| Deploy | `npm run deploy` |
| Test build locally | `npm run build && npm run preview` |
| Check gh-pages branch | `git branch -r` |

---

## Remove Docker Files (Optional Cleanup)

Since you're using GitHub Pages now, you can remove the Docker setup files:
```bash
rm Dockerfile docker-compose.yml nginx.conf .dockerignore deploy.sh deploy.bat DEPLOY.md EC2_SETUP.md
```

Or keep them if you might use Docker deployment later.
