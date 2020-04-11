import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Input, Checkbox, Grid, Form, Message } from '@alifd/next';
///import { useRequest } from '@/utils/request';
import { myCookie } from '@/utils';
///import { userLogin } from '@/config/dataSource';
import styles from './index.module.scss';

import { request } from '@/utils/request';
import { host, userAuth } from '@/config/constant';

const Icon = FoundationSymbol;
const { Row } = Grid;
const FormItem = Form.Item;

function UserLogin(props) {

  //const { loading, request } = useRequest(userLogin);
  const loading = false;
  const [value, setValue] = useState({
    username: '',
    password: '',
    checkbox: false,
  });

  function getPrevURL() {
    let url = '/basic/main';
    try {
      url = props.history.location.state.from
    } catch (e) {
      console.warn(e);
    }
    return url;
  }

  async function fetchAdminData(params) {
    let result = [];
    console.log('登录请求：', `${host}${userAuth.api.login}`, params);
    try {
      const data = await request({
        url: `${host}${userAuth.api.login}`,
        method: 'POST',
        data: params
      });
      result = data.data;
    } catch (err) {
      console.error(err);
      myCookie.del("userinfo");
      Message.success('登录失败:' + JSON.stringify(err));

    }
    return result;
  }

  function formChange(formValue) {
    setValue(formValue);
  }

  function handleSubmit(values, errors) {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    fetchAdminData(values).then((data) => {
      const user = data.data
      if (user instanceof Array && user.length > 0) {
        const goto = getPrevURL();
        Message.success('登录成功:' + goto);
        myCookie.set("userinfo",
          {
            'role': 'user',
            'username': user[0].username,
            'id': user[0].id,
            "isLogin": 1
          });
        props.history.push(goto);
      } else {
        Message.error('登录失败:' + data.ret_msg);
        myCookie.del("userinfo");
      }
    })
  }

  return (
    <div className={styles.userLogin}>
      <a href="#" className={styles.meta}>
        <span className={styles.title}>LOGO</span>
      </a>
      <p className={styles.desc}>请先登录</p>
      <div className={styles.formContainer}>
        <Form value={value} onChange={formChange}>
          <FormItem required requiredMessage="必填" className={styles.formItem}>
            <Input
              innerBefore={
                <Icon type="person" size="small" className={styles.inputIcon} />
              }
              name="username"
              maxLength={20}
              placeholder="用户名"
            />
          </FormItem>
          <FormItem required requiredMessage="必填" className={styles.formItem}>
            <Input
              innerBefore={
                <Icon type="lock" size="small" className={styles.inputIcon} />
              }
              name="password"
              htmlType="password"
              placeholder="密码"
            />
          </FormItem>
          <FormItem>
            <Checkbox name="checkbox" className={styles.checkbox}>
              记住账号
            </Checkbox>
          </FormItem>
          <Row className={styles.formItem}>
            <Form.Submit
              type="primary"
              validate
              disabled={loading}
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              {loading ? '登录中...' : '登 录'}
            </Form.Submit>
            <p className={styles.account}>
              <span className={styles.tipsText} style={{ marginRight: '20px' }}>
                管理员登录：123/123
              </span>
              <span className={styles.tipsText}>用户登录：123/123</span>
            </p>
          </Row>

          <Row className="tips">
            <Link to="/user/register" className={styles.tipsText}>
              立即注册
            </Link>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default UserLogin;
