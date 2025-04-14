import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const  PostContext = createContext(null);

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
}

const ContextProvider = ({ children }: { children: any }) => {
  const [Posts, setPosts] = useState<Post[]>([]);
  const [ProfileInfo, setProfileInfo] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstagramData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const userId = localStorage.getItem("user_id");

      if (!accessToken) return;

      setLoading(true);
      setError(null);

      try {
        let currentUserId = userId;

        if (!currentUserId) {
          const meResponse = await axios.get(`https://graph.facebook.com/v18.0/me`, {
            params: {
              fields: 'id',
              access_token: accessToken,
            },
          });

          if (meResponse.data?.id) {
            localStorage.setItem("user_id", meResponse.data.id);
            currentUserId = meResponse.data.id;
          }
        }

        const profileRes = await axios.get(`/api/user/profile-info`, {
          params: {
            igUserId: currentUserId,
            pageAccessToken: accessToken,
          },
        });

        setProfileInfo(profileRes.data.profileInfo);

        const mediaRes = await axios.get(`/api/user/media-info`, {
          params: {
            igUserId: currentUserId,
            pageAccessToken: accessToken,
          },
        });

        setPosts(mediaRes.data.mediaInfo);
      } catch (err: any) {
        console.error("Error fetching Instagram data:", err);

        const errorMessage = err.response?.data?.error?.message || "Failed to fetch Instagram data";

        // Redirect to /error with the error message
        navigate("/error", {
          state: {
            error: errorMessage
          }
        });

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    const isLoggedIn = localStorage.getItem("LoggedIn") === "true";
    if (isLoggedIn) fetchInstagramData();
  }, [navigate]);

  return (
    //@ts-ignore
    <PostContext.Provider value={{ Posts, setPosts, ProfileInfo, setProfileInfo, loading, error }}>
      {children}
    </PostContext.Provider>
  );
};

export default ContextProvider;
