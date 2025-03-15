import { Link, useLocation, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useAtom } from "jotai";
import { createBlogAtom } from "../hooks";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export const AppBar = ()=>{
    const location = useLocation();
    const pathname = location.pathname;
    console.log(pathname)
    return <div className="flex p-1 border-b border-slate-200 justify-between ">
        <Link to={"/blogs"} className="text-2xl font-bold cursor-pointer" style={{ color: 'black' }}> Medium </Link>
        <div className="flex  justify-center items-center ">
            <div className="mr-2">
                {pathname != "/blog/publish" ? <Link to={"/blog/publish"} className="flex pr-3" style={{ color: 'black' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write"><path fill="currentColor" 
                        d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path>
                        <path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2">
                        </path></svg>
                    <div className="pl-1"> Write</div>
                </Link>: <div>
                        <PublishButton></PublishButton>
                        
                    </div>}
            </div>
            <div>
                <Avatar authorName={localStorage.getItem("userName") || "An"} size="big"/>
            </div>
            
        </div>
        
    </div>
}

function PublishButton (){
    const [blogData] = useAtom(createBlogAtom);
    const navigate = useNavigate();
    
    return <div>
        <button
            onClick={async ()=>{
                const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, blogData, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }},
                   
                )
                navigate(`/blog/${res.data.id}`)
            }} 
            className="cursor-pointer rounded-full bg-gradient-to-tr from-green-600 to-green-400 py-1 px-2 border border-transparent text-center text-xs text-white transition-all shadow-sm hover:shadow-md focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            Publish
        </button>
    </div>
    
}