import React from "react";
import SplitPane, { Pane } from "react-split-pane";
import Editor from "./Editor";
import Tabs from "../Tabs";
import { connect } from "react-redux";

function Panel2(props) {
  return (
    <div>
      <SplitPane
        split="vertical"
        minSize={300}
        maxSize={1200}
        defaultSize={900}
        style={{ height: "100vh" }}
        className="scrollbar-hide"
        // defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
        // onChange={(size) => localStorage.setItem('splitPos', size)}
      >
        <Pane className="scrollbar-hide" style={{ overflowY: "scroll" }}>
          <Tabs questionData={props.question} />
        </Pane>
        <Pane className="scrollbar-hide" style={{ overflowY: "scroll" }}>
          <Editor id={props.id} email={props.userEmail} />
        </Pane>
      </SplitPane>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userEmail: state.userData.email,
  };
};

export default connect(mapStateToProps, {})(Panel2);
