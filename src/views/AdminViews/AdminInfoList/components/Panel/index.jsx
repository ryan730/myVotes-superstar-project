import React, { useState, useEffect } from 'react';
import IcePanel from '@icedesign/panel';
import { Button, Icon, Form, Input } from '@alifd/next';
import { request } from '@/utils/request';
import { host, adminInfoList } from '@/config/constant';

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
        justifyContent: 'space-around'
    }
}

export default function Panel(props) {
    const _props_ = props;

    async function editUserData(params) {
        let result = [];
        try {
            const data = await request({
                url: `${host}${adminInfoList.api.edit}`,
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

        const { onUpdate } = _props_;
        editUserData(params).then((val) => {
            if (val instanceof Array && val.length == 0) {
                Message.warning('目前没有数据!')
            }
            console.log('params.id1:', `${host}${adminInfoList.api.edit}${params.id}`);
            console.log('params.id2:', val);
            onUpdate && onUpdate('setRefreshTable', val);
        });
        handleClose(_props_);
    }
    function handleSubmit2(params) {
        handleClose(_props_);
    }
    function renderInput(placeholder, key, value) {
        const dVal = value || ' ';
        return (<FormItem key={key}
            style={{ width: '400px', ...style.rowFormat }}
        >
            <span id="select-a11y" style={{ marginRight: '50px' }}>{key}: </span>
            <Input name={key} disabled={key == 'id' ? true : false} style={{ width: 200 }} trim placeholder={placeholder} defaultValue={dVal} />
        </FormItem>)
    }
    /* 
  关闭弹窗
 */
    function handleClose(props) {
        const { onUpdate } = props;
        onUpdate && onUpdate('setVisible', false);
    }
    function renderContent() {
        return <Form key={'Form'} style={{ width: '100%', padding: '0 20px' }} {...formItemLayout} labelTextAlign="left" size="medium" >

            <FormItem label="">
                {
                    Object.keys(_props_.data).map((val) => {
                        return renderInput('', val, _props_.data[val].toString());
                    })
                }
            </FormItem>

            <FormItem label=" ">
                <Form.Submit type="primary" validate onClick={handleSubmit1}>保存</Form.Submit>
                <Form.Submit type="primary" style={{ marginLeft: '50px' }} validate onClick={handleSubmit2}>取消</Form.Submit>
            </FormItem>
        </Form>
    }
    /* 
   弹框渲染
  */
    function renderPanel() {
        const panelTitle = '编辑';
        let type = (panelTitle) ? 'update' : 'create';
        return (
            <div style={{ width: '500px' }}>
                <IcePanel status="info" style={{ marginBottom: '10px' }}>
                    <IcePanel.Header style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        backgroundColor: '#3080FE',
                        color: 'white'
                    }}>
                        {panelTitle}
                        <Button type="primary" onClick={() => handleClose(props)}><Icon type="close" /></Button>
                    </IcePanel.Header>
                    <IcePanel.Body>
                        <div style={{ fontSize: '15px', margin: 0, lineHeight: 1.5, color: '#333', maxHeight: '600px', overflowY: 'auto' }}>
                            {renderContent()}
                        </div>
                    </IcePanel.Body>
                </IcePanel>
            </div>);
    }
    return renderPanel();
}