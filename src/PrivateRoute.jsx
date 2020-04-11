import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { myCookie } from "./utils";
import { Message } from '@alifd/next';

class Authentication extends Component {
    renderIsLoginRoute(isLogin, aurthority) {
        const { key, component: ComposedComponent, path: routePath, ...rest } = this.props;
        const initGotos = {
            'admin': '/admin/userList',
            'guest': '/admin/login',
            'user': '/basic/main'
        }
        if (isLogin && (routePath == '/user/login' || routePath == '/user/register')) {
            Message.show('没有用户权限,请登录!');
            return <Redirect
                exact
                key={key}
                from={routePath}
                to={initGotos['user']}
            />
        } else if (isLogin && (routePath == '/admin/login')) {
            Message.show('管理员已登录!');
            return <Redirect
                exact
                key={key}
                from={routePath}
                to={initGotos['admin']}
            />
        } else if (!isLogin && (routePath == '/user/login' || routePath == '/user/register' || routePath == '/admin/login')) {
            ///Message.show(`没有${aurthority}权限,请先登录!`);
            return <Route
                {...rest}
                render={props => <ComposedComponent {...props} />}
            />
        } else if (!isLogin) {
            return <Redirect
                exact
                key={key}
                from={routePath}
                to={{
                    pathname: aurthority == '管理员' ? "/admin/login" : "/user/login",
                    state: { from: routePath }
                }}

            />
        } else {
            return <Route
                {...rest}
                render={props => <ComposedComponent {...props} />}
            />
        }
    }


    render() {
        const { key, component: ComposedComponent, path: routePath, ...rest } = this.props;
        const user = myCookie.get("userinfo");
        let isLogin = (user && user.isLogin) ? true : false;
        let role = (user && user.role) ? user.role : '';
        const aurthority = routePath ? ((routePath.indexOf('/admin/') != -1) ? '管理员' : '用户') :'用户';

        console.log('====userinfo====>>>>', user, isLogin, role, routePath, aurthority);

        // return (isLogin ||
        //     (routePath == '/user/login' || routePath == '/user/register') ||
        //     (routePath == '/admin/login' ) ?
        //     <Route
        //         {...rest}
        //         render={props => <ComposedComponent {...props} />}
        //     /> :
        return this.renderIsLoginRoute(isLogin, aurthority);


    }
};

export default Authentication;