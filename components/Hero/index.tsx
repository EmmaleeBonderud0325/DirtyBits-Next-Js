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
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
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
    <div>
      <Container size="xl">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome to <span className={classes.highlight}>DirtyBits</span>
            </Title>
            {/* <Text color="#fff" size="xl" mt="md">
             */}
            <Text color="customColor" size="xl" mt="md">
              Be a Coder with us.
            </Text>
            <Text color="dimmed" mt="md">
              First, solve the problem. Then, write the code.
            </Text>

            <Group mt={30}>
              <Link href="/problemset" passHref>
                <Button
                  variant="gradient"
                  gradient={{ from: colors.primary, to: "#835FE6", deg: 35 }}
                  radius="xl"
                  size="lg"
                  className={classes.control}
                >
                  Explore
                </Button>
              </Link>
            </Group>
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
