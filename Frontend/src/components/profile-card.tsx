import { CgProfile } from "react-icons/cg";


export default function ProfileCard(){
    return (
        <div className="bg-gray-500 text-white max-w-fit md:w-full min-h-80 rounded-2xl shadow-lg shadow-gray-800 flex md:flex-row flex-col items-center md:items-start justify-center p-4   ">

            <div className="profile-Image w-1/3 h-full flex flex-col items-center justify-start py-4 gap-4 ">

               

                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center shadow-equal shadow-purple-500 shadow-blurred-1xl border-2 border-black overflow-hidden">
                    <CgProfile className="h-full w-full text-gray-100 " />
                </div>

                <div className="text-gray-100 text-md font-bold">
                    @John Doe
                </div>

            </div>

            <div className="profile-Details w-2/3 h-full flex flex-col items-center md:items-start justify-start px-4 py-4 gap-5 ">  

                <div className="Counts flex items-center justify-start py-2 ">
                    <div className="flex flex-col items-center justify-center pr-4">
                        <h1 className="text-xl font-bold text-gray-100">
                            8
                        </h1>
                        <p className="text-gray-300 text-md">
                          Posts  
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center px-4">
                        <h1 className="text-xl font-bold text-gray-100">
                            100
                        </h1>
                        <p className="text-gray-300 text-md">
                          Followers  
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center px-4">
                        <h1 className="text-xl font-bold text-gray-100">
                            200
                        </h1>
                        <p className="text-gray-300 text-md">
                          Following  
                        </p>
                    </div>
                </div>

                <div className="bio flex flex-col gap-1 items-center md:items-start justify-center">
                    <div className="text-xl font-gray-100 font-semibold">
                        John Doe
                    </div>
                    <div className="text-md sm:text-none text-center mt-1 text-gray-300 ">
                        Digital creator | Photography enthusiast | Travel Lover
                    </div>
                    <div className="text-gray-100 text-sm text-center md:text-start ">
                    Capturing moments and sharing stories through my lens. Follow along for visual inspiration and creative adventures.
                    </div>
                </div>
            </div>

        </div>
    )
}