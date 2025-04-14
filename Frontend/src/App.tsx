import ProfileCard from "./components/profile-card"
import Navbar from './components/navbar'
import Content from './components/Content'
import {Routes, Route, Navigate} from 'react-router-dom';
import InstagramPost from "./components/IndividualPost";
import InstagramLogin from "./LoginPage";
import Error from "./components/error-component";
import { useEffect, useState } from "react";
import { PostContextProvider } from "./PostContext/ContextProvider";

function App2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [accessToken, setAccessToken] = useState("");
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Check local storage for login state
    const loggedIn = localStorage.getItem("LoggedIn");
    const storedToken = localStorage.getItem("access_token");
    
    if (loggedIn === "true" && storedToken) {
      setIsLoggedIn(true);
      // setAccessToken(storedToken);
    }
    setInitializing(false);
  }, []);

  if (initializing) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-t from-purple-700 to-black">
        <div className="text-white text-xl">Loading application...</div>
      </div>
    );
  }

  // Protect routes if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full max-w-[100vw]
    min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-t from-purple-700 to-black gap-10 overflow-x-hidden">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />
      <div className="max-w-[900px] flex flex-col items-center justify-start gap-10 w-full">
        <ProfileCard />
        <Content />
      </div>
    </div>
  )
}

function App() {
  return (
    <PostContextProvider>
      <Routes>
        <Route path="/" element={<App2 />} /> 
        <Route path="/post/:id" element={<InstagramPost />} />
        <Route path="/login" element={<InstagramLogin />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error?error=Page not found" />} />
      </Routes>
    </PostContextProvider>
  )
}

export default App