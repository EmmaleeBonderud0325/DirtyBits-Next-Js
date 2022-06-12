import React, { useState } from 'react';
import { createStyles, Header, Container, Group, Button } from '@mantine/core';
import UserDropdown from 'components/UserDropdown';
import {colors} from 'constants/colors';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    marginBottom: 0,
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? colors.primary : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(colors.primary, 0.25)
          : theme.colors[theme.primaryColor][0],
      color: colors.primary,
    },
  },

  linksWrapper: {
    marginRight: theme.spacing.md,
  }
}));

const links =  [
  {
    "link": "/compete",
    "label": "Compete"
  },
  {
    "link": "/problemset",
    "label": "Problem"
  },
  {
    "link": "/leaderboard",
    "label": "Leaderboard"
  },
  {
    "link": "/blogs",
    "label": "Blogs"
  }
]

 function HeaderResponsive() {
  const [active, setActive] = useState('');
  const { classes, cx } = useStyles();
  
  const isAuth = useSelector((state: any) => state.userData.data.is_logged_in);

  console.log('is auth', isAuth)
  
  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <a
        className={cx(classes.link, { [classes.linkActive]: active === link.link })}
        onClick={() => {
          setActive(link.link);
        }}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container size="xl" className={classes.header}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href='/' className="text-custom-indigo text-2xl font-semibold tracking-wider no-underline">DirtyBits</a>
        <Group spacing={10} className={classes.links}>
          <Group spacing={10} className={classes.linksWrapper}>
            {items}
          </Group>
          {isAuth ? (
            <UserDropdown showUserName size={40}/>
          ) : (
            <>
              <Link href="/auth/signin" passHref>
                <Button className='bg-custom-indigo' variant='filled' radius="xl">Sign In</Button>
              </Link>
              <Link href="/auth/signup" passHref>
                <Button color="dark" variant='white' radius="xl">Sign Up</Button>
              </Link>
            </>
          )
          }
        </Group>
      </Container>
    </Header>
  );
}

export default React.memo(HeaderResponsive);