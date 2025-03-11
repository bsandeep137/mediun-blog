import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify, decode } from "hono/jwt"
import {signInInput, signUpInput}  from "@sandy028/mediumcommonmodule"


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
    const client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success } = signUpInput.safeParse(body)
    console.log("success------------", success)
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs are not correct"
        })
    }
    const user = await client.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({
        jwt: token
    })
})

userRouter.post('/signin', async (c) => {
    const client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success } = signInInput.safeParse(body)
    console.log("success------------", success)
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs are not correct"
        })
    }
    const user = await client.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });
    if (!user) {
        c.status(403);
        return c.json({
            error: "user not found"
        })
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
        jwt
    })
})