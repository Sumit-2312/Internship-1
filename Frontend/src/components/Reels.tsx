// Reels.jsx
import { PiFilmReelLight } from "react-icons/pi";
import Button from "./Button";
import { useContext } from "react";
import { PostContext } from "../PostContext/ContextProvider";

export default function Reels() {
  const { Posts, loading, error } = useContext(PostContext);

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-500 flex items-center justify-center rounded-2xl">
        <p className="text-white text-xl">Loading reels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 bg-gray-500 flex items-center justify-center rounded-2xl">
        <p className="text-white text-xl">Error loading reels: {error}</p>
      </div>
    );
  }

  const reels = Posts?.filter((post) => post?.media_type === "VIDEO") || [];

  return (
    <div className="w-full h-fit bg-gray-500 rounded-2xl flex flex-col items-center justify-center gap-3 p-10 text-white">
      {reels && reels.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {reels.map((reel) => (
              <video
                key={reel.id}
                src={reel.media_url}
                controls
                className="rounded-xl shadow-lg w-full max-h-[400px] object-cover"
                onError={(e) => {
                  const element = e.target;
                  //@ts-ignore
                  const parent = element.parentElement;
                  if (parent) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = "bg-red-500 text-white p-4 rounded-xl text-center";
                    errorMsg.innerText = "Video not available";
                    parent.replaceChild(errorMsg, element);
                  }
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <PiFilmReelLight className="text-gray-300 text-4xl" />
          <h4 className="font-bold text-2xl">No reels to display yet</h4>
          <Button text={"Create your first reel"} />
        </>
      )}
    </div>
  );
}