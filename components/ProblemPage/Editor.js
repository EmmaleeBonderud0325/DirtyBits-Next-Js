// import React, { useState } from "react";
// import { Controlled as CodeMirror } from "react-codemirror2";
// import { base64_decode, base64_encode, download } from "./Helper2";

// import "codemirror/lib/codemirror.css";
// import "./Editor.module.css";

// import "codemirror/theme/ayu-mirage.css";
// import "codemirror/theme/base16-dark.css";
// import "codemirror/theme/base16-light.css";
// import "codemirror/theme/bespin.css";
// import "codemirror/theme/dracula.css";
// import "codemirror/theme/duotone-light.css";
// import "codemirror/theme/eclipse.css";
// import "codemirror/theme/elegant.css";
// import "codemirror/theme/gruvbox-dark.css";
// import "codemirror/theme/hopscotch.css";
// import "codemirror/theme/icecoder.css";
// import "codemirror/theme/idea.css";
// import "codemirror/theme/lucario.css";
// import "codemirror/theme/material-darker.css";
// import "codemirror/theme/material-palenight.css";
// import "codemirror/theme/material.css";
// import "codemirror/theme/mbo.css";
// import "codemirror/theme/mdn-like.css";
// import "codemirror/theme/monokai.css";
// import "codemirror/theme/moxer.css";
// import "codemirror/theme/neat.css";
// import "codemirror/theme/neo.css";
// import "codemirror/theme/oceanic-next.css";
// import "codemirror/theme/panda-syntax.css";
// import "codemirror/theme/railscasts.css";
// import "codemirror/theme/rubyblue.css";
// import "codemirror/theme/seti.css";
// import "codemirror/theme/shadowfox.css";
// import "codemirror/theme/ssms.css";
// import "codemirror/theme/the-matrix.css";
// import "codemirror/theme/tomorrow-night-eighties.css";
// import "codemirror/theme/ttcn.css";
// import "codemirror/theme/xq-light.css";

// // Languages
// import "codemirror/mode/clojure/clojure";
// import "codemirror/mode/go/go";
// import "codemirror/mode/haskell/haskell";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/pascal/pascal";
// import "codemirror/mode/perl/perl";
// import "codemirror/mode/php/php";
// import "codemirror/mode/python/python";
// import "codemirror/mode/r/r";
// import "codemirror/mode/ruby/ruby";
// import "codemirror/mode/rust/rust";
// import "codemirror/mode/swift/swift";

// // Addons
// import "codemirror/addon/hint/show-hint";
// import "codemirror/addon/hint/javascript-hint";
// import "codemirror/addon/hint/show-hint.css";
// import "codemirror/addon/edit/closebrackets";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/fold/foldcode";
// import "codemirror/addon/fold/foldgutter";
// import "codemirror/addon/fold/brace-fold";
// import "codemirror/addon/fold/comment-fold";
// import "codemirror/addon/display/placeholder";
// import "codemirror/addon/display/fullscreen";
// import "codemirror/addon/search/match-highlighter";
// import "codemirror/addon/display/fullscreen.css";
// import "codemirror/addon/fold/foldgutter.css";
// import "codemirror/keymap/sublime";
// // import { runCode } from "../App/Apis";

// const jsonData = require("./data.json");

// function Editor() {
//   let [editorValue, changeEditorValue] = useState(
//     "#include<iostream>\nusing namespace std;\n\nint main(){\n\n\treturn 0;\n}"
//   );
//   let [currTheme, setCurrTheme] = useState({
//     label: "Dracula",
//     value: "dracula",
//     type: "dark",
//   });
//   let [currLang, setCurrLang] = useState({
//     label: "C++ 17",
//     value: "text/x-c++src",
//     ext: ".cpp",
//   });

//   let [customInput, setCustomInput] = useState(false);
//   let [inputValue, changeInputValue] = useState("");
//   let [outputValue, changeOutputValue] = useState("");
//   let [showMode, changeShowMode] = useState(true);
//   let [inputBtnClass, setInputBtnClass] = useState(
//     "positive ui left attached button"
//   );
//   let [outputBtnClass, setOutputBtnClass] = useState(
//     "right attached ui button"
//   );

