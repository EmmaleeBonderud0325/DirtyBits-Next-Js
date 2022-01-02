import { useState, useEffect } from "react";
import { base64_decode, base64_encode, download } from "./Helper2";
import cloneDeep from "lodash/cloneDeep";

import { MdSaveAlt } from "react-icons/md";
import { AiOutlineUpload, AiFillGithub } from "react-icons/ai";
import { BsCloudArrowUp, BsTerminal } from "react-icons/bs";
import { MdCreate } from "react-icons/md";
import { VscRunAll } from "react-icons/vsc";
import { Button, Tooltip, Modal } from "antd";
import { RiSendPlaneFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Image from "next/image";
import GoogleLogin from "react-google-login";
import {
  googleLoginApi,
  runCode,
  runTestCases,
  submitCode,
  uploadCode,
  getSavedCode,
} from "../../components/api/apis";
import { updateUserinfo } from "../../redux/actions";
import { useDispatch } from "react-redux";

import Cookies from "js-cookie";
import Encodemail from "../Helper/Encodemail";
import { Menu, Transition } from "@headlessui/react";
import Parsetoken from "../Helper/Parsetoken";
import FontDropdown from "./FontDropdown";

const jsonData = require("./data.json");

import Dropdown2 from "./Dropdown2";

require("codemirror/lib/codemirror.css");
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

let CodeMirror = null;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  CodeMirror = require("react-codemirror2").Controlled;
  require("codemirror/mode/yaml/yaml");
  require("codemirror/mode/dockerfile/dckerfile");

  require("codemirror/theme/ayu-mirage.css");
  require("codemirror/theme/cobalt.css");
  require("codemirror/theme/base16-dark.css");
  require("codemirror/theme/base16-light.css");
  require("codemirror/theme/bespin.css");
  require("codemirror/theme/dracula.css");
  require("codemirror/theme/duotone-light.css");
  require("codemirror/theme/eclipse.css");
  require("codemirror/theme/elegant.css");
  require("codemirror/theme/gruvbox-dark.css");
  require("codemirror/theme/hopscotch.css");
  require("codemirror/theme/icecoder.css");
  require("codemirror/theme/idea.css");
  require("codemirror/theme/lucario.css");
  require("codemirror/theme/material-darker.css");
  require("codemirror/theme/material-palenight.css");
  require("codemirror/theme/material.css");
  require("codemirror/theme/mbo.css");
  require("codemirror/theme/mdn-like.css");
  require("codemirror/theme/monokai.css");
  require("codemirror/theme/moxer.css");
  require("codemirror/theme/neat.css");
  require("codemirror/theme/neo.css");
  require("codemirror/theme/oceanic-next.css");
  require("codemirror/theme/panda-syntax.css");
  require("codemirror/theme/railscasts.css");
  require("codemirror/theme/rubyblue.css");
  require("codemirror/theme/seti.css");
  require("codemirror/theme/shadowfox.css");
  require("codemirror/theme/ssms.css");
  require("codemirror/theme/the-matrix.css");
  require("codemirror/theme/tomorrow-night-eighties.css");
  require("codemirror/theme/ttcn.css");
  require("codemirror/theme/xq-light.css");

  // Languages
  require("codemirror/mode/clojure/clojure");
  require("codemirror/mode/go/go");
  require("codemirror/mode/haskell/haskell");
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/pascal/pascal");
  require("codemirror/mode/perl/perl");
  require("codemirror/mode/php/php");
  require("codemirror/mode/python/python");
  require("codemirror/mode/r/r");
  require("codemirror/mode/ruby/ruby");
  require("codemirror/mode/rust/rust");
  require("codemirror/mode/swift/swift");

  // Addons
  require("codemirror/addon/hint/show-hint");
  require("codemirror/addon/hint/javascript-hint");
  require("codemirror/addon/hint/show-hint.css");
  require("codemirror/addon/edit/closebrackets");
  require("codemirror/addon/edit/closetag");
  require("codemirror/addon/fold/foldcode");
  require("codemirror/addon/fold/foldgutter");
  require("codemirror/addon/fold/brace-fold");
  require("codemirror/addon/fold/comment-fold");
  require("codemirror/addon/display/placeholder");
  require("codemirror/addon/display/fullscreen");
  require("codemirror/addon/search/match-highlighter");
  require("codemirror/addon/display/fullscreen.css");
  require("codemirror/addon/fold/foldgutter.css");
  require("codemirror/keymap/sublime");

  require("codemirror/addon/scroll/simplescrollbars.css");
  require("codemirror/addon/scroll/simplescrollbars");
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Editor = (props) => {
  const id = props.id;

  const dispatch = useDispatch();

  let [editorValue, changeEditorValue] = useState(
    "#include<iostream>\nusing namespace std;\n\nint main(){\n\n  return 0;\n}"
  );
  let [currTheme, setCurrTheme] = useState({
    label: "Dracula",
    value: "dracula",
    type: "dark",
  });
  let [fontSize, setFontSize] = useState("10px");
  let [currLang, setCurrLang] = useState({
    label: "C++",
    value: "text/x-c++src",
    ext: ".cpp",
  });

  let [customInput, setCustomInput] = useState(false);
  let [inputValue, changeInputValue] = useState("");
  let [outputValue, changeOutputValue] = useState(
    "You must run your code first."
  );
  let [showMode, changeShowMode] = useState(true);
  const [showConsole, setShowConsole] = useState(false);
  let [showLoader, setShowLoader] = useState(false);
  const [value, setValue] = React.useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const setLangFunction = (label) => {
    for (let i = 0; i < jsonData.language.length; i++) {
      if (jsonData.language[i].label === label) {
        setCurrLang({
          currLang,
          value: jsonData.language[i].value,
          label: jsonData.language[i].label,
          ext: jsonData.language[i].ext,
          icon: jsonData.language[i].icon,
        });
        return;
      }
    }
  };
  useEffect(() => {
    async function getCode() {
      try {
        await getSavedCode.get(`/${id}/`).then((res) => {
          setLangFunction(res.data[0].language);
          changeEditorValue(res.data[0].code);
        });
      } catch (e) {
        console.log("Token Error");
      }
    }
    getCode();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeCode = (data) => {
    changeEditorValue(data);
  };

  const userInfo = useSelector((state) => state.userData);

  // const handleKeyUp = (editor, event) => {
  //   if (editor.state.completionActive) {
  //     return;
  //   }
  //   var cur = editor.getCursor();
  //   var token = editor.getTokenAt(cur);
  //   if (token.type && token.type !== "comment" && event.keyCode !== 13) {
  //     editor.showHint({ completeSingle: false });
  //   }
  // };

  const handleCompileCode = async () => {};

  const handleRunCode = async () => {
    console.log(editorValue, currLang.label, inputValue);
    if (!Cookies.get("refresh")) {
      setIsModalVisible(true);

      console.error("Login Required !!");
      return;
    }
    setShowLoader(true);
    setShowConsole(true);

    await runTestCases
      .post("/", {
        problem_Id: id,
        code: base64_encode(editorValue),
        language: currLang.label,
      })
      .then((result) => {
        setShowLoader(false);
        if (result.data["status"] !== "Accepted") {
          changeOutputValue(
            result.data["status"] + "\n" + result.data["error"]
          );
        } else {
          changeOutputValue(result.data["status"]);
        }
        console.log(result.data);
      });
  };

  const handleSubmitCode = async () => {
    if (!Cookies.get("refresh")) {
      console.error("Login Required !!");
      return;
    }
    const encoded_mail = Encodemail(props.email);
    var socket = new WebSocket(
      `ws://db-code.herokuapp.com/ws/runcode/${encoded_mail}/`
    );
    // var socket = new WebSocket(
    //   `ws://localhost:8000/ws/runcode/${encoded_mail}/`
    // );
    socket.onopen = async function (e) {
      props.currentTabFunction(1);
      props.codeRunner(true);
      console.log("opened");
      await submitCode.post("/", {
        problem_Id: id,
        language: currLang.label,
        code: base64_encode(editorValue),
      });
    };
    socket.onmessage = async function (e) {
      var data = JSON.parse(e.data);
      console.log(data);
      if (data["inc_submissions"]) {
        //Inc submission count
        console.log(true);
      }
      if (!data["is_testcase"]) {
        props.setUserSubmissions(props.userSubmissions + 1);
        if (props.submissionList !== null) {
          var problemResult = JSON.parse(data["text"]);
          problemResult = problemResult[0]["fields"];
          var appendData = {
            status: problemResult.status,
            score: problemResult.score,
            language: problemResult.language,
            submission_Date_Time: problemResult.submission_Date_Time,
            total_score: problemResult.total_score,
          };
          let oldState = cloneDeep(props.submissionList);
          oldState.unshift(appendData);
          props.setSubmissionList(oldState);
          props.result(problemResult);
        }
      } else {
        console.log(data["text"]);
      }
    };
    socket.onclose = function (e) {
      props.codeRunner(false);
      console.log("closed");
    };
  };

  let options = {
    mode: currLang.value,
    theme: currTheme.value,
    lineWrapping: true,
    smartIndent: true,
    foldGutter: true,
    lint: true,
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers",
    ],
    autoCloseTags: true,
    keyMap: "sublime",
    matchBrackets: true,
    scrollbarStyle: "simple",
    autoCloseBrackets: true,
    foldcode: true,
    lineNumbers: true,
    autoRefresh: true,
    viewportMargin: 2,
    highlightSelectionMatches: {
      minChars: 2,
      style: "matchhighlight",
    },
    styleActiveLine: true,
    styleActiveSelected: true,
    extraKeys: {
      F11: (cm) => {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      Esc: (cm) => {
        if (cm.getOption("fullScreen")) {
          cm.setOption("fullScreen", false);
        }
      },
      // Tab: "autocomplete",
    },
  };

  const handeCustomInput = (e) => {
    setCustomInput(!customInput);
  };

  const handleShowMode = (e) => {
    const ele_id = e.target.id;
    if (ele_id === "simple-tab-0") {
      changeShowMode(true);
    } else {
      changeShowMode(false);
    }
    console.log(e.target.id);
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

  const responseGoogleSuccess = async (data) => {
    try {
      await googleLoginApi
        .post("/", { auth_token: data["tokenId"] })
        .then((result) => {
          const { access, refresh } = result.data;
          const data = Parsetoken(access);
          console.log("data", data);
          if (data.is_verified) {
            setIsModalVisible(false);
            Cookies.set("access", access);
            Cookies.set("refresh", refresh, { expires: 14 });
            dispatch(
              updateUserinfo({
                is_logged_in: true,
                email: data.user_mail,
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                profile_pic: data.profile_pic,
              })
            );
          }
        })
        .catch(() => {
          console.error("Bad Request !");
        });
    } catch (e) {
      console.log("Server Error !");
    }
  };

  const responseGoogleFailure = () => {
    console.error("Google Authentication failed !");
  };

  const profileImageLink = userInfo.profile_pic;

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    changeEditorValue(content);
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

  const uploadCloud = async () => {
    try {
      await uploadCode
        .post("/", {
          code: editorValue,
          language: currLang.label,
          probId: id,
          email: props.email,
        })
        .then(() => {
          console.log("Success");
        });
    } catch (e) {
      console.error("Token Error");
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="problem-page-right-container p-2"
    >
      <div className="flex justify-around p-10">
        <FontDropdown fontSize={fontSize} setFontSize={setFontSize} />
        <Dropdown2
          dropdownType={"theme"}
          currTheme={currTheme}
          currLang={currLang}
          setCurrTheme={setCurrTheme}
          setCurrLang={setCurrLang}
          changeEditorValue={changeEditorValue}
        />
        <Dropdown2
          dropdownType={"language"}
          currLang={currLang}
          currTheme={currTheme}
          setCurrTheme={setCurrTheme}
          setCurrLang={setCurrLang}
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
      <div>
        {CodeMirror && (
          <CodeMirror
            className={`my-code-editor scrollbar-hide text-[${fontSize}]`}
            value={editorValue}
            options={options}
            onBeforeChange={(editor, data, value) => changeCode(value)}
            //   onChange={(editor, data, value) => changeCode(value)}
            // onKeyUp={(editor, event) => {
            //   handleKeyUp(editor, event);
            // }}
          />
        )}
      </div>

      <div className="editor-options-container mt-10 flex space-x-5 justify-between items-center p-2">
        <div className="cursor-pointer text-xl flex items-center p-2">
          <BsTerminal onClick={() => setShowConsole(!showConsole)} />
          <span className="ml-2 text-sm">Console</span>
        </div>
        <div className="flex space-x-3">
          <button
            className="group flex items-center space-x-2 bg-[#7220c4] hover:bg-[#6406c2] transition-all ease-out p-2 px-5  rounded-lg"
            onClick={handleRunCode}
          >
            <VscRunAll className="text-lg group-hover:animate-bounce" />
            <span>Run</span>
          </button>
          <button
            className="group flex items-center space-x-2 bg-[#7220c4] hover:bg-[#6406c2] transition-all ease-out p-2 px-8  rounded-lg"
            onClick={handleSubmitCode}
          >
            <RiSendPlaneFill className="text-lg group-hover:rotate-45 transition-all ease-in-out" />
            <span>Submit</span>
          </button>
        </div>
      </div>

      <Modal
        title="Login or SignUp to continue..."
        centered
        visible={isModalVisible}
        bodyStyle={{ background: "#1b1138" }}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        keyboard
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className="flex justify-center flex-col items-center">
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="social-login-btn w-1/2 border border-white"
              >
                <FcGoogle />
                <span>Login with Google</span>
              </button>
            )}
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <button className="social-login-btn cursor-not-allowed w-1/2 border border-white">
            <AiFillGithub />
            <span>Login with GitHub </span>
          </button>
          <button className="social-login-btn bg-custom-yellow2 w-1/2 border border-white">
            <MdCreate />
            <span>
              <a className="text-white hover:text-white" href="/auth/signup">
                Sign Up
              </a>
            </span>
          </button>
        </div>
      </Modal>

      {showConsole && (
        <div className="relative bottom-0 w-full transition-all ease-in-out duration-75 p-2">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                textColor="inherit"
                indicatorColor="secondary"
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  onClick={(e) => handleShowMode(e)}
                  label="Output"
                  {...a11yProps(0)}
                />
                <Tab
                  onClick={(e) => handleShowMode(e)}
                  label="Input"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {showLoader ? (
                <span className="loader"></span>
              ) : (
                <pre className="text-left font-bold">{outputValue}</pre>
              )}
            </TabPanel>

            <TabPanel value={value} index={1}>
              <textarea
                className="w-full placeholder:text-base placeholder:p-2 bg-gray-800 outline-none rounded-lg p-1 text-lg"
                rows="6"
                id="input-btn"
                placeholder="Custom Input here"
                value={inputValue}
                onChange={(e) => changeInputValue(e.target.value)}
                spellcheck="false"
              ></textarea>
            </TabPanel>
          </Box>
        </div>
      )}
    </div>
  );
};

export default React.memo(Editor);
