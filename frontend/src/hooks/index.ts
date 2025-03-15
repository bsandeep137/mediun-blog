import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { atom} from "jotai"

interface Blog {
    title: string,
    description: string,
    id: string,
    author: {
        name: string
    },
    publishedOn: string
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")

            }
        }).then(res => {
            setBlogs(res.data.blogs);
            setLoading(false);
        }

        )
    }, [])
    return { loading, blogs }
}

export const useBlog = ({id}:{id:string| undefined}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")

            }
        }).then(res => {
            setBlog(res.data.blog);
            setLoading(false);
        }

        )
    }, [])
    return { loading, blog }
}

export const createBlogAtom = atom( {
        title: "",
        description: ""
    }
)