// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: 'feedback',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: 'help',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
    // authorities: ['admin'], // 配置该属性进行权限校验，如不匹配隐藏菜单
  },
];

const asideMenuConfig = [
  {
    name: '个人资料',
    path: '/basic/userCenter/profile',
    icon: 'menu',
  },
   {
    name: '个人创建投票',
    path: '/basic/createVote',
    icon: 'menu',
  },
   {
    name: '个人投票管理',
    path: '/basic/userCenter/voteList',
    icon: 'menu',
  },
   {
    name: '个人统计管理',
    path: '/basic/userCenter/analyseList',
    icon: 'menu',
  }
];

export { headerMenuConfig, asideMenuConfig };
