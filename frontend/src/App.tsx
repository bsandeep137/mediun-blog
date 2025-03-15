import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import { SignUp } from './routes/SignUp'
import { SignIn } from './routes/SignIn'
import { Blogs } from './routes/Blogs'
import { AppBar } from "./components/AppBar"
import { Blog } from "./routes/Blog"
import { RecoilRoot } from "recoil"
import { CreateBlog } from "./routes/CreateBlog"

function App() {
  return (
    <>
      <RecoilRoot>
        
        <BrowserRouter>
         <AppBar></AppBar>
          <Routes>
            <Route path="/signup" element={<SignUp/>} ></Route>
            <Route path="/signin" element={<SignIn/>} ></Route>
            <Route path="/blogs" element={<Blogs/>}  ></Route>
            <Route path="/blog/:id" element={<Blog/>}  ></Route>
            <Route path = "/blog/publish" element={<CreateBlog></CreateBlog>}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
