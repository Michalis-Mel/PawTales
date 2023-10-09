import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="row">
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
