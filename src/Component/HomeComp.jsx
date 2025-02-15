import Home from '../Component/LandingPage/Home'
import Discover from './LandingPage/Discover'
import HomeCard from "./LandingPage/HomeCard"
import Swiper1 from './LandingPage/Swiper1'
import Swiper2 from './LandingPage/Swiper2'
const HomeComp = () => {
  return (
    <>
    <div className='flex flex-col'>
      <Home />
      <HomeCard />
      <Swiper1 />
      <Discover /> 
      <Swiper2 />
    </div>
    </>
  )
}
export default HomeComp