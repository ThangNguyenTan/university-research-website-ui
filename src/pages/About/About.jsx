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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Sed felis eget velit aliquet.
                  Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Turpis
                  tincidunt id aliquet risus feugiat in ante metus dictum.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Sed felis eget velit aliquet.
                  Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Turpis
                  tincidunt id aliquet risus feugiat in ante metus dictum. A arcu cursus vitae
                  congue mauris rhoncus aenean vel elit. Mattis enim ut tellus elementum sagittis
                  vitae et. Urna nunc id cursus metus aliquam eleifend mi. Eleifend mi in nulla
                  posuere. Vestibulum sed arcu non odio. Ultricies mi eget mauris pharetra. Sit amet
                  aliquam id diam maecenas ultricies mi eget. Gravida neque convallis a cras semper
                  auctor neque vitae. Netus et malesuada fames ac turpis egestas maecenas pharetra
                  convallis. Tristique risus nec feugiat in fermentum.
                </p>
                <p>
                  Sit amet nisl purus in mollis nunc sed id semper. Faucibus a pellentesque sit amet
                  porttitor eget dolor morbi non. Tellus integer feugiat scelerisque varius morbi
                  enim nunc. Platea dictumst quisque sagittis purus. Mauris cursus mattis molestie a
                  iaculis at. Vehicula ipsum a arcu cursus vitae congue mauris. Turpis cursus in hac
                  habitasse platea dictumst quisque. Urna cursus eget nunc scelerisque viverra.
                  Maecenas sed enim ut sem viverra aliquet eget sit. Sed nisi lacus sed viverra
                  tellus in. Id donec ultrices tincidunt arcu non sodales neque sodales ut.
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
