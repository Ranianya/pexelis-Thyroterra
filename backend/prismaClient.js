import { PrismaClient } from "@prisma/client";
import { createMySQLAdapter } from "@prisma/adapter-mysql";
import dotenv from "dotenv";

dotenv.config();

const adapter = createMySQLAdapter({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

export default prisma;
