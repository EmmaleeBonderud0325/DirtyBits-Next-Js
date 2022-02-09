import React from "react";

interface Props {
  children: any;
}

function WrapperLayout({ children }: Props) {
  return (
    <div className="space-y-8 container p-10 mx-auto max-w-screen-xl flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default WrapperLayout;
