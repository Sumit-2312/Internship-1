import { PiFilmReelLight } from "react-icons/pi";
import Button from "./Button";
import { useContext } from "react";
import { PostContext } from "../PostContext/ContextProvider";

export default function Reels() {
  const { Posts } = useContext<any>(PostContext);

  const reels = Posts?.filter((post: any) => post.media_type === "VIDEO");

  return (
    <div className="w-full h-fit bg-gray-500 rounded-2xl flex flex-col items-center justify-center gap-3 p-10 text-white">
      {reels && reels.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {reels.map((reel: any) => (
              <video
                key={reel.id}
                src={reel.media_url}
                controls
                className="rounded-xl shadow-lg w-full max-h-[400px] object-cover"
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
