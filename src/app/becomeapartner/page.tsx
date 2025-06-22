import React from 'react'
import InfiniteSlider from '../components/InfiniteSlider'
import FranchiseHeader from '../components/franchiseHeader/FranchiseHeader'
import MarqueeFooter from '../components/MarqueeFooter'

const Franchise = () => {
  return (
    <div className='bg-yellow-400 min-h-screen flex flex-col'>
      <FranchiseHeader
        title={["Become a Partner"]}
        description="Address city, talk about DPITT recognized startup etc, based in. About GGK from pitchdeck."
        imageSrc="/image.png"
        strokeColor="red"
      />
      <InfiniteSlider />
       <MarqueeFooter
        title={["Start your business today with just ₹ 2 Lakhs*"]}
        strokeColor="#FFD700"
      />
    </div>
  )
}

export default Franchise
