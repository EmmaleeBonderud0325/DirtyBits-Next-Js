import React from "react";
import { connect, useDispatch } from "react-redux";
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineUpload } from "react-icons/ai";
import { BsCloudArrowUp } from "react-icons/bs";
import { Tooltip } from "antd";

import { download } from "./Helper2";
import UserProfileDropDown from "../UserProfileDropDown";
import { uploadCode } from "../../components/api/apis";
import {
  changeEditorValue,
  changeTheme,
  changeLanguage,
  changeFont,
} from "../../redux/actions/ProblemPage";
import { AiOutlineSync } from "react-icons/ai";
const jsonData = require("./data.json");

import Dropdown2 from "./Dropdown2";
import FontDropdown from "./FontDropdown";
import { message } from "antd";

function Header(props) {
  const dispatch = useDispatch();

  const currLang = props.currLang;

  const uploadCloud = async () => {
    const key = "updatable";
    message.loading({
      content: "Loading...",
      key,
      style: {
        marginTop: "2rem",
      },
    });
    try {
      await uploadCode
        .post("/", {
          code: props.editorValue,
          language: props.currLang.label,
          probId: props.id,
          email: props.userInfo.email,
        })
        .then(() => {
          message.success({
            content: " Code Uploaded Successfully",
            key,
            duration: 2,
            style: {
              marginTop: "2rem",
            },
          });
        });
    } catch (e) {
      message.error({ content: "Try Again !", key, duration: 2 });
    }
  };

  const setLangFunction = (label) => {
    console.log(label);
    for (let i = 0; i < jsonData.language.length; i++) {
      if (jsonData.language[i].label === label) {
        dispatch(
          changeLanguage({
            value: jsonData.language[i].value,
            label: jsonData.language[i].label,
            ext: jsonData.language[i].ext,
            icon: jsonData.language[i].icon,
          })
        );
        return;
      }
    }
  };

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    dispatch(changeEditorValue(content));
  };

  const uploadedfile = (e) => {
    let input_file = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(input_file);
    var [filename, extension] = input_file.name.split(".");
    if (extension === "cpp") {
      setLangFunction("C++");
    } else if (extension === "java") {
      setLangFunction("Java");
    } else if (extension === "py") {
      setLangFunction("Python 3");
    } else {
      setLangFunction("C");
    }
  };

  const resetCode = () => {
    for (let i = 0; i < jsonData.language.length; i++) {
      if (jsonData.language[i].label === props.currLang.label) {
        dispatch(changeEditorValue(jsonData.language[i].pre));
        return;
      }
    }
  };

  return (
    <div className="flex justify-around p-10">
      {/* <FontDropdown fontSize={props.fontSize} setFontSize={changeFont} /> */}
      <Dropdown2
        dropdownType={"theme"}
        currTheme={props.currTheme}
        currLang={props.currLang}
        setCurrTheme={changeTheme}
        setCurrLang={changeLanguage}
        changeEditorValue={changeEditorValue}
      />
      <Dropdown2
        dropdownType={"language"}
        currLang={props.currLang}
        currTheme={props.currTheme}
        setCurrTheme={changeTheme}
        setCurrLang={changeLanguage}
        changeEditorValue={changeEditorValue}
      />
      {/* TOP RIGHT ICONS */}
      <div className="space-x-1 flex items-center transition-all ease-in-out">
        <Tooltip className="bg-none" placement="top" title="Save">
          <BsCloudArrowUp
            onClick={uploadCloud}
            className="text-white text-lg font-bold hover:cursor-pointer mr-2"
          />
        </Tooltip>

        <Tooltip className="bg-none" placement="top" title="Upload">
          <label htmlFor="file-input">
            <AiOutlineUpload className="text-white text-lg font-bold hover:cursor-pointer mr-2" />
          </label>
          <input
            type="file"
            accept=".cpp, .c, .py, .java"
            id="file-input"
            onChange={(e) => uploadedfile(e)}
            className="hidden "
          />
        </Tooltip>

        <Tooltip className="bg-none" placement="top" title="Download Code">
          <MdSaveAlt
            onClick={() =>
              download("code" + props.currLang.ext, props.editorValue)
            }
            className="text-white text-lg font-bold hover:cursor-pointer !mr-2"
          />
        </Tooltip>

        <Tooltip className="bg-none" placement="top" title="Reset Code">
          <AiOutlineSync
            onClick={() => resetCode()}
            className="text-white text-lg font-bold hover:cursor-pointer"
          />
        </Tooltip>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-50">
          {props.userInfo.is_logged_in && (
            <UserProfileDropDown
              showUserName={false}
              redirectOnSignout={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    editorValue: state.editorValue,
    fontSize: state.fontSize,
    currTheme: state.themeValue,
    currLang: state.editorLanguage,
    userInfo: state.userData,
    id: state.problemPageProblemId,
  };
};

export default connect(mapStateToProps)(Header);
