
import { createBlogAtom } from "../hooks"
import { useAtom } from "jotai"

export const CreateBlog = () => {
    const [blogData, setBlogData] = useAtom(createBlogAtom)

    return <div className="flex flex-col justify-center items-center mt-10">
        <div className=" w-lg ">
            <input onChange={(e)=>{
                console.log(blogData, "before")
                setBlogData({...blogData, title: e.target.value})
                console.log(blogData, "after")
            }} id="message"
                className="block  w-full text-Xl text-gray-900 bg-gray-50 rounded-lg outline-none border-none " 
                placeholder="Title">
                
            </input>
        </div>
        <div className="mt-2">
            <div className="relative  ">
                <textarea
                    onChange={(e)=>{
                        console.log(blogData, "before")
                        setBlogData({...blogData, description: e.target.value})
                        console.log(blogData, "after")}}
                    className="peer h-full min-h-[100px] w-lg resize-y rounded-[7px]   px-3 py-2.5 font-sans text-sm font-normal text-gray-900 outline outline-0"
                    placeholder=" "></textarea>
                <label
                    className="  before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-300 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before: before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1  after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md   after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-700 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900  peer-focus:before:border-l-2  peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-700">
                    Tell your story
                </label>
            </div>
        </div>
    </div>
}