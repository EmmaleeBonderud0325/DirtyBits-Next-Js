import React from "react";
import Link from "next/link";

function LoginButton() {
  return (
    <Link href="/auth/signin">
      <a className="py-2 px-4 shadow-md no-underline rounded-full bg-custom-yellow text-white font-sans font-semibold text-sm border-custom-yellow2 btn-primary hover:text-white hover:bg-orange-light focus:outline-none active:shadow-none mr-2">
        Login
      </a>
    </Link>
  );
}

export default LoginButton;
