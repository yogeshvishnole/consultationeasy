import React from "react";

import categories from "../../data/categoryData";

interface Props {}

const CategoryGrid: React.FC<Props> = () => {
  return (
    <div className="categories">
      <h2>Top Categories</h2>
      <div className="container">
        <div className="img-grid">
          {categories &&
            categories.map((doc) => (
              <div className="card">
                <div className="img-wrap" key={doc.img}>
                  <img src={`img/${doc.img}`} alt="uploaded pic" />
                </div>
                {doc.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
