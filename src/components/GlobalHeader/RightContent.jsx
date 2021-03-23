import { Tooltip, Tag } from 'antd';
import { Settings as ProSettings } from '@ant-design/pro-layout';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Locale from '@/components/SelectLang';
import SelectLang from '@/components/SelectLang';
import Avatar from './AvatarDropdown';
import styles from './index.less';



const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  // let className = styles.right;

  // if (theme === 'dark' && layout === 'top') {
  const className = `${styles.right}  ${styles.dark}`;
  // }

  return (
    <div className={className}>

      <Tooltip title="使用文档">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <Avatar />
      <SelectLang />
    </div>
  );
};

export default GlobalHeaderRight;
