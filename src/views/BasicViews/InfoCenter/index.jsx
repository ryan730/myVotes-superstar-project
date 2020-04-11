'use strict';

import React, { Component } from 'react';
import { Button, Icon, Card } from '@alifd/next';

import styles from './index.module.scss';

import { request } from '@/utils/request';
import { host, adminInfoList } from '@/config/constant';
import IceContainer from '@icedesign/container';
import { injectIntl, FormattedMessage } from 'react-intl';

const pics = [
    "https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png",
    "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1568876881,884303232&fm=26&gp=0.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584863187115&di=7d17970cf8e1a035d0c914fe3ea514d7&imgtype=0&src=http%3A%2F%2Fpic1.cxtuku.com%2F00%2F01%2F28%2Fb44604289f6f.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584863285358&di=5f280af353376fa33e6d3a053df24fb5&imgtype=0&src=http%3A%2F%2Fgx.offcn.com%2Fdl%2F2016%2F1010%2F20161010033216654.png",
    "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2406799361,2963016726&fm=26&gp=0.jpg"
]

class InfoCenter extends Component {
    state = {
        list: []

    }
    async fetchInfoData(params = {}) {
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
    componentDidMount() {
        this.fetchInfoData().then((val) => {
            if (val instanceof Array && val.length == 0) {
                Message.warning('目前没有数据!')
            }
            this.setState({ list: val }, () => {

            });
        });
    }

    renderCard(item, index) {
        return (<Card key={index} className="free-card custom" free>
            <Card.Media image={pics[index]} />
            <div className="free-card-main">
                <Card.Header title="公告" subTitle={item.title} extra={
                    <Button type="primary" text></Button>
                } />
                <Card.Content>
                    {item.content}
                </Card.Content>
                <Card.Actions>
                    <Button type="primary" key="action1" text>修改日期:{item.date}</Button>
                    {/* <Button type="primary" key="action2" text>Action 2</Button> */}
                </Card.Actions>
            </div>
        </Card>);
    }

    render() {
        const {
            intl: { formatMessage },
        } = this.props;
        console.log('DATA1-->', this.state.list);
        return (<IceContainer key="InfoCenter" title={'公告中心 ⏩'}>
            <div className={styles.box}>
                {
                    this.state.list.map((item, index) => {
                        return this.renderCard(item, index)
                    })
                }
            </div>
        </IceContainer >)
    }
}
export default injectIntl(InfoCenter);