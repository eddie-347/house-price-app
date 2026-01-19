# House Price App - Deployment Guide

Complete step-by-step guide to host your application for free using Vercel (Frontend) and Render (Backend).

## **Overview**

- **Frontend:** Hosted on Vercel (React + Vite)
- **Backend:** Hosted on Render (FastAPI)
- **Cost:** Completely FREE

---

## **Prerequisites**

- GitHub account (free at [github.com](https://github.com))
- Vercel account (free at [vercel.com](https://vercel.com))
- Render account (free at [render.com](https://render.com))

---

## **Step 1: Prepare Your Code (Local)**

### Update Backend CORS Configuration

Your backend needs to accept requests from your production frontend. The following change has already been made:

- Backend now reads `FRONTEND_URL` from environment variables
- CORS origins are dynamically configured

**File:** `backend/app.py` - CORS origins updated

### Create `.gitignore` Files

These files are already created to prevent uploading unnecessary files:

- `backend/.gitignore` - Ignores Python cache and virtual environments
- `frontend/.gitignore` - Should already exist

---

## **Step 2: Initialize Git Repository Locally**

Open PowerShell/CMD and run:

```powershell
cd c:\house-price-app
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

**What this does:**
- `git init` - Initializes a new Git repository
- `git add .` - Stages all files for commit
- `git commit -m "..."` - Creates your first commit

---

## **Step 3: Create a GitHub Repository**

### 3A. Create the Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon (top right) → **"New repository"**
3. **Repository name:** `house-price-app`
4. **Description:** "House price prediction app with React frontend and FastAPI backend"
5. **Visibility:** Public (or Private if you prefer)
6. **DO NOT** check "Initialize this repository with a README" or any other options
7. Click **"Create repository"**

### 3B. Copy Your Repository URL

After creating, you'll see a page with your repository URL:
```
https://github.com/YOUR-USERNAME/house-price-app.git
```

**Save this URL** - you'll need it next.

---

## **Step 4: Push Code to GitHub**

Run these commands in your terminal (replace `YOUR-USERNAME` with your actual GitHub username):

```powershell
cd c:\house-price-app

git remote add origin https://github.com/YOUR-USERNAME/house-price-app.git
git branch -M main
git push -u origin main
```

**What each command does:**
- `git remote add origin ...` - Connects your local repo to GitHub
- `git branch -M main` - Renames branch to "main"
- `git push -u origin main` - Uploads your code to GitHub

**Note:** You'll be prompted for authentication. Use:
- **Username:** Your GitHub username
- **Password:** A Personal Access Token (see section below if needed)

### Creating a Personal Access Token (if needed)

If GitHub asks for a password:

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Check: `repo` (full control of private repositories)
4. Click **"Generate token"**
5. **Copy the token** and use it as your password in the terminal

---

## **Step 5: Deploy Backend to Render**

### 5A. Sign Up on Render

1. Go to [render.com](https://render.com)
2. Click **"Sign up"** → **"Continue with GitHub"**
3. Authorize Render to access your GitHub account

### 5B. Create Web Service

1. Click **"New +"** (top right) → **"Web Service"**
2. **Select repository:** `house-price-app`
3. Click **"Connect"**

### 5C. Configure the Service

Fill in the following details:

| Field | Value |
|-------|-------|
| **Name** | `house-price-backend` |
| **Region** | (Choose closest to you) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app:app --host 0.0.0.0 --port 8001` |
| **Plan** | `Free` |

### 5D. Deploy

1. Scroll down and click **"Create Web Service"**
2. Wait 2-3 minutes for deployment to complete
3. You'll see a **live URL** like: `https://house-price-backend.onrender.com`
4. **Copy this URL** - you'll need it for the frontend

**Note:** On the free tier, the service will sleep after 15 minutes of inactivity. It wakes up on the next request (takes ~30 seconds).

---

## **Step 6: Deploy Frontend to Vercel**

### 6A. Sign Up on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign up"** → **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account

### 6B. Import Project

1. Click **"Add New..."** → **"Project"**
2. **Select:** `house-price-app` repository
3. Click **"Import"**

### 6C. Configure the Project

Fill in the following:

| Field | Value |
|-------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 6D. Add Environment Variable

Scroll down to **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_BASE` | `https://house-price-backend.onrender.com` |

**Replace with your actual Render backend URL from Step 5D**

### 6E. Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (2-5 minutes)
3. You'll get a **frontend URL** like: `https://house-price-app-abc123.vercel.app`

---

## **Step 7: Update Backend Environment Variable**

Now update your backend with the frontend URL:

### 7A. Go to Render Dashboard

1. Go to [render.com](https://render.com) dashboard
2. Select **"house-price-backend"** service

### 7B. Add Environment Variable

1. Go to **"Settings"** tab
2. Scroll to **"Environment"**
3. Click **"Add Environment Variable"**
4. Enter:
   - **Key:** `FRONTEND_URL`
   - **Value:** Your Vercel URL (e.g., `https://house-price-app-abc123.vercel.app`)
5. Click **"Save"**

**The backend will automatically restart with the new variable.**

---

## **Step 8: Test Your Application**

1. Go to your Vercel frontend URL
2. Test the application:
   - Fill in house features
   - Click "Predict Price"
   - Verify it works

**If you get CORS errors:**
- Wait for backend to wake up (first request takes ~30 seconds on free tier)
- Check that `VITE_API_BASE` environment variable is correctly set in Vercel
- Check that `FRONTEND_URL` is correctly set in Render

---

## **Making Updates**

### To update your application:

1. Make changes locally in VS Code
2. Commit and push to GitHub:
   ```powershell
   git add .
   git commit -m "Your description of changes"
   git push
   ```
3. Vercel and Render automatically redeploy when you push to GitHub

---

## **Final URLs**

| Service | URL |
|---------|-----|
| **Frontend** | `https://your-app-name.vercel.app` |
| **Backend API** | `https://house-price-backend.onrender.com` |
| **Health Check** | `https://house-price-backend.onrender.com/health` |

---

## **Troubleshooting**

### Backend takes too long to respond
- **Cause:** Free tier on Render sleeps after 15 min of inactivity
- **Solution:** First request after sleep takes ~30 seconds. This is normal.

### CORS errors in browser console
- Check `VITE_API_BASE` is set correctly in Vercel
- Check `FRONTEND_URL` is set correctly in Render
- Wait for Render backend to restart after adding environment variable

### "Cannot GET /" error
- Make sure `Root Directory` is set to `backend` in Render
- Make sure `Root Directory` is set to `frontend` in Vercel

### Deployment fails on Vercel
- Check that `package.json` exists in `frontend/` folder
- Check that `npm run build` works locally: `cd frontend && npm run build`

### Deployment fails on Render
- Check that `requirements.txt` exists in `backend/` folder
- Check that `app.py` exists in `backend/` folder
- Check that all dependencies can be installed: `pip install -r requirements.txt`

---

## **Free Tier Limitations**

### Render (Backend)
- ✅ Free tier available
- ⚠️ Service sleeps after 15 minutes of inactivity
- ⚠️ First request after sleep takes ~30 seconds
- 📊 512 MB RAM, 0.5 CPU
- ✅ Unlimited bandwidth

### Vercel (Frontend)
- ✅ Free tier available
- ✅ Fast performance (global CDN)
- ✅ No sleep/inactivity restrictions
- 📊 Generous bandwidth limits
- ✅ Automatic HTTPS

---

## **Alternative Hosting Options**

If you want better performance or different features:

| Platform | Frontend | Backend | Cost | Notes |
|----------|----------|---------|------|-------|
| Railway | ✅ | ✅ | Free ($5/month credit) | Better performance than Render |
| Replit | ✅ | ✅ | Free (limited) | Good for simple projects |
| Heroku | ❌ | ✅ | Paid (was free) | No longer offers free tier |

---

## **Support**

For issues with:
- **GitHub:** [github.com/support](https://github.com/support)
- **Render:** [render.com/docs](https://render.com/docs)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)

