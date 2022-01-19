import { useState } from "react";
import Form from "../../../components/Form";
import { resetPassword } from "../../../components/api/apis";
import { openNotificationWithIcon } from "../../../components/OpenNotification";

const ConfirmPassword = ({ resetcode }) => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const getNewPassValue = (value) => {
    setError("");
    setNewPass(value);
  };

  const getConfirmPassValue = (value) => {
    setError("");
    setConfirmPass(value);
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      if (newPass === confirmPass) {
        const result = await resetPassword.post("/", {
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
  );
};

export default ConfirmPassword;

export async function getServerSideProps(ctx) {
  const {
    query: { resetcode },
  } = ctx;

  return {
    props: {
      resetcode,
    },
  };
}
