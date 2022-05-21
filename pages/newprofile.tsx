import React from 'react'
import SideNavbar from 'components/SideNavbar'
import ProfileNavbar from 'components/ProfileNavbar'
import { Container, Grid, Group, Skeleton } from '@mantine/core';

import LeftSection from 'components/Profile/LeftSection'
import RightSection from 'components/Profile/RightSection'
import Head from 'next/head';


function Profile() {
    const [isOpen, setIsOpen] = React.useState(false);
    // const child = <Skeleton height={140} radius="md" animate={true} />;
  return (
      <div className='relative flex profilePageBackground'>
          <Head><title>Dashboard</title></Head>
          <div className='absolute top-52 left-36 profilePagePatter1'></div>
          <div className='absolute top-72 right-[25%] profilePagePatter2'></div>
          {isOpen && <SideNavbar />}
          <div className='hidden md:block'>
            <SideNavbar/>
          </div>
          <div className='flex-1 p-5 lg:p-10'>
            <ProfileNavbar setModalState={setIsOpen}/>
            <Grid>
                <Grid.Col xs={isOpen ? 12 : 10} className="p-4">
                    <LeftSection/>
                </Grid.Col>
                <Grid.Col xs={2} className="hidden lg:block p-4 overflow-hidden">
                    <RightSection/>
                </Grid.Col>
            </Grid>
          </div>
      </div>
  )
}

export default Profile

Profile.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
}