# Quick Fix to Make Website Work

## Problem
Your Netlify frontend is trying to connect to localhost:8000 which doesn't exist online.

## Solution: Deploy Backend to Render (5 minutes)

### Step 1: Create MongoDB Atlas Account (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up → Create FREE cluster
3. Create Database User (username + password)
4. Network Access → Add IP: 0.0.0.0/0
5. Click "Connect" → "Connect your application"
6. Copy connection string (looks like: mongodb+srv://username:password@cluster.mongodb.net/homelyhub)

### Step 2: Deploy Backend to Render
1. Go to https://render.com → Sign up
2. Click "New +" → "Web Service"
3. Connect GitHub → Select "Homely-Hub" repo
4. Configure:
   - Name: homelyhub-backend
   - Root Directory: backend
   - Build Command: npm install
   - Start Command: node src/index.js
   - Instance Type: Free

5. Add Environment Variables (click "Advanced"):
```
PORT=8000
MONGO_URI=<paste_your_mongodb_atlas_connection_string>
ORIGIN_ACCESS_URL=https://homely-hub123.netlify.app
JWT_SECRET=mysecretkey12345
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
IMAGEKIT_PUBLICKEY=your_key
IMAGEKIT_PRIVATEKEY=your_key
IMAGEKIT_URLENDPOINT=your_endpoint
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_user
MAILTRAP_PASS=your_pass
```

6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. Copy your backend URL (e.g., https://homelyhub-backend.onrender.com)

### Step 3: Update Netlify
1. Go to Netlify dashboard
2. Site settings → Environment variables
3. Add/Update:
   - REACT_APP_API_BASE_URL = https://YOUR-RENDER-URL.onrender.com
   - REACT_APP_RAZORPAY_KEY = your_key
4. Deploys → Trigger deploy → Clear cache and deploy

### Done! 
Your website will work in 2-3 minutes after Netlify redeploys.
