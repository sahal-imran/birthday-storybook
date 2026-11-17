/** The existing canvas-confetti component handles physics and canvas cleanup. */
export async function showerOfLove(origin = { x: 0.5, y: 0.65 }, isQuiet: () => boolean = () => false) {
  if (isQuiet() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const { default: confetti } = await import('canvas-confetti');
  if (isQuiet() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#d97da5', '#f3b8cc', '#c6a9de', '#f3d89a', '#fff8ee'];
  void confetti({ particleCount: 65, spread: 90, startVelocity: 28, gravity: .7, scalar: .9, ticks: 190, origin, colors, disableForReducedMotion: true, zIndex: 150 });
  void confetti({ particleCount: 25, spread: 130, startVelocity: 18, gravity: .55, scalar: 1.2, ticks: 210, origin, colors, shapes: ['circle'], disableForReducedMotion: true, zIndex: 150 });
}
export async function stopCelebration() {
  const { default: confetti } = await import('canvas-confetti');
  confetti.reset();
}
