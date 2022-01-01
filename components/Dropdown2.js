import React from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

function Dropdown2() {
  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <label className="font-semibold mr-3">Theme:</label>
      <Dropdown
        overlay={menu}
        overlayStyle={{ background: "black", color: "white" }}
      >
        <Button>
          Button <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Dropdown2;
