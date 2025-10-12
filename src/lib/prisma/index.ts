import { PrismaClient } from "@prisma/client";
import { env } from "@/env/index.js";

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'production' 
        ? ['error', 'warn']
        : ['query', 'error', 'warn', 'info']
})

// Teste de conexão
prisma.$connect()
    .then(() => {
        console.log('✅ Database connected successfully');
    })
    .catch((error) => {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    })

