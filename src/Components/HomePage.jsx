import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../Api";

const HomePage = (setSelectedCategory) => {
  const [Categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchCategories().then((data) => {
      setIsLoading(false);
      setCategories(data.categories);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  function onClick(category) {
    setSelectedCategory(category);
  }

  return (
    <main>
      <Link to="/reviews">All Reviews</Link>;
      <ul>
        {Categories.map((category) => {
          return (
            <li className="Category">
              <Link to="/categories" className="category_title">
                <button
                  className="categoryBtn"
                  onClick={onClick(category.slug)}
                >
                  {category.slug}
                </button>
              </Link>
              <p className="category_description">{category.description}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default HomePage;
