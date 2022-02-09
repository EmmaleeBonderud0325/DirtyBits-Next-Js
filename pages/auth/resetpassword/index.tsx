import React, { ReactElement, useState } from "react";
import { changePass } from "../../../components/api/apis";
import Form from "../../../components/Form";
import { openNotificationWithIcon } from "../../../components/OpenNotification";
import Head from "next/head";

function ChangePassword(): ReactElement {
  let [mail, setMail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const sendData = async (e: any) => {
    e.preventDefault();
    try {
      await changePass
        .post<string>("/", { email: mail })
        .then((result) => {
          openNotificationWithIcon(
            "success",
            "Password Reset Link",
            "Password reset link is sent to the provided email address"
          );
        })
        .catch(() => {
          // openNotificationWithIcon(
          //   "error",
          //   "Password Reset Link",
          //   "You cannot change the password of your registered google email id"
          // );
          setError("Invalid Email");
        });
    } catch (e) {
      console.error("server error !");
      openNotificationWithIcon(
        "error",
        "Password Reset Link",
        "There is an error Try Again Later"
      );
    }
  };

  function getEmailFieldValue(value: string) {
    setMail(value);
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Form
        send={sendData}
        currentValue={mail}
        buttonText="Send"
        getValue={getEmailFieldValue}
        title="Forgot Password ?"
        description="Change your password a confirmation mail will be send to your registerd email"
        extraField={false}
        type="email"
        placeholder="Enter your email"
        error={error}
      />
    </>
  );
}

export default ChangePassword;
