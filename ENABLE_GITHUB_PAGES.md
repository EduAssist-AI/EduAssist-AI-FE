# Enable GitHub Pages - CRITICAL STEP

## Problem
Your code is deployed to the `gh-pages` branch, but GitHub Pages is not enabled yet.

## Solution: Enable GitHub Pages

### Step 1: Go to Repository Settings
1. Open: https://github.com/EduAssist-AI/EduAssist-AI-FE
2. Click **Settings** tab (top right, next to "Insights")

### Step 2: Navigate to Pages
1. In the left sidebar, scroll down to **"Pages"**
2. Click **Pages**

### Step 3: Configure Source
Under **"Build and deployment"**:

**Option A: Deploy from branch (Simple)**
- **Source**: `Deploy from a branch`
- **Branch**: `gh-pages` → `/ (root)`
- Click **Save**

**Option B: Deploy from Actions (Recommended for CI/CD)**
- **Source**: `GitHub Actions`
- This uses the workflow in `.github/workflows/deploy.yml`
- Click **Save**

### Step 4: Wait for Deployment
After saving:
1. GitHub will start building your site
2. Wait 2-5 minutes
3. You'll see a success message with your site URL

### Step 5: Verify
Visit: https://eduassist-ai.github.io/EduAssist-AI-FE/

Press **Ctrl + Shift + R** to hard refresh

## If You Don't See Pages Settings

Make sure you have **admin access** to the repository.

If not, ask the repo owner to:
1. Go to Settings → Pages
2. Enable GitHub Pages
3. Select `gh-pages` branch as source

## Quick Checklist

- [ ] Code deployed to `gh-pages` branch ✅ (Already done)
- [ ] GitHub Pages enabled in Settings
- [ ] Source set to `gh-pages` branch
- [ ] Waited 3-5 minutes for build
- [ ] Hard refreshed browser (Ctrl + Shift + R)

## Troubleshooting

### Still 404 after enabling?
1. Wait another 5 minutes
2. Check Settings → Pages for build status
3. Check Actions tab for build errors

### "Page not built" error?
1. Go to Actions tab
2. Find the latest deployment
3. Check for errors
4. Re-run if needed

### Wrong URL?
Your site will be at:
```
https://eduassist-ai.github.io/EduAssist-AI-FE/
```

NOT:
```
https://eduassist-ai.github.io/  (missing repo name)
```

## After Enabling

Once GitHub Pages is enabled and built:

1. **Test the homepage**: https://eduassist-ai.github.io/EduAssist-AI-FE/
2. **Test routing**: Navigate to `/signup` and refresh
3. **Check console**: Press F12, look for errors
4. **Check network**: F12 → Network tab, look for 404s

## Next: Backend Setup

After the frontend works, set up the backend:

```bash
# Start your backend on port 8000
# Then run:
auto-ngrok-setup.bat
```

This will:
- Start ngrok tunnel
- Update `.env.production` with ngrok URL
- Rebuild and redeploy frontend

## Contact

If you need help, share:
1. Screenshot of Settings → Pages
2. Screenshot of Actions tab
3. Any error messages from browser console (F12)
