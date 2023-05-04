import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import './article.css';

function Article({ title, thumbnail, description, category, createdYear }) {
  return (
    <div className="article">
      <Link to={`/content/${title}`}>
        <div className="article_thumbnail" style={{ backgroundImage: `url('${thumbnail}')` }} />
        {category && createdYear ? (
          <div className="article_meta">
            <ul>
              <li>{category}</li>
              <li>.</li>
              <li>{createdYear}</li>
            </ul>
          </div>
        ) : (
          <></>
        )}
        <div className="article_title">
          <h4>{title}</h4>
        </div>
        <div className="article_description">
          <p className="pre-wrap">{parse(description)}</p>
        </div>
      </Link>
    </div>
  );
}

Article.defaultProps = {
  category: null,
  createdYear: null,
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdYear: PropTypes.number,
};

export default Article;
