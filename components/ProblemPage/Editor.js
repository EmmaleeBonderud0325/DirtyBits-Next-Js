import React, { useState } from "react";
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
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineUpload } from "react-icons/ai";
import { BsCloudArrowUp } from "react-icons/bs";
import { VscRunAll } from "react-icons/vsc";
import { BiRefresh } from "react-icons/bi";

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

import { runCode, submitCode } from "../api/apis";
import Cookies from "js-cookie";
import Gettoken from "../Helper/Gettoken";
import Encodemail from "../Helper/Encodemail";

const jsonData = require("./data.json");

function Editor() {
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
  let [outputValue, changeOutputValue] = useState("");
  let [showMode, changeShowMode] = useState(true);
  let [inputBtnClass, setInputBtnClass] = useState(
    "positive ui left attached button"
  );
  let [outputBtnClass, setOutputBtnClass] = useState(
    "right attached ui button"
  );

  const changeCode = (data) => {
    changeEditorValue(data);
  };

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
    await Gettoken(Cookies.get("refresh"));
    await runCode
      .post(
        "/",
        {
          code: base64_encode(editorValue),
          lang: currLang.label,
          input: base64_encode(inputValue),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${Cookies.get("access")}`,
          },
        }
      )
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

  const handleSubmitCode = async () => {
    const encoded_mail = Encodemail("server@gmail.com");
    var socket = new WebSocket(
      `ws://db-code.herokuapp.com/ws/runcode/${encoded_mail}/`
    );
    socket.onopen = async function (e) {
      console.log("opened");
      await submitCode.post("/", {
        problem_Id: 4,
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
    <div className="problem-page-right-container p-5">
      <div className="dropdown-container flex justify-around pb-4 ">
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
        <div className="ui small basic icon buttons editor-icons-container space-x-4 text-xl">
          <button class="ui button">
            <MdSaveAlt />
          </button>
          <button class="ui button">
            <AiOutlineUpload />
          </button>
          <button
            class="ui button"
            onClick={() => download("code" + currLang.ext, editorValue)}
          >
            <BsCloudArrowUp />
          </button>
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
            <BiRefresh className="text-lg" />
            <span>Compile</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-custom-bg hover:bg-[#7220c4] transition-all ease-out p-2 px-8  rounded-lg"
            onClick={handleRunCode}
          >
            <VscRunAll />
            <span>Run</span>
          </button>
        </div>
        <div
          class="ui toggle checkbox custom-test-checkbox"
          onClick={handeCustomInput}
        >
          <input type="checkbox" name="public" checked={customInput} />
          <label>Custom Input</label>
        </div>
        <div className="right-side-editor-buttons">
          <button
            className=" flex items-center space-x-2 bg-custom-bg hover:bg-[#7220c4] transition-all ease-out p-2 px-8  rounded-lg"
            onClick={handleSubmitCode}
          >
            <VscRunAll />
            <span>Submit</span>
          </button>
        </div>
      </div>
      <div className="in-out-button-container">
        <button
          className={inputBtnClass}
          id="input-btn"
          onClick={(e) => handleShowMode(e)}
        >
          Input
        </button>
        <button
          className={outputBtnClass}
          id="output-btn"
          onClick={(e) => handleShowMode(e)}
        >
          Output
        </button>
      </div>
      <div className="ui form input-area">
        {showMode ? (
          <div class="field form-textarea mt-1 block w-full">
            <textarea
              className="w-3/6"
              rows="4"
              cols="20"
              value={inputValue}
              onChange={(e) => changeInputValue(e.target.value)}
              spellcheck="false"
            ></textarea>
          </div>
        ) : (
          <div className="field w-full">
            <textarea
              rows="4"
              value={outputValue}
              disabled={false}
              spellcheck="false"
              readOnly={true}
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default Editor;
