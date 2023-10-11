import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import IdeasForm from "./pages/IdeasForm";
import Stories from "./pages/Stories";
import StoryDetails from "./pages/StoryDetails";
import TreesLeaves from "./components/TreesLeaves";

function App() {
  return (
    <div className="row">
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/ideas" element={<IdeasForm />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/account" element={<Account />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<StoryDetails />} />
      </Routes>
      <TreesLeaves />
      <Footer />
    </div>
  );
}

export default App;
