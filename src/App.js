import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <section className="App">
      <header className="App-header">Nc games</header>
      <Routes>
        <Route path="/api/categories" element={<CategoriesLink />}></Route>
      </Routes>
    </section>
  );
}

export default App;
