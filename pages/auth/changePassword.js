import React, { useState } from "react";
import { changePass } from "../../components/api/apis";
import Form from "../../components/Form";

function changePassword() {
  let [mail, setMail] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
    console.log(mail);
    try {
      await changePass
        .post("/", { email: mail })
        .then((result) => {
          console.log("Password reset link is sent to the registered mail id");
        })
        .catch(() => {
          console.error("Invalid email !");
        });
    } catch (e) {
      console.error("server error !");
    }
  };

  function getEmailFieldValue(value) {
    setMail(value);
  }

  return (
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
    />
  );
}

export default changePassword;
