# 📘 ThyroTerra Backend - Technical Documentation

## PEXELIS Challenge - Development Phase Submission

---

## 1. System Architecture

### Overview
ThyroTerra follows a **three-tier architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────┐
│           Frontend Layer (React)             │
│         (Not included in backend)            │
└─────────────────┬───────────────────────────┘
                  │ HTTP/REST API
┌─────────────────▼───────────────────────────┐
│        Business Logic Layer (Node.js)        │
│  ┌─────────────────────────────────────┐   │
│  │  Routes → Controllers → Services     │   │
│  │  ↓         ↓             ↓            │   │
│  │  Express   Validation   Business     │   │
│  │            Middleware   Logic        │   │
│  └─────────────────────────────────────┘   │
└─────────────────┬───────────────────────────┘
                  │ Prisma ORM
┌─────────────────▼───────────────────────────┐
│        Data Storage Layer (MySQL)            │
│  - Users & Authentication                    │
│  - Lands & Spots (Journey Map)              │
│  - Habits & Categories                       │
│  - Progress Tracking                         │
│  - Monthly Metrics                           │
└─────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Node.js v16+ | JavaScript runtime |
| Framework | Express.js | Web framework & routing |
| Database | MySQL 8+ | Relational data storage |
| ORM | Prisma | Type-safe database access |
| Authentication | JWT | Stateless auth tokens |
| Validation | express-validator | Input validation |
| Security | bcryptjs | Password hashing |

---

## 2. Data Models

### Entity-Relationship Diagram

```
┌─────────────┐         ┌──────────────┐
│    User     │────────▶│    Land      │
│             │         │              │
│ - id        │         │ - id         │
│ - username  │         │ - name       │
│ - password  │         │ - description│
│ - email     │         │ - isUnlocked │
│ - currentLand├────┐   └──────┬───────┘
│ - currentSpot│    │          │
└──────┬──────┘    │          │ 1:12
       │           │   ┌──────▼───────┐
       │           │   │    Spot      │
       │           └──▶│              │
       │               │ - id         │
       │               │ - landId     │
       │               │ - monthName  │
       │               │ - isUnlocked │
       │               └──────┬───────┘
       │                      │
       │ 1:N                  │
┌──────▼────────────┐         │
│  UserProgress     │◀────────┘
│                   │
│ - userId          │
│ - habitId         │◀────────┐
│ - spotId          │         │
│ - dayNumber       │         │
│ - status          │         │
│ - completedAt     │  ┌──────┴───────┐
└───────────────────┘  │    Habit     │
                       │              │
┌───────────────────┐  │ - id         │
│ HabitCategory     │◀─┤ - categoryId │
│                   │  │ - taskName   │
│ - id              │  │ - description│
│ - categoryName    │  └──────────────┘
│ - description     │
└───────────────────┘
```

### Key Tables

#### Users
Stores user authentication and current journey state.

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    current_land_id INT,
    current_spot_id INT,
    hearts_count INT DEFAULT 2,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### UserProgress
**The "Fixed Value" table** - Never deletes, only accumulates.

```sql
CREATE TABLE user_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    habit_id INT NOT NULL,
    spot_id INT NOT NULL,
    day_number INT NOT NULL,
    status ENUM('completed', 'missed'),
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (user_id, habit_id, spot_id, day_number)
);
```

---

## 3. Gamification Logic Implementation

### The "Fixed Progress" System

**Core Philosophy:** Progress accumulates, never resets.

```javascript
// ❌ Traditional Apps (Punishment Model)
if (missedDay) {
  streak = 0;           // Reset to zero
  progress = 0;         // Start over
  showNegativeFeedback(); // "You failed"
}

// ✅ ThyroTerra (Growth Model)
if (missedDay) {
  // Progress stays at current value
  // No data deletion
  // Show supportive message
  forestGuide.say("The forest is resting today");
}
```

### Gamification Mechanics

#### 1. Tree Growth Visualization

Implemented in `/utils/progressCalculator.js`:

```javascript
calculateTreeStage(completionPercentage) {
  if (completionPercentage >= 90) return 5; // Fully grown 🌳
  if (completionPercentage >= 70) return 4; // Mature 🌲
  if (completionPercentage >= 50) return 3; // Growing 🌿
  if (completionPercentage >= 25) return 2; // Young seedling
  return 1; // Seed
}
```

#### 2. Hearts System

Rewards consistency without punishing gaps:

