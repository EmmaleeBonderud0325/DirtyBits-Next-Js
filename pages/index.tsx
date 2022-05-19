import React from 'react'
import Head from 'next/head'
import SmoothList from 'react-smooth-list'

import Hero from 'components/Hero'
import Feature from 'components/Feature/index'
import Navbar from 'components/NavbarT'
import Terminal from 'components/Terminal'

function Homepage() {
  return (
    <div className='backgroundGrdient'>
      <Head><title>DirtyBits</title></Head>
      <Navbar/>
      <SmoothList>
        <Hero />
        <Terminal/>
        <Feature title="Features" description="Some of our basics features"/>
      </SmoothList>
    </div>
  )
}

export default Homepage;

Homepage.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
};