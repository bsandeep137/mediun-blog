import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { blogs } = useBlogs();
    return <div className="flex  justify-center mt-7">
        <div className="max-w-xl">
            {blogs.map(blog =>
                <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name}
                 title={blog.title} description={blog.description} publishedDate={ blog.publishedOn|| "Dec 3,2023" }/>
            )}
        </div>
    </div>

}