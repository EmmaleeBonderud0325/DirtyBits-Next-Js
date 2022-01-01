import React from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { SiPython, SiCplusplus, SiJava } from "react-icons/si";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

const jsonData = require("./data.json");

function Dropdown2(props) {
  function handleMenuClick(e) {
    if (props.dropdownType === "theme") {
      const [key, value] = e.key.split("|");
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
      const [key, value] = e.key.split("|");
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

  const getLangIconClass = (label) => {
    if (label === "C++" || label === "C") {
      return <SiCplusplus />;
    }
    if (label === "Python 3") {
      return <SiPython />;
    }
    if (label === "Java") {
      return <SiJava />;
    }
  };

  const getThemeIconClass = (type) => {
    if (type == "dark") {
      return <IoMoonOutline />;
    } else {
      return <MdOutlineWbSunny />;
    }
  };

  const renderThemeList = jsonData.theme.map((item) => {
    if (props.currTheme.value !== item.value) {
      return (
        <Menu.Item
          key={item.label + "|" + item.value}
          icon={getThemeIconClass(item.type)}
        >
          {/* {getThemeIconClass(item.type)} */}
          {item.label}
        </Menu.Item>
      );
    }
    return <></>;
  });

  const renderLangList = jsonData.language.map((item) => {
    if (props.currLang.label !== item.label) {
      return (
        <Menu.Item
          key={item.ext + "|" + item.value}
          icon={getLangIconClass(item.label)}
        >
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
          {/* {props.dropdownType === "theme" ? (
            <></>
          ) : (
            getLangIconClass(props.currLang.label)
          )}{" "} */}
          {props.dropdownType === "theme"
            ? props.currTheme.label
            : props.currLang.label}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Dropdown2;
