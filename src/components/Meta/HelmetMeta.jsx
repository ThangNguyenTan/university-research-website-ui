import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

function HelmetMeta({ title, description }) {
  const finalTitle = `${title} - LabMI`;
  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
}

HelmetMeta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HelmetMeta;
