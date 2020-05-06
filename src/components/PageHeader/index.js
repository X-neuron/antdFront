import React from 'react';
import pathToRegexp from 'path-to-regexp';
import { Breadcrumb, Tabs } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

import useLocaleModel from '@/models/useLocale';
import useTabRouteModel from '@/models/useTabRoute'


const { TabPane } = Tabs;


const PageHeader = props => {

  return (
    <div className={clsString}>
      {breadcrumb}
      <div className={styles.detail}>
        {logo && <div className={styles.logo}>{logo}</div>}
        <div className={styles.main}>
          <div className={styles.row}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {action && <div className={styles.action}>{action}</div>}
          </div>
          <div className={styles.row}>
            {content && <div className={styles.content}>{content}</div>}
            {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
          </div>
        </div>
      </div>
      {tabList &&
        tabList.length && (
          <Tabs
            className={styles.tabs}
            {...activeKeyProps}
            onChange={this.onChange}
            tabBarExtraContent={tabBarExtraContent}
          >
            {tabList.map(item => <TabPane tab={item.tab} key={item.key} />)}
          </Tabs>
        )}
    </div>
  );
}
}
