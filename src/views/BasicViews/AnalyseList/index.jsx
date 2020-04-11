import React, { useState, useEffect, useRef } from 'react';
import ProjectTable from './components/ProjectTable';
import Panel from './components/Panel';
import { Overlay } from '@alifd/next';

import { request } from '@/utils/request';
import { host, userList } from '@/config/constant';
import { myCookie } from "@/utils";

export default function ProjectList() {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const child_table = useRef();

  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    const userinfo = myCookie.get('userinfo');
    if (!userinfo) {
      Message.warning('userinfo为空!')
    }
    fetchUserData({
      id: userinfo.id
    }).then((val) => {
      if (val instanceof Array && val.length == 0) {
        Message.warning('目前没有数据!')
      }
      console.warn('AnalyseList-------->>>', val)
      setMyInfo(val[0]);
      child_table.current && child_table.current.setInfo(val[0]);
    });

  }, [])

  async function fetchUserData(params) {
    let result = [];
    try {
      const data = await request({
        url: `${host}${userList.api.check}/${params.id}`,
        method: 'GET'
      });
      result = data.data.data;
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  function handleUpdate(flag, arg) {
    if (flag == 'setVisible') {
      setVisible(arg);
      child_table.current && setRecord(child_table.current.getRecord());
    } else if (flag == 'setRefreshTable') {
      child_table.current && child_table.current.setRefresh(arg);
    }

  }

  return (
    <div>
      <ProjectTable cRef={child_table} onUpdate={handleUpdate} info={myInfo} />
      <Overlay visible={visible}
        /// safeNode={() => btn}
        align="cc cc"
        hasMask
        disableScroll
      /// onRequestClose={handleClose}
      >
        <Panel onUpdate={handleUpdate} data={record} />
      </Overlay>
    </div>
  );
}

