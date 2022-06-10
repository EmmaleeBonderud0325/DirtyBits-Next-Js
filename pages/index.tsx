import React, { useEffect } from "react";
import Head from "next/head";
import SmoothList from "react-smooth-list";
import Cookies from "js-cookie";

import Hero from "components/Hero";
import Feature from "components/Feature/index";
import Navbar from "components/NavbarT";
import Terminal from "components/Terminal";
import { useAppDispatch } from "app/hooks";
import { getUserData } from "features/UserData";

function Homepage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const refresh: string = Cookies.get("refresh");
    if (typeof refresh != "undefined") {
      console.log("called");
      dispatch(getUserData({ refresh }));
    }
  });
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
