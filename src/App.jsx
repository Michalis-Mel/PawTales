import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./helpers/scrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import IdeasForm from "./pages/IdeasForm";
import Admin from "./pages/Admin";
import Stories from "./pages/Stories";
import LogInPage from "./pages/LogInPage";
import EditUser from "./pages/EditUser";
import SignUpPage from "./pages/SignUpPage";
import StoryDetails from "./pages/StoryDetails";
import TreesLeaves from "./components/TreesLeaves";

function App() {
  return (
    <div className="row">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ideas" element={<IdeasForm />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetails />} />
          <Route path="/admin-mixalis" element={<Admin />} />
          <Route path="/edit-account" element={<EditUser />} />
        </Routes>
        <TreesLeaves />
        <Footer />
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;
