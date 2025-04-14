import { FaInstagram } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../PostContext/ContextProvider";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const { ProfileInfo, loading, error } = useContext(PostContext);
  const [authProcessing, setAuthProcessing] = useState(false);
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("LoggedIn");
      localStorage.removeItem("user_id");
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      navigate(`/error?error=${encodeURIComponent("Failed to log out properly")}`);
    }
  };

  useEffect(() => {
    const processAuthToken = async () => {
      setAuthProcessing(true);
      try {
        const params = new URLSearchParams(location.search);
        const access_token = params.get("token");

        if (access_token) {
          // Token present in URL, store it
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("LoggedIn", "true");
          setIsLoggedIn(true);
          
          // Remove token from URL for security
          navigate(location.pathname, { replace: true });
        } else {
          // No token in URL, check localStorage
          const storedToken = localStorage.getItem("access_token");
          const loggedIn = localStorage.getItem("LoggedIn");

          if (loggedIn === "true" && storedToken) {
            setIsLoggedIn(true);
          } else if (location.pathname !== '/login' && location.pathname !== '/error') {
            // Not logged in and not on login or error page, redirect to login
            navigate('/login');
          }
        }
      } catch (error) {
        console.error("Authentication processing error:", error);
        setAuthError("Authentication failed");
        navigate(`/error?error=${encodeURIComponent("Authentication processing failed")}`);
      } finally {
        setAuthProcessing(false);
      }
    };

    processAuthToken();
  }, [location.search, navigate, setIsLoggedIn, location.pathname]);

  return (
    <div className="w-full p-4 flex items-center justify-between bg-gray-900 rounded-lg">
      <div className="flex gap-2 h-10 items-center">
        <FaInstagram className="text-white text-xl" />
        <h1 className="bg-gradient-to-r from-purple-600 to-purple-100 text-2xl font-bold bg-clip-text text-transparent">
          Instagram
        </h1>
      </div>

      <div className="flex items-center justify-center gap-4">
        {authProcessing && <span className="text-sm text-gray-300">Authenticating...</span>}
        {loading && <span className="text-sm text-gray-300">Loading profile...</span>}
        {authError && <span className="text-sm text-red-400">{authError}</span>}
        {error && <span className="text-sm text-red-400">{error}</span>}

        {isLoggedIn && ProfileInfo && (
          <div className="text-white text-sm hidden md:flex flex-col mr-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">@{ProfileInfo.username}</span>
              <span className="text-gray-300">{ProfileInfo.followers_count} followers</span>
              <span className="text-gray-300">{ProfileInfo.follows_count} following</span>
            </div>
          </div>
        )}

        {isLoggedIn && <Button onClick={handleLogout} text="Log Out" />}
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          {ProfileInfo?.profile_picture_url ? (
            <img
              src={ProfileInfo.profile_picture_url}
              alt="Profile"
              className="h-full w-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.src = "/api/placeholder/100/100";
                e.currentTarget.alt = "Profile";
              }}
            />
          ) : (
            <CgProfile className="h-full w-full text-gray-100" />
          )}
        </div>
      </div>
    </div>
  );
}