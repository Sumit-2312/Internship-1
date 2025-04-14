import { CgProfile } from "react-icons/cg";
import { useContext } from "react";
import { PostContext } from "../PostContext/ContextProvider";

export default function ProfileCard() {
  const { ProfileInfo, Posts } = useContext<any>(PostContext);

  return (
    <div className="bg-gray-500 text-white max-w-fit md:w-full min-h-80 rounded-2xl shadow-lg shadow-gray-800 flex md:flex-row flex-col items-center md:items-start justify-center p-4">
      <div className="profile-Image w-1/3 h-full flex flex-col items-center justify-start py-4 gap-4">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center shadow-equal shadow-purple-500 shadow-blurred-1xl border-2 border-black overflow-hidden">
          {ProfileInfo?.profile_picture_url ? (
            <img
              src={ProfileInfo.profile_picture_url}
              alt="Profile"
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <CgProfile className="h-full w-full text-gray-100" />
          )}
        </div>

        <div className="text-gray-100 text-md font-bold">
          @{ProfileInfo?.username || "Username"}
        </div>
      </div>

      <div className="profile-Details w-2/3 h-full flex flex-col items-center md:items-start justify-start px-4 py-4 gap-5">
        <div className="Counts flex items-center justify-start py-2">
          <div className="flex flex-col items-center justify-center pr-4">
            <h1 className="text-xl font-bold text-gray-100">{Posts?.length ?? 0}</h1>
            <p className="text-gray-300 text-md">Posts</p>
          </div>

          <div className="flex flex-col items-center justify-center px-4">
            <h1 className="text-xl font-bold text-gray-100">
              {ProfileInfo?.followers_count ?? 0}
            </h1>
            <p className="text-gray-300 text-md">Followers</p>
          </div>

          <div className="flex flex-col items-center justify-center px-4">
            <h1 className="text-xl font-bold text-gray-100">
              {ProfileInfo?.follows_count ?? 0}
            </h1>
            <p className="text-gray-300 text-md">Following</p>
          </div>
        </div>

        <div className="bio flex flex-col gap-1 items-center md:items-start justify-center">
          <div className="text-xl font-gray-100 font-semibold">
            {ProfileInfo?.name || "Full Name"}
          </div>
          <div className="text-md sm:text-none text-center mt-1 text-gray-300">
            {ProfileInfo?.biography?.split("|")[0] || "Bio Title"}
          </div>
          <div className="text-gray-100 text-sm text-center md:text-start">
            {ProfileInfo?.biography || "Bio description..."}
          </div>
        </div>
      </div>
    </div>
  );
}
