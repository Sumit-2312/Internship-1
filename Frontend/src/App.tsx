import ProfileCard from "./components/profile-card"
import Navbar from './components/navbar'
import Content from './components/Content'
import {Routes,Route} from 'react-router-dom';
import InstagramPost from "./components/IndividualPost";

function App2(){
  return(
    <div className="w-full max-w-[100vw]
    min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-t from-purple-700 to-black gap-10 overflow-x-hidden">
             <Navbar/>
             <div className="max-w-[900px] flex flex-col items-center justify-start gap-10">
               <ProfileCard/>
               <Content/>
             </div>
     </div>
  )
}

function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<App2 />} /> 
        <Route path="/post/:id" element={<InstagramPost/>} />
    </Routes>
    </>
  )
}

export default App
