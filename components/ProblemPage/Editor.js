import { useState } from "react";
// import { Controlled as CodeMirror } from "react-codemirror2";
import { base64_decode, base64_encode, download } from "./Helper2";

// import dynamic from "next/dynamic";
// const CodeMirror = dynamic(
//   async () => {
//     import("codemirror/mode/javascript/javascript");
//     return import("react-codemirror2").then((mod) => mod.Controlled);
//   },
//   { ssr: false }
// );
import {MdSaveAlt} from 'react-icons/md'
import {AiOutlineUpload} from 'react-icons/ai'
import {BsCloudArrowUp, BsTerminal} from 'react-icons/bs'
import {VscRunAll} from 'react-icons/vsc'
import {BiRefresh} from 'react-icons/bi'
import {Button, Switch, Tooltip, Drawer, } from 'antd'

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    'aria-controls': `simple-tabpanel-${index}`,
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

// import "codemirror/lib/codemirror.css";
//   import "./Editor.module.css";

//   import "codemirror/theme/ayu-mirage.css";
//   import "codemirror/theme/base16-dark.css";
//   import "codemirror/theme/base16-light.css";
//   import "codemirror/theme/bespin.css";
//   import "codemirror/theme/dracula.css";
//   import "codemirror/theme/duotone-light.css";
//   import "codemirror/theme/eclipse.css";
//   import "codemirror/theme/elegant.css";
//   import "codemirror/theme/gruvbox-dark.css";
//   import "codemirror/theme/hopscotch.css";
//   import "codemirror/theme/icecoder.css";
//   import "codemirror/theme/idea.css";
//   import "codemirror/theme/lucario.css";
//   import "codemirror/theme/material-darker.css";
//   import "codemirror/theme/material-palenight.css";
//   import "codemirror/theme/material.css";
//   import "codemirror/theme/mbo.css";
//   import "codemirror/theme/mdn-like.css";
//   import "codemirror/theme/monokai.css";
//   import "codemirror/theme/moxer.css";
//   import "codemirror/theme/neat.css";
//   import "codemirror/theme/neo.css";
//   import "codemirror/theme/oceanic-next.css";
//   import "codemirror/theme/panda-syntax.css";
//   import "codemirror/theme/railscasts.css";
//   import "codemirror/theme/rubyblue.css";
//   import "codemirror/theme/seti.css";
//   import "codemirror/theme/shadowfox.css";
//   import "codemirror/theme/ssms.css";
//   import "codemirror/theme/the-matrix.css";
//   import "codemirror/theme/tomorrow-night-eighties.css";
//   import "codemirror/theme/ttcn.css";
//   import "codemirror/theme/xq-light.css";

//   // Languages
//   import "codemirror/mode/clojure/clojure";
//   import "codemirror/mode/go/go";
//   import "codemirror/mode/haskell/haskell";
//   import "codemirror/mode/javascript/javascript";
//   import "codemirror/mode/pascal/pascal";
//   import "codemirror/mode/perl/perl";
//   import "codemirror/mode/php/php";
//   import "codemirror/mode/python/python";
//   import "codemirror/mode/r/r";
//   import "codemirror/mode/ruby/ruby";
//   import "codemirror/mode/rust/rust";
//   import "codemirror/mode/swift/swift";

//   // Addons
//   import "codemirror/addon/hint/show-hint";
//   import "codemirror/addon/hint/javascript-hint";
//   import "codemirror/addon/hint/show-hint.css";
//   import "codemirror/addon/edit/closebrackets";
//   import "codemirror/addon/edit/closetag";
//   import "codemirror/addon/fold/foldcode";
//   import "codemirror/addon/fold/foldgutter";
//   import "codemirror/addon/fold/brace-fold";
//   import "codemirror/addon/fold/comment-fold";
//   import "codemirror/addon/display/placeholder";
//   import "codemirror/addon/display/fullscreen";
//   import "codemirror/addon/search/match-highlighter";
//   import "codemirror/addon/display/fullscreen.css";
//   import "codemirror/addon/fold/foldgutter.css";
//   import "codemirror/keymap/sublime";
// import { runCode } from "../App/Apis";

const jsonData = require("./data.json");

