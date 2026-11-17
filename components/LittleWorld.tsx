'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StoryArt, type ArtKind } from './StoryArt';
import ReadyAnimation from './ReadyAnimation';
import { littleWorld } from '../data/birthday';

function KeepsakeArt({ art }: { art: string }) {
  return art === 'gift' || art === 'cake' ? <ReadyAnimation kind={art}/> : <StoryArt kind={art as ArtKind}/>;
}

export default function LittleWorld() {
  const [selected, setSelected] = useState<number>(0);
  const item = littleWorld[selected];
  return <div className="little-world">
    <p className="phone-hint">Choose a little joy below</p>
    <div className="keepsake-shelf" role="group" aria-label="Choose a keepsake">{littleWorld.map((item, i) => <button key={item.title} className={`keepsake keepsake-${i} ${selected === i ? 'selected' : ''}`} aria-label={item.title} aria-pressed={selected === i} aria-controls="keepsake-note" onClick={() => setSelected(i)}><span className="keepsake-number">0{i+1}</span><StoryArt kind={item.art as ArtKind}/><span className="keepsake-title">{item.title}</span><small>{selected === i ? 'your little note' : 'tap for a little joy'} <span aria-hidden="true">✧</span></small></button>)}</div>
    <div className="keepsake-note" id="keepsake-note" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={selected} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.2}}><div className="keepsake-feature-art"><KeepsakeArt art={item.art}/></div><h3 className="keepsake-feature-title">{item.title}</h3><span className="eyebrow">{item.tag}</span><p>{item.note}</p>{selected === 1 && <svg className="sketch-reveal" viewBox="0 0 240 100" aria-hidden="true"><motion.path d="M120 87C-10 20 70-30 120 32C170-30 250 20 120 87Z" fill="none" stroke="#ca799b" strokeWidth="2" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.6}}/></svg>}</motion.div></AnimatePresence></div>
  </div>;
}
