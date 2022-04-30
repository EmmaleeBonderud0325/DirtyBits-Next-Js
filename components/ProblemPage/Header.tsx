import React, { ReactElement, memo } from "react";
import Image from "next/image";

import _ from "lodash";
import { connect, useDispatch, useSelector } from "react-redux";
import { Tooltip } from '@mantine/core';

import UserProfileDropDown from "../UserProfileDropDown";
import { uploadCode } from "../api/apis";
import {
  changeEditorValue,
  changeTheme,
  changeLanguage,
} from "../../redux/actions/ProblemPage";
import jsonData from "./data.json";
import { download } from "./Helper2";
import { Dropdown2 } from "./Dropdown2";
import refresh from "../../public/refresh.svg";
import downloadIcon from "../../public/download.svg";
import uploadquestion from "../../public/uploadq.svg";
import insert from "../../public/insert.svg";
import { IRootState } from "../../redux/reducers";
import { editorLanguageI, themeI, userDataI } from "../../redux/interfaces";
import UserDropdown from "components/UserDropdown";
import LanguageDropdown from 'components/Dropdown/index'

interface Props {
  editorValue: string;
  fontSize: string;
  currTheme: themeI;
  currLang: editorLanguageI;
  userInfo: userDataI;
  id: number;
}

function Header(props: Props): ReactElement {
  const dispatch = useDispatch();
  const is_logged_in = useSelector(
    (state: IRootState) => state.userData.is_logged_in
  );
    console.log('header render')
  const uploadCloud = async () => {
    const key = "updatable";
    // @ts-ignore
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
          // @ts-ignore
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
      // @ts-ignore
      message.error({ content: "Try Again !", key, duration: 2 });
    }
  };

  const setLangFunction = (label: string): void => {
    for (let i = 0; i < jsonData.language.length; i++) {
      if (jsonData.language[i].label === label) {
        dispatch(
          changeLanguage({
            value: jsonData.language[i].value,
            label: jsonData.language[i].label,
            ext: jsonData.language[i].ext,
            icon: jsonData.language[i].iconClass,
          })
        );
        return;
      }
    }
  };

  let fileReader: any;

  const handleFileRead = (e: any) => {
    const content = fileReader.result;
    dispatch(changeEditorValue(content));
  };

  const uploadedfile = (e: any): void => {
    let input_file = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(input_file);
    var [_, extension] = input_file.name.split(".");
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

  const resetCode = (): void => {
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
      {/* <Dropdown2
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
      /> */}
      <LanguageDropdown title="Language"/>
      {/* TOP RIGHT ICONS */}
      {is_logged_in && (
        <div className="space-x-4 flex items-center transition-all ease-in-out">
          <Tooltip label="Upload Code to cloud" color="blue" withArrow>
            <Image
              onClick={uploadCloud}
              className="cursor-pointer"
              src={uploadquestion}
              width={20}
              height={20}
              alt="upload code"
            />
          </Tooltip>

          <div>
          <Tooltip label="Import File" color="blue" withArrow>
              <label htmlFor="file-input">
                <Image
                  className="cursor-pointer"
                  src={insert}
                  width={20}
                  height={20}
                  alt="import file"
                />
              </label>
              <input
                type="file"
                accept=".cpp, .c, .py, .java"
                id="file-input"
                onChange={uploadedfile}
                className="hidden "
              />
            </Tooltip>
          </div>

          <div>
          <Tooltip label="Download Code" color="blue" withArrow>
              <Image
                onClick={() =>
                  download("code" + props.currLang.ext, props.editorValue)
                }
                className="cursor-pointer"
                src={downloadIcon}
                width={20}
                height={20}
                alt="download code"
              />
            </Tooltip>
          </div>
          <div>
          <Tooltip label="Reset Code" color="blue" withArrow>
              <Image
                onClick={resetCode}
                className="cursor-pointer"
                src={refresh}
                width={20}
                height={20}
                alt="reset code"
              />
            </Tooltip>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-50">
            {props.userInfo.is_logged_in && (
              // <UserProfileDropDown
              //   showUserName={false}
              //   redirectOnSignout={false}
              // />
              <UserDropdown size={40} showUserName={false}/>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    editorValue: state.editorValue,
    fontSize: state.fontSize,
    currTheme: state.themeValue,
    currLang: state.editorLanguage,
    userInfo: state.userData,
    id: state.problemPageProblemId,
  };
};

export default connect(mapStateToProps)(memo(Header));
