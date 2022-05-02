import React, { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import UserDropdown from 'components/UserDropdown';
// import { MantineLogo } from '../../shared/MantineLogo';
import {colors} from 'constants/colors';
import Link from 'next/link';

import {

  Avatar,
  UnstyledButton,
  Text,
  Menu,
  Divider,
  Tabs,
} from '@mantine/core';
import {
  Logout,
  Heart,
  Star,
  Message,
  Settings,
  PlayerPause,
  Trash,
  SwitchHorizontal,
  ChevronDown,
} from 'tabler-icons-react';
import { useRouter } from 'next/router';

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
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

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

export default function HeaderResponsive() {
  const [active, setActive] = useState('');
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <a
        className={cx(classes.link, { [classes.linkActive]: active === link.link })}
        onClick={(event) => {
          // event.preventDefault();
          setActive(link.link);
          // toggleOpened(true);
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
        <Group spacing={5} className={classes.links}>
          {items}
          <UserDropdown showUserName size={40}/>
        </Group>

        {/* <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        /> */}
{/* 
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <>
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
            </>
          )}
        </Transition> */}
      </Container>
    </Header>
  );
}