import { useState, useEffect, memo } from "react";
import { BsTerminal } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { VscRunAll } from "react-icons/vsc";
import { Modal } from "antd";
import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import { AiOutlineSend } from "react-icons/ai";

import { base64_encode } from "./Helper2";
require("codemirror/lib/codemirror.css");
import {
  googleLoginApi,
  runTestCases,
  submitCode,
} from "../../components/api/apis";
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
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SmoothList from "react-smooth-list";
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

const Editor = (props) => {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  let [customInput, setCustomInput] = useState(false);
  let [inputValue, changeInputValue] = useState("");
  let [outputValue, changeOutputValue] = useState(
    "You must run your code first."
  );
  let [showMode, changeShowMode] = useState(true);
  const [showConsole, setShowConsole] = useState(false);
  let [showLoader, setShowLoader] = useState(false);
  const [value, setValue] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);

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
        })
      );
    };
  }, []);

  const {
    editorValue,
    themeValue,
    editorLanguage,
    fontSize,
    problemPageProblemId,
    submissionCount,
  } = useSelector((state) => state);

  const email = useSelector((state) => state.userData.email);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeCode = (data) => {
    dispatch(changeEditorValue(data));
  };

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

    await runTestCases
      .post("/", {
        problem_Id: problemPageProblemId,
        code: base64_encode(editorValue),
        language: editorLanguage.label,
      })
      .then((result) => {
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
        var problemResult = JSON.parse(data["text"]);
        problemResult = problemResult[0]["fields"];
        props.result(problemResult);
        var appendData = {
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
  };

  const responseGoogleSuccess = async (data) => {
    try {
      await googleLoginApi
        .post("/", { auth_token: data["tokenId"] })
        .then((result) => {
          const { access, refresh } = result.data;
          const data = Parsetoken(access);
          if (data.is_verified) {
            setIsModalVisible(false);
            Cookies.set("access", access);
            Cookies.set("refresh", refresh, { expires: 14 });
            dispatch(
              updateUserinfo({
                is_logged_in: true,
                is_admin: data.is_admin,
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

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;
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
            onBeforeChange={(editor, data, value) => changeCode(value)}
            //   onChange={(editor, data, value) => changeCode(value)}
            // onKeyUp={(editor, event) => {
            //   handleKeyUp(editor, event);
            // }}
          />
        )}
      </div>

      <div className="absolute bottom-0 -right-3 cursor-pointer text-xl flex items-center p-2">
        <button
          onClick={() => setShowConsole(!showConsole)}
          type="button"
          class="px-6 py-2.5 bg-custom-indigo text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out flex items-center rounded-tl-3xl -mb-1 rounded-bl-none rounded-tr-none rounded-br-none"
        >
          {/* <BsTerminal /> */}
          <span className="font-semibold text-base">Console</span>
        </button>

        {/* <span className="ml-2 text-sm">Console</span> */}
      </div>
      <div className="absolute bottom-0 bg-custom-indigo w-full h-1"></div>
      <div className="editor-options-container mt-10 flex space-x-5 justify-end items-center p-2">
        <div className="flex space-x-3">
          <SmoothList>
            <button
              className="group flex items-center space-x-2 login-btn bg-white text-black font-semibold"
              onClick={handleRunCode}
              disabled={isDisabled}
            >
              {isDisabled ? (
                <Spin indicator={antIcon} />
              ) : (
                <VscRunAll className="text-lg group-hover:animate-bounce" />
              )}
              <span>Run</span>
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

export default memo(Editor);
