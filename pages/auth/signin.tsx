import { ReactElement } from "react";
import { IRootState } from "../../redux/reducers";
import { TextInput, PasswordInput } from '@mantine/core';
import {
  useState,
  Link,
  Head,
  useRouter,
  Loading,
  GoogleLogin,
  GitHubLogin,
  validate,
  Cookies,
  connect,
  useDispatch,
  FcGoogle,
  AiFillGithub,
  SmoothList,
  updateSignInSpinner,
  updateUserinfo,
  signinApi,
  Parsetoken,
  githubLogin,
  googleLogin,
} from "../../imports/Signin";

interface Props {
  googleSpinner: boolean;
  githubSpinner: boolean;
  signInSpinner: boolean;
}

interface FormDataI {
  email: string;
  password: string;
  remeberMe: boolean;
}

interface ErrorI {
  error: boolean;
  details: string;
}

interface ErrorsI {
  email: ErrorI;
  password: ErrorI;
}

interface TokensI {
  access: string;
  refresh: string;
}

function Signin(props: Props): ReactElement {
  const dispatch = useDispatch();
  const router = useRouter();
  const antIcon = <Loading type="points-opacity" size="sm" />;
  let [formData, setFormData] = useState<FormDataI>({
    email: "",
    password: "",
    remeberMe: false,
  });


  let [isError, setIsError] = useState<ErrorsI>({
    email: { error: false, details: "" },
    password: { error: false, details: "" },
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);


  const validateFormData = (): boolean => {
    if (validate(formData.email)) {
      if (formData.password.length === 0) {
        setIsError({
          ...isError,
          email: { error: false, details: "" },
          password: { error: true, details: "Password can't be empty !" },
        });
        return false;
      } else {
        setIsError({
          email: { error: false, details: "" },
          password: { error: false, details: "" },
        });
        return true;
      }
    } else {
      if (formData.password.length === 0) {
        setIsError({
          ...isError,
          email: { error: true, details: "Invalid Email !" },
          password: { error: true, details: "Password can't be empty !" },
        });
        return false;
      } else {
        setIsError({
          ...isError,
          email: { error: true, details: "Invalid Email !" },
        });
        return false;
      }
    }
  };

  const postAuthentication = (tokens: TokensI) => {
    const { access, refresh } = tokens;
    const data = Parsetoken(access);
    console.log("data", data);
    if (data.is_verified) {
      if (formData.remeberMe) {
        var inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
        Cookies.set("access", access, { expires: inTwentyMinutes });
        Cookies.set("refresh", refresh, { expires: 14 });
      } else {
        Cookies.set("access", access);
        Cookies.set("refresh", refresh);
      }
      dispatch(
        updateUserinfo({
          is_logged_in: true,
          is_admin: data.is_admin,
          is_verified: data.is_verified,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          profile_pic: data.profile_pic,
        })
      );
      router.push("/");
    } else {
      setIsError({
        ...isError,
        email: { error: true, details: "" },
        password: { error: true, details: "Account not verified !" },
      });
    }
  };

  const submitLoginForm = async (e: any) => {
    dispatch(updateSignInSpinner(true));
    e.preventDefault();
    setIsDisabled(true);
    setIsError({
      email: { error: false, details: "" },
      password: { error: false, details: "" },
    });
    const isValid = validateFormData();
    if (isValid) {
      try {
        await signinApi
          .post<TokensI>("/", formData)
          .then((result) => {
            postAuthentication(result.data);
          })
          .catch(() => {
            setIsError({
              ...isError,
              email: { error: true, details: "Invalid Credentials !" },
              password: { error: true, details: "Invalid Credentials !" },
            });
            console.error("Invalid Credentials !");
          });
      } catch (e) {
        console.error("Server Error !");
      }
    }
    setIsDisabled(false);
    dispatch(updateSignInSpinner(false));
    return;
  };

  return (
    <>
      <Head>
        <title>Sign In to DirtyBits</title>
      </Head>
      <div className="loginSignUp">
        <div className="absolute w-60 h-60 rounded-xl bg-custom-indigo -top-5 -left-16 z-0 transform rotate-45 hidden md:hidden lg:block"></div>
        <div className="absolute w-48 h-48 rounded-xl bg-custom-indigo -bottom-10 transform rotate-12 hidden md:hidden lg:block"></div>
        <div className="w-40 h-40 absolute bg-custom-indigo rounded-full top-0 right-12 hidden md:hidden lg:block"></div>
        <div className="w-20 h-40 absolute bg-custom-indigo rounded-full bottom-20 right-10 transform rotate-45 hidden md:hidden lg:block"></div>

        <div className="absolute md:bg-gradient-to-b from-black to-black opacity-75 lg:inset-0 z-0"></div>

        <div className="lg:min-h-screen lg:flex lg:justify-center lg:space-x-48 p-8 space-y-5 lg:z-10">
          {/* HEADING FOR SMALL SIZE SCREENS */}
          <div className="text-white text-xl text-center lg:hidden">
            Welcome to{" "}
            <span className="text-custom-indigo text-2xl font-semibold">
              <Link href="/">
                <a>DirtyBits</a>
              </Link>
            </span>
          </div>
          {/* HEADING FOR LARGER SIZE SCREENS */}
          <div className="flex-col lg:flex hidden  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <SmoothList>
                <h1 className="loginSignUpHeading text-transparent bg-clip-text bg-gradient-to-r from-[#AE67FA] to-[#F49867]">
                  Hola,
                </h1>
                <br />
                <div className=" flex space-x-6">
                  <h2 className="text-white text-6xl">
                    Welcome to{" "}
                    <span className="text-custom-indigo font-extrabold">
                      <Link href="/">
                        <a>DirtyBits</a>
                      </Link>
                    </span>
                  </h2>
                </div>
              </SmoothList>
            </div>
          </div>
          <div className="flex lg:justify-center md:justify-start lg:self-center z-10 md:w-[400px]">
            <div className="p-10 lg:p-16 bg-white mx-auto rounded-2xl w-full lg:w-100 ">
              <div className="mb-4 bg-green">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                <TextInput error={isError.email.details} value={formData.email} radius="md" onChange={(event) => setFormData({...formData, email: event.currentTarget.value})} label="Email"  placeholder="your email address" invalid={isError.email.error} required size="sm"/>

                </div>
                <div className="space-y-1">
                 
                    <PasswordInput
                        error={isError.password.details}
                        radius="md"
                        placeholder="Your password here"
                        value={formData.password}
                        onChange={(event) => setFormData({...formData, password: event.currentTarget.value})}
                        label="Password"
                        size="sm"
                        required
                        invalid={isError.password.error}
                    />
                 
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="flex items-center accent-custom-indigo">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      checked={formData.remeberMe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          remeberMe: !formData.remeberMe,
                        })
                      }
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link href="/auth/resetpassword">
                      <a className="text-indigo-400 text-xs hover:text-black">
                        Forgot your password?
                      </a>
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    disabled={isDisabled ? true : false}
                    type="submit"
                    onClick={(e) => submitLoginForm(e)}
                    className={`social-login-btn  bg-custom-indigo hover:bg-indigo-900 hover:outline-black
                      transition ease-in duration-500
                      ${isDisabled && "opacity-50 cursor-not-allowed"}
                    `}
                    autoFocus
                  >
                    {props.signInSpinner ? (
                      <>
                        <span>{antIcon}</span>
                      </>
                    ) : (
                      <span className="text-sm font-light">Sign In</span>
                    )}{" "}
                  </button>

                  <GoogleLogin
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="social-login-btn"
                      >
                        {props.googleSpinner ? (
                          <>
                            <span>{antIcon}</span>
                          </>
                        ) : (
                          <>
                            <FcGoogle />
                            <span className="text-sm font-light">Sign In</span>
                          </>
                        )}
                      </button>
                    )}
                    onSuccess={(data) => {
                      dispatch(googleLogin(data["tokenId"]));
                    }}
                    onFailure={() => {
                      console.error("Google Authentication failed !");
                    }}
                    cookiePolicy={"single_host_origin"}
                  />
                  <GitHubLogin
                    clientId={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}
                    onSuccess={(response) => {
                      dispatch(githubLogin(response.code));
                    }}
                    onFailure={(response) => {
                      console.error(response);
                    }}
                    redirectUri=""
                    scope="read:user,user:email"
                    buttonText=""
                    className="social-login-btn"
                  >
                    {props.githubSpinner ? (
                      <span>{antIcon}</span>
                    ) : (
                      <>
                        <AiFillGithub />
                        <span className="text-sm font-light">Sign In</span>
                      </>
                    )}
                  </GitHubLogin>
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Don&apos;t have account ?{" "}
                  <Link href="/auth/signup">
                    <a className="text-custom-indigo hover:text-black">
                      Sign Up
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Signin.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
const mapStateToProps = (state: IRootState) => {
  return {
    googleSpinner: state.googleLoginSpinner,
    githubSpinner: state.githubLoginSpinner,
    signInSpinner: state.loginInSpinner,
  };
};

export default connect(mapStateToProps, { updateUserinfo })(Signin);
