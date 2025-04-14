import { IoPricetagSharp } from "react-icons/io5";
import { useContext } from "react";
import { PostContext } from "../PostContext/ContextProvider";

const Tags = () => {
  const { Posts } = useContext<any>(PostContext);

  // Filter posts tagged with the user
  const taggedPosts = Posts?.filter((post: any) => post.is_tagged);

  return (
    <div className="w-full h-fit bg-gray-500 rounded-2xl flex flex-col items-center justify-center gap-3 p-10 text-white">
      {taggedPosts && taggedPosts.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {taggedPosts.map((post: any) => (
            <img
              key={post.id}
              src={post.media_url || post.imageUrl}
              alt={`Tagged post ${post.id}`}
              className="rounded-xl shadow-lg w-full max-h-[400px] object-cover"
            />
          ))}
        </div>
      ) : (
        <>
          <IoPricetagSharp className="text-gray-300 text-4xl -rotate-90" />
          <h4 className="font-bold text-2xl text-gray-300">
            No tagged posts to display
          </h4>
        </>
      )}
    </div>
  );
};

export default Tags;
