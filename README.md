# HomelyHub

A full-stack property rental platform built with React, Node.js, Express, and MongoDB.

## Features
- Property listing and search
- User authentication
- Booking management
- Payment integration (Razorpay)
- Image uploads (ImageKit)
- Email notifications

## Tech Stack
- **Frontend**: React, Redux Toolkit, Vite, Ant Design
- **Backend**: Node.js, Express, MongoDB
- **Deployment**: Netlify (Frontend), Backend needs separate hosting

## Local Development

### Prerequisites
- Node.js (v16+)
- MongoDB
- Git

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd HomelyHub-main
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/homelyhub
ORIGIN_ACCESS_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
IMAGEKIT_PUBLICKEY=your_imagekit_public_key
IMAGEKIT_PRIVATEKEY=your_imagekit_private_key
IMAGEKIT_URLENDPOINT=your_imagekit_url_endpoint
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
```

3. **Frontend Setup**
```bash
cd Frontend
npm install
```

Create `Frontend/.env` file:
```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_RAZORPAY_KEY=your_razorpay_key
```

4. **Run the application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd Frontend
npm run dev
```

Visit: http://localhost:5173

## Deployment

### Deploy to Netlify

1. **Push to GitHub**
```bash
git remote add origin <your-github-repo-url>
git push -u origin master
```

2. **Deploy on Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings are already configured in `netlify.toml`
   - Add environment variables in Netlify dashboard:
     - `REACT_APP_API_BASE_URL`: Your backend API URL
     - `REACT_APP_RAZORPAY_KEY`: Your Razorpay key
   - Click "Deploy site"

3. **Backend Deployment**
   - Deploy backend to services like:
     - Render
     - Railway
     - Heroku
     - AWS EC2
   - Update `REACT_APP_API_BASE_URL` in Netlify with your backend URL
   - Update `ORIGIN_ACCESS_URL` in backend .env with your Netlify URL

## Environment Variables

See `.env.example` for all required environment variables.

## License
MIT
