import React, { useState } from 'react';
import { ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import _ from 'lodash';
import parse from 'html-react-parser';

function JobItem({ jobName, description }) {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <div key={jobName} style={{ marginBottom: '50px' }}>
      <div className="article_title">
        <h3>{jobName}</h3>
      </div>
      <div className="article_description">
        {isReadMore ? (
          <p className="pre-wrap">{parse(description)}</p>
        ) : (
          <p className="pre-wrap">
            {parse(
              description && _.get(description, 'length', 0) > 256
                ? `${description.substring(0, 256)}...`
                : description
            )}
          </p>
        )}
      </div>
      <div>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="First group">
            <a
              className="btn btn-success"
              href="mailto:iroopark@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Apply Now
            </a>
          </ButtonGroup>
          <ButtonGroup className="me-2" aria-label="First group">
            <button
              className="btn btn-dark"
              type="button"
              onClick={() => {
                setIsReadMore(!isReadMore);
              }}
            >
              {isReadMore ? 'Read Less' : 'Read More'}
            </button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <hr />
    </div>
  );
}

export default JobItem;
