import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className='footer'>
      <h2>Interface with me!</h2>
      <div>
        <FaLinkedin size={30} />
        <FaGithub size={30} />
        <FaInstagram size={30} />
      </div>
    </footer>
  );
}

export default Footer;