const Editor = () => {
  let [editorValue, changeEditorValue] = useState(
    "#include<iostream>\nusing namespace std;\n\nint main(){\n\n\treturn 0;\n}"
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
  let [outputValue, changeOutputValue] = useState("");
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
  console.log('editor rendered')


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
      return <option className="" value={item.value}>{item.label}</option>;
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
    await runCode
      .post("/", {
        code: base64_encode(editorValue),
        lang: currLang.label,
        input: base64_encode(inputValue),
      })
      .then((result) => {
        changeShowMode(false);
        setInputBtnClass("ui left attached button");
        setOutputBtnClass("positive right attached ui button");
        if (result.data["status"]["description"] === "Compilation Error") {
          changeOutputValue(
            result.data["status"]["description"] +
              "\n\n" +
              base64_decode(result.data["compile_output"])
          );
        } else if (
          result.data["stdout"] &&
          result.data["status"]["description"] === "Accepted"
        ) {
          changeOutputValue(base64_decode(result.data["stdout"]));
        } else {
          changeOutputValue(result.data["status"]["description"]);
        }
        console.log(result.data["status"]["description"]);
        console.log(result.data);
        // console.log(base64_decode(result.data["compile_output"]));
      });
  };

  const handleSubmitCode = async () => {};

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
    <div className="problem-page-right-container p-2 ">
      <div className="dropdown-container flex justify-around p-10 ">
        <div>
          <label className="font-semibold">Theme : </label>
          <select
            class="border border-gray-700 hover:border-custom-bg rounded-full text-white h-10 pl-5 pr-10 bg-gray-800 focus:outline-none appearance-none transition-all ease-out scrollbar-hide"
            onChange={(e) => handleThemeChange(e)}
          >
            <option className="" value={currTheme.value}>{currTheme.label}</option>
            {renderThemeList}
          </select>
        </div>
        <div>
          <label className="font-semibold">Language : </label>
          <select
            class="border border-gray-700 hover:border-custom-bg rounded-full text-white h-10 pl-5 pr-10 bg-gray-800 focus:outline-none appearance-none transition-all ease-out"
            onChange={(e) => handleLangChange(e)}
          >
            <option value={currLang.value}>{currLang.label}</option>
            {renderLangList}
          </select>
        </div>
      
        {/* TOP RIGHT ICONS */}
        <div className="space-x-1 flex">
          
          <Tooltip className="bg-none" placement="top" title="Save">
            <Button ghost style={{border:'none', fontSize:20}}>
              <MdSaveAlt/>
            </Button>
          </Tooltip>

          <Tooltip className="bg-none" placement="top" title="Upload">
            <Button ghost style={{border:'none', fontSize:20}}>
              <AiOutlineUpload/>
            </Button>
          </Tooltip>

          <Tooltip className="bg-none" placement="top" title="Download Code">
            <Button onClick={() => download("code" + currLang.ext, editorValue)} ghost style={{border:'none', fontSize:20}}>
              <BsCloudArrowUp/>
            </Button>
          </Tooltip>

        </div>

      </div>
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
      <div className="editor-options-container mt-10 flex space-x-5 justify-between items-center">
        <div className="flex items-center space-x-5">
          <button
            className="flex items-center space-x-2 bg-custom-bg hover:bg-[#7220c4] transition-all ease-out p-2 px-8 rounded-lg"
            onClick={handleCompileCode}
          >
             <BiRefresh className="text-lg"/>
            <span>Compile</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-custom-bg hover:bg-[#7220c4] transition-all ease-out p-2 px-8  rounded-lg"
            onClick={handleRunCode}
          >
            <VscRunAll/>
            <span>Run</span>
          </button>
        </div>
          <div
            onClick={handeCustomInput}
            className="space-x-2"
          >
            {/* <input type="checkbox" name="public" checked={customInput} /> */}
            <Switch
              defaultChecked
              style={{backgroundColor: "#7220c4", color: "#fff"}}
              checked={customInput}
            />
            <label>Custom Input</label>
          </div>
        <div className="right-side-editor-buttons">
          <button
            className=" flex items-center space-x-2 bg-custom-bg hover:bg-[#7220c4] transition-all ease-out p-2 px-8  rounded-lg"
            onClick={handleSubmitCode}
          >

             <VscRunAll/>
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

      <div className="cursor-pointer mt-10 text-xl flex items-center">
        <BsTerminal onClick={() => setShowConsole(!showConsole)}/><span className="ml-2 text-sm">Console</span>
      </div>

        {
          showConsole && (
            <div className="absolute bottom-0 w-full transition-all ease-in-out duration-75">       
        <Box sx={{ width: '100%',}}>
   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
     <Tabs value={value} textColor="inherit" indicatorColor="secondary" onChange={handleChange} aria-label="basic tabs example">
       <Tab onClick={(e) => handleShowMode(e)} label="Input" {...a11yProps(0)} />
       <Tab onClick={(e) => handleShowMode(e)} label="Ouput" {...a11yProps(1)} />
     </Tabs>
   </Box>
   <TabPanel value={value} index={0}>
             <textarea
            className="w-3/6 bg-gray-800 outline-none rounded-lg p-1 text-lg"
            rows="4"
            id="input-btn"
            cols="20"
            value={inputValue}
            onChange={(e) => changeInputValue(e.target.value)}
            spellcheck="false"
          ></textarea>
   </TabPanel>
   
   <TabPanel value={value} index={1}>
             <textarea
           className="w-full bg-gray-800 outline-none rounded-lg p-1 text-lg"
           rows="4"
           id="output-btn"
           value={outputValue}
           disabled={false}
           spellcheck="false"
           readOnly={true}
         ></textarea>
   </TabPanel>
 </Box>
   </div>
          )
        }
        
      
    </div>
  );
}

export default React.memo(Editor);
