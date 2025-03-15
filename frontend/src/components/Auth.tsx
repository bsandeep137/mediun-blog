
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { SignUpInput } from "@sandy028/mediumcommonmodule"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config"

export const Auth = ({ type }: { type: string }) => {

    const navigate = useNavigate();
    const [postInputs, SetPostInputs] = useState<SignUpInput>({
        email: "",
        name: "",
        password: "",
        bio:""
    })

    async function SendRequest() {
       try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs);
        const jwt = response.data.jwt;
        const user = response.data.user;
        localStorage.setItem("token", "Bearer "+ jwt);
        localStorage.setItem("userName", user.name)
        navigate("/blogs");
       }
       catch(e){
        alert(e);
       }

    }

    return <div className="h-screen flex items-center justify-center">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-bold font-sans px-10 ">
                    {type === "signup" ? " Create an account" : "Login to account"}
                </div>
                <div className="text-sm text-slate-800 text-center ">
                    {type === "signup" ? " Already have an account?" : "Don't have an account?"}
                    <Link to={type === "signup" ? "/signin" : "/signup"} className="pl-2">
                        {type === "signup" ? "Login" : "Sign up"}
                    </Link>
                </div>

                {type === "signup" &&
                    <div>
                        <LabelledInput label="Username" placeholder="Enter your username" onChange={(e) => {
                            SetPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} />

                        <LabelledInput label="Bio" placeholder="Something about yourself" onChange={(e) => {
                            SetPostInputs({
                                ...postInputs,
                                bio: e.target.value
                            })
                        }} />
                    </div>
                }

                <LabelledInput label="Email" placeholder="Enter your email" onChange={(e) => {
                    SetPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }} />

                <LabelledInput label="Password" placeholder="Enter your password" type="password" onChange={(e) => {
                    SetPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} />

                <button onClick={SendRequest} type="button" className="mt-4 w-full py-3 px-4 inline-flex justify-center items-center 
                    gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-black text-white hover:bg-slate-800 
                    focus:outline-hidden focus:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none">
                    {type === "signup" ? "Sign up" : "Sign In"}
                </button>

            </div>

        </div>
    </div>

}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}


function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {

    return <div>
        <div className=" mt-4">
            <label className="block text-sm font-medium mb-2">{label}</label>
            <input onChange={onChange} type={type || "text"} className=" py-2.5 sm:py-3 px-4  w-full border border-slate-300 
                rounded-lg sm:text-sm   disabled:opacity-50 disabled:pointer-events-none"
                placeholder={placeholder} />
        </div>
    </div>
}