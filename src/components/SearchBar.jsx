import { useState } from 'react';

//Images
import searchIcon from '../assets/icons/search.png';

const SearchBar = ({ animalStories, setSearchedStories, setErrorMessage }) => {
  const [textInput, setTextInput] = useState('');

  const handleTextInput = (e) => {
    setTextInput(e.target.value);
    setSearchedStories([]);
    animalStories.map((story) => {
      const normalizedTitle = story.title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      if (normalizedTitle.includes(e.target.value.toLowerCase())) {
        setSearchedStories((prev) => [...prev, story]);
      } else {
        setErrorMessage('Δεν βρέθηκε η ιστορία που αναζητήσατε');
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedStories([]);
    animalStories.map((story) => {
      if (story.title.toLowerCase().includes(textInput.toLowerCase())) {
        setSearchedStories((prev) => [...prev, story]);
      } else {
        setErrorMessage('Δεν βρέθηκε η ιστορία που αναζητήσατε');
      }
    });
    setTextInput('');
  };

  return (
    <form>
      <input
        onChange={handleTextInput}
        placeholder='Αναζήτηση Ιστορίας...'
        value={textInput}
        type='text'
      />
      <button>
        <img src={searchIcon} alt='Search Button' />
      </button>
    </form>
  );
};

export default SearchBar;
