import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {createBlogInput, updateBlogInput} from "@sandy028/mediumcommonmodule"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('Authorization') || "";
    console.log(header);
    const token = header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    console.log("user-------"+user.id);
    if (user.id) {
        c.set("userId", user.id as string)
        await next();
    }
    else{
        c.status(403)
        return c.json({
            error: "unauthorized"
        })
    }
    
})



blogRouter.post('/', async(c) => {
    const client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success } = createBlogInput.safeParse(body)
        console.log("success------------", success)
        if(!success){
            c.status(411);
            return c.json({
                message : "Inputs are not correct"
            })
        }
    const authorId = c.get("userId");
    const res = await client.post.create({
        data:{
            title: body.title,
            description:  body.description,
            authorId
        }
    })

    return c.json({
        id:res.id
    })
})

blogRouter.put('/', async (c) => {
    const client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const {success } = updateBlogInput.safeParse(body)
    console.log("success------------", success)
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs are not correct"
        })
    }
    const res = await client.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            description:  body.description
        }
    })

    return c.json({
        id:res.id
    })
})
//needs pagination
blogRouter.get('/bulk', async(c)=>{
    const client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authorId = c.get("userId");
    console.log(authorId)

    try{
        const blogs = await client.post.findMany({
            where:{
                authorId
            }
        })
    
        console.log("blogs--------", blogs)
        return c.json({
            blogs
        })
    }
    catch(e){
        c.status(411)
        c.json({
            message : e
        })
    }

})

blogRouter.get('/:id', async(c) => {
    const client = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id =  c.req.param("id");

    console.log("id------------",id);
    try{
        const blog = await client.post.findFirst({
            where:{
                id
            }
        })
    
        return c.json({
            blog
        })
    }
    catch(e){
        c.status(411)
        c.json({
            message : e
        })
    }
})


