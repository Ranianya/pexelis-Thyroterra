# 🚀 ThyroTerra Backend - Quick Start Guide

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and update:
# - DATABASE_URL with your MySQL credentials
# - JWT_SECRET with a random string
```

### Step 3: Setup Database
```bash
# Create the database in MySQL
mysql -u root -p
> CREATE DATABASE thyroterra;
> exit;

# Run migrations
npx prisma migrate dev --name init

# Seed initial data
npm run seed
```

### Step 4: Start the Server
```bash
npm run dev
```

✅ Server running at `http://localhost:5000`

---

## 🧪 Test It Works

### 1. Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "ThyroTerra API is running"
}
```

### 2. Get Initial Data
```bash
# Get all lands
curl http://localhost:5000/api/lands

# Get all habit categories
curl http://localhost:5000/api/habits/categories

# Get FAQs
curl http://localhost:5000/api/faq
```

---

## 👤 Create Your First User

### Register
```bash
curl -X POST http://localhost:5000/api/users/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response!

### Login
```bash
curl -X POST http://localhost:5000/api/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

---

## 🎮 Complete Your First Habit

### 1. Get Today's Habits
```bash
curl -X GET "http://localhost:5000/api/habits/today?spotId=1&dayNumber=1" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 2. Complete a Habit
```bash
curl -X POST http://localhost:5000/api/habits/complete \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "habitId": 1,
    "spotId": 1,
    "dayNumber": 1
  }'
```

### 3. Check Your Progress
```bash
curl -X GET "http://localhost:5000/api/progress/stats?spotId=1" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📊 View Your Data with Prisma Studio

```bash
npx prisma studio
```

Opens a visual database browser at `http://localhost:5555`

---

## 🔍 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with auto-reload |
| `npm start` | Start production server |
| `npm run seed` | Populate database with initial data |
| `npx prisma studio` | Open database GUI |
| `npx prisma migrate dev` | Create new migration |
| `npx prisma migrate reset` | Reset database (WARNING: deletes all data) |
| `npx prisma generate` | Regenerate Prisma Client |

---

## 🎯 Key API Endpoints

### Public (No Auth)
- `GET /api/lands` - Get all lands
- `GET /api/habits/categories` - Get habit categories
- `GET /api/faq` - Get FAQs
- `POST /api/users/auth/register` - Register
- `POST /api/users/auth/login` - Login

### Protected (Requires Auth Token)
- `GET /api/users/profile` - Get user profile
- `GET /api/habits/today` - Get today's habits
- `POST /api/habits/complete` - Complete a habit
- `GET /api/progress/stats` - Get progress statistics
- `GET /api/spots/:spotId/progress` - Get spot progress

---

## 🐛 Troubleshooting

### Problem: "Database connection failed"
**Solution:** 
1. Check MySQL is running: `mysql -u root -p`
2. Verify DATABASE_URL in `.env`
3. Ensure database exists: `CREATE DATABASE thyroterra;`

### Problem: "Module not found"
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: "Prisma Client not generated"
**Solution:**
```bash
npx prisma generate
```

### Problem: "Port already in use"
**Solution:**
Change PORT in `.env` or kill the process:
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

---

## 📝 Seeded Data

After running `npm run seed`, you'll have:

**Habit Categories:**
1. Thyroid Treatment
2. Physical Activity
3. Hydration
4. Medical Check-ups
5. Nutrition
6. Mental Wellness

**Lands:**
1. Lavender Valley
2. Emerald Peak
3. Crystal Shore
4. Golden Meadow

Each land has 12 spots (months).

**Sample Habits:**
- Take Levothyroxine
- Wait 30-60 minutes before eating
- Morning walk (15 minutes)
- Drink 8 glasses of water
- Log mood and energy
- And more...

---

## 🔐 Authentication Flow

1. **Register:** Create account → Receive token
2. **Login:** Authenticate → Receive token
3. **Use Token:** Add to header: `Authorization: Bearer <token>`
4. **Token Expires:** After 7 days (default) → Login again

---

## 📱 Next Steps

1. ✅ Backend running
2. Connect your frontend
3. Implement the UI components
4. Test the gamification flow
5. Deploy to production

---

## 📚 Resources

- Full API Documentation: See `README.md`
- Database Schema: See `prisma/schema.prisma`
- Postman Collection: Import `ThyroTerra_API_Collection.json`

---

**Happy Coding! 🌳**

*For detailed documentation, see the main README.md*
