import React from "react";
import Link from "next/link";

function LoginButton() {
  return (
    <Link href="/auth/signin">
      <a className="login-btn bg-white text-black">Login</a>
    </Link>
  );
}

export default LoginButton;
