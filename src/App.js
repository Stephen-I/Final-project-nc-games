import "./App.css";
import { Routes, Route } from "react-router-dom";
import CategoriesLink from "./Components/CategoriesLink";
import AllReviews from "./Components/AllReviews";
import HomePage from "./Components/HomePage";
import SingleReview from "./Components/SingleReview";

function App() {
  return (
    <section className="App">
      <header className="App-header">Nc games</header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/reviews" element={<AllReviews />}></Route>
        <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
      </Routes>
    </section>
  );
}

export default App;
