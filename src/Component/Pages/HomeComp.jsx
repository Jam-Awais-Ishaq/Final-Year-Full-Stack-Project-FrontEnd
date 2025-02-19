import Home from '../../Component/LandingPage/Home'
import Discover from '../../Component/LandingPage/Discover'
import HomeCard from "../../Component/LandingPage/HomeCard"
import Swiper1 from '../../Component/LandingPage/Swiper1'
import Swiper2 from '../../Component/LandingPage/Swiper2'
const HomeComp = () => {
  return (
    <>
    <div className=''>
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