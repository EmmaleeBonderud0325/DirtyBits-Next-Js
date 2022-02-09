import React, { ReactElement } from "react";
import Modal from "../../components/Modal";
import Head from "next/head";
import sucess from "../../public/success.png";

interface Props {}

function registered(props: Props): ReactElement {
  return (
    <>
      <body className="bg-[#080015]">
        <div>
          <Head>
            <title>Register</title>
          </Head>
          <Modal
            source={sucess}
            // @ts-ignore
            verify={true}
            title={"Registered Succesfully"}
            content={
              "A verfication e-mail has been sent to your registered email address"
            }
          />
        </div>
      </body>
    </>
  );
}

export default registered;

registered.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
