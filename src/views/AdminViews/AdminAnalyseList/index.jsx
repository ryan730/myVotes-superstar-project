import React, { useState, useEffect, useRef } from 'react';
import ProjectTable from './components/ProjectTable';
import Panel from './components/Panel';
import { Overlay } from '@alifd/next';
// import OverviewChart from './components/OverviewChart';

export default function ProjectList() {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const child_table = useRef();

  function handleUpdate(flag,arg) {
    if (flag == 'setVisible') {
      setVisible(arg);
      child_table.current && setRecord(child_table.current.getRecord());
    } else if (flag == 'setRefreshTable'){
      child_table.current && child_table.current.setRefresh(arg);
    }
    
  }

  return (
    <div>
      {/* <OverviewChart /> */}
      <ProjectTable cRef={child_table} onUpdate={handleUpdate}/>
      <Overlay visible={visible}
        /// safeNode={() => btn}
        align="cc cc"
        hasMask
        disableScroll
      /// onRequestClose={handleClose}
      >
        <Panel onUpdate={handleUpdate} data={record}/>
      </Overlay>
    </div>
  );
}
