// components/Footer.js

import { IoMdSchool } from 'react-icons/io';
import styles from '../styles/styles.module.css';
import { FaInstagram, FaFacebook, FaGithub, FaWhatsapp } from 'react-icons/fa';


const Footer = () => {
    return (
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <IoMdSchool size={40} />
          <span className={styles.name}>Study
            With Me</span>
      </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerColumn}>
          
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">How to Study Together</a></li>
              <li><a href="#">Community events</a></li>
              <li><a href="#">Academy</a></li>
              <li><a href="#">Discord server</a></li>
              <li><a href="#">Zoom Study Rooms</a></li>
              <li><a href="#">Study Stream</a></li>
              <li><a href="#">Study Room</a></li>
              <li><a href="#">Micro Communities</a></li>
              <li><a href="#">Own Study Universe</a></li>
              <li><a href="#">Study Places Near Me</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>About</h3>
            <ul>
              <li><a href="#">Latest news & releases</a></li>
              <li><a href="#">FAQs & Rules</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Our Tutors & Supporters</a></li>
              <li><a href="#">Jobs</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Terms and conditions</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Imprint</a></li>
            </ul>
          </div>
        </div>
        <p ><strong>Follow Us :</strong></p>
        <div className={styles.socialIcons}>
            
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
      </footer>
    );
  }
  
  export default Footer;