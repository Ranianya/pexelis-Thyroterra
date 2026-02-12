import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  adapter: {
    provider: "mysql",
    url: "mysql://root:isill3@localhost:3306/thyroterra_db",
  },
});
