import React from "react";
import {
  createStyles,
  Container,
  Title,
  Button,
  Group,
  Text,
  Image,
} from "@mantine/core";
import hero from "public/hero.svg";
import { colors } from "constants/colors";
import Link from "next/link";
import SmoothList from "react-smooth-list";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
    alignItems: "center",
  },

  content: {
    maxWidth: 500,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: 'Lato',
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,
    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
    color: 'black'
  },

  image: {
    display: "none",
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(colors.primary, 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function HeroBullets() {
  const { classes } = useStyles();
  return (
    <div className="">
      <Container size="xl">
        <div className={classes.inner}>
          <div className={classes.content}>
            <SmoothList>
              <Title className={classes.title}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AE67FA] to-[#F49867]">
                  Welcome to DirtyBits
                </span>
              </Title>
              <Text color="#fff" mt="md">
                <span className="block text-center md:text-left text-white font-light xl:block mt-5 text-xl md:text-4xl tracking-wider font-lato">
                  Be a Coder with us.
                </span>
              </Text>
              <Text color="dimmed" mt="md">
                <p className="mt-3 text-base text-center md:text-left text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  First, solve the problem. Then, write the code.
                </p>
              </Text>

              <Group mt={30}>
                <Link href="/problemset" passHref>
                  <Button
                    variant="white"
                    radius="xl"
                    size="lg"
                    className="bg-[#643ADA] text-white"
                  >
                    Explore
                  </Button>
                </Link>
              </Group>
            </SmoothList> 
          </div>
          <Image
            src={hero.src}
            width={500}
            height={500}
            alt="hero right image"
            sx={{
              "@media (max-width: 1200px)": {
                display: "none",
              },
            }}
            />
        </div>
      </Container>
    </div>
  );
}
