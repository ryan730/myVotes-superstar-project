import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/" className={styles.logo}>
        <img
          style={{ width: '80px', height: '32px' }}
          src={
            require('./images/logo.png')
          }
        />
      </Link>
    </div>
  );
}
