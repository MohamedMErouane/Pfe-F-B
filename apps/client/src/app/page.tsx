'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Appbar from '@/components/Appbar';
import AdditionalInfo from '../components/AdditionalInfo';
import Footer from '../components/Foter';
import Last from '../components/last';
import Features from '@/components/Features';
import AboutSection from '@/components/AboutSection';
import styles from '../styles/styles.module.css';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      window.location.href = '/home';
    } else {
      setLoading(false);
    }
  }, [session]);

  if (loading || session) return null;

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
          </div>
        </div>
      </div>
      <AdditionalInfo />
      <h2 className="mt-40 text-3xl font-bold mb-8 text-black text-center">Discover Study Together</h2>
      {/* Title and subtitle */}
      <div className="mt-40 section-header text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-black">
          Find your community. Set Goals. <br />Achieve Them. Get rewarded.
        </h2>
      </div>
      <Features />
      <AboutSection />
      <Last />
      <Footer />
    </>
  );
}
