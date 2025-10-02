# Stock App (starter code)
Next.js 14
This app shows
1. MongoDB CRUD operations using Mongoose
2. Client Components interacting with APIs
3. Server Components Interacting with Server Actions

# Setup
1. Define in .env the followings
1.1 MONGODB_URI
1.2 NEXT_PUBLIC_API_URL


# Customer Management Module - Implementation Guide

## 📁 File Structure

Create the following files in your project:

```
project-root/
├── models/
│   └── Customer.js                    # Mongoose model
├── app/
│   ├── api/
│   │   └── customer/
│   │       ├── route.js              # GET all, POST new
│   │       └── [id]/
│   │           └── route.js          # GET, PUT, DELETE by ID
│   ├── customer/
│   │   ├── page.js                   # Customer list page
│   │   └── [id]/
│   │       └── page.js               # Customer detail page
│   └── page.js                       # Updated main page (add customer link)
└── actions/
    └── customers.js                   # Server actions
```

## 🚀 Installation Steps

### 1. Create Model File
Create `models/Customer.js` with the Customer schema

### 2. Create API Routes
- Create `app/api/customer/route.js` for GET all and POST
- Create `app/api/customer/[id]/route.js` for GET, PUT, DELETE by ID

### 3. Create Actions (Optional but Recommended)
Create `actions/customers.js` for server-side data fetching

### 4. Create UI Pages
- Create `app/customer/page.js` for listing and CRUD operations
- Create `app/customer/[id]/page.js` for customer details

### 5. Update Main Page
Add customer link to `app/page.js`:
```javascript
<li><a href="/customer">Customers</a></li>
```

**4. API Documentation:**


**5. Delete customer:**
```bash
curl -X DELETE http://localhost:3000/api/customer/{customer_id}
```

## 🌐 Local Testing

1. Start your development server:
```bash
npm run dev
# or
pnpm dev
```

2. Open browser and navigate to:
- Main page: `http://localhost:3000`
- Customer list: `http://localhost:3000/customer`
- Customer detail: `http://localhost:3000/customer/{id}`

## 📦 Deployment to VM at /fin-customer

### Method 1: Using basePath in next.config.mjs

Update your `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/fin-customer',
  assetPrefix: '/fin-customer',
};

export default nextConfig;
```

### Method 2: Using Nginx Reverse Proxy

If your app runs on port 3000, configure Nginx:

```nginx
location /fin-customer/ {
    proxy_pass http://localhost:3000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Build for Production

```bash
# Install dependencies
pnpm install

# Build the application
pnpm build

# Start production server
pnpm start
```

### Using PM2 for Production

```bash
# Install PM2
npm install -g pm2

# Start app with PM2
pm2 start npm --name "fin-customer" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## 🔒 Environment Variables

Create `.env.local` file:
```
MONGODB_URI=mongodb://localhost:27017/your_database
NEXT_PUBLIC_BASE_URL=https://your-domain.com/fin-customer
```

For production on VM:
```
MONGODB_URI=mongodb://your_vm_mongodb_connection
NEXT_PUBLIC_BASE_URL=https://your-domain.com/fin-customer
```

## ✅ Features Implemented

- ✅ Customer Mongoose model with all required fields
- ✅ Complete CRUD API (Create, Read, Update, Delete)
- ✅ Customer list page with:
  - View all customers
  - Add new customer (inline form)
  - Edit existing customer
  - Delete customer with confirmation
- ✅ Customer detail page with:
  - Full customer information display
  - Age calculation
  - Delete functionality
  - Navigation back to list
- ✅ Click-through navigation from list to detail
- ✅ Responsive design using Tailwind CSS
- ✅ Error handling
- ✅ Form validation

## 📝 API Documentation

Complete API documentation is provided in the separate artifact for MS Word.

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB is running
- Check MONGODB_URI in environment variables
- Verify network access to database

**Build Errors:**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

## 📚 GitHub Repository Setup

```bash
# Initialize git (if not already done)
git init

# Add files
git add .

# Commit
git commit -m "Add Customer Management Module"

# Create repository on GitHub, then:
git remote add myorigin https://github.com/Minn01/6612012_WAD_FINALS.git 
git push -u myorigin master
```

## 🎯 Submission Checklist

- [ ] All files created in correct directories
- [ ] API endpoints tested with curl
- [ ] UI fully functional (list, add, edit, delete, detail)
- [ ] Code pushed to GitHub repository
- [ ] Application deployed on VM at /fin-customer
- [ ] API documentation completed in MS Word
- [ ] MongoDB connection working
- [ ] All CRUD operations working

