import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

function LoginButton({ url, text }) {
  return (
    <Link href={url}>
      {/* <a className="login-btn bg-white text-black">{text}</a> */}
      <Button auto color="gradient" rounded bordered>
        {text}
      </Button>
    </Link>
  );
}

export default LoginButton;
