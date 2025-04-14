import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PostContext = createContext<any>(null);

interface Post {
  id: string;
  media_url: string;
  caption?: string;
  like_count?: number;
  comments_count?: number;
  media_type?: string;
  timestamp: string;
}

interface Profile {
  username: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  biography: string;
  profile_picture_url: string;
  name?: string;
}

export const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [Posts, setPosts] = useState<Post[]>([]);
  const [ProfileInfo, setProfileInfo] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstagramData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const loggedIn = localStorage.getItem("LoggedIn");
      
      if (!accessToken || loggedIn !== "true") {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Step 1: Verify the token and get user ID if not already stored
        let currentUserId = localStorage.getItem("user_id");

        if (!currentUserId) {
          try {
            const meResponse = await axios.get(`https://graph.facebook.com/v18.0/me`, {
              params: {
                fields: 'id',
                access_token: accessToken,
              },
            });

            if (meResponse.data?.id) {
              localStorage.setItem("user_id", meResponse.data.id);
              currentUserId = meResponse.data.id;
            } else {
              throw new Error("Could not retrieve user ID");
            }
          } catch (userIdError: any) {
            console.error("Failed to fetch user ID:", userIdError);
            throw new Error("Authentication failed: Unable to verify your identity");
          }
        }

        // Step 2: Get profile information
        try {
          const profileRes = await axios.get(`/api/user/profile-info`, {
            params: {
              igUserId: currentUserId,
              pageAccessToken: accessToken,
            },
          });

          if (profileRes.data?.profileInfo) {
            setProfileInfo(profileRes.data.profileInfo);
          } else {
            throw new Error("Invalid profile data received");
          }
        } catch (profileError: any) {
          console.error("Profile fetch error:", profileError);
          throw new Error(profileError.response?.data?.error || "Failed to load profile information");
        }

        // Step 3: Get media posts
        try {
          const mediaRes = await axios.get(`/api/user/media-info`, {
            params: {
              igUserId: currentUserId,
              pageAccessToken: accessToken,
            },
          });

          if (mediaRes.data?.mediaInfo?.data) {
            setPosts(mediaRes.data.mediaInfo.data);
          } else {
            setPosts([]);
            console.warn("No media posts found or invalid format");
          }
        } catch (mediaError: any) {
          console.error("Media fetch error:", mediaError);
          // We'll continue even if media fetch fails, just with empty posts
          setPosts([]);
          console.warn("Could not load posts, but profile loaded successfully");
        }
      } catch (err: any) {
        console.error("Error in Instagram data fetching process:", err);
        const errorMessage = err.message || "Failed to fetch Instagram data";
        setError(errorMessage);
        
        // Redirect to error page with the message
        navigate(`/error?error=${encodeURIComponent(errorMessage)}`, { replace: true });
        
        // If authentication error, clear credentials
        if (errorMessage.includes("Authentication failed") || 
            err.response?.status === 401 || 
            err.response?.status === 403) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("LoggedIn");
          localStorage.removeItem("user_id");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramData();
  }, [navigate]);

  const contextValue = {
    Posts,
    setPosts,
    ProfileInfo,
    setProfileInfo,
    loading,
    error
  };

  return (
    <PostContext.Provider value={contextValue}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;