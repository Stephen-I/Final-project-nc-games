import "./App.css";
import { Routes, Route } from "react-router-dom";
import Category from "./Components/Category";
import AllReviews from "./Components/AllReviews";
import HomePage from "./Components/HomePage";
import SingleReview from "./Components/SingleReview";
import { useState } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <section className="App">
      <header className="App-header">Nc games</header>
      <Routes>
        <Route
          path="/"
          element={<HomePage setSelectedCategory={setSelectedCategory} />}
        ></Route>
        <Route path="/reviews" element={<AllReviews />}></Route>
        <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
        <Route
          path="/categories"
          element={<Category selectedCategory={selectedCategory} />}
        ></Route>
      </Routes>
    </section>
  );
}

export default App;
