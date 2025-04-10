import { FaHeart, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../PostContext/ContextProvider";


export default function Posts() {

  const {Posts} = useContext<any>(PostContext);
 

  return (
    <div className="w-full h-fit bg-gray-500 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 sm:p-4 py-6 px-0  rounded-2xl ">
     
      {Posts.map((Posts:any) => (
       <Link to={`/post/${Posts.id}`} >
          <div 
            key={Posts.id}
            className="relative group h-[450px] md:h-96 bg-gray-300 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out sm:w-full w-4/6 m-auto rounded-2xl shadow-lg shadow-gray-800 overflow-hidden"
          >
              <img className="h-full w-full " src={Posts.imageUrl} alt="Image" />

            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-1 text-white text-lg font-medium">
                <FaHeart  />
                <span>{Posts.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-white text-lg font-medium">
                <FaComment  />
                <span>{Posts.comments}</span>
              </div>
            </div>
          </div>
       </Link>
      ))}

    </div>
  );
}

