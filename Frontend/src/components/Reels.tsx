import { PiFilmReelLight } from "react-icons/pi";
import Button from "./Button";

export default function Reels(){
    return (

        <div  className="w-full h-fit bg-gray-500 rounded-2xl flex flex-col items-center justify-center gap-3 p-10 text-white">
            <PiFilmReelLight className="text-gray-300 text-4xl" />
            <h4 className="font-bold text-2xl">
                No reels to display yet
            </h4>
            <Button text={"Create your first reel"}/>
        </div>
    )
}