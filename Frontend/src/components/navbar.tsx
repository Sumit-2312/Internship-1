import { FaInstagram } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


export default function Navbar(){
    return (
        <div className="w-full h-10  p-4  flex items-center justify-between ">

            <div className="flex gap-2 h-10 items-center justify-between   ">
              <div className="h-10 flex items-center pt-1 justify-center ">
                 <FaInstagram  className="text-white text-xl   "/>
              </div>
              <h1 className="bg-gradient-to-r from-purple-600  to-purple-100 text-2xl font-bold bg-clip-text text-transparent  ">Instagram</h1>
            </div>

            <div className="h-10 w-10 rounded-full bg-gray-200 ">
                <CgProfile className="h-full w-full text-gray-100 "/>
            </div>

        </div>
    )
}