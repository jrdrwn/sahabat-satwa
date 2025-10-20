import prisma from '@db';
import { Hono } from 'hono';
import { type JwtVariables } from 'hono/jwt';
import { handle } from 'hono/vercel';

export type Variables = JwtVariables;
const app = new Hono<{ Variables: Variables }>().basePath('/api');

app.get('/', (c) => c.json({ message: 'Hello' }));

app.get('/vet', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM vet`;
  return c.json({ data });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
