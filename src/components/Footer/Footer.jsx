import React from 'react';
import { Container } from 'react-bootstrap';

import './footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <div className="footer_content">
          <h5>UniR&D © {currentYear}</h5>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
