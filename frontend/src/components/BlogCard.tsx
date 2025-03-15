import { Link } from "react-router-dom"

interface BlogCardProps {
    id: string
    authorName: string,
    title: string,
    description: string,
    publishedDate: string,
    
}
export const BlogCard = ({ id, authorName, title, description, publishedDate }: BlogCardProps) => {
    return <Link to={`/blog/${id}`} style={{ color: 'black' }}>
        <div className="border-b border-gray-200 pt-5 pb-7">
            <div className="flex">
                <div className="flex flex-col justify-center">
                    <Avatar authorName={authorName} />
                </div>

                <div className="flex items-center pl-1 text-[.675rem] font-normal ">{authorName} </div>
                <div className="flex flex-col items-center justify-center pl-1"> <Dot /> </div>
                <div className="flex items-center pl-1 text-[0.675rem] font-normal text-slate-600">{publishedDate}</div>
            </div>

            <div className="flex flex-col">
                <div className=" text-lg font-semibold">
                    {title}
                </div>

                <div className="text-[0.75rem] font-serif font-thin text-slate-600">
                    {description.length > 100 ? description.slice(0,100)+ "..." : description}
                </div>
                <div>
                    <div className="text-slate-600 text-[0.6rem] mt-5">
                        {`${Math.ceil(description.length / 100)} minutes read`}
                    </div>
                </div>

            </div>

        </div>
    </Link>
}


export function Avatar({ authorName , size = "small" }: { authorName: string | undefined
    size?: string
 }) {
    return <span className={`inline-flex items-center justify-center size-${size === "small" ? 4 :6} rounded-full bg-gray-500 text-[.6rem] font-semibold text-white`}>
        {authorName? authorName[0]: ""}
    </span>
}


function Dot() {
    return <div className="h-1 w-1 rounded-full bg-slate-600"></div>
}