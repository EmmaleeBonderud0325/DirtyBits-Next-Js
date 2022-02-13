import React, { useState, useEffect, FC, ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";

import Cookies from "js-cookie";
import { connect, useDispatch, useSelector } from "react-redux";
import { Modal, Text, Row } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import { AiFillGithub, AiOutlineSend } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { VscRunAll } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
import { BsCheck2Circle } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { Alert } from '@mantine/core';

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

let CodeMirror = null;
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
  result: (value: submissionResultI) => void;
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
  const [testCaseResult, setTestCaseResult] = useState()

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
      `wss://db-code.herokuapp.com/ws/runcode/${encoded_mail}/`
    );
    // var socket = new WebSocket(
    //   `ws://localhost:8000/ws/runcode/${encoded_mail}/`
    // );
    socket.onopen = async function (e) {
      props.currentTabFunction(1);
      props.codeRunner(true);
      // props.result({});
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

  // const handeCustomInput = (e) => {
  //   setCustomInput(!customInput);
  // };

  // const handleShowMode = (e) => {
  //   const ele_id = e.target.id;
  //   if (ele_id === "simple-tab-0") {
  //     changeShowMode(true);
  //   } else {
  //     changeShowMode(false);
  //   }
  // };

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

  const antIcon = <Loading type="points-opacity" size="sm" />;

  const handleConsole = () => {
    setActiveIndex(1);
    setShowConsole(!showConsole);
  };

  console.log('test cases result', testCaseResult)

  const successArray = Array.apply(null, Array(totalSampleTestCases)).map(function (x, i) { return i; })
  
  const handleOutput = () => {
    if(showLoader){
      return <span className="loader"></span>
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
                {successArray.map(index => <Alert key={index} style={{ marginTop: 20, maxWidth:'13rem', maxHeight:'5rem' }} icon={<BsCheck2Circle size={16} />} variant="filled" title={`Test Case ${index + 1}`} color="green" radius="lg"/>)}
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
                {successArray.map(index => <Alert key={index} style={{ marginTop: 20, maxWidth:'13rem', maxHeight:'5rem' }} icon={<ImCross size={16} />} variant="filled" title={`Test Case ${index + 1}`} color={`${index + 1 < testCaseResult.error ? 'green' : 'red'}`} radius="lg"/>)}
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
            className={`my-code-editor scrollbar-hide text-[${fontSize}]`}
            value={editorValue}
            options={options}
            onBeforeChange={(_: any, __: any, value: string) => {
              dispatch(changeEditorValue(value));
            }}
            //   onChange={(editor, data, value) => changeCode(value)}
            // onKeyUp={(editor, event) => {
            //   handleKeyUp(editor, event);
            // }}
          />
        )}
      </div>

      <div className="editor-options-container mt-10 flex space-x-5 justify-between items-center p-2">
        <button
          onClick={handleConsole}
          type="button"
          className="flex items-center space-x-2"
        >
          <Image src={terminal} width={20} height={20} alt="terminal image" />
          <span className="font-semibold text-base">Console</span>
        </button>
        <div className="flex space-x-3">
          <SmoothList>
            <button
              className="group flex items-center space-x-2 login-btn bg-white text-black font-semibold"
              onClick={handleRunCode}
              disabled={isDisabled}
            >
              {isDisabled ? (
                <span className="w-[51px] flex justify-center items-center h-5">
                  {<Loading type="spinner" size="sm" />}
                </span>
              ) : (
                <>
                  <VscRunAll className="text-lg group-hover:animate-bounce" />
                  <span>Run</span>
                </>
              )}
            </button>
          </SmoothList>
          <SmoothList>
            <button
              className="group flex items-center space-x-2 login-btn bg-white text-black font-semibold"
              onClick={handleSubmitCode}
              disabled={isSubmitDisabled}
            >
              <AiOutlineSend className="text-lg group-hover:rotate-45 transition-all ease-in-out" />
              <span>Submit</span>
            </button>
          </SmoothList>
        </div>
      </div>

      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={isModalVisible}
        onClose={closeHandler}
        style={{ background: "black", color: "white" }}
      >
        <Modal.Header>
          <Text color="#fff" id="modal-title" size={18}>
            Welcome to{" "}
            <Text color="primary" b size={18}>
              DirtyBits
            </Text>
          </Text>
        </Modal.Header>
        <Row justify="center" className="mb-4">
          <button className="social-login-btn bg-custom-yellow2 w-1/2 border border-white">
            <MdCreate />
            <span>
              <Link href="/auth/signup">
                <a className="text-white hover:text-white">Sign Up</a>
              </Link>
            </span>
          </button>
        </Row>
        <Text color="#fff">OR</Text>
        <div className="pb-3">
          <Row justify="center">
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="social-login-btn w-1/2 border border-white"
                >
                  <FcGoogle />
                  <span className="text-sm font-light">Login with Google</span>
                </button>
              )}
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </Row>
          <Row justify="center">
            <GitHubLogin
              clientId={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}
              onSuccess={(response) => {
                dispatch(githubLogin(response.code));
              }}
              onFailure={(response) => {
                console.error(response);
              }}
              children={
                <>
                  {props.githubSpinner ? (
                    <>
                      <span>{antIcon}</span>
                    </>
                  ) : (
                    <>
                      <AiFillGithub />
                      <span className="text-sm font-light">
                        Login with GitHub
                      </span>
                    </>
                  )}
                </>
              }
              redirectUri=""
              scope="read:user,user:email"
              buttonText=""
              className="social-login-btn w-1/2 border border-white"
            />
          </Row>
        </div>
      </Modal>

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
              className="w-full placeholder:text-base placeholder:p-2 bg-gray-800 outline-none rounded-lg p-1 text-lg"
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
