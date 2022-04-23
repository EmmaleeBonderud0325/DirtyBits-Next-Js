import React, { ReactElement } from "react";
import Link from "next/link";
import { Button } from '@mantine/core';

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
      >
        {text}
      </Button>
    </Link>
  );
}

export default LoginButton;
