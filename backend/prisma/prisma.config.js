// backend/prisma/prisma.config.js
const { defineConfig } = require("@prisma/config");
const path = require("path");

// Manually load .env from the parent directory (backend/.env)
require("dotenv").config({ path: path.join(__dirname, "../.env") });

module.exports = defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});