import classNames from "classnames";
import styles from "./index.less";

export default ({ className, links, copyRight }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <div className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a key={link.key} target={link.blankTarget ? "_blank" : "_self"} href={link.href}>
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyRight && <div className={styles.copyRight}>{copyRight}</div>}
    </div>
  )
}
