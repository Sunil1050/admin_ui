const PaginationStyles = {
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "1em"
    },
    button: {
      margin: "0 1em",
      padding: ".5em 1em",
      border: "1px solid gray",
      borderRadius: "5px",
      backgroundColor: "white",
      outline: "none"
    },
    activeButton: {
      backgroundColor: "lightgray"
    }
  };
  
  const Pagination = ({ perPage, total, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(total / perPage);
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  
    return (
      <div style={PaginationStyles.pagination}>
        <button
          style={{ ...PaginationStyles.button, ...(currentPage === 1 ? { display: "none" } : {}) }}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        {pages.map(page => (
          <button
            key={page}
            style={{
              ...PaginationStyles.button,
              ...(currentPage === page ? PaginationStyles.activeButton : {})
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          style={{ ...PaginationStyles.button, ...(currentPage === pageCount ? { display: "none" } : {}) }}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };
export default Pagination;  