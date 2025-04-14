import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Error() {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("Unknown Error");
  const [errorDetails, setErrorDetails] = useState("");

  useEffect(() => {
    // Check for error from URL search params
    const searchParams = new URLSearchParams(location.search);
    const errorParam = searchParams.get("error");
    
    // Check for error from location state
    const stateError = location.state?.error;
    
    if (errorParam) {
      setErrorMsg(decodeURIComponent(errorParam));
    } else if (stateError) {
      setErrorMsg(stateError);
      
      // Check for detailed error info
      if (location.state?.details) {
        setErrorDetails(location.state.details);
      }
    } else {
      setErrorMsg("An unknown error occurred");
    }
  }, [location]);

  const handleGoHome = () => {
    // Check if logged in before redirecting
    const isLoggedIn = localStorage.getItem("LoggedIn") === "true";
    navigate(isLoggedIn ? "/" : "/login");
  };

  const handleTryAgain = () => {
    // If there's a previous location, go back there
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      handleGoHome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-700 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white mb-5 p-6 rounded-full shadow-lg animate-pulse relative">
            <AlertTriangle size={48} className="text-red-500" />
          </div>

          <h1 className="text-7xl font-bold text-red-500 mb-2">Oops!</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-300 to-transparent my-4"></div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Error Occurred</h2>
          <p className="text-gray-600 mb-6 text-lg">{errorMsg}</p>
          
          {errorDetails && (
            <div className="bg-gray-100 p-4 rounded-lg text-left mb-6 overflow-auto">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{errorDetails}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              text="Go Home" 
              onClick={handleGoHome}
               />
            
            <Button 
              text="Try Again" 
              onClick={handleTryAgain}
            />
          </div>
        </div>
      </div>
    </div>
  );
}