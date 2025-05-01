import { PrismaClient } from '@prisma/client';
import app from './app';

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

async function startServer() {
  try {
    
    await prisma.$connect();
    console.log('Connected to PostgreSQL database via Prisma');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}


startServer();


process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});