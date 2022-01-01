import React from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const jsonData = require("./data.json");

function Dropdown2(props) {
  function handleMenuClick(e) {
    if (props.dropdownType === "theme") {
      // message.info("Click on menu item.");
      // console.log("click", e);
      // console.log("click", e.domEvent);
      const [key, value] = e.key.split("|");
      // console.log(key, value);
      for (let i = 0; i < jsonData.theme.length; i++) {
        if (jsonData.theme[i].value === value) {
          props.setCurrTheme({
            ...props.currTheme,
            value: value,
            label: jsonData.theme[i].label,
            type: jsonData.theme[i].type,
          });
          return;
        }
      }
    } else {
      // message.info("Click on menu item.");
      // console.log("click", e);
      // console.log("click", e.domEvent);
      const [key, value] = e.key.split("|");
      // console.log(key, value);
      for (let i = 0; i < jsonData.language.length; i++) {
        if (jsonData.language[i].value === value) {
          props.setCurrLang({
            ...props.currLang,
            value: jsonData.language[i].value,
            label: jsonData.language[i].label,
            ext: jsonData.language[i].ext,
            icon: jsonData.language[i].icon,
          });
          props.changeEditorValue(jsonData.language[i].pre);
          return;
        }
      }
    }
  }

  const renderThemeList = jsonData.theme.map((item) => {
    if (props.currTheme.value !== item.value) {
      return (
        <Menu.Item key={item.label + "|" + item.value} icon={<UserOutlined />}>
          {item.label}
        </Menu.Item>
      );
    }
    return <></>;
  });

  const renderLangList = jsonData.language.map((item) => {
    if (props.currLang.label !== item.label) {
      return (
        <Menu.Item key={item.ext + "|" + item.value} icon={<UserOutlined />}>
          {item.label}
        </Menu.Item>
      );
    }
    return <></>;
  });

  const menu = (
    <Menu onClick={handleMenuClick}>
      {props.dropdownType === "theme" ? renderThemeList : renderLangList}
    </Menu>
  );

  return (
    <div>
      <label className="font-semibold mr-3">
        {props.dropdownType === "theme" ? "Theme: " : "Language:  "}
      </label>
      <Dropdown
        overlay={menu}
        overlayStyle={{ background: "black", color: "white" }}
      >
        <Button>
          {props.dropdownType === "theme"
            ? props.currTheme.value
            : props.currLang.label}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Dropdown2;
