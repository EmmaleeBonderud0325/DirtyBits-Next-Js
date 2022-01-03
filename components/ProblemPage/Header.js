import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { download } from "./Helper2";

import { MdSaveAlt } from "react-icons/md";
import { AiOutlineUpload } from "react-icons/ai";
import { BsCloudArrowUp } from "react-icons/bs";
import { Button, Tooltip } from "antd";
import Image from "next/image";

import { uploadCode } from "../../components/api/apis";
import { updateUserinfo } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEditorValue,
  changeTheme,
  changeLanguage,
  changeFont,
} from "../../redux/actions/ProblemPage";

import Cookies from "js-cookie";

const jsonData = require("./data.json");

import Dropdown2 from "./Dropdown2";
import FontDropdown from "./FontDropdown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Header = () => {
  const dispatch = useDispatch();
  const editorValue = useSelector((state) => state.editorValue);
  const fontSize = useSelector((state) => state.fontSize);
  const currTheme = useSelector((state) => state.themeValue);
  const currLang = useSelector((state) => state.editorLanguage);
  const userInfo = useSelector((state) => state.userData);
  const profileImageLink = userInfo.profile_pic;
  const id = useSelector((state) => state.problemPageProblemId);

  const uploadCloud = async () => {
    try {
      await uploadCode
        .post("/", {
          code: editorValue,
          language: currLang.label,
          probId: id,
          email: userInfo.email,
        })
        .then(() => {
          console.log("Success");
        });
    } catch (e) {
      console.error("Token Error");
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
    var [fileName, extension] = input_file.name.split(".");
    if (extension == "cpp") {
      setLangFunction("C++");
    } else if (extension == "java") {
      setLangFunction("Java");
    } else if (extension == "py") {
      setLangFunction("Python 3");
    } else if (extension == "c") {
      setLangFunction("C");
    }
  };

  const signOutUser = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    dispatch(
      updateUserinfo({
        is_logged_in: false,
        email: "",
        first_name: "",
        last_name: "",
        username: "",
      })
    );
  };

  return (
    <div className="flex justify-around p-10">
      <FontDropdown fontSize={fontSize} setFontSize={changeFont} />
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
          {
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  {profileImageLink && (
                    <Image
                      className="rounded-full"
                      width={40}
                      height={40}
                      src={profileImageLink}
                      alt="profile pic"
                    />
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/profile/mohitbisht"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/addproblems"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Add Problem
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={signOutUser}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          }
        </div>
      </div>
    </div>
  );
};
