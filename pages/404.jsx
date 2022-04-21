import React from 'react';
import { createStyles, Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import image from '../public/404.svg';
import {colors} from 'constants/colors';
import { useRouter } from 'next/router';
import Head from 'next/head';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 180,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
    color: colors.primary,
    borderColor: colors.primary,
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

const NotFoundImage  = () => {
  const { classes } = useStyles();
    const router = useRouter()
  return (
    <Container className={classes.root}>
        <Head>
            <title>404 - Page Not Found</title>
        </Head>
      <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button onClick={() => router.back()} variant="outline" size="md" mt="xl" className={classes.control}>
            Get back to home page
          </Button>
        </div>
        <Image src={image.src} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}

export default NotFoundImage;