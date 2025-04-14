import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../PostContext/ContextProvider";
import { FaArrowLeft, FaHeart, FaComment, FaShare } from "react-icons/fa";
import axios from "axios";

export default function InstagramPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Posts, loading, error } = useContext(PostContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate("/error?error=Post not found");
      return;
    }

    if (Posts && Posts.length > 0) {
      const foundPost = Posts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        fetchComments(foundPost.id);
      } else {
        navigate("/error?error=Post not found");
      }
    } else if (!loading && !error) {
      navigate("/error?error=No posts available");
    }
  }, [id, Posts, loading, error, navigate]);

  const fetchComments = async (mediaId) => {
    setLoadingComments(true);
    setCommentError(null);
    
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Not authenticated");
      }

      const response = await axios.get(`/api/user/comments`, {
        params: {
          mediaId,
          accessToken
        }
      });

      if (response.data?.comments) {
        setComments(response.data.comments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      setCommentError("Failed to load comments");
    } finally {
      setLoadingComments(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-purple-700 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-purple-700 to-black flex items-center justify-center">
        <div className="text-red-300 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-purple-700 to-black flex items-center justify-center">
        <div className="text-white text-xl">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-700 to-black p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 flex items-center justify-between bg-gray-900">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center text-gray-300 hover:text-white"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h2 className="text-white font-medium">Instagram Post</h2>
        </div>

        <div className="md:flex">
          {/* Post Image/Video */}
          <div className="md:w-2/3 relative bg-black flex items-center justify-center">
            {post.media_type === "VIDEO" ? (
              <video 
                className="w-full max-h-[80vh] object-contain"
                src={post.media_url}
                controls
                poster={post.thumbnail_url}
                onError={(e) => {
                  const errorDiv = document.createElement('div');
                  errorDiv.className = "w-full h-64 flex items-center justify-center text-red-300";
                  errorDiv.innerText = "Video not available";
                  //@ts-ignore
                  e.target.parentNode.replaceChild(errorDiv, e.target);
                }}
              />
            ) : (
              <img 
                className="w-full max-h-[80vh] object-contain" 
                src={post.media_url} 
                alt={post.caption || "Instagram post"} 
                onError={(e) => {
                  e.currentTarget.src = "/api/placeholder/600/600";
                  e.currentTarget.alt = "Image not available";
                }}
              />
            )}
          </div>

          {/* Comment Section */}
          <div className="md:w-1/3 bg-gray-700 p-4 flex flex-col h-full">
            {/* Caption */}
            <div className="mb-4 pb-4 border-b border-gray-600">
              <p className="text-white">{post.caption || "No caption"}</p>
              <div className="mt-2 text-gray-400 text-sm">
                {new Date(post.timestamp).toLocaleString()}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mb-4">
              <button className="text-red-400 flex items-center gap-1">
                <FaHeart /> {post.like_count || 0}
              </button>
              <button className="text-blue-400 flex items-center gap-1">
                <FaComment /> {post.comments_count || 0}
              </button>
              <button className="text-green-400 flex items-center gap-1">
                <FaShare />
              </button>
            </div>

            {/* Comments list */}
            <div className="flex-grow overflow-y-auto">
              <h3 className="text-white font-medium mb-2">Comments</h3>
              
              {loadingComments && (
                <div className="text-gray-300 text-center py-4">Loading comments...</div>
              )}
              
              {commentError && (
                <div className="text-red-300 text-center py-4">{commentError}</div>
              )}
              
              {!loadingComments && !commentError && comments.length === 0 && (
                <div className="text-gray-300 text-center py-4">No comments yet</div>
              )}
              
              {comments.map(comment => (
                <div key={comment.id} className="bg-gray-800 rounded p-3 mb-2">
                  <div className="font-medium text-blue-300">{comment.username}</div>
                  <p className="text-white">{comment.text}</p>
                  <div className="text-xs text-gray-400">
                    {new Date(comment.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}