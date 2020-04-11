'use strict';

import React, { Component } from 'react';
import { Button, Icon } from '@alifd/next';

import styles from './index.module.scss';

import { request } from '@/utils/request';
import { host, adminInfoList } from '@/config/constant';

//import TextScroll from 'react-textscroll'

import Swiper from 'swiper/dist/js/swiper.js'

import 'swiper/dist/css/swiper.min.css'


class Main extends Component {

  state = {
    list:
      [
        {
          content: '票投投”在线投票网站一期顺利上线之际，为庆贺网站的顺利完成和创作者的辛勤付出，特推出2万元红包大礼，答谢各位用户！活动详情，请关注这里.'
        },
        {
          content: '2. 第二条消息'
        },
        {
          content: '3. 第三条消息'
        }
      ]

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

  renderRadiusLight(color, dir) {
    const styled = {
      borderRadius: '10px',
      backgroundColor: color,
      boxShadow: '0px 0px 10px 5px' + color,
      width: '10px',
      height: '10px'
    }
    let innerStyle = (dir == 'left') ? { marginLeft: '20px' } : { marginRight: '20px' };
    innerStyle = Object.assign({ ...innerStyle }, styled);
    return <div style={innerStyle} ></div>
  }

  renderTxtLoop() {
    const testText = '票投投”在线投票网站一期顺利上线之际，为庆贺网站的顺利完成和创作者的辛勤付出，特推出2万元红包大礼，答谢各位用户！活动详情，请关注这里.';
    const swiperContainer = {
      width: '300px',
      height: '200px'
    }
    return (<div className="swiper-container">
      <div className="swiper-wrapper">
        {
          this.state.list.map((item, index) => {
            const content = item.content + testText + testText;
            return <div key={index} className="swiper-slide" >
              <div onClick={()=>{
                this.props.history.push('/basic/infoCenter')
              }} className={styles.swiperItem}>{content}</div>
            </div>
          })
        }
      </div>

      {/* <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-scrollbar"></div> */}
    </div>
    )
  }

  refreshSwiper() {
    new Swiper('.swiper-container', {
      // startSlide Integer(default : 0) - 开始滚动的位置
      // speed Integer(default: 300) - 动画滚动的间隔（秒数）
      // auto Integer - 开始自动幻灯片（以毫秒为单位幻灯片之间的时间）
      // continuous Boolean(default: true) - 创建一个无限的循环（当滑动到所有动画结束时是否循环滑动）
      // disableScroll Boolean(default: false) - 当滚动滚动条时是否停止幻灯片滚动
      // stopPropagation Boolean(default: false) - 是否停止事件冒泡
      // callback Function - 幻灯片运行中的回调函数
      // transitionEnd Function - 动画运行结束的回调函数
      direction: 'vertical', // 垂直切换选项
      height: 200,
      speed: 300, //(default: 300) - 动画滚动的间隔（秒数）
      autoplay: 3000,//自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
      loop: true,  //循环
      autoplayDisableOnInteraction: false,
      // autoplay: {   //滑动后继续播放（不写官方默认暂停）
      //   disableOnInteraction: false,
      // },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {  //分页器
        el: '.swiper-pagination'
      },
      // // 如果需要滚动条
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    })
  }

  componentDidMount() {
    this.fetchInfoData().then((val) => {
      if (val instanceof Array && val.length == 0) {
        Message.warning('目前没有数据!')
      }
      console.log('DATA1-->', val);
      this.setState({ list: val }, () => {
        this.refreshSwiper();
      });
    });
  }

  handerClick = (index) => {
    //console.log('handerClick--', this.props.history, e.currentTarget)
    this.props.history.push('/basic/showVotes/' + index);
  }

  render() {
    return (
      <div className={styles.box}>
        <div id='__basicViews_bannerWrap__' className={styles.bannerWrap}>
          <img
            className={styles.banner}
            src={
              require('./images/bg.png')
            }
          />
          <img
            className={styles.frontPic}
            src={
              require('./images/info.png')
            }
          />
          <span className={styles.frontTitle}>票投投 - 投票活动的最佳选择!</span>
          <span className={styles.frontSubTitle1}>“ 注册当天就可以免费发布投票信息，全程无收费环节，帮助您快速定制投票活动，互动营销，涨粉的好帮手！”</span>
          <span className={styles.frontSubTitle2}>“ 获得投票之星称号，更可得神秘大礼！”</span>
          <div className={styles.frontSubTitle3}>
            {this.renderTxtLoop()}
          </div>
          <div className={styles.frontBut}>
            <Button type="primary" warning size="large"
              onClick={() => {
                this.props.history.push('/basic/createVote');
              }}
            ><Icon type="add" />开始创建</Button>
          </div>

        </div>
        <div className={styles.bd}>
          <span className={styles.votingClassification}>投票分类</span>
          <span className={styles.subtitle}>行业分类,热门精选</span>
          <div className={styles.container}>
            <div id='__outer1__' className={styles.outer1}>
              <div className={styles.outer1_1} onClick={this.handerClick.bind(this, 0)}>
                <span className={styles.subouter}>政企精选</span>
                {this.renderRadiusLight('#FF69B4', 'left')}
              </div>
              <div className={styles.outer1_2} onClick={this.handerClick.bind(this, 1)}>
                <span className={styles.subouter}>优秀先进</span>
                {this.renderRadiusLight('#FF00FF', 'left')}
              </div>
              <div className={styles.outer1_3} onClick={this.handerClick.bind(this, 2)}>
                <span className={styles.subouter}>萌娃才艺</span>
                {this.renderRadiusLight('#9370DB', 'left')}
              </div>
              <div className={styles.outer1_4} onClick={this.handerClick.bind(this, 3)}>
                <span className={styles.subouter}>海选排行</span>
                {this.renderRadiusLight('#40E0D0', 'left')}
              </div>
            </div>
            <div id='__outer2__' className={styles.outer2}>
              <div className={styles.itemWrap}>
                <img
                  style={{ width: '300px', height: '300px' }}
                  src={
                    require('./images/rotation.png')
                  }
                />
              </div>
            </div>
            <div id='__outer3__' className={styles.outer3}>
              <div className={styles.outer3_1} onClick={this.handerClick.bind(this, 4)}>
                {this.renderRadiusLight('#7CFC00', 'right')}
                <span className={styles.publicService}>大众服务</span>
              </div>
              <div className={styles.outer3_2} onClick={this.handerClick.bind(this, 5)}>
                {this.renderRadiusLight('#FF00FF', 'right')}
                <span className={styles.publicService}>活动意向</span>
              </div>
              <div className={styles.outer3_3} onClick={this.handerClick.bind(this, 6)}>
                {this.renderRadiusLight('#FFFF00', 'right')}
                <span className={styles.publicService}>问卷调查</span>
              </div>
              <div className={styles.outer3_4} onClick={this.handerClick.bind(this, 7)}>
                {this.renderRadiusLight('#FF8C00', 'right')}
                <span className={styles.publicService}>其他分类</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
