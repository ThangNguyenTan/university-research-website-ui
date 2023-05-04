import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './article.css';

function Person({ name, image, title }) {
  return (
    <div className="article people">
      <Link to={`/team/${name}`}>
        <div className="article_thumbnail" style={{ backgroundImage: `url('${image}')` }} />
        <div className="article_title">
          <h4>{name}</h4>
        </div>
        <div className="article_description">
          <p>{title}</p>
        </div>
      </Link>
    </div>
  );
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Person;
