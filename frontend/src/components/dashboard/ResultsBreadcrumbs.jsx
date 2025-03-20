import React from "react";

const ResultsBreadcrumbs = ({ resultCount, selectedCategory }) => {
  return (
    <div className="container mx-auto px-4 mb-4">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>Exercises</li>
          {selectedCategory !== "all" && <li>{selectedCategory}</li>}
          <li className="font-semibold">{resultCount} results</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsBreadcrumbs;
