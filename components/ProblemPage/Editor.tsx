import React, { useState, useEffect, FC, ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";

import Cookies from "js-cookie";
import { connect, useDispatch, useSelector } from "react-redux";
import { AiFillGithub, AiOutlineSend } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { VscRunAll } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
import { BsCheck2Circle } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { Alert, Button, Group, Loader, Text, Textarea, UnstyledButton } from '@mantine/core';

import terminal from "../../public/terminal.svg";
import { base64_encode } from "./Helper2";
require("codemirror/lib/codemirror.css");
import { googleLoginApi, runTestCases, submitCode } from "../api/apis";
import { updateUserinfo } from "../../redux/actions";
import {
  changeEditorValue,
  changeSubmissionCount,
  changeGetSubmissionsListAppendData,
  changeLanguage,
  changeFont,
} from "../../redux/actions/ProblemPage";
import Encodemail from "../Helper/Encodemail";
import Parsetoken from "../Helper/Parsetoken";
import Header from "./Header";
import SmoothList from "react-smooth-list";
import GitHubLogin from "react-github-login";
import { githubLogin, googleLogin } from "../../redux/actions/authenticate";
import { TabView, TabPanel as Panel } from "primereact/tabview";
import {
  editorLanguageI,
  submissionResultI,
  submissionsListI,
  themeI,
  userDataI,
} from "../../redux/interfaces";
import { IRootState } from "../../redux/reducers";
import {BsTerminal} from "react-icons/bs";

let CodeMirror = null;
const FONT_SIZE = 51;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  CodeMirror = require("react-codemirror2").Controlled;
  require("codemirror/mode/yaml/yaml");

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

interface Props {
  editorValue: string;
  themeValue: themeI;
  editorLanguage: editorLanguageI;
  fontSize: string;
  problemPageProblemId: number;
  submissionCount: number;
  email: string;
  codeRunner: (value: boolean) => void;
  result: (value: submissionResultI | {}) => void;
  currentTabFunction: (value: number) => void;
  githubSpinner?: any;
}

const Editor: FC<Props> = (props): ReactElement => {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  let [customInput, setCustomInput] = useState<boolean>(false);
  let [inputValue, changeInputValue] = useState<string>("");
  let [outputValue, changeOutputValue] = useState<string>(
    "You must run your code first."
  );
  let [showMode, changeShowMode] = useState<boolean>(true);
  const [showConsole, setShowConsole] = useState<boolean>(false);
  let [showLoader, setShowLoader] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [testCaseResult, setTestCaseResult] = useState<any>()

  const { is_logged_in } = useSelector((state: IRootState) => state.userData);
  const totalSampleTestCases  = useSelector((state: IRootState) => state.problemData.sample_Tc);

  useEffect(() => {
    return () => {
      dispatch(
        changeEditorValue(
          "#include<iostream>\nusing namespace std;\n\nint main(){\n\n  return 0;\n}"
        )
      );
      dispatch(
        changeLanguage({
          label: "C++",
          value: "text/x-c++src",
          ext: ".cpp",
          icon: "SiCplusplus",
        })
      );
    };
  }, []);

  const closeHandler = (): void => {
    setIsModalVisible(false);
  };

  const {
    editorValue,
    themeValue,
    editorLanguage,
    fontSize,
    problemPageProblemId,
    submissionCount,
    email,
  } = props;

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const changeCode = (data) => {
  //   dispatch(changeEditorValue(data));
  // };

  const handleRunCode = async () => {
    setIsDisabled(true);
    if (!Cookies.get("refresh")) {
      setIsModalVisible(true);
      setIsDisabled(false);
      console.error("Login Required !!");
      return;
    }
    setShowLoader(true);
    setShowConsole(true);
    setActiveIndex(1);

    await runTestCases
      .post("/", {
        problem_Id: problemPageProblemId,
        code: base64_encode(editorValue),
        language: editorLanguage.label,
      })
      .then((result) => {
        console.log("result", result.data);
        setTestCaseResult(result.data)
        setIsDisabled(false);
        setShowLoader(false);
        if (result.data["status"] !== "Accepted") {
          changeOutputValue(
            result.data["status"] + "\n" + result.data["error"]
          );
        } else {
          changeOutputValue(result.data["status"]);
        }
      });
  };

  const handleSubmitCode = async () => {
    setIsSubmitDisabled(true);
    if (!Cookies.get("refresh")) {
      setIsModalVisible(true);
      setIsSubmitDisabled(false);
      console.error("Login Required !!");
      return;
    }
    const encoded_mail = Encodemail(email);
    var socket = new WebSocket(
      `ws://34.131.70.37:8001/ws/runcode/${encoded_mail}/`
    );
    // var socket = new WebSocket(
    //   `ws://localhost:8000/ws/runcode/${encoded_mail}/`
    // );
    socket.onopen = async function (e) {
      props.currentTabFunction(1);
      props.codeRunner(true);
      props.result({});
      console.log("opened");
      await submitCode.post("/", {
        problem_Id: problemPageProblemId,
        language: editorLanguage.label,
        code: base64_encode(editorValue),
      });
    };
    socket.onmessage = async function (e) {
      var data = JSON.parse(e.data);
      if (data["inc_submissions"]) {
        //Inc submission count
        console.log(true);
      }
      if (!data["is_testcase"]) {
        dispatch(changeSubmissionCount(submissionCount + 1));
        var problemResult: submissionResultI = JSON.parse(data["text"])[0][
          "fields"
        ];
        props.result(problemResult);
        var appendData: submissionsListI = {
          status: problemResult.status,
          score: problemResult.score,
          language: problemResult.language,
          submission_Date_Time: problemResult.submission_Date_Time,
          total_score: problemResult.total_score,
        };
        dispatch(changeGetSubmissionsListAppendData(appendData));
      } else {
        console.log(data["text"]);
      }
    };
    socket.onclose = function (e) {
      props.codeRunner(false);
      setIsSubmitDisabled(false);
      console.log("closed");
    };
  };

  let options = {
    mode: editorLanguage.value,
    theme: themeValue.value,
    lineWrapping: true,
    smartIndent: true,
    foldGutter: true,
    lint: true,
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers",
    ],
    tabSize: 2,
    indentWithTabs: true,
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
      F11: (cm: any) => {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      Esc: (cm: any) => {
        if (cm.getOption("fullScreen")) {
          cm.setOption("fullScreen", false);
        }
      },
      // Tab: "autocomplete",
    },
  };

  const responseGoogleSuccess = async (data) => {
    try {
      await googleLoginApi
        .post("/", { auth_token: data["tokenId"] })
        .then((result: any) => {
          let access: string = result.data.access;
          let refresh: string = result.data.refresh;
          const data: userDataI = Parsetoken(access);
          if (data.is_verified) {
            setIsModalVisible(false);
            Cookies.set("access", access);
            Cookies.set("refresh", refresh, { expires: 14 });
            dispatch(
              updateUserinfo({
                is_logged_in: true,
                is_verified: data.is_verified,
                is_admin: data.is_admin,
                email: data.email,
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

  const antIcon = "Loading..."

  const handleConsole = () => {
    setActiveIndex(1);
    setShowConsole(!showConsole);
  };

  console.log('test cases result', testCaseResult)

  const successArray = Array.apply(null, Array(totalSampleTestCases)).map(function (x, i) { return i; })
  
  const handleOutput = () => {
    if(showLoader){
      return <Loader className="w-full md:h-10 lg:h-20 xl:h-24 mt-10 flex justify-center items-center" color="violet" variant="bars" />
    }else if(!testCaseResult && showConsole){
      return (
        <div className="w-full md:h-10 lg:h-20 xl:h-24 mt-10 flex justify-center items-center">
          <pre className="text-2xl font-bold">{outputValue}</pre>
          </div>
      )
    }else {
      if(testCaseResult.status === 'Accepted') {
          return (
            <div className="pl-4">
              <pre className="text-left mb-4 text-4xl font-bold text-green-500">
                <span className="inline-flex items-center gap-4">
                <BsCheck2Circle/>
                {outputValue}
                </span>
              </pre>
              <h1 className="text-left text-slate-400 tracking-wider text-2xl font-bold">{totalSampleTestCases}/{totalSampleTestCases} Test Cases Passed</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {successArray.map(index => <Alert children="" key={index} style={{ marginTop: 20, maxWidth:'13rem', maxHeight:'5rem' }} icon={<BsCheck2Circle size={16} />} variant="filled" title={`Test Case ${index + 1}`} color="green" radius="lg"/>)}
              </div>
            </div>
          )
      }else if(testCaseResult.status === 'error'){
        return (
          <div className="pl-4">
              <pre className="text-left mb-4 text-4xl font-bold text-red-500">
                <span className="inline-flex items-center gap-4">
                <ImCross/>
                {testCaseResult.error}
                </span>
              </pre>
              <h1 className="text-left text-slate-400 tracking-wider text-2xl font-bold">{testCaseResult['testCase No'] - 1}/{totalSampleTestCases} Test Cases Passed</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {successArray.map(index => <Alert children="" key={index} style={{ marginTop: 20, maxWidth:'13rem', maxHeight:'5rem' }} icon={<ImCross size={16} />} variant="filled" title={`Test Case ${index + 1}`} color={`${index + 1 < testCaseResult.error ? 'green' : 'red'}`} radius="lg"/>)}
              </div>
          </div>
        )
      }else {
        return <pre className="text-left font-bold">{outputValue}</pre>
      }
    }
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="problem-page-right-container p-2"
    >
      <Header />
      <div>
        {CodeMirror && (
          <CodeMirror
            className={`my-code-editor scrollbar-hide text-[${FONT_SIZE}px]`}
            value={editorValue}
            options={options}
            onBeforeChange={(_: any, __: any, value: string) => {
              dispatch(changeEditorValue(value));
            }}
          />
        )}
      </div>
      <div className="editor-options-container mt-10 flex space-x-5 justify-between items-center p-2">
        <UnstyledButton className="text-white text-base font-semibold" onClick={handleConsole} leftIcon={<BsTerminal/>}>
          <Group>
            <BsTerminal/>
          <div>
            <Text>Console</Text>
          </div>
        </Group>

        </UnstyledButton>
        <div className="flex space-x-3">
          <SmoothList>
            <Button
              className="text-black"
              leftIcon={<VscRunAll className="text-lg group-hover:animate-bounce" />}
              onClick={handleRunCode}
              disabled={isDisabled}
              loading={isDisabled}
              variant="white"
              radius="xl"
            >     
              Run
            </Button>
          </SmoothList>
          <SmoothList>
            <Button
              className="text-black"
              leftIcon={<AiOutlineSend className="text-lg group-hover:rotate-45 transition-all ease-in-out" />}
              onClick={handleSubmitCode}
              disabled={isSubmitDisabled}
              loading={isSubmitDisabled}
              variant="white"
              radius="xl"
            >     
              Submit
            </Button>
          </SmoothList>
        </div>
      </div>
      {showConsole && (
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="tabview-custom"
        >
          {" "}
          <Panel
            disabled={!is_logged_in}
            header="Output"
            leftIcon={!is_logged_in && "pi pi-lock"}
          >
            {handleOutput()}
          </Panel>
          <Panel
            disabled={!is_logged_in}
            header="Input"
            leftIcon={!is_logged_in && "pi pi-lock"}
          >
            <textarea
              className="w-full placeholder:text-base placeholder:p-1 bg-gray-800 border-none text-white outline-none rounded-lg p-1 text-lg"
              rows={6}
              id="input-btn"
              placeholder="Custom Input here"
              value={inputValue}
              onChange={(e) => changeInputValue(e.target.value)}
              spellCheck="false"
            ></textarea>
          </Panel>
        </TabView>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    editorValue: state.editorValue,
    themeValue: state.themeValue,
    editorLanguage: state.editorLanguage,
    fontSize: state.fontSize,
    problemPageProblemId: state.problemPageProblemId,
    submissionCount: state.submissionCount,
    email: state.userData.email,
  };
};

export default connect(mapStateToProps)(Editor);
