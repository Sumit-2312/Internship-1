import ProfileCard from "./components/profile-card"
import Navbar from './components/navbar'
import Content from './components/Content'
import {Routes,Route} from 'react-router-dom';
import InstagramPost from "./components/IndividualPost";
import InstagramLogin from "./LoginPage";
import Error from "./components/error-component";
import { useEffect, useState } from "react";

function App2(){

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(()=>{
    // navbar component will check if the user is logged in or not
    // if not then it will redirect to the login page
    
  })

  return(
    <div className="w-full max-w-[100vw]
    min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-t from-purple-700 to-black gap-10 overflow-x-hidden">
             <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken} setUserId={setUserId} />
             <div className="max-w-[900px] flex flex-col items-center justify-start gap-10">
               <ProfileCard/>
               <Content/>
             </div>
     </div>
  )
}

function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<App2 />} /> 
        <Route path="/post/:id" element={<InstagramPost/>} />
        <Route path="/login" element={<InstagramLogin/>}></Route>
        <Route path="/error" element={<Error/>}></Route>
    </Routes>
    </>
  )
}

export default App
