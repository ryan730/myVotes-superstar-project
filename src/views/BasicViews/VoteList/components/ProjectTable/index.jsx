import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import IceContainer from '@icedesign/container';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Progress, Pagination, Dialog, Message } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import DATA from './data';
import styles from './index.module.scss';
import { request } from '@/utils/request';
import { host, userVoteList } from '@/config/constant';

export default withRouter(injectIntl((props) => {
  const _props_ = props;
  let record = {};
  ///let pageIndex = 0;
  const {
    intl: { formatMessage },
    cRef
  } = _props_;

  const [splitData, setSplitData] = useState([]);
  const [source, setSource] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);


  async function fetchUserData(params) {
    let result = [];
    try {
      const data = await request({
        url: `${host}${userVoteList.api.search}?batch=${params.votes.join(',')}`,
        method: 'GET',
        data: { btach: params.votes }
      });
      result = data.data.data;
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    getRecord: (newVal) => {
      return record;
    },
    setRefresh: (newVal) => {
      console.log('setRefresh-->', newVal, pageIndex);
      ///pageIndex = 1;
      setSource(newVal);
    },
    setInfo: (newVal) => {
      console.log('setInfo-->', newVal, pageIndex);
      fetchUserData({
        ...newVal
      }).then((val) => {
        console.log('DATA1-->', source);
        setSource(val);
      });
    }
  }));

  function renderAction(value, id, record) {
    ///console.log('value===', value, id, record);
    //http://localhost:4444/#/basic/detailVote/2020205
    return (
      <div className={styles.product}>
        <a
          onClick={handleCheck.bind(this, record)}
          className={styles.hb}
        >
          <FormattedMessage id="app.btn.check" />
        </a>
        <a
          onClick={handleEdit.bind(this, record)}
          className={styles.hb1}
        >
          <FormattedMessage id="app.btn.edit" />
        </a>
        <a
          onClick={handleRemove.bind(this, record)}
          className={styles.hb2}
        >
          <FormattedMessage id="app.btn.delete" />
        </a>
      </div>
    );
  }

  async function delUserData(params) {
    let result = [];
    try {
      const data = await request({
        url: `${host}${userVoteList.api.delete}`,
        method: 'POST',
        data: { id: params.id }
      });
      result = data.data.data;
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  function handleRemove(params) {
    const { onUpdate } = _props_;
    Dialog.confirm({
      title: '提示',
      content: '确认删除该项目吗？',
      onOk: () => {
        delUserData(params).then((val) => {
          console.log('params.id1:', `${params.id}`);
          console.log('params.id2:', val);
          onUpdate && onUpdate('setRefreshTable', val);
        });
      }
    });

  }

  function handleEdit(value) {
    record = value;
    console.log('record:', record);
    const { onUpdate } = _props_;
    onUpdate && onUpdate('setVisible', true);
  }

  function handleCheck(value) {
    record = value;
    //console.log('record:', record);
    props.history.push(`/basic/detailVoteSelf/${record.id}`)
  }

  /* 
  pageination变化
 */
  function handleChange(page) {
    console.log('page-->', page, source);
    ///pageIndex = page;
    ////changePageIndex(page);
    setPageIndex(page);
    //getData({ pageNo: page, beSend: true });
    setSplitData(getSplitData(page - 1))
  }

  useEffect(() => {
    // fetchUserData().then((val) => {
    //   console.log('DATA1-->', source);
    //   setSource(val);
    // });

  }, [])


  useEffect(() => {
    console.log('DATA2-->', source);
    handleChange(pageIndex);
  }, [source])

  const changePageIndex = useCallback((val) => {
    setPageIndex(val);
    console.log('changePageIndex', val, pageIndex)
  }, [source])


  function getSplitData(pageIndex) {
    const startPageIndex = Math.max((pageIndex) * 10, 0);
    const endPageIndex = Math.min((pageIndex + 1) * 10, source.length);
    console.log('pageIndex:', startPageIndex, endPageIndex);
    return source.slice(startPageIndex, endPageIndex);
  }

  return (!(source instanceof Array)) &&
    (!(splitData instanceof Array) || splitData.length == 0)
    ? null : (
      <IceContainer key="crumb"
        title={'投票管理 ⏩'}
      >
        {
          console.log('render:::', source, splitData, pageIndex)
        }
        <Table dataSource={splitData} hasBorder={false} style={{ width: '100%' }}>
          <Table.Column title="投票ID" dataIndex="id" />
          <Table.Column title="投票标题" dataIndex="title" width={100}/>
          <Table.Column title="内容" dataIndex="desc" width={200}/>
          <Table.Column title="主题类型" dataIndex="theme" />
          <Table.Column title="票数" dataIndex="count" />
          <Table.Column title="状态" dataIndex="status" />
          <Table.Column title="结果id" dataIndex="resultid" />
          <Table.Column title="投票发起人" dataIndex="ownerid" />
          <Table.Column title="参与者id" dataIndex="playersid" cell={(value) => <div>{value.toString()}</div>} />
          <Table.Column width={200}
            title="操作"
            dataIndex="action"
            cell={renderAction}
          />
        </Table>
        {/* <Pagination current={1} total={DATA.length} className={styles.pagination} /> */}
        <Pagination className={styles.custom_pagination} current={pageIndex} pageSize={10} onChange={handleChange} total={source.length} totalRender={total => `Total: ${source.length}`} />
      </IceContainer>
    );
}));
