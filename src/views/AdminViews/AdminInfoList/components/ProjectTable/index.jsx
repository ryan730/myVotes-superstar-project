import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import IceContainer from '@icedesign/container';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Progress, Pagination, Dialog, Message } from '@alifd/next';
import { withRouter } from 'react-router-dom';
/// import DATA from './data';
import styles from './index.module.scss';
import { request } from '@/utils/request';
import { host, adminInfoList } from '@/config/constant';

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
        url: `${host}${adminInfoList.api.list}`,
        method: 'GET'
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
      console.log('setRefresh-->', newVal,pageIndex);
      ///pageIndex = 1;
      setSource(newVal);
    }
  }));

  function renderAction(value, id, record) {
    ///console.log('value===', value, id, record);

    return (
      <div className={styles.product}>
        <a
          onClick={handleEdit.bind(this, record)}
          className={styles.hb}
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
        url: `${host}${adminInfoList.api.delete}`,
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
          console.log('params.id1:', `${host}${adminInfoList.api.delete}${params.id}`);
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

  /* 
  pageination变化
 */
  function handleChange(page) {
    console.log('page-->', page, source);
    ///pageIndex = page;
    ////changePageIndex(page);
    setPageIndex(page);
    //getData({ pageNo: page, beSend: true });
    setSplitData(getSplitData(page-1))
  }

  useEffect(() => {
    fetchUserData().then((val) => {
      if (val instanceof Array && val.length == 0) {
        Message.warning('目前没有数据!')
      }
      console.log('DATA1-->', source);
      setSource(val);
    });

  }, [])


  useEffect(() => {
    console.log('DATA2-->', source);
    handleChange(pageIndex);
  }, [source])

  const changePageIndex = useCallback((val) => {
    setPageIndex(val);
    console.log('changePageIndex',val,pageIndex)
  }, [source])


  function getSplitData(pageIndex) {
    const startPageIndex = Math.max((pageIndex) * 10,0);
    const endPageIndex = Math.min((pageIndex+1)*10, source.length);
    console.log('pageIndex:',  startPageIndex, endPageIndex);
    return source.slice(startPageIndex, endPageIndex);
  }

  return (!(source instanceof Array)) &&
    (!(splitData instanceof Array) || splitData.length == 0)
    ? null : (
      <IceContainer key="crumb"
        title={formatMessage({ id: '公告管理 ⏩' })}
      >
        {
          console.log('render:::', source, splitData, pageIndex)
        }
        <Table dataSource={splitData} hasBorder={false} style={{ width: '100%' }}>
          <Table.Column title="用户ID" dataIndex="id" />
          <Table.Column title="标题" dataIndex="title" />
          <Table.Column width={400} title="内容" dataIndex="content" />
          <Table.Column title="修改时间" dataIndex="date" />
          <Table.Column title="类型" dataIndex="type" />
          <Table.Column
            title="操作"
            dataIndex="action"
            cell={renderAction}
          />
        </Table>
        <Pagination className={styles.custom_pagination} current={pageIndex} pageSize={10} onChange={handleChange} total={source.length} totalRender={total => `Total: ${source.length}`} />
      </IceContainer>
    );
}));
