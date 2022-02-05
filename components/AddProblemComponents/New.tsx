import React, { FC, ReactElement, useState } from "react";

import { Steps } from "primereact/steps";
import "primereact/resources/themes/mdc-dark-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import WrapperLayout from "../../Layout/Layout";
import Page1 from "./Page1";
import { Page2 } from "./Page2";

const StepsDemo: FC = (): ReactElement => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [problemId, setProblemId] = useState<null | number>(null);

  const items = [
    {
      label: "Add Problem",
      command: (_: any) => {
        setActiveIndex(0);
      },
    },
    {
      label: "Add Test Cases",
      command: (_: any) => {
        setActiveIndex(1);
      },
    },
  ];

  return (
    <WrapperLayout>
      <Steps
        className="mx-80"
        model={items}
        activeIndex={activeIndex}
        onSelect={(e) => setActiveIndex(e.index)}
        readOnly={false}
      />
      {activeIndex === 0 ? (
        <Page1
          problemId={problemId}
          setProblemId={setProblemId}
          setActiveIndex={setActiveIndex}
        />
      ) : (
        <Page2 problemId={problemId} setActiveIndex={setActiveIndex} />
      )}
    </WrapperLayout>
  );
};

export default StepsDemo;
