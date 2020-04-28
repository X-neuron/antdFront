import React from 'react';
import { Link, Redirect, Switch, Route } from '@reach/router';
import { Copyright } from '@ant-design/icons'
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];

const copyright = (
  <>
    Copyright <Copyright /> 2020 蚂蚁金服体验技术部出品
  </>
);

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Tabs';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Ant Tabs`;
    }
    return title;
  }

  render() {
    const { routerData, match } = this.props;
    return (

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Ant Tabs</span>
              </Link>
            </div>
            <div className={styles.desc}>Ant Tabs 是西湖区最具影响力的 Web 设计规范</div>
          </div>
          <Switch>
            {getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
            <Redirect exact from="/user" to="/user/login" />
          </Switch>
        </div>
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
