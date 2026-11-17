'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, ChevronLeft, ChevronRight, Heart, LockKeyhole, MailOpen, MapPin, Sparkles, WandSparkles, X } from 'lucide-react';

import { birthday, welcome, reasons, gifts, photos, galleryPhotos, letterParagraphs } from '../data/birthday';
import { birthdayCountdown } from '../lib/birthday';
import { StoryArt, type ArtKind } from './StoryArt';
import MusicPlayer from './MusicPlayer';
import LittleWorld from './LittleWorld';
import StoryBook from './StoryBook';
import WelcomeScreen from './WelcomeScreen';
import ReadyAnimation from './ReadyAnimation';
import KeepsakeTilt from './KeepsakeTilt';
import { showerOfLove, stopCelebration } from '../lib/celebrate';

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.13 }} transition={{ duration: .75, delay, ease: [.2, .65, .25, 1] }}>{children}</motion.div>;
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string, title: React.ReactNode, text?: string }) {
  return <ScrollReveal className="section-head"><span className="eyebrow">✦ {eyebrow} ✦</span><h2>{title}</h2>{text && <p>{text}</p>}</ScrollReveal>;
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(timer); }, []);
  const parts = useMemo(() => {
    if (now === null) return null;
    return birthdayCountdown(now, birthday.month, birthday.day);
  }, [now]);
  if (!parts) return <div className="countdown"><span className="countdown-label">A little countdown to {birthday.dateLabel}</span><div className="timer-grid"><span>♡</span><span>♡</span><span>♡</span><span>♡</span></div></div>;
  return <div className="countdown"><span className="countdown-label">{parts.today ? 'The day our favorite person was born ♡' : `Counting the moments until ${birthday.dateLabel}`}</span>{parts.today ? <strong className="birthday-now">HAPPY BIRTHDAY! 🎉</strong> : <div className="timer-grid">{([['Days', parts.days], ['Hours', parts.hours], ['Mins', parts.minutes], ['Secs', parts.seconds]] as const).map(([label, value]) => <div className="timer-unit" key={label}><strong>{String(value).padStart(2, '0')}</strong><small>{label}</small></div>)}</div>}</div>;
}

function FloatingDecor() {
  return <div className="floating-decor" aria-hidden="true"><span className="float-icon float-one">✿</span><span className="float-icon float-two">✦</span><span className="float-icon float-three">♡</span><span className="float-icon float-four">✧</span><span className="float-icon float-five">❀</span><span className="float-icon float-six">✦</span></div>;
}

