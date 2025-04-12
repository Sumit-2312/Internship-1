import Button from "./components/Button";
import { FaInstagram } from "react-icons/fa";


const InstagramLogin = () => {
  const handleLogin = () => {

    // Auth URL contain some parameters like client_id, redirect_uri, response_type and scope
    // redirect_uri is the URL where the user will be redirected after login
    // response_type is the type of response we want from the server
    // scope is the permissions we want from the user

    // All these details are present in the Embed URL, make sure to add the correct redirect_uri
    // in response we get code, which we will use to get the access token
    // access token is used to make API calls to Instagram Graph API
    // The access token is valid for 60 days, after that we need to get a new access token
   

    const authUrl = "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=2105360309980077&redirect_uri=https://instagram-h8yy.onrender.com/accessToken/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights";

    window.location.href = authUrl;
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-t from-purple-700 to-black flex flex-col items-center justify-center p-6">

      <div className="mb-6 flex h-fit p-4  items-center justify-center ">
        <FaInstagram className="text-white text-6xl" />
        <h1 className="  h-full bg-gradient-to-r text-4xl from-purple-600  to-purple-100 p-4 font-bold bg-clip-text text-transparent  ">Instagram</h1>
      </div>
      
      <div className="max-w-lg w-full bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm shadow-lg border border-purple-500 border-opacity-30">
        <h1 className="text-white text-4xl font-bold mb-6 text-center">
          Connect with Instagram
        </h1>
        
        <div className="mb-8">
          <div className="flex items-start space-x-3 mb-4">
            <div className="text-purple-400 font-bold">-</div>
            <p className="text-gray-200 text-lg">To proceed, please log in to your Instagram account.</p>
          </div>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="text-purple-400 font-bold">-</div>
            <p className="text-gray-200 text-lg">This will allow us to manage your Instagram posts and comments.</p>
          </div>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="text-purple-400 font-bold">-</div>
            <p className="text-gray-200 text-lg">We take your privacy seriously and will not share your information with anyone.</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button text={"Login with Instagram"} onClick={handleLogin} />
        </div>
      </div>
      
      <div className="mt-8 text-gray-400 text-sm text-center">
        © 2025 Instagram Integration | Terms & Privacy
      </div>
    </div>
  );
};

export default InstagramLogin;