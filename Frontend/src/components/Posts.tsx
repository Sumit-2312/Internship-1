import { FaHeart, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Posts() {

  const posts = [
    {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1601758123927-4e8f2b7f0a9d",
        likes: 120,
        comments: 34,
        caption: "This is a sample caption",
    },
    {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1601758123927-4e8f2b7f0a9d",
        likes: 12,
        comments: 2,
        caption: "This is a sample caption",
    },
    {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1601758123927-4e8f2b7f0a9d",
        likes: 111,
        comments: 28,
        caption: "This is a sample caption",
    },
    {
        id: 4,
        imageUrl: "https://images.unsplash.com/photo-1601758123927-4e8f2b7f0a9d",
        likes: 189,
        comments: 48,
        caption: "This is a sample caption",
    },
    {
        id: 5,
        imageUrl: "https://images.unsplash.com/photo-1601758123927-4e8f2b7f0a9d",
        likes: 190,
        comments: 90,
        caption: "This is a sample caption",
    },
    {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1601758123927-4e8f2b7f0a9d",
        likes: 300,
        comments: 39,
        caption: "This is a sample caption",
    }
  ]

  return (
    <div className="w-full h-fit bg-gray-500 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 p-4 rounded-2xl">
     
      {posts.map((post, i) => (
       <Link to={`/post/${post.id}`} >
          <div 
            key={post.id}
            className="relative group h-80 bg-gray-300 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl shadow-lg shadow-gray-800 overflow-hidden"
          >
              <img className="h-full w-full " src={post.imageUrl} alt="Image" />

            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-1 text-white text-lg font-medium">
                <FaHeart  />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-white text-lg font-medium">
                <FaComment  />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
       </Link>
      ))}

    </div>
  );
}