function Cake({ candlesLit }: { candlesLit: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(.6);
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const resize = () => setScale(node.clientWidth / 475);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={stage} className="cake-stage" role="img" aria-label={`A pink birthday cake with three ${candlesLit ? 'glowing' : 'extinguished'} candles`}><div className="cake-scene" style={{ transform: `scale(${scale})` }}><div className="cake-shadow"/><div className="cake-stand-top"/><div className="cake-stand-pillar"/><div className="cake-stand-base"/><div className="cake-tier bottom-tier"><span className="cake-dots"/></div><div className="cake-tier top-tier"><div className="icing"/><span className="cake-message">♡</span></div><div className="candles">{[0,1,2].map((n) => <div className="candle" key={n}><span className="wick"/>{candlesLit && <span className="flame"/>}</div>)}</div><span className="cake-sparkle sparkle-one">✧</span><span className="cake-sparkle sparkle-two">✦</span><span className="cake-sparkle sparkle-three">✧</span></div></div>;
}

function PhotoFrame({ file, label, className = '', priority = false }: { file: string; label?: string; className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const photo = photos[file];
  const sizes = className.includes('hero-photo')
    ? '(max-width: 760px) 220px, (max-width: 1050px) 280px, 360px'
    : file.startsWith('gallery') ? '(max-width: 760px) 300px, 320px' : '(max-width: 760px) 180px, 260px';
  return <figure className={`photo-frame ${className}`}>
    <div className="photo-inner">
      {photo?.src && !failed && <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className={`memory-image ${loaded ? 'image-loaded' : ''}`} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} style={{ objectPosition: photo.position ?? '50% 50%', objectFit: photo.fit ?? 'cover' }}/>}
      {(!loaded || failed || !photo?.src) && <div className="photo-empty"><StoryArt kind={file === 'hero.jpg' ? 'bear' : file.includes('memory') ? 'books' : 'flower'}/><small>{photo?.src && !failed ? 'A little memory, loading…' : 'A place for your photo'}</small></div>}
    </div>
    <figcaption className="photo-caption">{photo?.caption ?? label ?? 'A little memory'} ♡</figcaption>
  </figure>;
}

export default function BirthdayExperience() {
  const reduced = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const started = opened;
  const [calm, setCalm] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [revealedGifts, setRevealedGifts] = useState<number[]>([]);
  const [candlesLit, setCandlesLit] = useState(true);
  
  const [letterOpen, setLetterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  function celebrate() {
    if (!candlesLit) { setCandlesLit(true); void stopCelebration(); return; }
    setCandlesLit(false); setWishCount((v) => v + 1);
    void showerOfLove({ x: .5, y: .6 }, () => quiet.current);
  }
  function openWorld(password: string) {
    if (password !== welcome.password) return;
    setOpened(true);
    void showerOfLove({ x: .5, y: .5 }, () => quiet.current);
  }
  function moveTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: reduced || calm ? 'auto' : 'smooth' }); setMenuOpen(false); }

  const letterRef = useRef<HTMLDivElement>(null);
  const quiet = useRef(false);
  quiet.current = Boolean(calm || reduced);
  useEffect(() => { if (calm || reduced) void stopCelebration(); }, [calm, reduced]);
  useEffect(() => {
    const locked = !started || letterOpen;
    const previous = document.body.style.overflow;
    if (locked) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [started, letterOpen]);
  useEffect(() => {
    if (!letterOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = letterRef.current;
    dialog?.querySelector<HTMLButtonElement>('button')?.focus();
    const keys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLetterOpen(false);
      if (e.key === 'Tab') { e.preventDefault(); dialog?.querySelector<HTMLButtonElement>('button')?.focus(); }
    };
    document.addEventListener('keydown', keys);
    return () => { document.removeEventListener('keydown', keys); previous?.focus(); };
  }, [letterOpen]);

  return <MotionConfig reducedMotion={calm ? "always" : "user"}><main className={calm ? "calm-world" : ""}>
    <AnimatePresence>{!started && <WelcomeScreen key="welcome" onOpen={openWorld}/>}</AnimatePresence>

    <div className="experience-controls" role="group" aria-label="Music and animation settings"><MusicPlayer/><button className="motion-toggle" aria-pressed={calm} onClick={() => setCalm(v => !v)}>{calm ? "✧ More magic" : "✧ Less motion"}</button></div>{started && <div className="site-shell" inert={letterOpen}>
      <FloatingDecor/>
      <header className="site-header"><button className="wordmark" onClick={() => moveTo('home')}>s <span>♡</span> m <small>our little universe</small></button><nav id="main-nav" className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation"><button onClick={() => moveTo('story')}>Our story</button><button onClick={() => moveTo('reasons')}>12 reasons</button><button onClick={() => moveTo('surprises')}>Surprises</button><button onClick={() => moveTo('letter')}>A letter</button></nav><button className="header-pill" onClick={() => moveTo('birthday')}>Nov 14 <Heart size={13} fill="currentColor"/></button><button className="mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="main-nav">{menuOpen ? <X/> : <span>☰</span>}</button></header>

      <section className="hero" id="home"><div className="hero-blob hero-blob-one"/><div className="hero-blob hero-blob-two"/><div className="hero-layout"><ScrollReveal className="hero-copy"><div className="hero-chip"><span className="pulsing-heart">♥</span> {birthday.dateLabel} · THE MOST SPECIAL DAY</div><p className="hero-topline">dear birthday friend,</p><p className="urdu-wish" lang="ur" dir="rtl">{birthday.urduWish}</p><h1>Happy <br/><em>Birthday,</em><br/><span>{birthday.name}!</span><span className="hero-spark">✳</span></h1><p className="hero-description">{birthday.heroMessage}</p><p className="hero-signature">all my love, <span>{birthday.from} ♡</span></p><div className="hero-actions"><button className="button-primary" onClick={() => moveTo('story')}><span className="desktop-label">Read our story</span><span className="phone-label">Our story</span> <ArrowRight size={18}/></button><button className="button-link" onClick={() => moveTo('birthday')}><span className="desktop-label">Your birthday surprise</span><span className="phone-label">Make a wish</span> <Sparkles size={17}/></button></div></ScrollReveal><div className="hero-art"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-floating hero-floating-book"><StoryArt kind="books"/></div><div className="hero-floating hero-floating-bow"><StoryArt kind="bow"/></div><div className="hero-floating hero-floating-star"><ReadyAnimation kind="butterfly"/></div><div className="hero-love-sticker"><ReadyAnimation kind="heart"/></div><div className="hero-balloon"><StoryArt kind="balloon"/></div><KeepsakeTilt className="hero-main-card"><div className="card-tape"/><PhotoFrame file="hero.jpg" label="My favorite person" className="hero-photo" priority/><div className="hero-card-sticker">made for<br/><strong>you ♡</strong></div></KeepsakeTilt><div className="hero-note">Memories to make <span>↗</span></div><div className="hero-ribbon">♡ ♡ ♡</div></div></div><button className="scroll-cue" onClick={() => moveTo('story')}>scroll for a little magic <ArrowDown size={16}/></button></section>

      <section className="countdown-strip"><span>✦</span><Countdown/><span>✦</span></section>

      <section className="section story-section" id="story"><SectionHead eyebrow="chapter one · us" title={<>Once upon a time, <em>there was us.</em></>} text="A collection of favorite moments, with room for many more."/><StoryBook/><div className="story-intro"><ScrollReveal><div className="quote-card"><span className="quote-mark">“</span><p>Every birthday is a chance to celebrate <em>the people who make life brighter.</em></p><span className="quote-author">— {birthday.from}, to {birthday.name}</span><span className="quote-flower"><StoryArt kind="flower"/></span></div></ScrollReveal><ScrollReveal delay={.15}><div className="distance-card"><div className="distance-top"><MapPin size={18}/> Two cities, one heart</div><div className="city-links"><span>Your city <small>my home</small></span><div className="city-line"><span>♡</span></div><span>Their city <small>your home</small></span></div><p>No distance ever made you feel far away.</p></div></ScrollReveal></div><ScrollReveal className="story-bottom"><div className="story-polaroids"><PhotoFrame file="memory-1.jpg"/><PhotoFrame file="memory-2.jpg"/></div><div className="story-bottom-copy"><span className="eyebrow">GOOD TIMES & COUNTING</span><h3>Good moments.<br/><em>Wonderful memories.</em></h3><p>A place to celebrate the little moments, shared adventures, and memories that matter.</p></div></ScrollReveal></section>

      <section className="section reasons-section" id="reasons"><SectionHead eyebrow="chapter two · the little things" title={<>12 little reasons I <em>adore you.</em></>} text="One for each beautiful year. And honestly, there could have been a million more."/><div className="reason-feature"><div className="reason-side"><span className="reason-number-decoration">12</span><h3>All the beautiful<br/>things that make<br/><em>you, you.</em></h3><div className="reason-dots">{reasons.map((_,i) => <button key={i} onClick={() => setReasonIndex(i)} className={i === reasonIndex ? 'active' : ''} aria-label={`Reason ${i+1}`} aria-pressed={i === reasonIndex}/>)}</div></div><AnimatePresence mode="wait"><motion.div className="reason-card" aria-live="polite" key={reasonIndex} initial={{ opacity: 0, rotate: 3, y: 16 }} animate={{ opacity: 1, rotate: -2, y: 0 }} exit={{ opacity: 0, rotate: -5, y: -12 }} transition={{ duration: .3 }}><span className="reason-card-label">REASON {String(reasonIndex + 1).padStart(2, '0')} / 12</span><span className="reason-big-icon"><StoryArt kind={(["flower", "bear", "books", "heart", "cupcake", "bear", "tulip", "heart", "star", "moon", "flower", "bow"] as ArtKind[])[reasonIndex]}/></span><h3>{reasons[reasonIndex].title}</h3><p>{reasons[reasonIndex].text}</p><span className="reason-card-bottom">with all my heart, s. ♡</span></motion.div></AnimatePresence><div className="reason-navigation"><label className="reason-picker"><span className="sr-only">Choose a reason</span><select value={reasonIndex} onChange={event => setReasonIndex(Number(event.target.value))}>{reasons.map((reason, i) => <option key={reason.title} value={i}>{i+1} / 12 · {reason.title}</option>)}</select></label><button onClick={() => setReasonIndex((reasonIndex + 11) % 12)} aria-label="Previous reason"><ChevronLeft/></button><span>{String(reasonIndex + 1).padStart(2,'0')} <span>/ 12</span></span><button onClick={() => setReasonIndex((reasonIndex + 1) % 12)} aria-label="Next reason"><ChevronRight/></button></div></div></section>

      <section className="section favorites-section" id="little-world"><SectionHead eyebrow="chapter three · your happy place" title={<>A world full of <em>your favorite things.</em></>} text="A bookshelf, a sketchbook, a few tiny joys. Tap a keepsake; there is a little note inside."/><LittleWorld/></section>

      <section className="section surprise-section" id="surprises"><SectionHead eyebrow="chapter four · just for you" title={<>Psst… I have some <em>tiny surprises.</em></>} text="A few little gifts to brighten your birthday."/><p className="phone-hint">Swipe to choose a parcel · tap to unwrap</p><div className="gift-grid" tabIndex={0} aria-label="Three birthday surprises">{gifts.map((g,i) => <ScrollReveal key={g.title} delay={i * .1}><button className={`gift-card ${revealedGifts.includes(i) ? 'gift-revealed' : ''}`} aria-expanded={revealedGifts.includes(i)} onClick={(event) => { if (revealedGifts.includes(i)) return; setRevealedGifts(v => [...v,i]); const box = event.currentTarget.getBoundingClientRect(); void showerOfLove({x:(box.left+box.width/2)/window.innerWidth,y:Math.min(.8,(box.top+box.height/2)/window.innerHeight)}, () => quiet.current); }}><span className="gift-index">0{i+1}</span>{revealedGifts.includes(i) ? <><span className="gift-emoji-open"><StoryArt kind={(["books", "bear", "cake"] as ArtKind[])[i]}/></span><span className="gift-tag">{g.tag}</span><strong>{g.title}</strong><p>{g.text}</p><span className="gift-open-label"><Check size={15}/> opened with love</span></> : <><span className="gift-emoji"><ReadyAnimation kind="gift"/></span><span className="gift-mystery">A little surprise</span><span className="gift-open-label">tap to unwrap <Sparkles size={15}/></span></>}</button></ScrollReveal>)}</div></section>

      <section className="section birthday-section" id="birthday"><div className="birthday-bg-star star-a">✳</div><div className="birthday-bg-star star-b">✻</div><SectionHead eyebrow="chapter five · make a wish" title={<>Today, the world celebrates <em>you.</em></>}/><div className="birthday-inner"><Cake candlesLit={candlesLit}/><div className="birthday-copy"><span className="hand-label">for the birthday star ♡</span><h3>Close your eyes,<br/><em>make a wish.</em></h3><p><span className="desktop-label">{birthday.wish}</span><span className="phone-label">{birthday.shortWish}</span></p><button className="button-primary" onClick={celebrate}>{candlesLit ? 'Blow out the candles' : 'Light the candles again'} <WandSparkles size={18}/></button>{!candlesLit && <div className="birthday-party"><ReadyAnimation kind="party"/></div>}{!candlesLit && <p role="status" className="wish-message">May your year be full of joy, {birthday.name}. ♡ {wishCount > 1 ? `(${wishCount} wishes and counting!)` : ''}</p>}</div></div></section>

      <section className="section gallery-section" id="memories"><SectionHead eyebrow="chapter six · snapshots" title={<>My favorite photos are <em>the ones with you.</em></>} text="A few little pieces of our world, kept here with love."/><p className="phone-hint">Swipe through our little collection</p><div className="gallery-grid" tabIndex={0} aria-label="Photo memories">{galleryPhotos.map((file, index) => <ScrollReveal key={file} delay={(index % 3) * .08}><PhotoFrame file={file}/></ScrollReveal>)}</div></section>

      <section className="section letter-section" id="letter"><SectionHead eyebrow="the last chapter · for now" title={<>One last thing, <em>my love.</em></>} text="Some things are better said slowly. This one is from the heart."/><div className="letter-layout"><div className="letter-visual"><span className="letter-floating-heart"><ReadyAnimation kind="heart"/></span><div className="letter-ready-art"><ReadyAnimation kind="letter"/></div><div className="letter-handwriting">to {birthday.name}, with love</div></div><div className="letter-copy"><span className="eyebrow">A PERSONAL NOTE · FROM {birthday.from}</span><h3>If I could give you just one thing…</h3><p>It would be the ability to see yourself through my eyes. Because then you would know how extraordinary you are to me.</p><button className="button-primary" onClick={() => setLetterOpen(true)}>Open my letter <MailOpen size={18}/></button><div className="letter-caption"><LockKeyhole size={15}/> written for {birthday.name} ♡</div></div></div></section>

      <footer className="footer"><div className="finale-ready-heart"><ReadyAnimation kind="heart"/></div><Constellation/><div className="footer-stars" aria-hidden="true">✦ · ✧ · ✦</div><p className="finale-line">{birthday.finale}</p><h2>To all our tomorrows, <em>together.</em></h2><div className="footer-heart">{birthday.from} <span>♡</span> {birthday.name}</div><p>Happy Birthday, {birthday.name}. You are, and always will be, my favorite chapter.</p><small>Handmade with ♡ by {birthday.from} · {birthday.dateLabel}, {birthday.edition}</small><button onClick={() => moveTo('home')}>Back to the beginning ↑</button></footer>
    </div>}

    <AnimatePresence>{letterOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLetterOpen(false)} role="presentation"><motion.div ref={letterRef} className="letter-modal" role="dialog" aria-modal="true" aria-label={`A birthday letter to ${birthday.name}`} initial={{ opacity: 0, y: 45, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 45, scale: .94 }} transition={{ type: 'spring', damping: 24 }} onClick={e => e.stopPropagation()}><div className="letter-modal-toolbar"><span>For {birthday.name}, with love ♡</span><button className="modal-close" onClick={() => setLetterOpen(false)} aria-label="Close letter"><X/></button></div><div className="modal-stamp">♡</div><span className="letter-date">{birthday.dateLabel} {birthday.edition}</span><h2>Dear {birthday.name},</h2>{letterParagraphs.map((text, i) => <p key={i}>{text}</p>)}<p className="letter-closing">Forever yours,<br/><strong>{birthday.from} ♡</strong></p><div className="letter-bottom-mark">Made with care</div></motion.div></motion.div>}</AnimatePresence>
  </main></MotionConfig>;
}

function Constellation() {
  return <div className="constellation" aria-hidden="true"><svg viewBox="0 0 600 220"><path className="constellation-line" d="M300 190 220 143 166 92 180 45 231 27 275 48 300 78 325 48 369 27 420 45 434 92 380 143Z" fill="none" stroke="#efd3b5" strokeWidth="1.5"/>{[[300,190],[220,143],[166,92],[180,45],[231,27],[275,48],[300,78],[325,48],[369,27],[420,45],[434,92],[380,143]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%3===0 ? 3 : 2} fill="#fff2d1" style={{animationDelay:`${i*.2}s`}}/>)}</svg>{Array.from({length:18},(_,i)=><span key={i} style={{left:`${(i*31)%100}%`,top:`${(i*47)%100}%`,animationDelay:`${i*.3}s`}}>✦</span>)}</div>;
}
