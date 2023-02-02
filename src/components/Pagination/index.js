import { GrLinkNext } from "react-icons/gr"
import { GrLinkPrevious } from "react-icons/gr"
import './index.css';

const Pagination = ({ perPage, total, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(total / perPage);

  // The line creates an array of numbers from 1 to pageCount.
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          className="button"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <GrLinkPrevious />
        </button>
      )}
      {pages.map(page => (
        <button
          key={page}
          className={`button ${currentPage === page && "active-button"}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {currentPage < pageCount && (
        <button
          className="button"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <GrLinkNext />
        </button>
      )}
    </div>
  );
};
export default Pagination;
