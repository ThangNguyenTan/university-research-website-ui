import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { paginate } from '../../utils';

import './paginator.css';

const PaginationItem = Pagination.Item;

function Paginator({ totalItems, currentPageParam, pageSize, maxPages, onChangePageNumber }) {
  const pageObject = paginate(totalItems, currentPageParam, pageSize, maxPages);

  const renderPaginatorItem = () => {
    const { pages, currentPage } = pageObject;

    return pages.map((page) => {
      if (currentPage === page) {
        return (
          <PaginationItem active key={page} onClick={() => onChangePageNumber(page)}>
            {page}
          </PaginationItem>
        );
      }
      return (
        <PaginationItem key={page} onClick={() => onChangePageNumber(page)}>
          {page}
        </PaginationItem>
      );
    });
  };

  const moveToPreviousPage = () => {
    const { currentPage } = pageObject;

    if (currentPage > 1) {
      onChangePageNumber(currentPage - 1);
    }
  };

  const moveToNextPage = () => {
    const { currentPage, totalPages } = pageObject;

    if (currentPage < totalPages) {
      onChangePageNumber(currentPage + 1);
    }
  };

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem key="prev" onClick={moveToPreviousPage}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </PaginationItem>
      {renderPaginatorItem()}
      <PaginationItem key="next" onClick={moveToNextPage}>
        <FontAwesomeIcon icon={faArrowRight} />
      </PaginationItem>
    </Pagination>
  );
}

Paginator.defaultProps = {
  currentPageParam: 1,
  pageSize: 10,
  maxPages: 10,
};

Paginator.propTypes = {
  totalItems: PropTypes.number.isRequired,
  currentPageParam: PropTypes.number,
  pageSize: PropTypes.number,
  maxPages: PropTypes.number,
  onChangePageNumber: PropTypes.func.isRequired,
};

export default Paginator;