//   const changeCode = (data) => {
//     changeEditorValue(data);
//   };

//   // const handleKeyUp = (editor, event) => {
//   //   if (editor.state.completionActive) {
//   //     return;
//   //   }
//   //   var cur = editor.getCursor();
//   //   var token = editor.getTokenAt(cur);
//   //   if (token.type && token.type !== "comment" && event.keyCode !== 13) {
//   //     editor.showHint({ completeSingle: false });
//   //   }
//   // };

//   const renderThemeList = jsonData.theme.map((item) => {
//     if (currTheme.value !== item.value) {
//       return <option value={item.value}>{item.label}</option>;
//     }
//     return <></>;
//   });

//   const renderLangList = jsonData.language.map((item) => {
//     if (currLang.label !== item.label) {
//       return <option value={item.value}>{item.label}</option>;
//     }
//     return <></>;
//   });

//   const handleThemeChange = (e) => {
//     for (let i = 0; i < jsonData.theme.length; i++) {
//       if (jsonData.theme[i].value === e.target.value) {
//         setCurrTheme({
//           ...currTheme,
//           value: e.target.value,
//           label: jsonData.theme[i].label,
//           type: jsonData.theme[i].type,
//         });
//         return;
//       }
//     }
//   };

//   const handleLangChange = (e) => {
//     for (let i = 0; i < jsonData.language.length; i++) {
//       if (jsonData.language[i].value === e.target.value) {
//         setCurrLang({
//           ...currLang,
//           value: jsonData.language[i].value,
//           label: jsonData.language[i].label,
//           ext: jsonData.language[i].ext,
//         });
//         changeEditorValue(jsonData.language[i].pre);
//         return;
//       }
//     }
//   };

//   const handleCompileCode = async () => {};

//   const handleRunCode = async () => {
//     console.log(editorValue, currLang.label, inputValue);
//     await runCode
//       .post("/", {
//         code: base64_encode(editorValue),
//         lang: currLang.label,
//         input: base64_encode(inputValue),
//       })
//       .then((result) => {
//         changeShowMode(false);
//         setInputBtnClass("ui left attached button");
//         setOutputBtnClass("positive right attached ui button");
//         if (result.data["status"]["description"] === "Compilation Error") {
//           changeOutputValue(
//             result.data["status"]["description"] +
//               "\n\n" +
//               base64_decode(result.data["compile_output"])
//           );
//         } else if (
//           result.data["stdout"] &&
//           result.data["status"]["description"] === "Accepted"
//         ) {
//           changeOutputValue(base64_decode(result.data["stdout"]));
//         } else {
//           changeOutputValue(result.data["status"]["description"]);
//         }
//         console.log(result.data["status"]["description"]);
//         console.log(result.data);
//         // console.log(base64_decode(result.data["compile_output"]));
//       });
//   };

//   const handleSubmitCode = async () => {};

//   let options = {
//     mode: currLang.value,
//     theme: currTheme.value,
//     lineWrapping: true,
//     smartIndent: true,
//     foldGutter: true,
//     lint: true,
//     gutters: [
//       "CodeMirror-linenumbers",
//       "CodeMirror-foldgutter",
//       "CodeMirror-lint-markers",
//     ],
//     autoCloseTags: true,
//     keyMap: "sublime",
//     matchBrackets: true,
//     autoCloseBrackets: true,
//     foldcode: true,
//     lineNumbers: true,
//     autoRefresh: true,
//     viewportMargin: Infinity,
//     highlightSelectionMatches: {
//       minChars: 2,
//       style: "matchhighlight",
//     },
//     styleActiveLine: true,
//     styleActiveSelected: true,
//     extraKeys: {
//       F11: (cm) => {
//         cm.setOption("fullScreen", !cm.getOption("fullScreen"));
//       },
//       Esc: (cm) => {
//         if (cm.getOption("fullScreen")) {
//           cm.setOption("fullScreen", false);
//         }
//       },
//       // Tab: "autocomplete",
//     },
//   };

