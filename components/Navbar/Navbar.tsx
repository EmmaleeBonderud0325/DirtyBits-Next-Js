import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  Divider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { Avatar } from "@chakra-ui/react";
import Router from "next/router";
import NextLink from "next/link";
import { signoutUser } from "../../redux/actions/authenticate";
import { useDispatch } from "react-redux";

import React, { useRef } from "react";
import { Menu as PrimeMenu } from "primereact/menu";
import { Button as Btn } from "primereact/button";
import { useNotifications } from "@mantine/notifications";

import Notification from './Notification'
import {FcInfo} from 'react-icons/fc'
import { Menu, Divider as Div, UnstyledButton } from '@mantine/core';

export default function WithSubnavigation() {
  const dispatch = useDispatch();
  const notifications = useNotifications();
  const { isOpen, onToggle } = useDisclosure();
  const isHidden = useBreakpointValue({ base: true, md: false });
  // @ts-ignore
  const { is_logged_in, profile_pic, username, is_admin } = useSelector(
    (state: any) => state.userData
  );
  const addProbemRouteHandler = () => {
    if (is_admin) {
      Router.push("/addproblems");
    } else {

      notifications.showNotification({
        title: 'Not an Admin',
        message: "You don't have enough privileges, because you are not an admin",
        icon: <FcInfo className="text-4xl"/>
      })
    }
  };

  const profileRouteHandler = () => {
    Router.push(`/profile/${username}`)
  } 

  const signoutHandler = () => {
    dispatch(signoutUser(true))
  }

  return (
    <Container maxW={"container.xl"} className="overflow-hidden">
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            alignItems={"center"}
            justify={{ base: "center", md: "start" }}
          >
            <Text
              cursor={"pointer"}
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              // fontFamily={'heading'}
              onClick={() => Router.push("/")}
              fontSize={"2xl"}
              fontWeight="semibold"
              color={useColorModeValue("gray.800", "brand.100")}
            >
              DirtyBits
            </Text>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            className="space-x-4"
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={1}
            alignItems={"center"}
          >
            {is_logged_in ? (
              <>
               <Menu 
               className="group" 
              
               control={
                  <UnstyledButton className="hidden md:block min-w-max">  
                    <Flex className="group-hover:cursor-pointer" alignItems="center">
                      <Avatar className="mt-2" name={username} src={profile_pic} />
                      <span className="text-white ml-2 font-medium">{username}</span>
                    </Flex>
                  </UnstyledButton>}>
                <Menu.Item  
                  sx={(theme) => ({
                    '&:hover': {
                    backgroundColor: theme.colors.gray[8],
                    },
                  })}
                  onClick={profileRouteHandler}>
                    Your Profile
                </Menu.Item> 
                <Menu.Item  
                  sx={(theme) => ({
                    '&:hover': {
                    backgroundColor: theme.colors.gray[8],
                    },
                  })}
                  onClick={addProbemRouteHandler}>
                    Add problems
                </Menu.Item> 
                <Div />           
                <Menu.Item  
                  sx={(theme) => ({
                    '&:hover': {
                    backgroundColor: theme.colors.gray[8],
                    },
                  })}
                  onClick={signoutHandler}
                  color="red"
                  >
                    Sign Out
                </Menu.Item> 
               </Menu>
               <Notification/>
              </>
            ) : (
              <>
                <NextLink href="/auth/signin">
                  <Button
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                    _hover={{
                      textDecoration: "none",
                    }}
                  >
                    Sign In
                  </Button>
                </NextLink>
                <Divider h={8} orientation="vertical" />

                <NextLink href="/auth/signup">
                  <Button
                    borderRadius={"full"}
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={400}
                    color={"white"}
                    bg={"brand.100"}
                    href={"/auth/signup"}
                    _hover={{
                      bg: "purple.400",
                    }}
                  >
                    Sign Up
                  </Button>
                </NextLink>
              </>
            )}
          </Stack>
          
        </Flex>
                    
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </Container>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"medium"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  borderBottom: "2px solid white",
                  // textDecoration: 'underline',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("brand.100", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "brand.100" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"brand.100"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {MOBILE_NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Compete",
    children: [
      {
        label: "Create Your Contest",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "Join Contest",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Problem",
    href: "/problemset",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
];
const MOBILE_NAV_ITEMS: Array<NavItem> = [
  {
    label: "Compete",
    children: [
      {
        label: "Create Your Contest",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "Join Contest",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Problem",
    href: "/problemset",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "Log In / Sign Up",
    href: "/auth/signin",
  },
];
