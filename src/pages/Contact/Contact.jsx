import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

// Components
import { Navigator, Footer, HelmetMeta } from '../../components';

import './contact.css';

function Contact() {
  return (
    <>
      <HelmetMeta
        title="Contact"
        description="Dana-Farber location: Harvard Institutes of Medicine (HIM) Building, Suite 343 4 Blackfan Cir, Boston, MA 02115, United States Brigham Health location: 221 Longwood Building, Level 4 221 Longwood Avenue, Boston, MA 02115"
      />
      <div id="contact-page">
        <Navigator />
        <main id="contact-main" className="page-main">
          <Container>
            <Row>
              <Col lg="6" xs="12" className="contact-page__map">
                <iframe
                  title="map"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1834%20Abbeyville%20Rd,%20Valley%20City,%20Ohio%2044280,%20USA+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a href="https://www.maps.ie/distance-area-calculator.html">
                    measure distance on map
                  </a>
                </iframe>
              </Col>
              <Col lg="5" xs="12" className="contact-page__content">
                <h1>UniR&D</h1>
                <ul>
                  <li>Location:</li>
                  <li>1834 Abbeyville Rd, Valley City, Ohio 44280, USA</li>
                  <li>1834 Abbeyville Rd, Valley City, Ohio 44280, USA</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Contact;
