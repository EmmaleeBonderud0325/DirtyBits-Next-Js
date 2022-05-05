import React from 'react'
import Hero from 'components/Hero'
import Feature from 'components/Feature/index'
import Head from 'next/head'

function Navbar() {
  return (
    <>
    <Head><title>DirtyBits</title></Head>
    <Hero />
    <Feature title="Features" description="Some of our basics features"/>
    </>
  )
}

export default Navbar