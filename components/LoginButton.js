import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

function LoginButton({ url, text, color, textColor }) {
  return (
    <Link href={url}>
      <Button
        css={{
          background: color,
          color: textColor,
        }}
        auto
        color="primary"
        rounded
      >
        {text}
      </Button>
    </Link>
  );
}

export default LoginButton;
