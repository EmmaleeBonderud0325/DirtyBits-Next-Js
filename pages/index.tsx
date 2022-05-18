import React from 'react'
import Hero from 'components/Hero'
import Feature from 'components/Feature/index'
import Head from 'next/head'
import Navbar from 'components/NavbarT'
// import Terminal from 'components/Terminal'

function Homepage() {
  return (
    <div className="backgroundGrdient">
      <Navbar />
      <Head>
        <title>DirtyBits</title>
      </Head>
      <Hero />
      {/* <Terminal/> */}
      <Feature title="Features" description="Some of our basics features"/>
    </div>
  );
}

export default Homepage;

Homepage.getNavbarTLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
