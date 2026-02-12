// backend/config/prisma.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Use this for "type": "module"
export default prisma;