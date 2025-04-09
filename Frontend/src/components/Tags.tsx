
import { IoPricetagSharp } from "react-icons/io5";

const Tags = () => {
  return (
    <div  className="w-full h-fit bg-gray-500 rounded-2xl flex flex-col items-center justify-center gap-3 p-10 text-white">
        <IoPricetagSharp className="text-gray-300 text-4xl -rotate-90" />
        <h4 className="font-bold text-2xl text-gray-300">
            No tagged posts to display
        </h4>
    </div>
  )
}

export default Tags