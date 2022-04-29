import React from "react";
import { Button, Group, Menu, Text, useMantineTheme } from "@mantine/core";
import {
  SquareCheck,
  Package,
  Users,
  Calendar,
  ChevronDown,
} from "tabler-icons-react";

export default function ButtonMenu({ title }) {
  const theme = useMantineTheme();
  const [dropdownTitle, setDropdownTitle] = React.useState(title);
  return (
    <Menu
      control={
        <Button
          leftIcon={<Package size={16} color={theme.colors.blue[6]} />}
          rightIcon={<ChevronDown size={18} />}
          sx={{ paddingRight: 12 }}
          variant="outline"
          radius={30}
        >
          {dropdownTitle}
        </Button>
      }
      transition="pop-top-right"
      placement="end"
      size="lg"
      onChange={(e) => console.log(e)}
    >
      <Menu.Item
        onClick={() => setDropdownTitle("Project")}
        icon={<Package size={16} color={theme.colors.blue[6]} />}
        rightSection={
          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            Ctrl + P
          </Text>
        }
      >
        Project
      </Menu.Item>
      <Menu.Item
        icon={<SquareCheck size={16} color={theme.colors.pink[6]} />}
        rightSection={
          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            Ctrl + T
          </Text>
        }
      >
        Task
      </Menu.Item>
      <Menu.Item
        icon={<Users size={16} color={theme.colors.cyan[6]} />}
        rightSection={
          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            Ctrl + U
          </Text>
        }
      >
        Team
      </Menu.Item>
      <Menu.Item
        icon={<Calendar size={16} color={theme.colors.violet[6]} />}
        rightSection={
          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
            Ctrl + E
          </Text>
        }
      >
        Event
      </Menu.Item>
    </Menu>
  );
}
