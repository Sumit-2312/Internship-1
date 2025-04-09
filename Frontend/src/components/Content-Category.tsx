import Posts from "./Posts";
import { IoMdGrid } from "react-icons/io";
import { PiFilmReelLight } from "react-icons/pi";
import { IoPricetagSharp } from "react-icons/io5";
import { useState } from "react";
import Reels from "./Reels";
import Tags from "./Tags";

export default function Category(){

    const [active,setActive ] = useState("Posts");

    const items = ["Posts","Reels", "Tags"]
    const itemsImage = {
        "Posts" : <IoMdGrid />,
        "Reels" : <PiFilmReelLight />,
        "Tags" : <IoPricetagSharp className="-rotate-90" />
    }

    return (
        <div className="w-full  h-fit flex flex-col items-center justify-start gap-10">
            <div className="w-full h-10 rounded-2xl flex items-center bg-gray-500 justify-center">
           {
                items.map((item) => (
                    <div onClick={()=>setActive(item)} className={`text-center w-1/3 text-gray-300 flex items-center gap-1 justify-center rounded-2xl  h-full hover:cursor-pointer ${item===active? "bg-gradient-to-r from-purple-500 to-gray-400 text-black": " "  }`} key={item}>

                        <div>
                            {itemsImage[item]}
                        </div>
                        <div>
                            {item}
                        </div>

                    </div>
                ))
            }

            </div>

            {active === "Posts" && <Posts />}
            {active === "Reels" && <Reels/>}
            {active === "Tags" && <Tags/>}
        </div>
    )
}