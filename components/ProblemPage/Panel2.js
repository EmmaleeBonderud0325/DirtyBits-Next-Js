import React from "react";
import SplitPane, { Pane } from "react-split-pane";
import Editor from "./Editor";
import Tabs from "../Tabs";

function Panel2({ question, id }) {
  return (
    <div>
      <SplitPane
        split="vertical"
        minSize={300}
        maxSize={1200}
        defaultSize={900}
        style={{ height: "100vh",}}
        className="scrollbar-hide"
        // defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
        // onChange={(size) => localStorage.setItem('splitPos', size)}
      >
        <Pane className="scrollbar-hide" style={{ overflowY: "scroll" }}>
          <Tabs questionData={question} />
        </Pane>
        <Pane className="scrollbar-hide" style={{overflowY:'scroll'}}>
          <Editor id={id}/>
        </Pane>
      </SplitPane>
    </div>
  );
}

export default Panel2;
