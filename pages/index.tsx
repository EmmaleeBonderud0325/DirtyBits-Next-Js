import React, { useEffect } from "react";
import Head from "next/head";
import SmoothList from "react-smooth-list";

import Hero from "components/Hero";
import Feature from "components/Feature/index";
import Navbar from "components/NavbarT";
import Terminal from "components/Terminal";
import { getUserData } from "features/UserData";
import { useAppDispatch } from "app/hooks";

function Homepage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <div className="backgroundGrdient">
      <Head>
        <title>DirtyBits</title>
      </Head>
      <Navbar />
      <SmoothList>
        <Hero />
        <Terminal />
        <Feature title="Features" description="Some of our basics features" />
      </SmoothList>
    </div>
  );
}

export default Homepage;

Homepage.getLayout = function PageLayout(page: any) {
  
  return <>{page}</>;
};
