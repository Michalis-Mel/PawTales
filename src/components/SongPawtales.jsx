import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import pawtalesVideo from "../assets/homepage/pawSongVideoComp.mp4";
import pawtalesSong from "../assets/homepage/PawtalesSong.mp3";
import musicOn from "../assets/icons/play-button.png";
import musicOff from "../assets/icons/pause-button.png";

const SongPawtales = () => {
  const videoRef = useRef(null);
  const songRef = useRef(null);
  const [mobile, setMobile] = useState(window.innerWidth < 701);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 701);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    const currentSongRef = songRef.current;

    if (!mobile) {
      if (currentVideoRef) {
        currentVideoRef.addEventListener("timeupdate", handleTimeUpdate);
        currentVideoRef.addEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    } else {
      if (currentSongRef) {
        currentSongRef.addEventListener("timeupdate", handleTimeUpdate);
        currentSongRef.addEventListener("loadedmetadata", handleLoadedMetadata);
      }
    }

    return () => {
      if (!mobile) {
        if (currentVideoRef) {
          currentVideoRef.removeEventListener("timeupdate", handleTimeUpdate);
          currentVideoRef.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
        }
      } else {
        if (currentSongRef) {
          currentSongRef.removeEventListener("timeupdate", handleTimeUpdate);
          currentSongRef.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);

  const handlePlayPause = () => {
    if (isPlaying) {
      if (mobile) {
        songRef.current.pause();
      } else {
        videoRef.current.pause();
      }
    } else {
      if (mobile) {
        songRef.current.play();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (mobile) {
      setCurrentTime(songRef.current.currentTime);
    } else {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (mobile) {
      setDuration(songRef.current.duration);
    } else {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (time) => {
    if (mobile) {
      songRef.current.currentTime = time;
    } else {
      videoRef.current.currentTime = time;
    }
  };

  return (
    <motion.div
      className="song_con"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      viewport={{ once: true }}
    >
      <h1>Ακούστε το Τραγούδι μας</h1>
      <div className="video_con">
        {mobile ? (
          <motion.audio
            className="audio"
            src={pawtalesSong}
            alt="Pawtales Song"
            loop
            ref={songRef}
          />
        ) : (
          <motion.video
            className="video"
            src={pawtalesVideo}
            alt="Pawtales Video"
            loop
            ref={videoRef}
          />
        )}

        <div className="video_controls">
          <div className="track">
            <input
              type="range"
              min={0}
              max={duration}
              step={0.001}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
            />
          </div>
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <img src={musicOff} alt="Pause" />
            ) : (
              <img src={musicOn} alt="Play" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SongPawtales;
