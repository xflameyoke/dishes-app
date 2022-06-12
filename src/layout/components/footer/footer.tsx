import React from 'react';
import './footer.scss';

const Footer = () => {
  const actDate = new Date().getFullYear();

  return (
    <div className="footer">Mateusz Łuczak {actDate} @ All rights reserved</div>
  );
};

export default Footer;
