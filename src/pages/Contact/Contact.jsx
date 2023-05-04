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
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=South%20Korea,%20Gwangju,%20Dong-gu,%20Baekseo-ro,%20160%20Chonnam%20National%20University%20Medical%20School+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                  <a href="https://www.maps.ie/distance-area-calculator.html">
                    measure distance on map
                  </a>
                </iframe>
              </Col>
              <Col lg="5" xs="12" className="contact-page__content">
                <h1>LabMI</h1>
                <ul>
                  <li>Location:</li>
                  <li>광주광역시 동구 백서로 160 의과대학 3호관 (역구동) 4층406호 ( 학동 )</li>
                  <li>
                    Gwangju, 160 Baekseo-ro, Dong-gu, College of Medicine, Bldg. 3 (Yeokgu-dong),
                    4th floor, Room 406 (School)
                  </li>
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
