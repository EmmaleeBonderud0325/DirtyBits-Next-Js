import React, { useState } from "react";
import PanelManager, {
  minimizePanel,
  maximizePanel,
  Panel,
} from "react-panel-system";
import Tabs from "./Tabs";
import Editor from "./ProblemPage/Editor";

const  PanelContainer = () => {
  const EXAMPLE_PANEL_DATA = [
    {
      data: {
        A: { w: 0.5, h: 1.0, x: 0, y: 0 },
        B: { w: 0.5, h: 1.0, x: 0.5, y: 0 },
      },
      adjList: [
        { A: { re: ["B"], le: [], tv: [], bv: [] } },
        { B: { le: ["A"], re: [], tv: [], bv: [] } },
      ],
    },
  ];

  const PanelA = () => (
    <div
      className="space-y-5 text-lg font-semibold"
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Tabs />
    </div>
  );
  const PanelB = React.useCallback(() => (
    <div 
      style={{
        display: "flex",
        flexGrow: 1,
        flexDirection:'column',
      }}
    >
      <Editor />
    </div>
  ));
  const [panelData, setPanelData] = useState(EXAMPLE_PANEL_DATA);

  console.log('panel rendered')
  
  return (
    <div>
      <span
        style={{
          paddingTop: "1em",
          paddingBottom: "1em",
        }}
      ></span>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "93vh",
          flexGrow: 1,
          padding: "1em",
          flexBasis: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <PanelManager
            onPanelDataChange={(nextPanelData) => setPanelData(nextPanelData)}
            panelData={panelData}
          >
            <Panel panelId="A">
              <PanelA />
            </Panel>
            <Panel panelId="B">
              <PanelB />
            </Panel>
          </PanelManager>
        </div>
      </div>
    </div>
  );
}

export default PanelContainer;
