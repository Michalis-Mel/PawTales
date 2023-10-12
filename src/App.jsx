import { Route, Routes, Navigate } from "react-router-dom";

import ScrollToTop from "./scrollToTop";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import IdeasForm from "./pages/IdeasForm";
import Stories from "./pages/Stories";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import StoryDetails from "./pages/StoryDetails";
import TreesLeaves from "./components/TreesLeaves";

function App() {
  return (
    <div className="row">
      <Header />
      <Routes>
        <Route path="/" exact element={<Navigate to="/PawTales" />} />
        <Route path="/PawTales" element={<Home />} />
        <Route path="/PawTales/ideas" element={<IdeasForm />} />
        <Route path="/PawTales/favorites" element={<Favorites />} />
        <Route path="/PawTales/signup" element={<SignUpPage />} />
        <Route path="/PawTales/login" element={<LogInPage />} />
        <Route path="/PawTales/stories" element={<Stories />} />
        <Route path="/PawTales/stories/:id" element={<StoryDetails />} />
      </Routes>
      <TreesLeaves />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
