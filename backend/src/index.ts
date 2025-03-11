import { PrismaClient } from '@prisma/client/edge'
import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/userRoutes'
import { blogRouter } from './routes/blogRouter'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()

app.route('/api/v1/user', userRouter);
app.route ('/api/v1/blog', blogRouter);

export default app
