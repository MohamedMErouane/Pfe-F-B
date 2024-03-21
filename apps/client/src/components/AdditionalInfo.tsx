// components/AdditionalInfo.js

import React from 'react';
import styles from '../styles/styles.module.css';

const AdditionalInfo = () => {
  return (
    <div className={styles.additionalInfo}>
      <p className={styles.bigText1}>
        Our <strong>student community is more than one million strong</strong> (and this is just the beginning)
      </p>
      <div className={styles.infoContainer}>
        <div className={styles.infoItem}>
          <strong>+1M</strong>
          <p>community members</p>
        </div>
        <div className={styles.infoItem}>
          <strong>+19M</strong>
          <p>study sessions</p>
        </div>
        <div className={styles.infoItem}>
          <strong>+4M</strong>
          <p>study goals reached</p>
        </div>
        <div className={styles.infoItem}>
          <strong>+215</strong>
          <p>countries</p>
        </div>
        <div className={styles.infoItem}>
          <strong>+4.8/5</strong>
          <p>Average rating</p>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
