import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import songs from '../helpers/songs';
import songsImages from '../helpers/songsImages';

import musicOn from '../assets/icons/play-button.png';
import musicOff from '../assets/icons/pause-button.png';
import prev from '../assets/icons/back-button.png';
import next from '../assets/icons/next-button.png';

const SongPawtales = () => {
  const songRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 701);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const currentSongRef = songRef.current;

    if (currentSongRef) {
      currentSongRef.addEventListener('timeupdate', handleTimeUpdate);
      currentSongRef.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (currentSongRef) {
        currentSongRef.removeEventListener('timeupdate', handleTimeUpdate);
        currentSongRef.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      }
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (isMobile) {
      if (isPlaying) {
        songRef.current.play();
      }
    } else {
      if (isPlaying) {
        songRef.current.play();
      }
    }
  }, [currentSongIndex, isMobile, isPlaying]);

  const handlePlayPause = () => {
    if (isMobile) {
      if (isPlaying) {
        songRef.current.pause();
      } else {
        songRef.current.play();
      }
    } else {
      if (isPlaying) {
        songRef.current.pause();
      } else {
        songRef.current.play();
      }
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(songRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(songRef.current.duration);
  };

  const handleSeek = (time) => {
    songRef.current.currentTime = time;
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => {
      if (prevIndex === songs.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) => {
      if (prevIndex === 0) {
        return songs.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  return (
    <motion.div
      className='song_con'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <h1>Τα Τραγούδια μας</h1>
      <div className='video_con'>
        <motion.audio
          className='audio'
          src={songs[currentSongIndex].src}
          alt={songs[currentSongIndex].alt}
          loop
          ref={songRef}
        />
        {!isMobile && (
          <motion.img
            className='video'
            src={songsImages[currentSongIndex].src}
            alt={songsImages[currentSongIndex].alt}
          />
        )}

        <div className='song_controls'>
          <h3 className='songTitle'>{songs[currentSongIndex].title}</h3>
          <div className='track'>
            <input
              type='range'
              min={0}
              max={duration}
              step={0.001}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
            />
          </div>
          <div className='btns'>
            <button onClick={handlePrevSong}>
              <img src={prev} alt='Previous Song' />
            </button>
            <button onClick={handlePlayPause}>
              {isPlaying ? (
                <img src={musicOff} alt='Pause' />
              ) : (
                <img src={musicOn} alt='Play' />
              )}
            </button>
            <button onClick={handleNextSong}>
              <img src={next} alt='Next Song' />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SongPawtales;
