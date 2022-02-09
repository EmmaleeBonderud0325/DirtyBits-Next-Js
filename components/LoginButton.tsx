import React, { ReactElement } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

interface Props {
  url: string;
  text: string;
  color: string;
  textColor: string;
}

function LoginButton({ url, text, color, textColor }: Props): ReactElement {
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
