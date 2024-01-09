import React, { useState, useRef, useEffect } from "react";
import './AudioPlayer.css';
import audioSrc from './2.mp3';
import img from './1.jpg';
import pauseIcon from './pause.png';
import playIcon from './play.png';

const AudioPlayer = () => {
  // State variables to manage the player's status and current
  const [isplaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Update the duration of the audio file
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
    }
  }, []);

  // Play or pause the audio when isplaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isplaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isplaying]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    }
  };

  const handlePlayPause = () => {
    if (isplaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div className="player-card">
      <img src={img} alt="" />
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
      />
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      ></audio>
      <div className="track-duration">
        <p>{currentTime}</p>
        <p>{duration}</p>
      </div>
      <button onClick={handlePlayPause}>
        <span className="material-symbols-rounded">
          {isplaying ? <img className="p" src={pauseIcon} alt="Pause" /> : <img className="p" src={playIcon} alt="Play" />}
        </span>
      </button>
    </div>
  );
};

export default AudioPlayer;
