import { ReactElement, FC } from "react";
import SignUp from "../../components/SignUp/SignUp";

interface Props {}

const SignUpPage: FC<Props> = (): ReactElement => {
  return <SignUp />;
};

// @ts-ignore
SignUpPage.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
};

export default SignUpPage;