//   const handeCustomInput = (e) => {
//     setCustomInput(!customInput);
//   };

//   const handleShowMode = (e) => {
//     const ele_id = e.target.id;
//     if (ele_id === "input-btn") {
//       changeShowMode(true);
//       setInputBtnClass("positive ui left attached button");
//       setOutputBtnClass("right attached ui button");
//     } else {
//       changeShowMode(false);
//       setInputBtnClass("ui left attached button");
//       setOutputBtnClass("positive right attached ui button");
//     }
//     console.log(e.target.id);
//   };

//   return (
//     <div className="problem-page-right-container">
//       <div className="dropdown-container">
//         <div>
//           <label>Theme : </label>
//           <select
//             class="ui search dropdown"
//             onChange={(e) => handleThemeChange(e)}
//           >
//             <option value={currTheme.value}>{currTheme.label}</option>
//             {renderThemeList}
//           </select>
//         </div>
//         <div>
//           <label>Language : </label>
//           <select
//             class="ui search dropdown"
//             onChange={(e) => handleLangChange(e)}
//           >
//             <option value={currLang.value}>{currLang.label}</option>
//             {renderLangList}
//           </select>
//         </div>
//         <div className="ui small basic icon buttons editor-icons-container">
//           <button class="ui button">
//             <i class="save icon"></i>
//           </button>
//           <button class="ui button">
//             <i class="upload icon"></i>
//           </button>
//           <button
//             class="ui button"
//             onClick={() => download("code" + currLang.ext, editorValue)}
//           >
//             <i class="download icon"></i>
//           </button>
//         </div>
//       </div>
//       <CodeMirror
//         className="my-code-editor"
//         value={editorValue}
//         options={options}
//         onBeforeChange={(editor, data, value) => changeCode(value)}
//         //   onChange={(editor, data, value) => changeCode(value)}
//         // onKeyUp={(editor, event) => {
//         //   handleKeyUp(editor, event);
//         // }}
//       />
//       <div className="editor-options-container">
//         <div className="left-side-editor-buttons">
//           <button
//             className="ui labeled icon right float button"
//             onClick={handleCompileCode}
//           >
//             <i className="file alternate icon"></i>
//             Compile
//           </button>
//           <button
//             className="ui right float right labeled icon button"
//             onClick={handleRunCode}
//           >
//             <i className="play icon"></i>
//             Run
//           </button>
//           <div
//             class="ui toggle checkbox custom-test-checkbox"
//             onClick={handeCustomInput}
//           >
//             <input type="checkbox" name="public" checked={customInput} />
//             <label>Custom Input</label>
//           </div>
//         </div>
//         <div className="right-side-editor-buttons">
//           <button
//             className="ui right float right labeled icon button"
//             onClick={handleSubmitCode}
//           >
//             <i className="paper plane icon"></i>
//             Submit
//           </button>
//         </div>
//       </div>
//       <div className="in-out-button-container">
//         <button
//           className={inputBtnClass}
//           id="input-btn"
//           onClick={(e) => handleShowMode(e)}
//         >
//           Input
//         </button>
//         <button
//           className={outputBtnClass}
//           id="output-btn"
//           onClick={(e) => handleShowMode(e)}
//         >
//           Output
//         </button>
//       </div>
//       <div className="ui form input-area">
//         {showMode ? (
//           <div class="field">
//             <textarea
//               rows="4"
//               value={inputValue}
//               onChange={(e) => changeInputValue(e.target.value)}
//               spellcheck="false"
//             ></textarea>
//           </div>
//         ) : (
//           <div className="field">
//             <textarea
//               rows="4"
//               value={outputValue}
//               disabled={false}
//               spellcheck="false"
//               readOnly={true}
//             ></textarea>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Editor;
