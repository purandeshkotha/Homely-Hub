# HomelyHub

A full-stack property rental platform where users can discover, list, and book accommodations across India. Built with React, Node.js, Express, and MongoDB.

![HomelyHub Screenshot](./Frontend/public/readme/wsa-homelyhub-app-screenshot.jpg)

---

## Features

- Browse 16+ property listings with pagination (12 per page)
- Search and filter properties by location, type, price, amenities
- User registration and login with JWT-based authentication (cookie)
- Forgot password / reset password via email (Mailtrap)
- View property details with image gallery and map (Leaflet)
- Property amenities display (Wifi, AC, Pool, Kitchen, TV, Parking, Washing Machine)
- Booking system with check-in / check-out date selection
- Payment integration via Razorpay
- Host your own accommodation (add listing with images via ImageKit)
- View and manage your bookings
- User profile view and edit
- Fully responsive UI

---

## Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | React 18, Redux Toolkit, React Router v6, Vite      |
| UI         | Ant Design, Lucide React, GSAP, React Leaflet        |
| Backend    | Node.js, Express 5                                  |
| Database   | MongoDB Atlas, Mongoose                             |
| Auth       | JWT, bcrypt, cookie-parser                          |
| Payments   | Razorpay                                            |
| Images     | ImageKit                                            |
| Email      | Nodemailer, Mailgen, Mailtrap                       |
| Deployment | Netlify (Frontend), Render (Backend)                |

---

## Project Structure

```
HomelyHub-main/
├── backend/
│   ├── src/
│   │   ├── controllers/       # authController, bookingController, propertyController
│   │   ├── Models/            # User, Property, Booking schemas
│   │   ├── routes/            # userRoutes, propertyRouter, bookingRouter
│   │   └── utils/             # db.js, mail.js, ImagekitIO.js, APIFeatures.js
│   │   └── index.js
│   ├── properties.json        # Seed data (16 properties)
│   ├── seed.js                # Database seeder script
│   └── .env
├── Frontend/
│   ├── public/
│   │   └── assets/            # Images, logo
│   └── src/
│       ├── components/
│       │   ├── home/          # Header, Footer, PropertyList, Search, Filter
│       │   ├── user/          # Login, Signup, Profile, EditProfile, ForgotPassword, ResetPassword
│       │   ├── propertyListing/  # PropertyListing, PropertyImg, PropertyAmenities, PaymentForm, Map
│       │   ├── myBookings/    # MyBookings, BookingDetails
│       │   ├── payment/       # Payment
│       │   └── accomodation/  # Accomodation, AccomodationForm, AddressField, AmenitiesField, ImagesUploading
│       ├── store/             # Redux slices & actions (User, Property, PropertyDetails, Booking, Payment)
│       ├── utils/             # axios.js
│       └── App.jsx
├── netlify.toml
└── render.yaml
```

---

## Pages & Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Home — property listings | No |
| `/propertylist/:id` | Property detail page | No |
| `/login` | Login | No |
| `/signup` | Register | No |
| `/profile` | User profile | No |
| `/editprofile` | Edit profile | Yes |
| `/user/mybookings` | My bookings list | Yes |
| `/user/mybookings/:bookingId` | Booking details | Yes |
| `/payment/:propertyId` | Payment page | Yes |
| `/accomodation` | My accommodations | No |
| `/accomodationform` | Add new accommodation | No |

---

## API Endpoints

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/rent/user/signup` | Register a new user |
| POST | `/api/v1/rent/user/login` | Login user |
| GET | `/api/v1/rent/user/logout` | Logout user |
| GET | `/api/v1/rent/user/me` | Get current logged-in user |
| PATCH | `/api/v1/rent/user/updateMe` | Update profile |
| PATCH | `/api/v1/rent/user/updateMyPassword` | Update password |
| POST | `/api/v1/rent/user/forgotPassword` | Send reset password email |
| PATCH | `/api/v1/rent/user/resetPassword/:token` | Reset password |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/rent/listing` | Get all properties (paginated) |
| GET | `/api/v1/rent/listing/:id` | Get single property |
| POST | `/api/v1/rent/user/newAccommodation` | Create a property (auth) |
| GET | `/api/v1/rent/user/myAccommodation` | Get user's own properties (auth) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/rent/user/booking` | Get all bookings of user (auth) |
| GET | `/api/v1/rent/user/booking/:id` | Get single booking (auth) |

