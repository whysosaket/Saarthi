import { useEffect } from "react"
import Hero from "../components/Home/Hero"
import Hero2 from "../components/Home/Hero2"

const Home = () => {
  useEffect(()=>{
    // setting scroll to top
    window.scrollTo(0,0);
},[])
  return (
    <>  
        <Hero />   
        <Hero2 />  
    </>
  )
}



export default Home