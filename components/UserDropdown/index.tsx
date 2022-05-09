import { Avatar, createStyles, Divider, Group, Menu, UnstyledButton, Text } from '@mantine/core'
import React, { useState } from 'react'
import { ChevronDown, Heart, PlayerPause, Trash } from 'tabler-icons-react'
import { FcInfo } from 'react-icons/fc';
import  Router  from 'next/router';
import { showNotification } from '@mantine/notifications';
import { signoutUser } from 'redux/actions/authenticate';
import { useDispatch, useSelector } from 'react-redux';

const HEADER_HEIGHT = 60;
const useStyles = createStyles((theme) => ({
    root: {
      position: 'relative',
      zIndex: 1,
      marginBottom: 0,
    },
  
    dropdown: {
      position: 'absolute',
      top: HEADER_HEIGHT,
      left: 0,
      right: 0,
      zIndex: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopWidth: 0,
      overflow: 'hidden',
  
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
    userMenu: {
      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
    },
  
    user: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[0],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: 'background-color 100ms ease',
    },
  
    userActive: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[8],
    },
    menuItem: {
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? 'GrayText' : 'GrayText',
      },
      
    }
  }));

function UserDropdown({showUserName = false, size = 30}) {
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { classes, cx } = useStyles();

    const dispatch = useDispatch();

    const {profile_pic, username, is_admin } = useSelector(
      (state: any) => state.userData
    );
    const addProbemRouteHandler = () => {
      if (is_admin) {
        Router.push("/addproblems");
      } else {
        showNotification({
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
    <Menu
    size={260}
    placement="end"
    transition="pop-top-right"
    className={classes.userMenu}
    onClose={() => setUserMenuOpened(false)}
    onOpen={() => setUserMenuOpened(true)}
    control={
      <UnstyledButton
        className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
      >
        <Group spacing={7}>
          <Avatar src={profile_pic} alt="profile pic" radius="xl" size={size} />
          {showUserName && (
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {username.charAt(0).toUpperCase() + username.slice(1)}
            </Text>
          )}
          <ChevronDown size={12} />
        </Group>
      </UnstyledButton>
    }
  >
    <Menu.Item onClick={profileRouteHandler} className={classes.menuItem} icon={<Heart size={14} />}>
      Your Profile
    </Menu.Item>
    <Menu.Item disabled={!is_admin} onClick={addProbemRouteHandler} className={classes.menuItem} icon={<PlayerPause size={14} />}>Add problems</Menu.Item>
    <Divider />
    <Menu.Item onClick={signoutHandler} className={classes.menuItem} color="red" icon={<Trash size={14} />}>
      Logout
    </Menu.Item>
  </Menu>
  )
}

export default UserDropdown