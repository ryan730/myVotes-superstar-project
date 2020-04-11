import React from 'react';
import IceContainer from '@icedesign/container';
import { Message, Form, Input } from '@alifd/next';
import styles from './index.module.scss';

import { request } from '@/utils/request';
import { host, userList } from '@/config/constant';

export default function DetailTable(props) {
  const labelName = {
    id: "用户ID",
    username: "用户名",
    name: "昵称",
    age: "年龄",
    sex: "性别",
    tel: "电话",
    date: "最后修改日期"
  };
  const FormItem = Form.Item;
  const formItemLayout = {
    labelCol: {
      fixedSpan: 10
    },
    wrapperCol: {
      span: 14
    }
  };
  const style = {
    rowFormat: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      //justifyContent: 'space-around'
    }
  }
  const info = props.info;
  if (!info.hasOwnProperty('id')) {
    return null
  }
  // id: "2020100"
  // name: "Mr. Hilton Bartell"
  // age: 46
  // username: "123"
  // password: "123"
  // sex: "Female"
  // votes: [8114, 1710]
  // tel: "13600000000"
  // date: "1987-04-29 01:37:29"

  async function editUserData(params) {
    let result = [];
    try {
      const data = await request({
        url: `${host}${userList.api.edit}`,
        method: 'POST',
        data: { ...params }
      });
      result = data.data.data;
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  async function handleSubmit1(params) {
    console.log('params.id1:', params);

    editUserData(params).then((val) => {
      if (val instanceof Array && val.length == 0) {
        Message.warning('目资料修改失败!')
      }
      Message.success('资料修改成功!');
      console.log('params.id2:', val);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  function renderInput(placeholder, name, key, value) {
    const dVal = value || ' ';
    return (<FormItem key={key}
      style={{ width: '400px', ...style.rowFormat }}
    >
      <span id="select-a11y" style={
        {
          marginRight: '50px',
          width: '90px',
          display: 'inline-block'
        }}>{key}: </span>
      <Input name={name} disabled={(name == 'id' || name == 'username' || name == 'date') ? true : false} style={{ width: 200 }} trim placeholder={placeholder} defaultValue={dVal} />
    </FormItem>)
  }

  function renderContent() {
    return <Form key={'Form'} style={{ width: '100%', padding: '0 20px' }} {...formItemLayout} labelTextAlign="left" size="medium" >

      <FormItem label="">
        {
          Object.keys(info).map((val) => {
            if (!labelName[val]) {
              return false;
            }
            return renderInput('', val, labelName[val], info[val].toString());
          })
        }
      </FormItem>

      <FormItem label=" ">
        <Form.Submit type="primary" validate onClick={handleSubmit1}>修改资料</Form.Submit>
      </FormItem>
    </Form>
  }

  return (
    <div className="detail-table">
      <IceContainer title="资料详情">
        {
          renderContent()
        }
      </IceContainer>
    </div>
  );
}

