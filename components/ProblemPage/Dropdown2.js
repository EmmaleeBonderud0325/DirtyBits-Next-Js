import React from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { SiPython, SiCplusplus, SiJava } from "react-icons/si";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { useDispatch } from "react-redux";
import { DropdownV3 } from "../Dropdown/DropdownV3";

const jsonData = require("./data.json");

function Dropdown2(props) {
  console.log("curr theme", props.currTheme);
  console.log("curr lng", props.currLang);
  const dispatch = useDispatch();
  function handleMenuClick(e) {
    if (props.dropdownType === "theme") {
      const [key, value] = e.key.split("|");
      for (let i = 0; i < jsonData.theme.length; i++) {
        if (jsonData.theme[i].value === value) {
          dispatch(
            props.setCurrTheme({
              ...props.currTheme,
              value: value,
              label: jsonData.theme[i].label,
              type: jsonData.theme[i].type,
            })
          );
          return;
        }
      }
    } else {
      const [key, value] = e.key.split("|");
      for (let i = 0; i < jsonData.language.length; i++) {
        if (jsonData.language[i].value === value) {
          dispatch(
            props.setCurrLang({
              ...props.currLang,
              value: jsonData.language[i].value,
              label: jsonData.language[i].label,
              ext: jsonData.language[i].ext,
              icon: jsonData.language[i].icon,
            })
          );
          dispatch(props.changeEditorValue(jsonData.language[i].pre));
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
        <li
          key={item.label + "|" + item.value}
          icon={getThemeIconClass(item.type)}
        >
          <div className="flex items-center space-x-2">
            <span>{getThemeIconClass(item.type)}</span>
            <span> {item.label}</span>
          </div>
        </li>
      );
    }
    return <></>;
  });

  const renderLangList = jsonData.language.map((item) => {
    if (props.currLang.label !== item.label) {
      return (
        <li
          key={item.ext + "|" + item.value}
          icon={getLangIconClass(item.label)}
          className=""
        >
          <div className="flex items-center space-x-2">
            <p>{getLangIconClass(item.label)}</p>
            <p>{item.label}</p>
          </div>
        </li>
      );
    }
    return <></>;
  });

  const itemList =
    props.dropdownType === "theme" ? renderThemeList : renderLangList;
  console.log("item list", itemList);

  return (
    <div>
      {/* <label className="font-semibold mr-3">
        {props.dropdownType === "theme" ? "Theme: " : "Language:  "}
      </label> */}
      <DropdownV3
        label={
          props.dropdownType === "theme"
            ? props.currTheme.label
            : props.currLang.label
        }
        list={itemList}
        handleClick={handleMenuClick}
      />
      {/* <Button> */}
      {/* {props.dropdownType === "theme" ? (
            <></>
          ) : (
            getLangIconClass(props.currLang.label)
          )}{" "} */}
      {/* {props.dropdownType === "theme"
            ? props.currTheme.label
            : props.currLang.label}{" "}
          <DownOutlined />
        </Button>
      </DropdownV3> */}
    </div>
  );
}

export default Dropdown2;
