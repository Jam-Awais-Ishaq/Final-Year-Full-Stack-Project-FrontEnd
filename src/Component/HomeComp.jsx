import React from 'react'
import Home from './Home'
import HomeCard from './HomeCard'
import Swiper1 from './Swiper1'
import Discover from './Discover'
import Swiper2 from './Swiper2'
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