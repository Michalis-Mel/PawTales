import { useState } from "react";

//Images
import searchIcon from "../assets/icons/search.png";

const SearchBar = ({ animalStories, setSearchedStories }) => {
  const [textInput, setTextInput] = useState("");

  const handleTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedStories([]);
    animalStories.map((story) => {
      if (story.title.toLowerCase().includes(textInput.toLowerCase())) {
        setSearchedStories((prev) => [...prev, story]);
      }
    });
    setTextInput("");
  };

  return (
    <form onClick={handleSubmit}>
      <input
        onChange={handleTextInput}
        placeholder="Αναζήτηση Ιστορίας..."
        value={textInput}
        type="text"
      />
      <button type="submit">
        <img src={searchIcon} alt="Search Button" />
      </button>
    </form>
  );
};

export default SearchBar;
