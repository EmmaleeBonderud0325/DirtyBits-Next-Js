import { useState } from "react";
import { base64_decode, base64_encode, download } from "./Helper2";

import { MdSaveAlt } from "react-icons/md";
import { AiOutlineUpload } from "react-icons/ai";
import { BsCloudArrowUp, BsTerminal } from "react-icons/bs";
import { VscRunAll } from "react-icons/vsc";
import { Button, Switch, Tooltip, Drawer } from "antd";
import { RiSendPlaneFill } from "react-icons/ri";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
  require("codemirror/mode/dockerfile/dockerfile");

  require("codemirror/lib/codemirror.css");
  require("./Editor.module.css");

  require("codemirror/theme/ayu-mirage.css");
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
}

import { runCode, runTestCases, submitCode } from "../api/apis";
import Cookies from "js-cookie";
import Gettoken from "../Helper/Gettoken";
import Encodemail from "../Helper/Encodemail";

const jsonData = require("./data.json");

const Editor = ({ id }) => {
  let [editorValue, changeEditorValue] = useState(
    "#include<iostream>\nusing namespace std;\n\nint main(){\n\n  return 0;\n}"
  );
  let [currTheme, setCurrTheme] = useState({
    label: "Dracula",
    value: "dracula",
    type: "dark",
  });
  let [currLang, setCurrLang] = useState({
    label: "C++ 17",
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
  let [inputBtnClass, setInputBtnClass] = useState(
    "positive ui left attached button"
  );
  let [outputBtnClass, setOutputBtnClass] = useState(
    "right attached ui button"
  );
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeCode = (data) => {
    changeEditorValue(data);
  };

  console.log("id", id);

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

  const renderThemeList = jsonData.theme.map((item) => {
    if (currTheme.value !== item.value) {
      return (
        <option className="" value={item.value}>
          {item.label}
        </option>
      );
    }
    return <></>;
  });

  const renderLangList = jsonData.language.map((item) => {
    if (currLang.label !== item.label) {
      return <option value={item.value}>{item.label}</option>;
    }
    return <></>;
  });

  const handleThemeChange = (e) => {
    for (let i = 0; i < jsonData.theme.length; i++) {
      if (jsonData.theme[i].value === e.target.value) {
        setCurrTheme({
          ...currTheme,
          value: e.target.value,
          label: jsonData.theme[i].label,
          type: jsonData.theme[i].type,
        });
        return;
      }
    }
  };

  const handleLangChange = (e) => {
    for (let i = 0; i < jsonData.language.length; i++) {
      if (jsonData.language[i].value === e.target.value) {
        setCurrLang({
          ...currLang,
          value: jsonData.language[i].value,
          label: jsonData.language[i].label,
          ext: jsonData.language[i].ext,
        });
        changeEditorValue(jsonData.language[i].pre);
        return;
      }
    }
  };

  const handleCompileCode = async () => {};

  const handleRunCode = async () => {
    console.log(editorValue, currLang.label, inputValue);
    if (!Cookies.get("refresh")) {
      console.error("Login Required !!");
      return;
    }
    await Gettoken(Cookies.get("refresh"));
    await runTestCases
      .post(
        "/",
        {
          problem_Id: id,
          code: base64_encode(editorValue),
          language: currLang.label,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${Cookies.get("access")}`,
          },
        }
      )
      .then((result) => {
        // changeShowMode(false);
        // setInputBtnClass("ui left attached button");
        // setOutputBtnClass("positive right attached ui button");
        if (result.data["status"] !== "Accepted") {
          changeOutputValue(
            result.data["status"] + "\n\n" + result.data["error"]
          );
        } else {
          changeOutputValue(result.data["status"]);
        }
        // console.log(result.data["status"]["description"]);
        console.log(result.data);
        // console.log(base64_decode(result.data["compile_output"]));
      });
  };

  const handleSubmitCode = async () => {
    if (!Cookies.get("refresh")) {
      console.error("Login Required !!");
      return;
    }
    const encoded_mail = Encodemail("server@gmail.com");
    var socket = new WebSocket(
      `ws://db-code.herokuapp.com/ws/runcode/${encoded_mail}/`
    );
    socket.onopen = async function (e) {
      console.log("opened");
      await submitCode.post("/", {
        problem_Id: id,
        language: currLang.label,
        code: base64_encode(editorValue),
      });
    };
    socket.onmessage = async function (e) {
      var data = JSON.parse(e.data);
      // if (data["text"] !== "passed" && data["text"] !== "failed") {
      //   var metadata = JSON.parse(data["text"])[0];
      //   displayOut(metadata.fields);
      // } else {
      //   console.log(data["text"]);
      // }
      console.log(data["text"]);
    };
    socket.onclose = function (e) {
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
    autoCloseBrackets: true,
    foldcode: true,
    lineNumbers: true,
    autoRefresh: true,
    viewportMargin: 1,
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
    if (ele_id === "input-btn") {
      changeShowMode(true);
      setInputBtnClass("positive ui left attached button");
      setOutputBtnClass("right attached ui button");
    } else {
      changeShowMode(false);
      setInputBtnClass("ui left attached button");
      setOutputBtnClass("positive right attached ui button");
    }
    console.log(e.target.id);
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="problem-page-right-container p-2"
    >
      <div className="dropdown-container flex justify-around p-10">
        <div>
          <label className="font-semibold">Theme : </label>
          <select
            class="border border-gray-700 hover:border-custom-bg rounded-full text-white h-10 ml-2 pl-5 pr-10 bg-gray-800 focus:outline-none appearance-none transition-all ease-out scrollbar-hide"
            onChange={(e) => handleThemeChange(e)}
          >
            <option className="" value={currTheme.value}>
              {currTheme.label}
            </option>
            {renderThemeList}
          </select>
        </div>
        <div>
          <label className="font-semibold">Language : </label>
          <select
            class="border border-gray-700 hover:border-custom-bg rounded-full text-white h-10 ml-2 pl-5 pr-10 bg-gray-800 focus:outline-none appearance-none transition-all ease-out"
            onChange={(e) => handleLangChange(e)}
          >
            <option value={currLang.value}>{currLang.label}</option>
            {renderLangList}
          </select>
        </div>

        {/* TOP RIGHT ICONS */}
        <div className="space-x-1 flex">
          <Tooltip className="bg-none" placement="top" title="Save">
            <Button ghost style={{ border: "none", fontSize: 20 }}>
              <MdSaveAlt />
            </Button>
          </Tooltip>

          <Tooltip className="bg-none" placement="top" title="Upload">
            <Button ghost style={{ border: "none", fontSize: 20 }}>
              <AiOutlineUpload />
            </Button>
          </Tooltip>

          <Tooltip className="bg-none" placement="top" title="Download Code">
            <Button
              onClick={() => download("code" + currLang.ext, editorValue)}
              ghost
              style={{ border: "none", fontSize: 20 }}
            >
              <BsCloudArrowUp />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div>
        {CodeMirror && (
          <CodeMirror
            className="my-code-editor text-base"
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
        {/* <div className="flex items-center space-x-5">
          <button
            className="flex items-center space-x-2 bg-custom-bg hover:bg-[#7220c4] transition-all ease-out p-2 px-8 rounded-lg"
            onClick={handleCompileCode}
          >
            <BiRefresh className="text-lg" />
            <span className="font-semibold">Compile</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-custom-bg hover:bg-[#7220c4] transition-all ease-out p-2 px-5  rounded-lg"
            onClick={handleRunCode}
          >
            <VscRunAll />
            <span>Run</span>
          </button>
        </div> */}
        {/* <div onClick={handeCustomInput} className="space-x-2">
          <Switch
            defaultChecked
            style={{ backgroundColor: "#7220c4", color: "#fff" }}
            checked={customInput}
          />
          <label>Custom Input</label>
        </div> */}
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
      {/* <div className="flex p-4 justify-evenly">
        <button
          // className={inputBtnClass}
          className="flex items-center space-x-2 bg-custom-bg hover:bg-[#7220c4] transition-all ease-out p-2 px-8  rounded-lg"
          id="input-btn"
          onClick={(e) => handleShowMode(e)}
        >
          Input
        </button>
        <button
          // className={outputBtnClass}
          className="flex items-center space-x-2 bg-custom-bg hover:bg-[#7220c4] transition-all ease-out p-2 px-8  rounded-lg"
          id="output-btn"
          onClick={(e) => handleShowMode(e)}
        >
          Output
        </button>
      </div> */}

      {/* <div className="cursor-pointer mt-10 text-xl flex items-center p-2">
        <BsTerminal onClick={() => setShowConsole(!showConsole)} />
        <span className="ml-2 text-sm">Console</span>
      </div> */}

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
                  label="Input"
                  {...a11yProps(0)}
                />
                <Tab
                  onClick={(e) => handleShowMode(e)}
                  label="Ouput"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <textarea
                className="w-full bg-gray-800 outline-none rounded-lg p-1 text-lg"
                rows="6"
                id="input-btn"
                placeholder="Custom Input here"
                value={inputValue}
                onChange={(e) => changeInputValue(e.target.value)}
                spellcheck="false"
              ></textarea>
            </TabPanel>

            <TabPanel value={value} index={1}>
              {/* <textarea
           className="w-full bg-gray-800 outline-none rounded-lg p-1 text-lg"
           rows="6"
           id="output-btn"
           value={outputValue}
           disabled={false}
           spellcheck="false"
          //  readOnly={true}
         ></textarea> */}
              <span className="loader"></span>
              <p className="text-center font-bold">{outputValue}</p>
            </TabPanel>
          </Box>
        </div>
      )}
    </div>
  );
};

export default React.memo(Editor);
