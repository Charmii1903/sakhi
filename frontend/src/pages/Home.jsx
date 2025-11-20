import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import SeasonsGallery from '../components/SeasonCollection'
import ScrollToTop from '../components/ScrollToTop'

const Home = () => {
  return (
    <div>
      <Hero/>
      <SeasonsGallery/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
      <ScrollToTop/>
    </div>
  )
}

export default Home