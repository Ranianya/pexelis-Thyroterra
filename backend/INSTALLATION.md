# 🔧 Installation Guide for Existing Project

## Your Current Setup
You already have:
- ✅ `package.json` with Express and Prisma
- ✅ Project structure initialized
- ✅ `type: "commonjs"` configured

## Step-by-Step Integration

### 1. Add Missing Dependencies

Update your existing `package.json` to add these dependencies:

```bash
# Install all new dependencies at once
npm install bcryptjs cors express-validator jsonwebtoken morgan

# Install dev dependencies
npm install --save-dev nodemon
```

Or manually add to your `package.json`:

```json
{
  "dependencies": {
    "@prisma/client": "^7.3.0",
    "express": "^5.2.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "dotenv": "^17.2.4",
    "prisma": "^7.4.0",
    "nodemon": "^3.0.2"
  }
}
```

Then run:
```bash
npm install
```

### 2. Add NPM Scripts

Update the `"scripts"` section in your `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "prisma:generate": "npx prisma generate",
    "prisma:migrate": "npx prisma migrate dev",
    "prisma:studio": "npx prisma studio",
    "seed": "node prisma/seed.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### 3. Copy Backend Files to Your Project

Copy all folders from the `thyroterra-backend` folder to your project's `backend` directory:

```
your-project/
└── backend/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── utils/
    ├── prisma/
    ├── server.js
    ├── .env.example
    └── .gitignore
```

**Important files to copy:**
- `prisma/schema.prisma` - Database schema
- `prisma/seed.js` - Initial data seeder
- `server.js` - Main application file
- All folders (config, controllers, middlewares, models, routes, utils)
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules

### 4. Environment Setup

Create a `.env` file in your `backend` folder:

```bash
# In your backend directory
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
# Database Connection
DATABASE_URL="mysql://root:yourpassword@localhost:3306/thyroterra"

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_random_string_change_this
JWT_EXPIRE=7d

# CORS (your frontend URL)
CORS_ORIGIN=http://localhost:3000
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Database Setup

**A. Create MySQL Database**

```bash
# Login to MySQL
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE thyroterra;
exit;
```

**B. Update Prisma Schema (if needed)**

The schema is already configured for MySQL. Just verify the `datasource db` in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

**C. Generate Prisma Client**

```bash
npx prisma generate
```

**D. Run Database Migrations**

```bash
npx prisma migrate dev --name init
```

This creates all tables in your database.

**E. Seed Initial Data**

```bash
npm run seed
```

This populates:
- 6 habit categories
- 12 sample habits
- 4 lands (Lavender Valley, Emerald Peak, etc.)
- 48 spots (12 per land)
- 6 sample FAQs

### 6. Verify Installation

**A. Check Prisma Schema**
```bash
npx prisma studio
```
Opens a GUI at `http://localhost:5555` to browse your database.

**B. Start the Server**
```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║   🌳 ThyroTerra API Server Running    ║
║                                        ║
║   Port: 5000                          ║
║   Environment: development            ║
╚════════════════════════════════════════╝
✅ Database connected successfully
```

**C. Test Health Endpoint**
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "ThyroTerra API is running",
  "timestamp": "2024-02-12T..."
}
```

### 7. Your Project Structure

After integration, your backend should look like:

```
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── habitController.js
│   ├── userController.js
│   ├── progressController.js
│   ├── landSpotController.js
│   └── faqController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Habit.js
│   ├── HabitCategory.js
│   ├── Land.js
│   ├── Spot.js
│   ├── UserProgress.js
│   ├── MonthlyProgress.js
│   └── FAQ.js
├── routes/
│   ├── habitRoutes.js
│   ├── userRoutes.js
│   ├── progressRoutes.js
│   ├── landSpotRoutes.js
│   └── faqRoutes.js
├── utils/
│   └── progressCalculator.js
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── node_modules/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
├── README.md
├── QUICKSTART.md
└── TECHNICAL_DOCUMENTATION.md
```

### 8. Common Issues & Solutions

**Issue: "Cannot find module '@prisma/client'"**
```bash
npx prisma generate
```

**Issue: "Database connection failed"**
- Check MySQL is running: `mysql -u root -p`
- Verify DATABASE_URL in `.env`
- Ensure database exists: `SHOW DATABASES;`

**Issue: "Port 5000 already in use"**
- Change PORT in `.env` to 5001 or another available port
- Or kill the process using port 5000

**Issue: Migration errors**
```bash
# Reset and start fresh (WARNING: deletes all data)
npx prisma migrate reset
npx prisma migrate dev --name init
npm run seed
```

### 9. Next Steps

**A. Test the API**

Use the Postman collection:
```bash
# Import: ThyroTerra_API_Collection.json
```

Or test with curl:
```bash
# Register a user
curl -X POST http://localhost:5000/api/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'

# Get all lands
curl http://localhost:5000/api/lands

# Get habits
curl http://localhost:5000/api/habits
```

**B. Connect Your Frontend**

Update your frontend's API base URL to:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**C. Review Documentation**
- `README.md` - Full API documentation
- `QUICKSTART.md` - Quick reference
- `TECHNICAL_DOCUMENTATION.md` - Architecture details

### 10. Development Workflow

```bash
# Daily development
npm run dev          # Start server with auto-reload

# View database
npx prisma studio    # Open database GUI

# Make schema changes
# 1. Edit prisma/schema.prisma
# 2. Run migration:
npx prisma migrate dev --name add_new_field

# Reset database (if needed)
npx prisma migrate reset
npm run seed
```

### 11. Production Deployment

When ready to deploy:

1. Set environment variables:
```env
NODE_ENV=production
DATABASE_URL="your_production_db_url"
JWT_SECRET="strong_random_secret"
CORS_ORIGIN="https://your-frontend-domain.com"
```

2. Build and run:
```bash
npm install --production
npx prisma generate
npx prisma migrate deploy
npm start
```

---

## ✅ Installation Complete!

You now have a fully functional backend with:
- ✅ User authentication (JWT)
- ✅ Habit tracking system
- ✅ Gamification mechanics
- ✅ Progress tracking
- ✅ RESTful API
- ✅ Database persistence

**Start developing:**
```bash
npm run dev
```

**Test the API:**
Visit `http://localhost:5000/health`

**Need help?** Check README.md or QUICKSTART.md

---

**Happy coding! 🚀**
