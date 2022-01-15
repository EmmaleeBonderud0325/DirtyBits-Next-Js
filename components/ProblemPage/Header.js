import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineUpload } from "react-icons/ai";
import { BsCloudArrowUp } from "react-icons/bs";
import { Button, Tooltip } from "antd";

import { download } from "./Helper2";
import { Profile } from "./Profile";
import { uploadCode } from "../../components/api/apis";
import {
  changeEditorValue,
  changeTheme,
  changeLanguage,
  changeFont,
} from "../../redux/actions/ProblemPage";

const jsonData = require("./data.json");

import Dropdown2 from "./Dropdown2";
import FontDropdown from "./FontDropdown";
import { message } from "antd";

export const Header = () => {
  const dispatch = useDispatch();
  const editorValue = useSelector((state) => state.editorValue);
  const fontSize = useSelector((state) => state.fontSize);
  const currTheme = useSelector((state) => state.themeValue);
  const currLang = useSelector((state) => state.editorLanguage);
  const userInfo = useSelector((state) => state.userData);
  const id = useSelector((state) => state.problemPageProblemId);

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
          code: editorValue,
          language: currLang.label,
          probId: id,
          email: userInfo.email,
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
    for (let i = 0; i < jsonData.language.length; i++) {
      if (jsonData.language[i].label === label) {
        dispatch(
          changeLanguage({
            currLang,
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
    var [_, extension] = input_file.name.split(".");
    switch (extension) {
      case "cpp":
        setLangFunction("C++");
      case "java":
        setLangFunction("Java");
      case "py":
        setLangFunction("Python 3");
      default:
        setLangFunction("C");
    }
  };

  return (
    <div className="flex justify-around p-10">
      {/* <FontDropdown fontSize={fontSize} setFontSize={changeFont} /> */}
      <Dropdown2
        dropdownType={"theme"}
        currTheme={currTheme}
        currLang={currLang}
        setCurrTheme={changeTheme}
        setCurrLang={changeLanguage}
        changeEditorValue={changeEditorValue}
      />
      <Dropdown2
        dropdownType={"language"}
        currLang={currLang}
        currTheme={currTheme}
        setCurrTheme={changeTheme}
        setCurrLang={changeLanguage}
        changeEditorValue={changeEditorValue}
      />
      {/* TOP RIGHT ICONS */}
      <div className="space-x-1 flex items-center transition-all ease-in-out">
        <Tooltip className="bg-none" placement="top" title="Save">
          <Button
            ghost
            style={{ border: "none", fontSize: 20 }}
            onClick={uploadCloud}
          >
            <BsCloudArrowUp />
          </Button>
        </Tooltip>

        <Tooltip className="bg-none" placement="top" title="Upload">
          <div>
            <label htmlFor="file-input">
              <AiOutlineUpload style={{ fontSize: 20, color: "white" }} />
            </label>
            <input
              type="file"
              accept=".cpp, .c, .py, .java"
              id="file-input"
              onChange={(e) => uploadedfile(e)}
              className="hidden"
            />
          </div>
        </Tooltip>

        <Tooltip className="bg-none" placement="top" title="Download Code">
          <Button
            onClick={() => download("code" + currLang.ext, editorValue)}
            ghost
            style={{ border: "none", fontSize: 20 }}
          >
            <MdSaveAlt />
          </Button>
        </Tooltip>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-50">
          {/* Profile dropdown */}
          <Profile />
        </div>
      </div>
    </div>
  );
};
