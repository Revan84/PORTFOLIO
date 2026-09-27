"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";

interface MusicPlayerProps {
  title: string;
  artist: string;
  subtitle: string;
  src: string;
}

const BARS = 5;

// The "off-screen, I make music" widget. It never plays on its own: only the button starts it.
export function MusicPlayer({ title, artist, subtitle, src }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  // Keep the button in step with the element, whatever stopped it (end of track, headset...).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  return (
    <aside className={styles.widget} aria-label="Music player">
      <button
        type="button"
        className={`btn btn-primary ${styles.button}`}
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} ${title} by ${artist}`}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
          </svg>
        )}
      </button>
      <span className={`${styles.bars} ${playing ? styles.playing : ""}`} aria-hidden="true">
        {Array.from({ length: BARS }, (_, index) => (
          <span key={index} className={styles.bar} />
        ))}
      </span>
      <span className={styles.label}>
        <span className={styles.title}>
          {artist} — {title}
        </span>
        <span className={styles.subtitle}>{subtitle}</span>
      </span>
      <audio ref={audioRef} src={src} preload="none" />
    </aside>
  );
}
