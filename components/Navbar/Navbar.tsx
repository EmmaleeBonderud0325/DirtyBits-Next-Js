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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    Divider
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  import { useSelector } from 'react-redux';
import { Avatar } from '@nextui-org/react';
import Router from 'next/router';
import NextLink from 'next/link';
import { signoutUser } from "../../redux/actions/authenticate";
import { useDispatch } from 'react-redux';
import { openNotificationWithIcon } from "../OpenNotification";
import { AiOutlineInfoCircle } from "react-icons/ai";
  export default function WithSubnavigation() {
      const dispatch = useDispatch()
    const { isOpen, onToggle } = useDisclosure();
    const isHidden = useBreakpointValue({ base: true, md: false })
    // @ts-ignore
    const {is_logged_in, profile_pic, username, is_admin} = useSelector(state => state.userData)


    const addProblemPageHandler = () => {
      if(is_admin){
        Router.push('/addproblems')
      }else {
        openNotificationWithIcon(
          "info",
          "Not an Admin",
          "You don't have enough privileges, because you are not an admin"
        );
      }
    }
    
    return (
      <Container maxW={'container.xl'}>
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
              />
          </Flex>
          <Flex flex={{ base: 1 }} alignItems={'center'} justify={{ base: 'center', md: 'start' }}>
            <Text
                cursor={'pointer'}
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              // fontFamily={'heading'}
              onClick={() => Router.push('/')}
              fontSize={'2xl'}
              fontWeight="semibold"
              color={useColorModeValue('gray.800', 'purple.400')}>
                
              DirtyBits
            </Text>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
                    
          

          <Stack
          className='space-x-4'
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={1}
                    alignItems={'center'}
                    
                    >
                  {is_logged_in ? (
                     <Menu>
                     <MenuButton>
                         <Flex direction={'row'} alignItems={'center'}>
                                <Avatar size="lg" src={profile_pic} color="secondary" bordered squared/>
                                <Text hidden={isHidden} fontWeight={'semibold'} casing='capitalize' marginLeft={'1'}>{username}</Text>

                         </Flex>
                     </MenuButton>
                     <MenuList>
                   
                         <MenuItem onClick={() => Router.push(`/profile/${username}`)}>Your Profile</MenuItem>
                         <MenuItem onClick={addProblemPageHandler}>Add Problems{!is_admin &&<AiOutlineInfoCircle className="text-yellow-200 ml-2 text-lg" />}</MenuItem>
        
                       <MenuDivider />
                         <MenuItem onClick={() => dispatch(signoutUser())}>Log Out</MenuItem>
                     </MenuList>
                   </Menu>
                  ): (
                   <div className='md:flex space-x-4 items-center hidden'>
                   <NextLink href='/auth/signin'>
                    <Button
                   
                      fontSize={'sm'}
                      fontWeight={400}
                      variant={'link'}
                      _hover={{
                          textDecoration:'none'
                        }}
                      >
                      Sign In
                    </Button>
                    </NextLink>
                    <Divider h={8} orientation='vertical' />

                    <NextLink href='/auth/signup'>
                        <Button
                        borderRadius={'full'}
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={400}
                        color={'white'}
                        bg={'purple.600'}
                        href={'/auth/signup'}
                        _hover={{
                            bg: 'purple.400',
                            }}>
                        Sign Up
                        </Button>
                    </NextLink>
                          </div>
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
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'medium'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    borderBottom:'2px solid indigo',
                    // textDecoration: 'underline',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
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
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('purple.600', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'purple.400' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'purple.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
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
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
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
      label: 'Compete',
      children: [
        {
          label: 'Create Your Contest',
          subLabel: 'Trending Design to inspire you',
          href: '#',
        },
        {
          label: 'Join Contest',
          subLabel: 'Up-and-coming Designers',
          href: '#',
        },
      ],
    },
    {
      label: 'Problem',
      href: '/problemset'
    },
    {
      label: 'Leaderboard',
      href: '/leaderboard',
    },
    {
      label: 'Blogs',
      href: '/blogs',
    },
  ];
  const MOBILE_NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Compete',
      children: [
        {
          label: 'Create Your Contest',
          subLabel: 'Trending Design to inspire you',
          href: '#',
        },
        {
          label: 'Join Contest',
          subLabel: 'Up-and-coming Designers',
          href: '#',
        },
      ],
    },
    {
      label: 'Problem',
      href: '/problemset'
    },
    {
      label: 'Leaderboard',
      href: '/leaderboard',
    },
    {
      label: 'Blogs',
      href: '/blogs',
    },
    {
      label: 'Log In / Sign Up',
      href: '/auth/signin'
    }
  ];