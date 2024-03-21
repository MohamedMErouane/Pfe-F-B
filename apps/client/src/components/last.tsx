// components/LastSection.js

import Link from 'next/link';
import styles from '../styles/styles.module.css';

const Last = () => {
  return (
    <div className={styles.lastSection}>
      <h2 className={styles.bigText2}>What are you waiting for?</h2>
      <p className={styles.smallText}>Join the study team!</p>
      <Link href="/Login" passHref>
        <button className={styles.getStartedButton}>Get Started</button>
      </Link>
    </div>
  );
}

export default Last;
