import { FC, ReactElement, useState } from "react";
import Form from "components/Form";
import { resetPassword } from "components/api/apis";
import { openNotificationWithIcon } from "components/OpenNotification";
import Head from "next/head";

interface Props {
  resetcode: string;
}

interface ResetPassI {
  message: string;
}

const ConfirmPassword: FC<Props> = ({ resetcode }): ReactElement => {
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [error, setError] = useState<string>("");

  const getNewPassValue = (value: string) => {
    setError("");
    setNewPass(value);
  };

  const getConfirmPassValue = (value: string) => {
    setError("");
    setConfirmPass(value);
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    try {
      if (newPass === confirmPass) {
        const result = await resetPassword.post<ResetPassI>("/", {
          verification_code: resetcode,
          new_password: newPass,
        });
        console.log("password changed");
      } else {
        setError("Values do not match");
      }
    } catch (err) {
      if (err.response.status === 400) {
        openNotificationWithIcon(
          "info",
          "Reset Password Error",
          err.response.data.message
        );
      }
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Form
        send={sendData}
        currentValue={newPass}
        currentValue2={confirmPass}
        buttonText="Confirm"
        getValue={getNewPassValue}
        getValue2={getConfirmPassValue}
        title="Change Password"
        description="Change your password"
        extraField={true}
        type="text"
        placeholder="New password"
        error={error}
      />
    </>
  );
};

export default ConfirmPassword;

export async function getServerSideProps(ctx: any) {
  const {
    query: { resetcode },
  } = ctx;

  return {
    props: {
      resetcode,
    },
  };
}
