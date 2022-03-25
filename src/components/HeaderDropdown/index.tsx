import { Dropdown } from "antd";
import classNames from "classnames";
import React from "react";

import styles from "./index.less";

interface Props {
  overlayClassName?: string;
  overlay: React.ReactElement;
  [p: string]: any;
}

const HeaderDropdown: React.FC<Props> = ({
  overlay,
  overlayClassName: cls,
  ...restProps
}) => (
  <Dropdown
    overlayClassName={classNames(styles.container, cls)}
    overlay={overlay}
    {...restProps}
  />
);

export default HeaderDropdown;
