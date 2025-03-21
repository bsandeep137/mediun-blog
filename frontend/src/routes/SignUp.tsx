import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const SignUp = ()=>{

    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <Auth type="signup"/>
            <div className="invisible lg:visible">
                <Quote/>
            </div>
        </div>
    </div>

}