import SignUp from "../../components/SignUp/SignUp";

const SignUpPage = () => {
  return <SignUp />;
};

SignUpPage.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export default SignUpPage;
