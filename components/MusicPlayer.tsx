'use client';

import { useEffect, useRef, useState } from 'react';
import { Music2, Volume2, VolumeX } from 'lucide-react';
import { birthday } from '../data/birthday';

export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const intent = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = audio.current!;
    element.volume = birthday.music.volume;
    // Native autoplay can start before React hydrates and attaches onPlay.
    setPlaying(!element.paused);
    const start = (event?: Event) => {
      if (event?.target instanceof Element && event.target.closest('.music-player')) return;
      if (!intent.current || !element.paused) return;
      void element.play().then(() => { if (!intent.current) element.pause(); }).catch(() => { /* Autoplay may require a gesture. */ });
    };
    start();
    // Touch playback must be requested directly from a completed gesture on iOS.
    const gestures = ['pointerup', 'touchend', 'click', 'keydown'] as const;
    gestures.forEach(type => document.addEventListener(type, start, { capture: true, passive: true }));
    return () => {
      element.pause();
      gestures.forEach(type => document.removeEventListener(type, start, true));
    };
  }, []);
  function toggle() {
    const element = audio.current!;
    intent.current = element.paused;
    if (!intent.current) element.pause();
    else { setFailed(false); void element.play().catch(() => setFailed(true)); }
  }
  return <div className={`music-player ${playing ? 'is-playing' : ''}`}>
    <audio ref={audio} src={birthday.music.src} autoPlay loop preload="auto" onPlay={() => { if (!intent.current) audio.current?.pause(); else { setPlaying(true); setFailed(false); } }} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }}/>
    <button onClick={toggle} aria-label={playing ? 'Pause background music' : 'Play background music'} aria-pressed={playing} title={birthday.music.title}>
      <Music2 size={17}/><span className="music-mobile-label">{failed ? "Retry music" : playing ? "Music on" : "Music off"}</span><span className="music-copy">{failed ? 'Retry music' : playing ? 'Birthday melody' : 'Music off'}<small>{playing ? 'Happy Birthday' : 'tap for Happy Birthday'}</small></span>
      <span className="music-bars" aria-hidden="true"><i/><i/><i/><i/></span>{playing ? <Volume2 size={16}/> : <VolumeX size={16}/>}
    </button>
  </div>;
}
