import { FaInstagram } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
import Button from "./Button";
import {useLocation, useNavigate } from "react-router-dom";


export default function Navbar({isLoggedIn,setIsLoggedIn, setAccessToken}:any) {

    const navigate = useNavigate();
    const Location = useLocation();

    useEffect(()=>{

        const params = new URLSearchParams(Location.search);
        const access_token = params.get("access_token");
        console.log(params);
        console.log(access_token);

        if(!access_token){
            // this means the user is not redirecting from the login page and we need to check the local storage for the logged in status
            const LoggedIn = localStorage.getItem("LoggedIn");
            if(LoggedIn === "true"){
                setIsLoggedIn((true));
                // this means the user is already logged in and we need to fetch the instagram profile details
                
            }
            else{
                navigate('/login')
                // user will login from there and at last he will be redirected to home page
            }
        }
 
        else{
            // this means the user is redirecting from the login page and we need to check the access token
            setIsLoggedIn(true);
            setAccessToken(access_token);
            localStorage.setItem("LoggedIn", "true");
        }

      
    },[Location.search])

    return (
        <div className="w-full h-10  p-4  flex items-center justify-between ">

            <div className="flex gap-2 h-10 items-center justify-between   ">
              <div className="h-10 flex items-center pt-1 justify-center ">
                 <FaInstagram  className="text-white text-xl   "/>
              </div>
              <h1 className="bg-gradient-to-r from-purple-600  to-purple-100 text-2xl font-bold bg-clip-text text-transparent  ">Instagram</h1>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button text={`${isLoggedIn ? "Log Out" : "Log In"}`} />
                <div className="h-10 w-10 rounded-full bg-gray-200 ">
                    <CgProfile className="h-full w-full text-gray-100 "/>
                </div>
            </div>

        </div>
    )
}