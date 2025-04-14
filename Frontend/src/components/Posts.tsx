import { FaHeart, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../PostContext/ContextProvider";

export default function Posts() {
  const { Posts, loading, error } = useContext(PostContext);

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-500 flex items-center justify-center rounded-2xl">
        <div className="text-white text-xl animate-pulse">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 bg-gray-500 flex items-center justify-center rounded-2xl">
        <div className="text-red-300 text-xl">Unable to load posts</div>
      </div>
    );
  }

  if (!Posts || Posts.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-500 flex items-center justify-center rounded-2xl">
        <div className="text-white text-xl">No posts available</div>
      </div>
    );
  }

  return (
    <div className="w-full h-fit bg-gray-500 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 sm:p-4 py-6 px-0 rounded-2xl">
      {Posts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <div
            className="relative group h-[450px] md:h-96 bg-gray-300 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out sm:w-full w-5/6 m-auto rounded-2xl shadow-lg shadow-gray-800 overflow-hidden"
          >
            {post.media_type === "VIDEO" ? (
              <video 
                className="h-full w-full object-cover"
                src={post.media_url}
                // alt={post.caption || "Instagram post"}
                poster={post.thumbnail_url || "/api/placeholder/400/400"}
                onError={(e) => {
                  e.currentTarget.poster = "/api/placeholder/400/400";
                }}
              />
            ) : (
              <img 
                className="h-full w-full object-cover" 
                src={post.media_url} 
                alt={post.caption || "Instagram post"} 
                onError={(e) => {
                  e.currentTarget.src = "/api/placeholder/400/400";
                  e.currentTarget.alt = "Image not available";
                }}
              />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
              <p className="text-sm truncate">{post.caption || "No caption"}</p>
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-1 text-white text-lg font-medium">
                <FaHeart />
                <span>{post.like_count || 0}</span>
              </div>
              <div className="flex items-center gap-1 text-white text-lg font-medium">
                <FaComment />
                <span>{post.comments_count || 0}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}