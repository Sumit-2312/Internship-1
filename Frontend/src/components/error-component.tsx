import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Error() {
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState("Unknown Error");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const error = searchParams.get("error") || "Unknown Error";
    setErrorMsg(decodeURIComponent(error));
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-700 to-purple-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white mb-5 p-6 rounded-full shadow-equal shadow-red-300 animate-pulse relative">
            <AlertTriangle size={48} className="text-red-500" />
          </div>

          <h1 className="text-7xl font-bold text-red-500 mb-2">Oops!</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-300 to-transparent my-4"></div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Error Occurred</h2>
          <p className="text-gray-600 mb-6 text-lg">{errorMsg}</p>
        </div>
      </div>
    </div>
  );
}
