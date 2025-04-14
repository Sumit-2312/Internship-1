import { FaInstagram } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../PostContext/ContextProvider";

export default function Navbar({ isLoggedIn, setIsLoggedIn, setAccessToken }) {
  const { ProfileInfo, loading, error } = useContext(PostContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("LoggedIn");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    setAccessToken("");
    navigate('/login');
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const access_token = params.get("token");

    if (access_token) {
      setAccessToken(access_token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("LoggedIn", "true");
      setIsLoggedIn(true);
      navigate(location.pathname, { replace: true });
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
  }, [location.search]);

  return (
    <div className="w-full p-4 flex items-center justify-between bg-gray-900">
      <div className="flex gap-2 h-10 items-center">
        <FaInstagram className="text-white text-xl" />
        <h1 className="bg-gradient-to-r from-purple-600 to-purple-100 text-2xl font-bold bg-clip-text text-transparent">
          Instagram
        </h1>
      </div>

      <div className="flex items-center justify-center gap-4">
        {loading && <span className="text-sm text-gray-300">Loading...</span>}
        {error && <span className="text-sm text-red-400">{error}</span>}

        {ProfileInfo && (
          <div className="text-white text-sm flex flex-col mr-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">@{ProfileInfo.username}</span>
              <span className="text-gray-300">{ProfileInfo.followers_count} followers</span>
              <span className="text-gray-300">{ProfileInfo.follows_count} following</span>
              <span className="text-gray-300">{ProfileInfo.media_count} posts</span>
            </div>
            {ProfileInfo.biography && (
              <p className="text-gray-400 text-xs mt-1">{ProfileInfo.biography}</p>
            )}
          </div>
        )}

        <Button onClick={handleLogout} text={`${isLoggedIn ? "Log Out" : "Log In"}`} />
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          {ProfileInfo?.profile_picture_url ? (
            <img
              src={ProfileInfo.profile_picture_url}
              alt="Profile"
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <CgProfile className="h-full w-full text-gray-100" />
          )}
        </div>
      </div>
    </div>
  );
}
