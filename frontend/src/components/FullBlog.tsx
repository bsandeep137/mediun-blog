import { useParams } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useBlog } from "../hooks";

export const FullBlog = ()=>{
    const {id} = useParams();
    const {blog} = useBlog({id})
    return <div className="grid grid-cols-16 ">
       
       <div className="col-span-12  ml-15 pr-10 pt-7">
            <div>
                <h1 className="font-sans font-bold text-3xl">
                    {blog?.title}</h1>
                <div className="text-xs text-slate-500 pt-1.5">
                Posted on {blog?.publishedOn}
                </div>
            </div>
            <p className="font-display text-sm text-slate-800 pt-4">
                {blog?.description}
            </p>
       </div>
       <div className="col-span-4  h-screen pt-7 pl-3"> 
            <div>
                <div className="text-xs text-slate-600 pt-1.5 font-semibold">Author</div>
                <div className="flex mt-2">
                    <div className="flex flex-col justify-center">
                        <Avatar authorName={blog?.author.name } size="big"/>
                    </div>
                    <div className="ml-2">
                        <div className="font-bold">{blog?.author.name  }</div>
                        <div className="text-blog font-serif text-slate-500">
                            Master of mirth, purveyor of puns, and the funniest person
                            in the kingdom
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
}