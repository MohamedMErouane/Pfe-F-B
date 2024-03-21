"use client"
import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/styles.module.css';
import { IoMdSchool } from "react-icons/io";
import Link from 'next/link';
import AdditionalInfo from '../components/AdditionalInfo';
import Footer from '../components/Foter';
import Last from '../components/last';
import Appbar from '@/components/Appbar';

export default function Home() {

  return (
    <>
      <Appbar /> 
    <div>
      {/* Video Background */}
      <video autoPlay muted loop style={{ minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.bigText}>
        <h1>Meet, chat, and study with students from all over School🌍</h1>
        <p>Join the largest global student community online of ESTE and say goodbye to lack of motivation.</p>
        <Link href="/learn-more" passHref className={styles.learnMoreButton}>
          Study Together Now
        </Link>
        <div className={styles.additionalText}>
          <p className={styles.transparentText}>100% Free!</p>
          <p className={styles.transparentText}>500 Online</p>
        </div>    </div>


    </div>
    
    <AdditionalInfo />
    <Last />
    <Footer />
    </>
  );
}
