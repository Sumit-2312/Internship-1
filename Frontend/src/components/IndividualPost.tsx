import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext } from '../PostContext/ContextProvider';

export default function InstagramPost() {
  const { id } = useParams();
  //@ts-ignore
  const { Posts } = useContext(PostContext);
    //@ts-ignore

  const post = Posts.find((p) => p.id === parseInt(id || ""));


  if (!post) {
    return <div className="text-white text-lg">Post not found</div>;
  }

  return (
    <div className="max-w-xl m-10 mx-auto bg-white shadow-md rounded w-full md:w-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 p-0.5">
            <div className="bg-white rounded-full p-0.5 h-full w-full">
              <img 
                src="/api/placeholder/40/40" 
                alt="Profile" 
                className="rounded-full h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-xs sm:text-sm">travel_photography</p>
            <p className="text-xs text-gray-500">Santorini, Greece</p>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="w-full">
        <img 
          src={post.imageUrl}
          alt="Post" 
          className="w-full object-cover" 
        />
      </div>

      {/* Action Buttons */}

      
      
    </div>
  );
}