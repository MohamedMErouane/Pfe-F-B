"use client"
import Head from 'next/head';
import styles from '../styles/styles.module.css';
import { IoMdSchool } from "react-icons/io";
import Link from 'next/link';
import { useEffect, useState } from 'react';


const Appbar = () => {

    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
        <Head>
        <title>Study With Me</title>
        <meta name="description" content="Study with me landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className={`${styles.navbar} ${showNavbar ? '' : styles.hide}`}>
        <div className={styles.navbarLogo}>
          <IoMdSchool size={40} />
          <span>Study
            With Me</span>
        </div>
        <div className={styles.navbarButtons}>
          <Link href="/auth/signup" passHref className={`${styles.navButton} ${styles.signup}`}>
            Sign Up
          </Link>
          <Link href="/auth/signin" passHref className={`${styles.navButton} ${styles.login}`}>
            Login
          </Link>
        </div>
      </nav>

    </>
  );
};

export default Appbar;