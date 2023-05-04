import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

// Components
import { Navigator, Footer, HelmetMeta } from '../../components';

import './about.css';

function About() {
  return (
    <>
      <HelmetMeta
        title="About"
        description={`UniR&D's mission is to accelerate the application of artificial intelligence (AI)
                  algorithms in medical sciences and clinical practice.`}
      />
      <div id="about-page">
        <Navigator />
        <main id="about-main" className="page-main">
          <Container>
            <Row>
              <Col xs="12" lg="8">
                <h1>About UniR&D</h1>

                <p>
                  Opened in 2004 as specialized medical institution consisted of five centers, such
                  as cancer center and joint center, Chonnam National University Hwasun Hospital has
                  become one of the world’s best cancer specialty hospital in recognition of being
                  selected as “World’s Best Hospitals-Oncology” by Newsweek for two consecutive
                  years.
                </p>
                <p>
                  We believe this achievement is the result of sweat and devotions of previous
                  general directors and all hospital members. With the core value of
                  ‘state-of-the-art, patient-oriented, and world centered hospital surrounded by
                  nature’, the hospital is renowned as the best beautiful hospital in Korea and has
                  been leading the advancement of medicine in the nation as the world-centered
                  hospital performing best practices with the world-class medical professionals and
                  cutting-edge medical equipments. As a patient-centered hospital, CNUHH is
                  concentrating all its competences on patient safety, healing, and quality
                  improvement. We are striving to become a “Happy Hospital” for all the visitors and
                  hospital staffs.
                </p>
                <p>
                  In addition, our hospital will be committed to develop the nation’s biomedical
                  industry and conquer cancer as a pivotal role of Hwasun Biomedical Cluster. We
                  will continue our efforts to come closer to patients and customers and provide
                  patient-centered and state-of-the-art medical care.
                </p>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default About;