---

## Local Development

### Prerequisites

- Node.js v16+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/purandeshkotha/Homely-Hub.git
cd Homely-Hub
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
# Server
PORT=8000
MONGO_URI=mongodb://localhost:27017/homelyhub
ORIGIN_ACCESS_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# ImageKit
IMAGEKIT_PUBLICKEY=your_imagekit_public_key
IMAGEKIT_PRIVATEKEY=your_imagekit_private_key
IMAGEKIT_URLENDPOINT=your_imagekit_url_endpoint

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# Mailtrap
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
```

### 3. Seed the Database

The project includes a seed script to populate 16 sample properties:

```bash
cd backend
node seed.js
```

### 4. Frontend Setup

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_RAZORPAY_KEY=your_razorpay_key
```

### 5. Run the Application

Terminal 1 — Backend:
```bash
cd backend
npm run dev
```

Terminal 2 — Frontend:
```bash
cd Frontend
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## MongoDB Atlas Setup

If using MongoDB Atlas instead of local MongoDB:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create a cluster
2. Go to **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
3. Go to **Database Access** → create a user with read/write access
4. Copy the connection string and set it as `MONGO_URI` in `backend/.env`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
```

---

## Deployment

### Frontend — Netlify

Build settings are pre-configured in `netlify.toml`:

```toml
[build]
  base = "Frontend"
  command = "npm run build"
  publish = "dist"
```

Steps:
1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com) → **Add new site** → **Import from GitHub**
3. Add environment variables in Netlify dashboard:
   - `VITE_API_URL` — your Render backend URL e.g. `https://your-app.onrender.com/api`
   - `VITE_RAZORPAY_KEY` — your Razorpay public key
4. Deploy

### Backend — Render

Deployment config is pre-configured in `render.yaml`. Steps:
1. Go to [Render](https://render.com) → **New Web Service** → connect your GitHub repo
2. Render will auto-detect `render.yaml`
3. Add environment variables in the Render dashboard:
   - `MONGO_URI`
   - `ORIGIN_ACCESS_URL` — your Netlify frontend URL
   - `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_COOKIE_EXPIRES_IN`
   - `IMAGEKIT_PUBLICKEY`, `IMAGEKIT_PRIVATEKEY`, `IMAGEKIT_URLENDPOINT`
   - `RAZORPAY_KEY_ID`, `RAZORPAY_SECRET`
   - `MAILTRAP_HOST`, `MAILTRAP_PORT`, `MAILTRAP_USER`, `MAILTRAP_PASS`
4. Deploy and copy the Render URL
5. Update `VITE_API_URL` in Netlify with your Render URL

---

## Environment Variables Summary

| Variable | Location | Description |
|----------|----------|-------------|
| `PORT` | Backend | Server port (default: 8000) |
| `MONGO_URI` | Backend | MongoDB connection string |
| `ORIGIN_ACCESS_URL` | Backend | Allowed frontend origin for CORS |
| `JWT_SECRET` | Backend | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | Backend | JWT token expiry (e.g. `90d`) |
| `JWT_COOKIE_EXPIRES_IN` | Backend | Cookie expiry in days |
| `IMAGEKIT_PUBLICKEY` | Backend | ImageKit public key |
| `IMAGEKIT_PRIVATEKEY` | Backend | ImageKit private key |
| `IMAGEKIT_URLENDPOINT` | Backend | ImageKit URL endpoint |
| `RAZORPAY_KEY_ID` | Backend | Razorpay key ID |
| `RAZORPAY_SECRET` | Backend | Razorpay secret |
| `MAILTRAP_HOST` | Backend | Mailtrap SMTP host |
| `MAILTRAP_PORT` | Backend | Mailtrap SMTP port |
| `MAILTRAP_USER` | Backend | Mailtrap username |
| `MAILTRAP_PASS` | Backend | Mailtrap password |
| `VITE_API_URL` | Frontend | Backend API base URL |
| `VITE_RAZORPAY_KEY` | Frontend | Razorpay public key for frontend |

---

## License

MIT
