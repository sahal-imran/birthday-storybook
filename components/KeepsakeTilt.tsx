'use client';
import { useContext, useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { MotionConfigContext, useReducedMotion } from 'framer-motion';
export default function KeepsakeTilt({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const [hasMouse, setHasMouse] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setHasMouse(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const settings = useContext(MotionConfigContext);
  return <Tilt className={className} tiltEnable={hasMouse && !reduced && settings.reducedMotion !== 'always'} tiltMaxAngleX={7} tiltMaxAngleY={7} perspective={1000} transitionSpeed={900} gyroscope={false}>{children}</Tilt>;
}
