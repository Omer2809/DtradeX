import React from "react";

const LoadMoreButton = ({loadMore}) => (
  <>
       <div className="text-center mt-5 mb-5">
            <button
              onClick={() => loadMore()}
              className="btn  load-more"
              style={{ background: "#1e773c", color: "#fff" }}
            >
              Load More
            </button>
          </div>
  </>
);

export default LoadMoreButton;
