import React, { ReactElement } from "react";
import Modal from "../../../components/Modal";
import { verifyVerificationCode } from "../../../components/api/apis";
import Head from "next/head";
import success from "../../../public/success.png";
import close from "../../../public/close.png";

interface Props {
  message: any;
}

interface VerifyRequestI {
  message: string;
}

function CodeVerify(props: Props): ReactElement {
  let isVerified: any;
  if (props.message.includes("Wrong")) {
    isVerified = close;
  } else {
    isVerified = success;
  }

  return (
    <body className="bg-[#080015]">
      <div>
        <Head>
          <title>Verification Status</title>
        </Head>
        <Modal
          source={isVerified}
          title={"Verification Status"}
          content={props.message}
        />
      </div>
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

CodeVerify.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
