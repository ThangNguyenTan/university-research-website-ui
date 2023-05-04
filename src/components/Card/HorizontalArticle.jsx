import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

import './article.css';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HorizontalArticle({ title, thumbnail, description, category, createdYear }) {
  return (
    <div className="article">
      <Link to={`/content/${title}`}>
        <Row>
          <Col lg="3" md="5">
            <div
              className="article_thumbnail"
              style={{
                backgroundImage: `url('${thumbnail}')`,
              }}
            />
          </Col>
          <Col lg="9" md="7">
            <div className="article_title">
              <h4>{title}</h4>
            </div>
            <div className="article_description">
              <p className="pre-wrap">{parse(description)}</p>
            </div>
            <div className="article_meta">
              <ul>
                <li>{category}</li>
                <li>.</li>
                <li>{createdYear}</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Link>
    </div>
  );
}

HorizontalArticle.defaultProps = {
  category: null,
  createdYear: null,
};

HorizontalArticle.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdYear: PropTypes.number,
};

export default HorizontalArticle;
