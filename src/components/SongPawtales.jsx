import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import pawtalesSong from "../assets/homepage/pawSongVideoComp.mp4";
import musicOn from "../assets/icons/play-button.png";
import musicOff from "../assets/icons/pause-button.png";

const SongPawtales = () => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const currentVideoRef = videoRef.current;

    if (currentVideoRef) {
      currentVideoRef.addEventListener("timeupdate", handleTimeUpdate);
      currentVideoRef.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (currentVideoRef) {
        currentVideoRef.removeEventListener("timeupdate", handleTimeUpdate);
        currentVideoRef.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (time) => {
    videoRef.current.currentTime = time;
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
        <motion.video
          className="video"
          src={pawtalesSong}
          alt="Pawtales Song"
          loop
          ref={videoRef}
        />

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
