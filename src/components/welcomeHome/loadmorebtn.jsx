import React from "react";

const LoadMoreButton = ({loadMore}) => (
  
       <div className="text-center mt-5 mb-5">
            <button
              onClick={() => loadMore()}
              className="btn btn--outline"
            >
              Load More
            </button>
          </div>
  
);

export default LoadMoreButton;
