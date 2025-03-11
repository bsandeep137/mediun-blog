import { PrismaClient } from '@prisma/client/extension';
import { Hono } from 'hono';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
const app = new Hono();
app.post('/api/v1/signup', async (c) => {
    const client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    console.log(body);
    const user = await client.user.create({
        data: {
            email: body.username,
            password: body.password
        }
    });
    const token = sign({ id: user.id }, "secret");
    console.log(user, token);
    return c.json({
        jwt: token
    });
});
app.get('/api/v1/signin', (c) => {
    return c.text('Hello Hono!');
});
app.post('/api/v1/blog', (c) => {
    return c.text('Hello Hono!');
});
app.put('/api/v1/blog', (c) => {
    return c.text('Hello Hono!');
});
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
export default app;
