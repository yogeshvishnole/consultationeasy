import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../app";
import { getCategories } from "../../app/categorySlice";

// import categories from "../../data/categoryData";

interface Props {}

const CategoryGrid: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.data);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="categories">
      <h2>Top Categories</h2>
      <div className="container">
        <div className="img-grid">
          {categories &&
            categories.map((doc) => (
              <NavLink to={`/consultant-by-category/${doc.name}`}>
                <div className="card">
                  <div className="img-wrap" key={doc.image.key}>
                    <img src={doc.image.url} alt="uploaded pic" />
                  </div>
                  {doc.name}
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
