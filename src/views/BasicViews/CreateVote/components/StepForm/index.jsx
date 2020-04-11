import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Icon, Radio, Field, Step, Button, Box, Typography, Select, Checkbox, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

import { host, userVoteList } from '@/config/constant';
import { request } from '@/utils/request';
import { myCookie } from "@/utils";

const DEFAULT_DATA = {
  authority: 'publish',
  desc: '',
  title: "",
  content: "",
  theme: "001",
  count: "",
  status: 1,
  resultid: "",
  ownerid: "",
  playersid: [],
  type: ""
};

const Option = Select.Option;

const StepForm = props => {
  const { dataSource = DEFAULT_DATA, onSubmit = () => { } } = props;
  const projectField = Field.useField({
    values: dataSource,
  });
  const [currentStep, setStep] = useState(0);
  const [questionProject, setQuestionProject] = useState([]);
  const steps = ['发起投票', '确认投票内容', '发布'].map((item, index) => (
    <Step.Item aria-current={index === currentStep ? 'step' : null} key={index} title={item} />
  ));

  // id: "2020200"
  // title: "Molestiae doloremque"
  // content: "雨伞14"
  // date: "2014-07-29 09:27:21"
  // theme: 8484
  // count: 378
  // status: 1
  // resultid: 7158
  // ownerid: "2020100"
  // playersid: (5)[1288, 7826, 9495, 8891, 7234]
  // type: 4

  const submit = () => {
    const values = projectField.getValues();
    const sendVal = { ...values };
    const userinfo = myCookie.get('userinfo');
    sendVal.ownerid = userinfo.id;

    console.log('values:', sendVal);

    createVoteData(sendVal).then((val) => {
      if (val instanceof Array && val.length == 0) {
        Message.warning('目前没有数据!')
      } else {
        Message.success('保存成功');
        console.log('创建返回结果====', val[0]);
      }
    });
    ///onSubmit(values);
    setStep(currentStep + 1);
  };

  const parasText = () => {
    const txtContent = document.getElementsByName('project')[0];
    const divMsg = document.getElementById('divMsg');
    const firstFilter_arr = (txtContent.value).split('\n\r')[0].split('\n');
    let secondFilter_arr = [];
    let tempObj = { title: '', content: [] };
    let isFisrt = 0;
    firstFilter_arr.map((item, index) => {
      if (typeof (item) == 'string' && item.length == 0) {
        secondFilter_arr.push({ ...tempObj })
        tempObj = { title: '', content: [] };
        isFisrt = 0;
      } else if (item) {
        if (isFisrt == 0) {
          tempObj.title = item;
          if (item.indexOf('[多选题]') != -1) {
            tempObj.type = 'multiple'
          } else if (item) {
            tempObj.type = 'single'
          }
        } else {
          tempObj.content.push({ value: isFisrt, label: item })
        }
        isFisrt++;

      }
    })
    secondFilter_arr = secondFilter_arr.map((it) => {
      if (!it.title) {
        return null;
      }
      return it;
    }).filter(n => n);
    console.log('secondFilter_arr===', secondFilter_arr);
    return secondFilter_arr;
  }

  const goNext = async () => {
    const { errors } = await projectField.validatePromise();

    if (errors) {
      console.log('errors', errors);
      return;
    }

    setStep(currentStep + 1);
  };

  const goPrev = () => {
    setStep(currentStep - 1);
  };

  const goInitial = () => {
    setStep(0);
  };

  const onChange = function (value) {
    console.log(value);
  };

  const onToggleHighlightItem = function (item, type) {
    console.log(item, type);
  };

  const renderQuestionProject = () => {
    return <div className={styles.questionPreView}>
      {
        questionProject.map((item) => {
          const result = [];
          if (item.title) {
            result.push(<div key={item.title}>{item.title}</div>);
          }
          if (item.content instanceof Array) {
            if (item.type == 'multiple') {
              const { Group: CheckboxGroup } = Checkbox;
              result.push(<CheckboxGroup className={styles.innerCheckbox}
                key={'item.checkboxGroup'} dataSource={item.content} />)
            } else {
              const RadioGroup = Radio.Group;
              result.push(
                <RadioGroup className={styles.innerRadio}
                  key={'item.radioGroup'} dataSource={item.content} />
              )

            }

          }
          return result;
        })
      }
    </div>
  }

  async function createVoteData(params) {
    let result = [];
    try {
      const data = await request({
        url: `${host}${userVoteList.api.create}`,
        method: 'POST',
        data: { ...params }
      });
      result = data.data.data;
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  // const defaultText = '1. 题目1\n选项1\n选项2\n选项3\n\n2.题目2[多选题]\n选项4\n选项5\n选项6\n\n';
  const defaultText = "1.你的年龄阶段\n少年（14岁及以下）\n青年（15 - 44岁）\n中年（45 - 59岁）\n\n2.您使用过下面哪些无人零售形式？[多选题]\n自动售货机\n无人货架\n无人便利店\n其他\n\n3.为什么选择无人零售？\n新鲜好奇\n方便快捷\n喜欢自助的选购方式\n物美价廉\n品种完备\n其他\n\n";
  
  let setTimeId = 0;
  const handerTextArea = (...arg) => {
    setTimeId = setTimeout(() => {
      clearTimeout(setTimeId);
      const paraObj = parasText();
      if (paraObj && paraObj instanceof Array && paraObj.length > 0) {
        setQuestionProject(paraObj);
        projectField.setValues({ content: JSON.stringify(paraObj) })
      }
    }, 100);

  }
  useEffect(() => {
    handerTextArea();
  }, [])


  let actions;
  let mainbody;

  switch (currentStep) {
    case 0:
      actions = (
        <Button type="primary" onClick={goNext}>
          下一步
        </Button>
      );
      break;

    case 1:
      actions = (
        <>
          <Button
            onClick={goPrev}
            style={{
              marginRight: '5px',
            }}
          >
            上一步
          </Button>
          <Form.Submit type="primary" onClick={submit} validate>
            下一步
          </Form.Submit>
        </>
      );
      setTimeout(() => {
        document.getElementById('project').style.display = 'none'
      }, 0);
      break;

    case 2:
      mainbody = (
        <>
          <Box align="center">
            <Icon type="success-filling" size={72} className={styles.succesIcon} />
            <Typography.H1>提交成功</Typography.H1>
            {/* <Typography.Text>5s 后自动返回主页</Typography.Text> */}
            <Box margin={20} direction="row">
              <Button
                type="primary"
                style={{
                  marginRight: '5px',
                }}
                onClick={props.goBackMain}
              >
                返回主页
              </Button>
              <Button onClick={goInitial}>继续创建</Button>
            </Box>
          </Box>
        </>
      );
      break;

    default:
      break;
  }

  if (!mainbody) {
    mainbody = (
      <>
        <Form
          field={projectField}
          isPreview={currentStep === 1}
          className={styles.form}
          responsive
          fullWidth
          labelAlign="top"
        >
          <Form.Item colSpan={12} label="投票项目名称" required requiredMessage="必填">
            <Input placeholder="给项目起个名字" name="title" />
          </Form.Item>

          <Form.Item colSpan={12} label="主题类型">
            {/* <Input placeholder="请输入你的主题类型" name="theme" /> */}
            <Select name="theme" defaultValue="001">
              <Option value="001">主题1(默认)</Option>
              <Option value="002">主题2</Option>
              <Option value="003">主题3</Option>
              <Option value="004">主题4</Option>
              <Option value="005">主题5</Option>
            </Select>
          </Form.Item>

          <Form.Item colSpan={12} label="项目所属分类" required>
            <Select name="type" onChange={onChange} onToggleHighlightItem={onToggleHighlightItem} defaultValue="" >
              <Option value="1">政企精选</Option>
              <Option value="2">优秀先进</Option>
              <Option value="3">萌娃才艺</Option>
              <Option value="4">海选排行</Option>
              <Option value="5">大众服务</Option>
              <Option value="6">活动意向</Option>
              <Option value="7">问卷调查</Option>
              <Option value="8">其他分类</Option>
            </Select>
          </Form.Item>

          <Form.Item colSpan={12} label="项目权限">
            <Radio.Group name="authority">
              <Radio id="private" value="private">
                私密项目
              </Radio>
              <Radio id="internal" value="internal">
                内部项目
              </Radio>
              <Radio id="publish" value="publish">
                开放目
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item colSpan={12} label="投票项目描述" required>
            <Input.TextArea hasLimitHint srows={2} placeholder="请输入项目详细信息100字以内" name="desc" maxLength={100} />
          </Form.Item>

          <Form.Item colSpan={12} label="编辑项目 ➡ 预览效果" required>
            <Input.TextArea
              onChange={handerTextArea}
              style={{ width: '49%' }} rows={20}
              hasLimitHint placeholder="请按格式编辑项目" name="project" maxLength={1000}
              defaultValue={defaultText}
            />
            <div style={{
              float: currentStep == 0 ? 'right' : 'left',
              width: '50%',
              pointerEvents: currentStep == 0 ? '' : 'none'
            }}>
              {
                renderQuestionProject()
              }
            </div>

          </Form.Item>
          <Form.Item colSpan={12}>{actions}</Form.Item>
        </Form>
      </>
    );
  }

  return (
    <IceContainer style={{ padding: '20px 50px' }} key="InfoCenter" title={'创建投票 ⏩'}>
      <Step current={currentStep} shape="circle">
        {steps}
      </Step>
      {mainbody}
    </IceContainer>
  );
};

export default StepForm;
