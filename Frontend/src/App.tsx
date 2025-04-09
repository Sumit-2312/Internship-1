import ProfileCard from "./components/profile-card"
import Navbar from './components/navbar'
import Content from './components/Content'
function App() {

  return (
    <>
      <div className="w-full max-w-[100vw]
 min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-t from-purple-700 to-black gap-10 overflow-x-hidden">
          <Navbar/>
          <div className="w-[900px]   flex flex-col items-center justify-start gap-10">
            <ProfileCard/>
            <Content/>
          </div>
      </div>
    </>
  )
}

export default App
