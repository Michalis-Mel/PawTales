import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Stories from "./pages/Stories";

function App() {
  return (
    <div className="row">
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/stories" element={<Stories />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