```javascript
calculateHearts(streak, totalCompleted) {
  let hearts = 2; // Base
  
  // Streak bonuses
  if (streak >= 30) hearts += 3;
  else if (streak >= 14) hearts += 2;
  else if (streak >= 7) hearts += 1;
  
  // Achievement bonuses
  if (totalCompleted >= 100) hearts += 2;
  else if (totalCompleted >= 50) hearts += 1;
  
  return Math.min(hearts, 10); // Max 10
}
```

#### 3. Forest Guide Messages

Context-aware encouragement:

```javascript
getForestGuideMessage(completionPercentage, status) {
  if (status === 'missed') {
    return {
      type: 'gentle',
      message: 'The forest is resting today...',
      icon: '🌫️'
    };
  }
  
  if (completionPercentage === 100) {
    return {
      type: 'celebration',
      message: 'Territory unlocked! Your legacy grows.',
      icon: '🌳'
    };
  }
  
  // ... More contextual messages
}
```

---

## 4. Motivation Loop Implementation

### The Complete Cycle

```
┌──────────────────────────────────────────────┐
│                                              │
│  ACTION                                      │
│  User completes a habit                      │
│  └─▶ POST /api/habits/complete               │
│                                              │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│                                              │
│  FEEDBACK                                    │
│  - Habit marked as complete ✅               │
│  - Progress bar updates                      │
│  - Tree grows (stage increases)              │
│  - Forest Guide provides message             │
│  - Monthly stats recalculated                │
│                                              │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│                                              │
│  MOTIVATION                                  │
│  - Visual progress toward 30-day goal        │
│  - Encouraging message                       │
│  - Hearts reward (if milestone reached)      │
│  - Desire to "water" the forest tomorrow    │
│                                              │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│                                              │
│  REPEAT                                      │
│  - Return next day                           │
│  - See accumulated progress                  │
│  - Continue building legacy                  │
│  └─▶ Back to ACTION                          │
│                                              │
└──────────────────────────────────────────────┘
```

### API Implementation

```javascript
// habitController.js - completeHabit()
async completeHabit(req, res) {
  // 1. ACTION: Record completion
  const progress = await UserProgressService.completeHabit(
    userId, habitId, spotId, dayNumber
  );
  
  // 2. FEEDBACK: Calculate and update metrics
  await MonthlyProgressService.calculateMonthlyProgress(
    userId, spotId, monthIndex
  );
  
  // 3. Return motivating response
  return {
    success: true,
    message: 'Habit completed! Your forest grows.',
    data: {
      progress,
      treeStage: calculateTreeStage(completion),
      forestGuide: getForestGuideMessage(completion)
    }
  };
  
  // 4. REPEAT: Frontend shows updated state,
  //    user is motivated to return tomorrow
}
```

---

## 5. API Endpoints Reference

### Authentication Flow

```
1. Register
   POST /api/users/auth/register
   { username, email, password }
   ↓
   Returns: { user, token }

2. Login
   POST /api/users/auth/login
   { username, password }
   ↓
   Returns: { user, token }

3. Access Protected Routes
   GET /api/* 
   Header: Authorization: Bearer <token>
```

### Core User Flows

#### Flow 1: New User Onboarding
```
1. POST /api/users/auth/register
2. GET /api/lands (choose a land)
3. POST /api/lands/:landId/unlock
4. GET /api/spots/land/:landId (view spots)
5. POST /api/spots/:spotId/unlock (start Month 1)
```

#### Flow 2: Daily Habit Completion
```
1. GET /api/habits/today?spotId=X&dayNumber=Y
2. POST /api/habits/complete (for each habit)
3. GET /api/progress/stats?spotId=X (view progress)
4. GET /api/progress/monthly/:monthIndex (see tree growth)
```

#### Flow 3: Progress Tracking
```
1. GET /api/progress?spotId=X
2. GET /api/progress/streak?spotId=X
3. GET /api/spots/:spotId/progress
4. GET /api/progress/monthly (all months)
```

---

## 6. Security Measures

### Authentication
- **JWT tokens** with 7-day expiration
- **bcrypt** password hashing (10 rounds)
- **Bearer token** authorization header

### Input Validation
- **express-validator** for request validation
- Sanitized database queries via **Prisma ORM**
- Type-safe data access

