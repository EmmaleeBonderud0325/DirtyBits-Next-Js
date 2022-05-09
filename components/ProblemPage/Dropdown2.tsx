import { FC, ReactElement } from "react";

import { useDispatch } from "react-redux";
import { SiPython, SiCplusplus, SiJava } from "react-icons/si";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

import Dropdown from "components/Dropdown/index";
import jsonData from "./data.json";
import { editorLanguageI, themeI } from "../../redux/interfaces";

interface Props {
  dropdownType: string;
  currTheme: themeI;
  currLang: editorLanguageI;
  setCurrTheme: (newState: themeI) => { type: string; payload: themeI };
  setCurrLang: (newState: editorLanguageI) => {
    type: string;
    payload: editorLanguageI;
  };
  changeEditorValue: (newState: string) => { type: string; payload: string };
}

export const Dropdown2: FC<Props> = (props): ReactElement => {
  const dispatch = useDispatch();
  function handleMenuClick(e: any) {
    if (props.dropdownType === "theme") {
      const [_, value] = e.key.split("|");
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
      const [_, value] = e.key.split("|");
      for (let i = 0; i < jsonData.language.length; i++) {
        if (jsonData.language[i].value === value) {
          dispatch(
            props.setCurrLang({
              ...props.currLang,
              value: jsonData.language[i].value,
              label: jsonData.language[i].label,
              ext: jsonData.language[i].ext,
              icon: jsonData.language[i].iconClass,
            })
          );
          dispatch(props.changeEditorValue(jsonData.language[i].pre));
          return;
        }
      }
    }
  }

  const getLangIconClass = (label: string): ReactElement => {
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

  const getThemeIconClass = (type: string): ReactElement => {
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
          data-icon={getThemeIconClass(item.type)}
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
          data-icon={getLangIconClass(item.label)}
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

  return (
    <div>
      <Dropdown
        label={
          props.dropdownType === "theme"
            ? props.currTheme.label
            : props.currLang.label
        }
        list={itemList}
        handleClick={handleMenuClick}
      />
    </div>
  );
};
