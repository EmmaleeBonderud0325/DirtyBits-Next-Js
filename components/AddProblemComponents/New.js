import React, { useState } from "react";
import { Steps } from "primereact/steps";
import "primereact/resources/themes/mdc-dark-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import WrapperLayout from "../../Layout/Layout";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";

const StepsDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currrentValue, setCurrentValue] = useState(<Page1 />);

  const items = [
    {
      label: "Add Problem",
      command: (event) => {
        setCurrentValue(<Page1 />);
      },
    },
    {
      label: "Add Test Cases",
      command: (event) => {
        setCurrentValue(<Page2 />);
      },
    },
  ];

  return (
    <WrapperLayout>
      <div className="steps-demo h-full">
        <Steps
          className="mx-80"
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
        />
        {currrentValue}
      </div>
    </WrapperLayout>
  );
};

export default StepsDemo;
