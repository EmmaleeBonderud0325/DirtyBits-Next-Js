import React, { ReactElement } from "react";
import Modal from "components/Modal";
import { verifyVerificationCode } from "components/api/apis";
import Head from "next/head";
import success from "public/success.png";
import close from "public/close.png";

interface Props {
  message: any;
}

interface VerifyRequestI {
  message: string;
}

function CodeVerify({message}: Props): ReactElement {
  let isVerified: any;
  if (message.includes("Wrong")) {
    isVerified = close;
  } else {
    isVerified = success;
  }

  return (
    <body>
      <>
        <Head>
          <title>Verification Status</title>
        </Head>
        <Modal
          source={isVerified}
          title={"Verification Status"}
          content={message}
        />
      </>
    </body>
  );
}

export const getServerSideProps = async (context: any) => {
  const code = context.params;
  const response = await verifyVerificationCode.post<VerifyRequestI>("/", {
    verification_code: code.verificationCode,
  });

  return {
    props: {
      message: response.data.message,
    },
  };
};

export default CodeVerify;