import { Container, MantineNumberSize } from "@mantine/core";
import React, {memo} from "react";

interface Props {
  children: any;
  className?: string;
  size?: MantineNumberSize;
}

function WrapperLayout({ children, className = "", size = "xl" }: Props) {
  return (
    <Container size={size} className={className}>
      {children}
    </Container>
  );
}

export default memo(WrapperLayout);
