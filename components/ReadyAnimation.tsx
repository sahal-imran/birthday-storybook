'use client';
import dynamic from 'next/dynamic';
import { useContext, useRef, useState } from 'react';
import { MotionConfigContext, useInView, useReducedMotion } from 'framer-motion';
import { StoryArt, type ArtKind } from './StoryArt';

const Lottie = dynamic(() => import('lottie-react').then(module => module.LottieLight), { ssr: false });
export type AnimationKind = 'heart' | 'letter' | 'gift' | 'cake' | 'butterfly' | 'party';

/** Ready-made Google Noto animations, mounted only while visible. */
export default function ReadyAnimation({ kind, className = '' }: { kind: AnimationKind; className?: string }) {
  const container = useRef<HTMLSpanElement>(null);
  const visible = useInView(container);
  const reduced = useReducedMotion();
  const settings = useContext(MotionConfigContext);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const animate = visible && !reduced && settings.reducedMotion !== 'always' && !failed;
  const fallback: ArtKind = kind === 'party' ? 'cake' : kind;
  return <span ref={container} className={`ready-animation ready-${kind} ${className}`} aria-hidden="true">
    <span className={animate && ready ? 'animation-poster poster-hidden' : 'animation-poster'}><StoryArt kind={fallback}/></span>
    {animate && <Lottie className="lottie-art" src={`/animations/${kind}.json`} autoplay loop speed={0.8} subscriptions={{ ready: () => setReady(true), error: () => setFailed(true) }}/>}</span>;
}
