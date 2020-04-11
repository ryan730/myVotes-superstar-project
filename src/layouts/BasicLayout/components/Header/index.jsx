import React, { useEffect } from 'react';
import { Balloon, Nav, Message, Icon } from '@alifd/next';
import IceImg from '@icedesign/img';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { headerMenuConfig } from '@/config/menu.js';
import stores from '@/stores';
import SelectLang from '@/components/SelectLang';
import Auth from '@/components/Auth';
import { useRequest } from '@/utils/request';
import { userLogout } from '@/config/dataSource';
import Logo from '@/components/Logo';

import styles from './index.module.scss';
import { myCookie } from "@/utils";

/**
 * 根据权限决定是否渲染某个表单项
 * @param {object} item - 菜单项组件
 * @param {array} authorities - 菜单项允许权限数组
 * @return {object} 渲染的菜单项
 */
function renderAuthItem(item, authorities) {
  if (authorities) {
    return Auth({
      children: item,
      authorities,
      hidden: true,
    });
  } else {
    return item;
  }
}

function Header(props) {
  const { request } = useRequest(userLogout);
  const userProfile = stores.useStore('userProfile');
  const expandAside = stores.useStore('expandAside');
  const user = myCookie.get("userinfo") || {};
  const { isLogin, role, username } = user;

  function getLocaleKey(item) {
    return `app.header.${item.name}`;
  }

  function handleSetting() {
    props.history.push('/account/setting');
  }

  async function handleLogout() {
    // try {
    //   await request();
    //   Message.success('已登出');
    //   props.history.push(`/${role}/login`);
    // } catch (err) {
    //   console.error(err);
    // }
    myCookie.del('userinfo');
    Message.success('已登出');
    props.history.push(`/${role}/login`);
  }

  const {
    isMobile,
    intl: { formatMessage },
  } = props;

  const { userinfo, fetchData } = userProfile;
  const { name, department, avatar } = userinfo;
  const { toggle } = expandAside;

  useEffect(() => {
    fetchData();
  }, []);

  const renderBalloon = () => {
    return <Balloon
      trigger={
        <div className={styles.iceDesignHeaderUserpannel}>
          <IceImg
            height={40}
            width={40}
            src={avatar}
            className={styles.userAvatar}
          />
          {
            !isMobile && (
              <div className={styles.userProfile}>
                <span className={styles.userName}>
                  {username}
                </span>
                <br />
                <span className={styles.userDepartment}>
                  {role == 'user' ? '普通用户' : ''}
                </span>
              </div>
            )
          }
          <FoundationSymbol
            type="angle-down"
            size="small"
            className={styles.iconDown}
          />
        </div>
      }
      closable={false}
      className={styles.userProfileMenu}
    >
      <ul>
        {role == 'user' ? <li
          className={styles.userProfileMenuItem}
          onClick={handleSetting}
        >
          <FoundationSymbol type="repair" size="small" />
          <FormattedMessage id="app.header.user.setting" />
        </li> : null
        }
        <li
          className={styles.userProfileMenuItem}
          onClick={handleLogout}
        >
          <FoundationSymbol type="person" size="small" />
          <FormattedMessage id="app.header.user.logout" />
        </li>
      </ul>
    </Balloon>
  }

  const renderNavi1 = () => {
    {
      return (headerMenuConfig && headerMenuConfig.length > 0 ? (
        <div className={styles.iceDesignLayoutHeaderMenu}>
          <Nav direction="hoz" type="secondary" selectedKeys={[]}>
            {headerMenuConfig.map((nav, idx) => {
              const linkProps = {};
              if (nav.newWindow) {
                linkProps.href = nav.path;
                linkProps.target = '_blank';
              } else if (nav.external) {
                linkProps.href = nav.path;
              } else {
                linkProps.to = nav.path;
              }
              const linkName = formatMessage({ id: getLocaleKey(nav) });
              const item = (
                <Nav.Item key={idx}>
                  {linkProps.to ? (
                    <Link {...linkProps}>
                      {nav.icon ? (
                        <FoundationSymbol type={nav.icon} size="small" />
                      ) : null}{' '}
                      {!isMobile ? linkName : null}
                    </Link>
                  ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}{' '}
                        {!isMobile ? linkName : null}
                      </a>
                    )}
                </Nav.Item>
              );

              return renderAuthItem(item, nav.authorities);
            })}
          </Nav>
        </div>
      ) : null)
    }

  }

  const renderNavi = () => {// 控制头部导航的改变
    const { Item, SubNav } = Nav;
    let defaultSelectedKeys = ['home'];
    let defaultKeys = ['home', 'createVote', 'showVotes', 'infoCenter', 'userCenter', 'detailVote', 'detailVoteSelf','analyseVote'];
    defaultKeys.map((item) => {
      if (location.hash.indexOf(item) != -1) {

        defaultSelectedKeys = [item];
      }
    })

    const onClick = (e) => {
      switch (e) {
        case 'home':
          props.history.push('/basic/main');
          break;
        case 'createVote':
          props.history.push('/basic/createVote');
          break;
        case 'showVotes':
          props.history.push('/basic/showVotes');
          break;
        case 'infoCenter':
          props.history.push('/basic/infoCenter');
          break;
        case 'userCenter':
          props.history.push('/basic/userCenter');
          break;
        case 'detailVote':
          props.history.push('/basic/detailVote');
          break;
        case 'detailVoteSelf':
          props.history.push('/basic/detailVoteSelf');
          break;
        case 'analyseVote':
          props.history.push('/basic/analyseVote');
          break;
        default:
          break;
      }
    }

    console.log('defaultSelectedKeys===>>>', defaultSelectedKeys);


    return (
      <Nav className={styles.basicnav} direction="hoz" type="secondary" selectedKeys={defaultSelectedKeys} triggerType="hover">
        <Item key="home" onClick={onClick.bind(this, 'home')}><i className={styles.iconfont}>&#xe7a7;</i><div className={styles.item}>首页</div></Item>
        <Item key="createVote" onClick={onClick.bind(this, 'createVote')}><i className={styles.iconfont}>&#xe6f9;</i><div className={styles.item}>创建投票</div></Item>
        <Item key="showVotes" onClick={onClick.bind(this, 'showVotes')}><i className={styles.iconfont}>&#xe6ef;</i><div className={styles.item}>投票广场</div></Item>
        <Item key="infoCenter" onClick={onClick.bind(this, 'infoCenter')}><i className={styles.iconfont}>&#xe75a;</i><div className={styles.item}>公告中心</div></Item>
        <Item key="userCenter" onClick={onClick.bind(this, 'userCenter')}><i className={styles.iconfont}>&#xe7b2;</i><div className={styles.item}>个人中心</div></Item>
        {/* <SubNav label="Component" selectable>
          <Item key="next">Next</Item>
          <Item key="mext">Mext</Item>
        </SubNav> */}

      </Nav>
    )
  }

  return (
    <div className={styles.iceDesignLayoutHeader}>
      <div className={styles.headerLeft}>
        <Logo />
        {/* <img onClick={() => toggle()} className={styles.expandIcon} width="20" height="20" src="https://img.alicdn.com/tfs/TB19Q3Qa.T1gK0jSZFhXXaAtVXa-32-32.svg" alt="expand icon" /> */}
      </div>
      {/* Header 菜单项 begin */}
      <div className={styles.headerLeft1}>
        {
          renderNavi()
        }
        {/* {headerMenuConfig && headerMenuConfig.length > 0 ? (
          <div className={styles.iceDesignLayoutHeaderMenu}>
           
          </div>
        ) : null} */}
        {/* Header 菜单项 end */}

        <div className={styles.headerAction}>
          {/* 多语言选择 */}
          {/* <SelectLang /> */}

          {/* Header 右侧内容块 */}
          {isLogin ? renderBalloon() : null}
        </div>

      </div>
    </div>
  );
}

export default injectIntl(withRouter(Header));

