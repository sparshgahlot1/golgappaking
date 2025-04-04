import React from 'react'
import InfiniteSlider from '../components/InfiniteSlider'
import FranchiseHeader from '../components/franchiseHeader/FranchiseHeader'
import MarqueeFooter from '../components/MarqueeFooter'
import CallSlider from '../components/CallSlider'

const Franchise = () => {
  return (
    <div className='bg-gradient-to-br from-[#2a2a2a] via-[#111111] to-[#2a2a2a] h-screen'>
    <FranchiseHeader
  title={["Franchise"]}
  description="Address city, talk about DPITT recognized startup etc, based in. About GGK from pitchdeck."
  imageSrc="/image.png"
  strokeColor="#FFD700" // optional
/>
    <InfiniteSlider/>
    <MarqueeFooter
    title={["Start your business today with just ₹ 3 Lakhs*"]}
    strokeColor="#FFD700"
    />
    <CallSlider/>
    </div>
  )
}

export default Franchise