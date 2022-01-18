import { useState } from "react";
import Form from "../../components/Form";

const ConfirmPassword = () => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  console.log("new pass", newPass);
  console.log("confirm pass", confirmPass);

  const getNewPassValue = (value) => {
    setError("");
    setNewPass(value);
  };

  const getConfirmPassValue = (value) => {
    setError("");
    setConfirmPass(value);
  };

  const sendData = (e) => {
    e.preventDefault();
    if (newPass === confirmPass) {
      console.log(`saved ${newPass} and ${confirmPass}`);
    } else {
      setError("Values do not match");
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
