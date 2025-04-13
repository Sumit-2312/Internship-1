import { FaInstagram } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
import Button from "./Button";
import {useLocation, useNavigate } from "react-router-dom";



export default function Navbar({isLoggedIn,setIsLoggedIn, setAccessToken}:any) {


    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("LoggedIn");
        setIsLoggedIn(false);
        setAccessToken("");
        window.location.href = '/login';  // or navigate('/login')
      };
      
    

    const navigate = useNavigate();
    const Location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(Location.search);
        const access_token = params.get("token");
      
        if (access_token) {
          // From backend redirect
          setAccessToken(access_token);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("LoggedIn", "true");
          setIsLoggedIn(true);
        } else {
          const storedToken = localStorage.getItem("access_token");
          const loggedIn = localStorage.getItem("LoggedIn");
      
          if (loggedIn === "true" && storedToken) {
            setAccessToken(storedToken);
            setIsLoggedIn(true);
          } else {
            navigate('/login');
          }
        }
      }, [Location.search]);
      
    return (
        <div className="w-full h-10  p-4  flex items-center justify-between ">

            <div className="flex gap-2 h-10 items-center justify-between   ">
              <div className="h-10 flex items-center pt-1 justify-center ">
                 <FaInstagram  className="text-white text-xl   "/>
              </div>
              <h1 className="bg-gradient-to-r from-purple-600  to-purple-100 text-2xl font-bold bg-clip-text text-transparent  ">Instagram</h1>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button onClick={handleLogout} text={`${isLoggedIn ? "Log Out" : "Log In"}`} />
                <div className="h-10 w-10 rounded-full bg-gray-200 ">
                    <CgProfile className="h-full w-full text-gray-100 "/>
                </div>
            </div>

        </div>
    )
}