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

  const carTag = await prisma.tag.upsert({
    where: { name: "Car" },
    update: {},
    create: { name: "Car" }
  });

  const aiTag = await prisma.tag.upsert({
    where: { name: "AI" },
    update: {},
    create: { name: "AI" }
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

  await prisma.bookmark.create({
    data: {
      url: 'https://www.porsche.com/international/models/911/911-gt3-rs/911-gt3-rs/',
      title: 'Porsche 911 GT3 RS',
      description: 'Details about Porsche 911 GT3 RS.',
      isFavourite: true,
      tags: {
        connect: [{ id: carTag.id }]
      }
    }
  });

  await prisma.bookmark.create({
    data: {
      url: 'https://web.dev/learn/ai',
      title: 'web.dev AI Course',
      description: ' An artificial intelligence course built for web developers.',
      isFavourite: true,
      tags: {
        connect: [{ id: techTag.id }, { id: learningTag.id }, { id: aiTag.id }]
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
