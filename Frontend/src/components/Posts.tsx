import { FaHeart, FaComment } from "react-icons/fa";

export default function Posts() {
  return (
    <div className="w-full h-fit bg-gray-500 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 p-4 rounded-2xl">
     
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative group h-80 bg-gray-300 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out rounded-2xl shadow-lg shadow-gray-800 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 text-white text-lg font-medium">
              <FaHeart  />
              <span>120</span>
            </div>
            <div className="flex items-center gap-1 text-white text-lg font-medium">
              <FaComment  />
              <span>34</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
