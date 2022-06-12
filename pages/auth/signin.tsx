import { ReactElement } from "react";
import { TextInput, PasswordInput } from "@mantine/core";
import {
  useState,
  Link,
  Head,
  useRouter,
  Cookies,
  useDispatch,
  SmoothList,
  updateSignInSpinner,
  updateUserinfo,
  signinApi,
  Parsetoken,
} from "imports/Signin";
import Background from "components/Background";
import { notifyFirstLoad } from "redux/actions";
import { useForm, Controller  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Loader } from '@mantine/core';
import GoogleButton from 'components/authProviders/Google'
import GitHubButton from 'components/authProviders/Github'

interface Props {
  googleSpinner: boolean;
  githubSpinner: boolean;
  signInSpinner: boolean;
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
  const antIcon = <Loader color="indigo" size="sm" />;

  const schema = yup.object({
    email: yup.string().required('Email is required').email('Email is not valid'),
    password: yup.string().required('Password is required'),
    remember_me: yup.boolean(),
  }).required();
  
  let [isError, setIsError] = useState<ErrorsI>({
    email: { error: false, details: "" },
    password: { error: false, details: "" },
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { control, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const postAuthentication = (tokens: TokensI, remember_me: Boolean) => {
    const { access, refresh } = tokens;
    const data = Parsetoken(access);
    console.log("data", data);
    if (data.is_verified) {
      if (remember_me) {
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
      dispatch(notifyFirstLoad());
      router.push("/");
    } else {
      setIsError({
        ...isError,
        email: { error: true, details: "" },
        password: { error: true, details: "Account not verified !" },
      });
    }
  };

  const submitLoginForm = async (data: any) => {
    setIsDisabled(true);
      try {
        await signinApi
          .post<TokensI>("/", data)
          .then((result) => {
            postAuthentication(result.data, data.remember_me);
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
        <Background />
        <div className="signinwrapper xl:space-x-38 xl:flex-row">
          {/* HEADING FOR SMALLER AND MEDIUM SIZE SCREENS */}
          <div className="text-white text-center lg:hidden">
            <h1 className="text-xl md:text-4xl xs:text-xl sm:text-xl">
              Welcome to{" "}
              <span className="text-custom-indigo text-2xl font-semibold">
                <Link href="/">
                  <a className="md:text-4xl">DirtyBits</a>
                </Link>
              </span>
            </h1>
          </div>
          {/* HEADING FOR LARGER SIZE SCREENS */}
          <div className=" lg:flex hidden  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <SmoothList>
                <h1 className="loginSignUpHeading lg:text-5xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#AE67FA] to-[#F49867]">
                  Hola,
                </h1>
                <br />
                <div className=" flex space-x-6 ">
                  <h2 className="text-white text-6xl lg:text-5xl xl:text-6xl">
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
          <div className="flex lg:justify-center md:mx-auto lg:self-center z-10 md:w-[400px]">
            <div className="p-10 lg:p-16 bg-white mx-auto rounded-2xl w-full lg:w-100 ">
              <div className="mb-4 bg-green">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <div className="space-y-5">
                <form noValidate autoComplete="off" onSubmit={handleSubmit(submitLoginForm)}>
                    <div className="space-y-1">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                        key="email"
                        error={errors.email?.message || isError.email?.details}
                        value={value}
                        radius="md"
                        onChange={onChange}
                        onBlur={() => {
                          setIsError({
                            ...isError,
                            email: { error: false, details: "" },
                          });
                          onBlur();
                        }}
                        label="Email"
                        placeholder="your email address"
                        required
                        size="sm"
                        />
                      )}
                    />
                    </div>
                    <div className="space-y-1">
                      <Controller
                      name="password"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <PasswordInput
                        key="password"
                        error={errors.password?.message || isError.password.details}
                        radius="md"
                        placeholder="Your password here"
                        value={value}
                        onBlur={() => {
                          setIsError({
                            ...isError,
                            password: { error: false, details: "" },
                          });
                          onBlur();
                        }}
                        onChange={onChange}
                        label="Password"
                        size="sm"
                        required
                        />
                      )}
                    />
                    </div>
                    <div className="flex items-center justify-between my-2">
                      <div className="flex items-center accent-custom-indigo">
                        
                      <Controller
                        name="remember_me"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                          id="remember_me"
                          name="remember_me"
                          type="checkbox"
                          checked={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                        />
                      )}
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
                      <button
                        disabled={isDisabled ? true : false}
                        type="submit"
                        className={`social-login-btn  bg-custom-indigo hover:bg-indigo-900 hover:outline-black
                          transition ease-in duration-500
                          ${isDisabled && "opacity-50 cursor-not-allowed"}
                        `}
                        autoFocus
                      >
                        {isDisabled ? (
                          <>
                            <span>{antIcon}</span>
                          </>
                        ) : (
                          <span className="text-sm font-light">Sign In</span>
                        )}{" "}
                      </button>
                </form>
              <div>
                <GoogleButton dispatch={dispatch} loader={antIcon}/>
                <GitHubButton dispatch={dispatch} loader={antIcon}/>
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


export default Signin;
