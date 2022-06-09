import React from "react";
import { Button, Menu} from "@mantine/core";
import {
  ChevronDown,
} from "tabler-icons-react";

export default function ButtonMenu({ label, list, handleClick}) {
  return (
    <Menu
      control={
        <Button
          rightIcon={<ChevronDown size={18} />}
          sx={{ paddingRight: 12 }}
          variant="white"
          className="text-black font-semibold"
          radius={30}
        >
          {label}
        </Button>
      }
      transition="pop-top-right"
      placement="end"
      size="lg"
    >
      <ul className="max-h-60 overflow-scroll scrollbar-hide">
        {list.map((item: JSX.Element) => {
          if (item.key !== null) {
            return (
              <Menu.Item
              key={item.key}
                onClick={() => handleClick(item)}
              >
                {item.props.children}
              </Menu.Item>
            );
          }
        })}
      </ul>
    </Menu>
  );
}
