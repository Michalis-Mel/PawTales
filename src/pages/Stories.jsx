import { useState, useEffect, useContext } from 'react';
import { slice } from 'lodash';
import { motion } from 'framer-motion';
import { StoriesContext } from '../Context/StoriesContext';

//Components
import StoryItem from '../components/StoryItem';
import SearchBar from '../components/SearchBar';

//Images
import grid from '../assets/icons/grid.png';
import details from '../assets/icons/details.png';
import Loading from '../components/Loading';

const Stories = () => {
  const { allStories, setAllStories, isLoading } = useContext(StoriesContext);
  const [searchedStories, setSearchedStories] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  //Grid Functionality
  const [isGrid, setIsGrid] = useState(false);

  //Load More Functionality
  const initialStoriesShown = isGrid ? 12 : 5;
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(initialStoriesShown);
  const shortedStories = slice(searchedStories, 0, index);

  useEffect(() => {
    if (allStories.length > 0) {
      // Sort stories by creation date in descending order (most recent to oldest)
      const sortedStories = allStories.sort((a, b) => {
        const visitsA = a.visits;
        const visitsB = b.visits;
        return visitsB - visitsA;
      });

      setAllStories(sortedStories);
      setSearchedStories(sortedStories);
    } else {
      setErrorMessage(
        'Προέκυψε σφάλμα κατά τη λήψη ιστοριών. Ελέγξτε τη σύνδεσή σας στο διαδίκτυο και προσπαθήστε ξανά.'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStories]);

  const loadMore = () => {
    isGrid ? setIndex(index + 12) : setIndex(index + 5);

    if (index >= searchedStories.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const handleFilters = (filter) => {
    let sortedStories;
    if (allStories.length > 0) {
      if (filter === 'popular') {
        sortedStories = [...searchedStories].sort((a, b) => {
          const visitsA = a.visits;
          const visitsB = b.visits;
          return visitsB - visitsA;
        });
      } else if (filter === 'top') {
        sortedStories = [...searchedStories].sort((a, b) => {
          const ratingsA = a.ratings.filter((item) => typeof item === 'number');
          const ratingsB = b.ratings.filter((item) => typeof item === 'number');
          const averageA =
            ratingsA.reduce((acc, curr) => acc + curr, 0) /
            (ratingsA.length || 1);
          const averageB =
            ratingsB.reduce((acc, curr) => acc + curr, 0) /
            (ratingsB.length || 1);
          return averageB - averageA;
        });
      } else if (filter === 'latest') {
        sortedStories = [...searchedStories].sort((a, b) => {
          const dateA = new Date(
            a.dateCreated.split('/').reverse().join('-')
          ).getTime();
          const dateB = new Date(
            b.dateCreated.split('/').reverse().join('-')
          ).getTime();
          return dateB - dateA;
        });
      } else if (filter === 'oldest') {
        sortedStories = [...searchedStories].sort((a, b) => {
          const dateA = new Date(
            a.dateCreated.split('/').reverse().join('-')
          ).getTime();
          const dateB = new Date(
            b.dateCreated.split('/').reverse().join('-')
          ).getTime();
          return dateA - dateB;
        });
      }
      setSearchedStories(sortedStories);
    }
  };

  return (
    <div className='stories'>
      <h1>Οι Ιστορίες μας</h1>
      <div className='filters'>
        <SearchBar
          animalStories={allStories}
          setSearchedStories={setSearchedStories}
          setErrorMessage={setErrorMessage}
        />

        <div className='filters_right'>
          <div className='orderby'>
            <div className='orderby_cont'>
              <select
                defaultValue={'popular'}
                onChange={(e) => {
                  handleFilters(e.target.value);
                }}
              >
                <option value='popular'>Δημοφιλείς </option>
                <option value='top'>Κορυφαίες </option>
                <option value='latest'>Πρόσφατες</option>
                <option value='oldest'>Παλαιότερες</option>
              </select>
            </div>
          </div>
          <div className='layoutBtns'>
            <button
              className={`details ${isGrid ? 'active' : ''}`}
              onClick={() => setIsGrid(false)}
            >
              <img src={details} alt='Details' />
            </button>
            <button
              className={`grid ${isGrid ? '' : 'active'}`}
              onClick={() => setIsGrid(true)}
            >
              <img src={grid} alt='Grid' />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <motion.div
          className='storiesList'
          initial={{ y: 100, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'linear' }}
        >
          <div
            className={`storiesListCon ${isGrid ? 'gridList' : 'detailsList'}`}
          >
            {searchedStories.length > 0 ? (
              shortedStories.map((story, index) => (
                <StoryItem key={index} story={story} />
              ))
            ) : (
              <h2 className='notFound'>{errorMessage}</h2>
            )}
          </div>
          {searchedStories.length > index && (
            <button
              className='loadMore'
              disabled={isCompleted}
              onClick={loadMore}
            >
              Περισσότερες Ιστορίες
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Stories;
