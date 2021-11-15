import React from 'react'
import SplitPane, {Pane} from 'react-split-pane';
import Editor from './Editor'
import Tabs from '../Tabs'

function Panel2({question}) {
    return (
        <div>
             <SplitPane
        split="vertical"
        minSize={300}
        maxSize={1200}
        defaultSize={900}
        style={{height: '93%'}}
        // defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
        // onChange={(size) => localStorage.setItem('splitPos', size)}
      >
        <Pane className="scrollbar-hide" style={{overflowY:'scroll'}}><Tabs questionData={question}/></Pane>
        <Pane><Editor/></Pane>

      </SplitPane>
        </div>
    )
}

export default Panel2
