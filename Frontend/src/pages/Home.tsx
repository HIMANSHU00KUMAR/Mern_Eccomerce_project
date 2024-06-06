import Landing1 from "../component/landing/Landing1"
import Landing2 from "../component/landing/Landing2"
import Landing3 from "../component/landing/Landing3"
import Landing4 from "../component/landing/Laning4"
import Fotter from "../component/layout/Fotter"
import Header from "../component/layout/Header"

const Home = () => {
  return (
    <div>
     <Header/>
        <div className="mx-[100px] max-md:w-full max-md:mx-0">
            <Landing1/>
            <Landing2/>
            <Landing3/>
            <Landing4/>
        </div>
        <Fotter/>
       
    
      
    </div>
  )
}

export default Home
