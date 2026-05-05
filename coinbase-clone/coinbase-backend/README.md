# Coinbase Clone Backend API

Backend API for the Coinbase Clone application built with Node.js, Express, and MongoDB.

## Setup Instructions

### 1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd coinbase-backend
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Create .env file
Copy `.env.example` to `.env` and fill in your configuration:
\`\`\`bash
cp .env.example .env
\`\`\`

Configure the following variables:
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRE`: Token expiration time (default: 7d)
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS

### 4. Start the server

**Development mode with auto-reload:**
\`\`\`bash
npm run dev
\`\`\`

**Production mode:**
\`\`\`bash
npm start
\`\`\`

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register a new user
- \`POST /api/auth/login\` - Login user
- \`POST /api/auth/logout\` - Logout user (protected)

### User Profile
- \`GET /api/user/profile\` - Get user profile (protected)
- \`PUT /api/user/profile\` - Update user profile (protected)

### Cryptocurrencies
- \`GET /api/crypto\` - Get all cryptocurrencies
- \`GET /api/crypto/gainers\` - Get top 10 gainers
- \`GET /api/crypto/new\` - Get 10 newest listings
- \`GET /api/crypto/:id\` - Get single cryptocurrency
- \`POST /api/crypto\` - Create new cryptocurrency (protected)
- \`PUT /api/crypto/:id\` - Update cryptocurrency (protected)
- \`DELETE /api/crypto/:id\` - Delete cryptocurrency (protected)

### Health Check
- \`GET /api/health\` - Server health check

## Database Schema

### User
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- timestamps

### Crypto
- name (String, required)
- symbol (String, required, unique)
- price (Number, required)
- image (String, required)
- change24h (Number, percentage change)
- marketCap (Number)
- volume24h (Number)
- timestamps

## Authentication

JWT tokens are stored in HTTP-only cookies for security. Include \`credentials: true\` in fetch requests from the frontend.

## Error Handling

All endpoints return standardized responses:

**Success:**
\`\`\`json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
\`\`\`

**Error:**
\`\`\`json
{
  "success": false,
  "message": "Error description"
}
\`\`\`
