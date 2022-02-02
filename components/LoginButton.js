import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

function LoginButton({ url, text }) {
  return (
    <Link href={url}>
      <a className="login-btn bg-white text-black">{text}</a>
    </Link>
  );
}

export default LoginButton;
