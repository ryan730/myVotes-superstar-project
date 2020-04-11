import React from 'react';

import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';
import AdminLayout from '@/layouts/AdminLayout';

const UserLogin = React.lazy(() => import('@/views/UserViews/UserLogin'));
const UserRegister = React.lazy(() => import('@/views/UserViews/UserRegister'));

const Main = React.lazy(() => import('@/views/BasicViews/Main'));
const Profile = React.lazy(() => import('@/views/BasicViews/Profile'));
const CreateVote = React.lazy(() => import('@/views/BasicViews/CreateVote'));
const VoteList = React.lazy(() => import('@/views/BasicViews/VoteList'));
const AnalyseList = React.lazy(() => import('@/views/BasicViews/AnalyseList'));
const InfoCenter = React.lazy(() => import('@/views/BasicViews/InfoCenter'));
const ShowVotes = React.lazy(() => import('@/views/BasicViews/ShowVotes'));
const DetailVote = React.lazy(() => import('@/views/BasicViews/DetailVote'));
const DetailVoteSelf = React.lazy(() => import('@/views/BasicViews/DetailVoteSelf'));
const AnalyseVote = React.lazy(() => import('@/views/BasicViews/AnalyseVote'));

const NotFound = React.lazy(() => import('@/views/NotFound'));

// const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
// const Charts = React.lazy(() => import('@/pages/Charts'));
// const BasicCharts = React.lazy(() => import('@/pages/BasicCharts'));
// const Terms = React.lazy(() => import('@/pages/Terms'));
// const Result = React.lazy(() => import('@/pages/Result'));
// const BasicList = React.lazy(() => import('@/pages/BasicList'));
// const ProjectList = React.lazy(() => import('@/pages/ProjectList'));
// const BasicTable = React.lazy(() => import('@/pages/BasicTable'));
// const GeneralTable = React.lazy(() => import('@/pages/GeneralTable'));
// const Profile = React.lazy(() => import('@/pages/Profile'));
// const Setting = React.lazy(() => import('@/pages/Setting'));
// const Fail = React.lazy(() => import('@/pages/Fail'));
// const Empty = React.lazy(() => import('@/pages/Empty'));
// const Forbidden = React.lazy(() => import('@/pages/Forbidden'));
// const ServerError = React.lazy(() => import('@/pages/ServerError'));

const AdminUserList = React.lazy(() => import('@/views/AdminViews/AdminUserList')); // http://localhost:4444/#/admin/userList
const AdminVoteList = React.lazy(() => import('@/views/AdminViews/AdminVoteList')); // http://localhost:4444/#/admin/userList
const AdminInfoList = React.lazy(() => import('@/views/AdminViews/AdminInfoList')); // http://localhost:4444/#/admin/userList
const AdminAnalyseList = React.lazy(() => import('@/views/AdminViews/AdminAnalyseList')); // http://localhost:4444/#/admin/userList
const AdminUserLogin = React.lazy(() => import('@/views/AdminViews/AdminUserLogin')); // http://localhost:4444/#/admin/userList

///const ProjectList = React.lazy(() => import('@/pages/ProjectList'));

const routerConfig = [{
    path: '/user',
    component: UserLayout,
    children: [{
        path: '/login',
        component: UserLogin,
      },
      {
        path: '/register',
        component: UserRegister,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [{
        path: '/userList',
        component: AdminUserList,
      },
      {
        path: '/voteList',
        component: AdminVoteList,
      },
      {
        path: '/infoList',
        component: AdminInfoList,
      },
      {
        path: '/analyseList',
        component: AdminAnalyseList,
      },
      {
        path: '/login',
        component: AdminUserLogin,
      },
      {
        path: '/',
        redirect: '/admin/login',
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [{
        path: '/basic/main',
        component: Main,
      },
      {
        path: '/basic/createVote',
        component: CreateVote,
      },
      {
        path: '/basic/infoCenter',
        component: InfoCenter,
      },
      {
        path: '/basic/showVotes',
        component: ShowVotes,
      },
      {
        path: '/basic/detailVote',
        component: DetailVote,
      },
      {
        path: '/basic/detailVoteSelf',
        component: DetailVoteSelf,
      },
      {
        path: '/basic/analyseVote',
        component: AnalyseVote,
      },
      {
        path: '/basic/userCenter',
        redirect: '/basic/userCenter/profile'
      },
      {
        path: '/basic/userCenter/profile',
        component: Profile,
      },

      {
        path: '/basic/userCenter/VoteList',
        component: VoteList,
      },
      {
        path: '/basic/userCenter/AnalyseList',
        component: AnalyseList,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