### CORS Configuration
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
```

### Environment Variables
- Sensitive data in `.env` file
- Never committed to version control
- Production secrets separate from development

---

## 7. Data Persistence

### Prisma Migrations
All schema changes tracked:
```bash
npx prisma migrate dev --name add_user_hearts
```

### Backup Strategy
Recommended for production:
- Daily MySQL dumps
- Transaction logs for point-in-time recovery
- Replicated database for high availability

---

## 8. Performance Considerations

### Database Indexes
```sql
-- Optimized queries
CREATE INDEX idx_user_progress ON user_progress(user_id, spot_id, day_number);
CREATE INDEX idx_habits_category ON habits(category_id);
```

### Query Optimization
- Prisma `include` for eager loading
- Selective field retrieval with `select`
- Batch operations for seeding

---

## 9. Testing the Complete Flow

### Scenario: Sarah's First Week

**Day 1:**
```bash
# Register
curl -X POST /api/users/auth/register \
  -d '{"username":"sarah","password":"test123"}'
# Save token

# Choose Lavender Valley
curl -X POST /api/lands/1/unlock \
  -H "Authorization: Bearer TOKEN"

# Start Month 1
curl -X POST /api/spots/1/unlock \
  -H "Authorization: Bearer TOKEN"

# Get today's habits
curl /api/habits/today?spotId=1&dayNumber=1 \
  -H "Authorization: Bearer TOKEN"

# Complete "Take Levothyroxine"
curl -X POST /api/habits/complete \
  -d '{"habitId":1,"spotId":1,"dayNumber":1}' \
  -H "Authorization: Bearer TOKEN"

# Check progress
curl /api/progress/stats?spotId=1 \
  -H "Authorization: Bearer TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "completedTasks": 1,
      "daysActive": 1,
      "completionRate": 100
    },
    "forestGuide": {
      "message": "Welcome to your new territory!",
      "icon": "✨"
    },
    "treeStage": 1
  }
}
```

**Day 7 (Milestone):**
- Same flow, dayNumber=7
- Hearts increase from 2 to 3
- Tree stage updates based on completion %
- Forest Guide celebrates: "7-day streak! 🔥"

---

## 10. Deployment Checklist

### Pre-Deployment
- [ ] Set `NODE_ENV=production`
- [ ] Generate strong `JWT_SECRET`
- [ ] Configure production database
- [ ] Enable HTTPS
- [ ] Set up CORS for production domain
- [ ] Configure rate limiting
- [ ] Set up monitoring/logging

### Recommended Hosting
- **Backend**: Railway, Render, Heroku
- **Database**: PlanetScale, AWS RDS, Digital Ocean
- **Environment**: Node.js 16+, MySQL 8+

---

## 11. Future Enhancements

### Phase 2 Features
1. **Admin Dashboard** - Manage habits, FAQs, users
2. **Analytics** - Aggregate adherence data
3. **Notifications** - Remind users to take medication
4. **Social Features** - Share achievements
5. **Rewards System** - Unlock cosmetic forest elements

### Scalability
- Redis caching for frequently accessed data
- CDN for static assets
- Database sharding for large user bases
- Microservices architecture for complex features

---

## 12. Compliance with PEXELIS Requirements

### ✅ Mandatory Requirements

| Requirement | Implementation |
|-------------|----------------|
| User System | JWT authentication, profile management |
| Task Tracking | Complete CRUD for habits, view/mark complete/history |
| Gamification (3+) | 1. Lands/Spots 2. Tree Growth 3. Hearts 4. Forest Guide |
| Motivation Loop | Action→Feedback→Motivation→Repeat implemented |
| Progress Visualization | Monthly dashboard, statistics, insights |
| Data Persistence | MySQL + Prisma, survives sessions |
| Clean Architecture | Routes→Controllers→Services→Models |

### ✅ Must Work Features
- [x] Complete onboarding and define health goal
- [x] Complete a task and receive immediate feedback
- [x] Three gamification mechanics update correctly
- [x] View progress and history
- [x] Maintain state across sessions

### ✅ Design Implementation
- Loyal to original ThyroTerra concept
- "Fixed Progress" philosophy implemented
- No punishment for missed days
- Encouraging Forest Guide messages

---

## 13. Code Quality

### Standards Followed
- **RESTful** API design
- **Separation of concerns** (MVC pattern)
- **DRY principle** (reusable services)
- **Error handling** at every layer
- **Async/await** for clean asynchronous code

### Code Example - Service Pattern
```javascript
// Clean, reusable, testable
class UserProgressService {
  async completeHabit(userId, habitId, spotId, dayNumber) {
    // 1. Validate
    // 2. Check existing
    // 3. Create/update
    // 4. Return result
  }
}
```

---

## Contact & Support

For questions about this implementation:
- **Documentation**: See README.md
- **Quick Start**: See QUICKSTART.md
- **API Testing**: Import ThyroTerra_API_Collection.json

---

**ThyroTerra Backend - Built for PEXELIS Challenge 2025**
*Turning patient adherence into a meaningful journey.*
