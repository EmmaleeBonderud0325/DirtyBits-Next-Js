import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { TabView, TabPanel as Panel } from "primereact/tabview";

import { IRootState } from "../../redux/reducers";
import { submissionResultI } from "../../redux/interfaces";


import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";



interface Props {
  codeRunner: boolean;
  currentTabFunction: (value: number) => void;
  submissionData: submissionResultI | {};
  currentTabValue: number;
  problemTab: ReactElement;
  submissionTab: ReactElement;
}

function BasicTabs({currentTabValue, currentTabFunction, problemTab, submissionTab}: Props): ReactElement {
  const { is_logged_in } = useSelector((state: IRootState) => state.userData.data);

  return (
    <div style={{ width: "100%", height: "100vh" }} className="scrollbar-hide">
      <TabView
        activeIndex={currentTabValue}
        onTabChange={(e) => {
          currentTabFunction(e.index);
        }}
        className="tabview-custom"
      >
        <Panel header="Problem">
          {problemTab}
        </Panel>
        <Panel
          // disabled={!is_logged_in}
          header="Submissions"
          leftIcon={!is_logged_in && "pi pi-lock"}
        >
          {submissionTab}
        </Panel>
        <Panel disabled header="Discussions" leftIcon="pi pi-lock">
          <p>Discussions</p>
        </Panel>
        <Panel disabled header="Editorial" leftIcon="pi pi-lock">
          <p>Editorial</p>
        </Panel>
      </TabView>
    </div>
  );
}

export default BasicTabs;
