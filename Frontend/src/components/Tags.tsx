// Tags.jsx
import { IoPricetagSharp } from "react-icons/io5";
import Button from "./Button";
import { useContext } from "react";
import { PostContext } from "../PostContext/ContextProvider";

export default function Tags() {
  const { Posts, loading, error } = useContext(PostContext);

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-500 flex items-center justify-center rounded-2xl">
        <p className="text-white text-xl">Loading tagged posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 bg-gray-500 flex items-center justify-center rounded-2xl">
        <p className="text-white text-xl">Error loading tagged posts: {error}</p>
      </div>
    );
  }

  // For demonstration, let's assume tagged posts are filtered by some criteria
  // In a real app, you might have a different property to identify tagged posts
  const taggedPosts = Posts?.filter((post) => post?.tags?.length > 0) || [];

  return (
    <div className="w-full h-fit bg-gray-500 rounded-2xl flex flex-col items-center justify-center gap-3 p-10 text-white">
      {taggedPosts && taggedPosts.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {taggedPosts.map((post) => (
              <div 
                key={post.id} 
                className="relative rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={post.media_url}
                  alt={post.caption || "Tagged post"}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/api/placeholder/400/400";
                    e.currentTarget.alt = "Image not available";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                  <p className="text-sm">{post.caption || "No caption"}</p>
                  <div className="flex flex-wrap mt-1">
                    {post.tags?.map((tag, index) => (
                      <span key={index} className="text-xs bg-purple-600 rounded px-2 py-1 mr-1 mt-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <IoPricetagSharp className="text-gray-300 text-4xl -rotate-90" />
          <h4 className="font-bold text-2xl">No tagged posts to display yet</h4>
          <Button text={"Create your first tagged post"} />
        </>
      )}
    </div>
  );
}