import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const techTag = await prisma.tag.upsert({
    where: { name: "Tech" },
    update: {},
    create: { name: "Tech" }
  });

  const learningTag = await prisma.tag.upsert({
    where: { name: "Learning" },
    update: {},
    create: { name: "Learning" }
  });

  await prisma.bookmark.create({
    data: {
      url: 'https://nextjs.org',
      title: 'Next.js Documentation',
      description: 'The framework for production-grade React apps.',
      isFavourite: true,
      tags: {
        connect: [{ id: techTag.id }, { id: learningTag.id }]
      }
    }
  });

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
