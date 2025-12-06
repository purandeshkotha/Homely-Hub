# Deployment Guide

## Step 1: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
2. Copy the repository URL
3. Run these commands:

```bash
cd c:\internship\HomelyHub-main
git remote add origin <YOUR_GITHUB_REPO_URL>
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend (Choose One)

### Option A: Deploy to Render (Recommended - Free Tier)

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: homelyhub-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm run dev`
5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   PORT=8000
   MONGO_URI=<your_mongodb_atlas_uri>
   ORIGIN_ACCESS_URL=<your_netlify_url>
   JWT_SECRET=<generate_random_string>
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   IMAGEKIT_PUBLICKEY=<your_key>
   IMAGEKIT_PRIVATEKEY=<your_key>
   IMAGEKIT_URLENDPOINT=<your_endpoint>
   RAZORPAY_KEY_ID=<your_key>
   RAZORPAY_SECRET=<your_secret>
   MAILTRAP_HOST=smtp.mailtrap.io
   MAILTRAP_PORT=2525
   MAILTRAP_USER=<your_user>
   MAILTRAP_PASS=<your_pass>
   ```
6. Click "Create Web Service"
7. Copy your backend URL (e.g., https://homelyhub-backend.onrender.com)

### Option B: Deploy to Railway

1. Go to https://railway.app
2. Click "Start a New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Deploy

## Step 3: Setup MongoDB Atlas (Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for development
5. Get connection string and update MONGO_URI in backend

## Step 4: Deploy Frontend to Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select your repository
5. Configure build settings (should auto-detect from netlify.toml):
   - **Base directory**: Frontend
   - **Build command**: npm run build
   - **Publish directory**: Frontend/dist
6. Add Environment Variables:
   - Click "Site settings" → "Environment variables" → "Add a variable"
   - Add:
     ```
     REACT_APP_API_BASE_URL=<your_backend_url_from_step2>
     REACT_APP_RAZORPAY_KEY=<your_razorpay_key>
     ```
7. Click "Deploy site"
8. Copy your Netlify URL (e.g., https://your-site.netlify.app)
9. Go back to your backend hosting (Render/Railway) and update ORIGIN_ACCESS_URL with your Netlify URL

## Step 5: Update Backend CORS

Update the ORIGIN_ACCESS_URL in your backend environment variables with your Netlify URL.

## Step 6: Test Your Deployment

Visit your Netlify URL and test the application!

## Troubleshooting

- **CORS errors**: Make sure ORIGIN_ACCESS_URL in backend matches your Netlify URL
- **API not connecting**: Verify REACT_APP_API_BASE_URL in Netlify environment variables
- **Database connection failed**: Check MongoDB Atlas connection string and IP whitelist
- **Build fails**: Check build logs in Netlify dashboard

## Quick Deploy Commands

```bash
# Push changes
git add .
git commit -m "Your commit message"
git push origin main

# Netlify and Render will auto-deploy on push
```
