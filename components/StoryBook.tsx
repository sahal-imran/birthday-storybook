'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { birthday, memories } from '../data/birthday';
import { StoryArt, type ArtKind } from './StoryArt';
const art: ArtKind[] = ['bear', 'books', 'books', 'flower', 'gift', 'bow', 'flower', 'bow', 'moon'];
export default function StoryBook() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const tabs = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = tabs.current;
    const active = row?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (row && active && row.scrollWidth > row.clientWidth) row.scrollTo({ left: active.offsetLeft-row.clientWidth/2+active.clientWidth/2, behavior: 'auto' });
  }, [page]);
  const touch = useRef<{x: number; y: number} | null>(null);
  function turn(next: number) {
    if (next < 0 || next >= memories.length || next === page) return;
    setDirection(next > page ? 1 : -1); setPage(next);
  }
  return <div className="storybook">
    <div ref={tabs} className="book-tabs" aria-label="Story chapters">{memories.map((m,i)=><button key={m.title} aria-label={`Chapter ${i+1}: ${m.title}`} aria-pressed={i===page} className={i===page?'active':''} onClick={()=>turn(i)}>{String(i+1).padStart(2,'0')}</button>)}</div>
    <p className="phone-hint">Swipe the page, or use the arrows below</p><div className="open-book" onTouchStart={event => { const point=event.touches[0]; touch.current={x:point.clientX,y:point.clientY}; }} onTouchEnd={event => { const start=touch.current; touch.current=null; if(!start) return; const point=event.changedTouches[0]; const dx=point.clientX-start.x,dy=point.clientY-start.y; if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.5) turn(page+(dx<0?1:-1)); }}><div className="book-illustration"><span className="eyebrow">OUR STORY · {String(page+1).padStart(2,'0')}</span><StoryArt kind={art[page]}/><span className="book-handwriting">{birthday.from} & {birthday.name}</span></div><div className="book-page"><AnimatePresence mode="wait" initial={false}><motion.div key={page} initial={{opacity:0,rotateY:direction*12,x:direction*15}} animate={{opacity:1,rotateY:0,x:0}} exit={{opacity:0,x:-direction*15}} transition={{duration:.25}} aria-live="polite"><span className="eyebrow">{memories[page].year}</span><h3>{memories[page].title}</h3><p>{memories[page].description}</p></motion.div></AnimatePresence><div className="book-page-number">{page+1} / {memories.length}</div></div></div>
    <div className="book-controls"><button disabled={page===0} onClick={()=>turn(page-1)} aria-label="Previous chapter"><ChevronLeft size={18}/> Previous page</button><span>a story still being written ♡</span><button disabled={page===memories.length-1} onClick={()=>turn(page+1)} aria-label="Next chapter">Next page <ChevronRight size={18}/></button></div>
  </div>;
}
