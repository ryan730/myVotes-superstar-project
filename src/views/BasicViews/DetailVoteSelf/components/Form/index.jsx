import React, { useState, useEffect } from 'react';
import { List, Form, Input, Icon, Radio, Field, Step, Button, Box, Typography, Select, Checkbox, Message, Progress } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

import { host, userVoteList, resultList } from '@/config/constant';
import { request } from '@/utils/request';
import { myCookie } from "@/utils";
import { Collapse } from '@alifd/next';


const DEFAULT_DATA = {
  id: "",
  title: "",
  content: "",
  date: "",
  theme: "",
  count: 0,
  status: 1,
  resultid: "",
  ownerid: "",
  playersid: "",
  type: "",
  option: ""
};

const Option = Select.Option;
const Panel = Collapse.Panel

const voteid = location.hash.split('/basic/detailVoteSelf/')[1];

const StepForm = props => {
  const { dataSource = DEFAULT_DATA, onSubmit = () => { } } = props;
  const projectField = Field.useField({
    values: dataSource,
  });

  const [questionProject, setQuestionProject] = useState([]);
  const [answerProject, setAnswerProject] = useState([]);


  // "id": "2020201",
  // "voteid": "2020201",
  // "ownerid": "2020100",
  // "playerid": [],
  // "num": 5213,
  // "result": 6743,
  // "analysis": "34.7%",
  // "date": "1994-08-17 12:03:23",
  // "option": [],
  // "playersid": [],
  // "result:": "《投最佳歌手1》",
  // "analysis:": "99.9%"

  const analyserData = (arg) => {
    let arr = arg;
    if (typeof (arg) == 'string') {
      arr = arg.split(',');
    }
    return arr.reduce((pre, cur) => {
      if (cur in pre) {
        pre[cur]++
      } else {
        pre[cur] = 1
      }
      return pre
    }, {})
  }

  const onChange = function (value) {
    console.log(value);
  };

  async function getVoteData() { // 获取投票信息
    let result = [];
    if (!voteid) {
      Message.warning('id不存在!');
      return;
    }
    try {
      const data = await request({
        url: `${host}${userVoteList.api.search}?batch=${voteid}`,
        method: 'GET',
      });
      result = data.data.data;
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  async function getResultData(params) {
    let result = [];
    if (!voteid) {
      Message.warning('id不存在!');
      return;
    }
    try {
      const data = await request({
        url: `${host}${resultList.api.list}`,
        method: 'GET',
        //data: { id: voteid, ...params },

      });
      result = data.data.data;
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  useEffect(() => {
    getVoteData().then((val) => {

      if (val instanceof Array && val.length == 0) {
        Message.warning('目前没有数据!')
      } else {
        console.log('创建返回结果=111===', val);
        Object.assign(DEFAULT_DATA, val[0]);

        projectField.setValues({ ...val[0] });
        const pg = projectField.getValues();
        if (!pg || !pg.content) {
          console.warn('创建返回结果异常', pg);
          return;
        }
        console.log('创建返回结果====', pg.content);
        setQuestionProject(JSON.parse(pg.content));

        getResultData({}).then((val) => { // 获取已有数据,偷懒做法
          if (val instanceof Array && val.length == 0) {
            Message.warning('目前没有数据!')
          } else {
            //Message.success('提交成功');
            const resutlt = val[0];
            console.log('创建返回结果====', val[0]);
            resutlt && setAnswerProject(resutlt);
            return;
          }
        });

      }
    });
  }, [])

  const renderResult = () => {
    return questionProject.map((question, i) => {
      let anal = {};
      if (answerProject && answerProject.option) {
        anal = answerProject.analysis[i] || [];
      }
      const item = (<li key={i}>
        <List size="small" header={<div>{question.title}</div>}>
          {
            question.content.map((n, k) => {
              const per = anal[k + 1] || 0;
              const percentNum = (per / anal.total) * 100 || 0;
              const percent = percentNum.toFixed(2);

              return <List.Item key={k} extra={`${per}/${anal.total}`} title={n.label}>
                <Progress size="small" percent={percentNum} textRender={() => ''}/>
                <h5>投票结果百分比:{`${percent}%`}</h5>
                {/* <h5>最后更新时间:{answerProject.date}</h5> */}
              </List.Item>
            })
          }
        </List>
      </li>);
      return item;
    })
  }


  let actions;
  let mainbody;

  mainbody = (
    <Form
      field={projectField}
      //isPreview={1}
      className={styles.form}
      responsive
      fullWidth={true}
      labelAlign="top"
    >
      <Form.Item colSpan={12} label="投票项目名称" requiredMessage="必填">
        <Input readOnly placeholder="给项目起个名字" name="title" />
      </Form.Item>

      <Form.Item colSpan={12} label="投票项目描述" >
        <Input.TextArea readOnly hasLimitHint rows={2} placeholder="请输入项目详细信息100字以内" name="desc" />
      </Form.Item>

      <Form.Item colSpan={12} label="投票发起人" >
        <Input.TextArea readOnly hasLimitHint rows={0} placeholder="请输入项目详细信息100字以内" name="ownerid" />
      </Form.Item>
    </Form>
  );

  return (
    <IceContainer style={{ padding: '20px 50px' }} key="InfoCenter" title={'个人发起投票详情页 ⏩'}>
      {mainbody}
      <Collapse style={{ marginTop: '20px' }} defaultExpandedKeys={[1]}>
        <Panel title="查看投票结果" key={1}>
          <ul>
            {renderResult()}
          </ul>
        </Panel>
      </Collapse>
    </IceContainer>
  );
}

export default StepForm;
