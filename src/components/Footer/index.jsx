import React from 'react';
import Logo from '../Logo';

import styles from './index.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.copyright}>
       © 2020 Theme designed by {' '}
        <a
          href="https://github.com/ryan730"
          target="_blank"
          className={styles.copyrightLink}
          rel="noopener noreferrer"
        >
          Ryan.zhu
        </a>
      </div>
    </div>
  );
}
