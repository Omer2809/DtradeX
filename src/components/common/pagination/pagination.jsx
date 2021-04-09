import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import createPages from "./createPages";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  numberOfButtons,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const { pages } = createPages({
    itemsCount,
    pageSize,
    currentPage,
    numberOfButtons,
    });

  // const pages = _.range(1, pagesCount + 1);

  return (
    <nav className="m-4">
      <ul className="pagination">
        {!(pagesCount < 3) && (
          <li
            className={
              pages[0] === currentPage ? "page-item disabled" : "page-item"
            }
          >
            <Link
              to="#"
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Prev
            </Link>
          </li>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <Link
              to="#"
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Link>
          </li>
        ))}
        {!(pagesCount < 4) && (
          <li
            className={
              pages.reverse()[0] === currentPage
                ? "page-item disabled"
                : "page-item"
            }
          >
            <Link
              to="#"
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
