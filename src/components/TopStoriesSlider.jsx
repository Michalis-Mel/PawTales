import { NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { StoriesContext } from '../Context/StoriesContext';

//DB
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../helpers/firebase';

//Images
import left from '../assets/icons/arrowLeft.png';
import right from '../assets/icons/arrowRight.png';

const TopStoriesSlider = () => {
  const { allStories, setAllStories } = useContext(StoriesContext);
  const [topStories, setTopStories] = useState([]);
  const [storyIndex, setStoryIndex] = useState(0);

  // Fetch stories from Firestore
  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const topStoriesCollection = collection(firestore, 'topStories');
        const topStoriesSnapshot = await getDocs(topStoriesCollection);
        const ids = topStoriesSnapshot.docs.map((doc) => doc.id);

        // Filter storiesData based on matching IDs and set the topStories state
        const topStoriesData = allStories.filter((story) =>
          ids.includes(story.id)
        );
        setTopStories(topStoriesData);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      }
    };

    fetchTopStories();
  }, [allStories]);

  const nextSlide = () => {
    setStoryIndex((index) => {
      if (index === topStories.length - 1) return 0;
      return index + 1;
    });
  };
  const prevSlide = () => {
    setStoryIndex((index) => {
      if (index === 0) return topStories.length - 1;
      return index - 1;
    });
  };
  return (
    <>
      {topStories.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className='topStories'
        >
          <h1>Κορυφαίες Ιστορίες</h1>
          <div className='homeSlider'>
            <button
              onClick={prevSlide}
              className='arrow arrowLeft'
              aria-label='View Previous Image'
            >
              <img src={left} alt='arrow left' />
            </button>
            <div className='homeSliderCon'>
              {topStories.map((story) => (
                <div
                  key={story.id}
                  className='topStory'
                  style={{ translate: ` ${-100 * storyIndex}%` }}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className='sliderImage'
                  />
                  <NavLink to={`/stories/${story.id}`} className='topStoryInfo'>
                    <h2>{story.title}</h2>
                  </NavLink>
                </div>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className='arrow arrowRight'
              aria-label='View Next Image'
            >
              <img src={right} alt='arrow right' />
            </button>
            <div className='sliderPagination'>
              {topStories.map((story, index) => (
                <button
                  key={index}
                  onClick={() => setStoryIndex(index)}
                  className={`${index === storyIndex ? 'active' : ''}`}
                  aria-label={`View Image ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default TopStoriesSlider;
