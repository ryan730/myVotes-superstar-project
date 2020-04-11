'use strict';

import React, { Component } from 'react';
import { Button, Icon, Card, ResponsiveGrid, Loading, Box } from '@alifd/next';

import styles from './index.module.scss';

import { request } from '@/utils/request';
import { host, adminVoteList } from '@/config/constant';
import IceContainer from '@icedesign/container';
import { injectIntl, FormattedMessage } from 'react-intl';

const { Cell } = ResponsiveGrid;


const types = ['政企精选', '优秀先进', '萌娃才艺', '海选排行', '大众服务', '活动意向', '问卷调查', '其他分类']

class ShowVotes extends Component {
    state = {
        list: []

    }
    async fetchInfoData(params = {}) {
        let result = [];
        try {
            const data = await request({
                url: `${host}${adminVoteList.api.list}`,
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
            const index = location.hash.split('basic/showVotes/')[1];
            console.log('indexindexindexindexindex===', '__cell__' + (Number(index) + 1));
            this.setState({ list: val }, () => {
                setTimeout(() => {
                    this.scrollToAnchor('__cell__' + (Number(index) + 1))
                }, 100);
            });
        });
    }

    parasData() {
        const types = [];
        this.state.list.map((item) => {
            if (!types[item.type]) {
                types[item.type] = [];
            }
            types[item.type].push(item);
            ///types[item.type] = types[item.type].slice(0,4);// 截取3个位置
            types[item.type] = types[item.type];// 截取3个位置
        })
        return types;
    }

    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) { 
                anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); 
            }
        }
    }

    handerClick = (item) =>{
        this.props.history.push('/basic/detailVote/' + item.id)
    }

    renderCards(cards) {
        return cards.map((c, i) => (
            <Cell key={i} colSpan={3} className={styles.ListItem} onClick={this.handerClick.bind(this,c)}>
                <div className={styles.main}>
                    <img src="https://shadow.elemecdn.com/app/element/list.76b098b1-1732-11ea-948d-7d2ddf6d1c39.png" alt="img" />
                    <div className={styles.content}>
                        <div className={styles.title}>
                            {c.title}
                        </div>
                        <div className={styles.info}>
                            {c.desc}
                        </div>
                        <div className={styles.link}>
                            <a href="#">{c.link}</a>
                            <a href="#">{c.link}</a>
                        </div>
                    </div>
                </div>
            </Cell>
        ));
    };

    renderRowItem(item, index) {

        // <h1 class="subheading"><span></span>最新活动<i></i></h1>
        //return this.renderCards(item)
        //return <div key={index}>{JSON.stringify(item)}</div>

        return <Loading key={index} visible={false}>
            <h1 id={'__cell__'+index} className={styles.subheading}><span></span>{types[index-1]}<i></i></h1>
            <ResponsiveGrid key={index} gap={20}>
                {/* <Cell colSpan={3} className={styles.ListItem}>
                     <Box className={styles.add} justify="center" align="center">
                        <Icon type="add" className={styles.icon} />
                        <div className={styles.addText}>
                            添加内容
                        </div>
                    </Box> 
                </Cell> */}
                {this.renderCards(item)}
            </ResponsiveGrid>
        </Loading>
    }



    render() {
        const {
            intl: { formatMessage },
        } = this.props;
        console.log('DATA1-->', this.state.list);
        return (<IceContainer key="ShowVotes" title={ '投票广场 ⏩' }>
            <div>
                {
                    this.parasData().map((item, index) => {
                        return this.renderRowItem(item, index)
                    })
                }
            </div>
        </IceContainer >)
    }
}
export default injectIntl(ShowVotes);