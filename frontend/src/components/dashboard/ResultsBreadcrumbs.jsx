import React from "react";

const ResultsBreadcrumbs = ({ resultCount, selectedCategory, selectedTarget }) => {
  return (
    <div className="container mx-auto px-4 mb-4">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>Exercises</li>
          {selectedCategory !== "all" && <li>Body Part: {selectedCategory}</li>}
          {selectedTarget !== "all" && <li>Target Muscle: {selectedTarget}</li>}
          <li className="font-semibold">{resultCount} results</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsBreadcrumbs;
