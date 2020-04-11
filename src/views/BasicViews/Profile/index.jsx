import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';

import BasicDetailInfo from './components/BasicDetailInfo';

import CollapseCard from './components/CollapseCard';

import DetailTable from './components/DetailTable';

import IceContainer from '@icedesign/container';

import { Message } from '@alifd/next';

import { request } from '@/utils/request';
import { host, userList } from '@/config/constant';

import { myCookie } from "@/utils";

export default function Profile(props) {

  const [myInfo, setMyInfo] = useState({});

  useEffect(() => {
    const userinfo = myCookie.get('userinfo');
    console.log('Profile-userinfo:', userinfo);
    if (!userinfo) {
      Message.warning('userinfo为空!');
      return;
    }
    fetchUserData({
      id: userinfo.id
    }).then((val) => {
      if (val instanceof Array && val.length == 0) {
        Message.warning('目前没有数据!')
      }
      setMyInfo(val[0]);
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

  return (
    <IceContainer key="Profile"
      title={'个人资料 ⏩'}
    >
      {/*<div className="profile-page"> */}
      {/* <BasicDetailInfo /> */}

      <CollapseCard info={myInfo} />

      <DetailTable info={myInfo} />
      {/* </div> */}
    </IceContainer>
  );
}
