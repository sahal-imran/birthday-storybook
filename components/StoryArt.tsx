import { BookOpen, Gift, Cake, Flower2, Heart, Mail, Moon, Palette, Sparkles, Star, Ribbon, ToyBrick, type LucideIcon } from 'lucide-react';
export type ArtKind = 'bear' | 'books' | 'gift' | 'cake' | 'flower' | 'bow' | 'moon' | 'heart' | 'letter' | 'butterfly' | 'cupcake' | 'palette' | 'balloon' | 'star' | 'tulip';
const icons: Record<ArtKind, LucideIcon> = { bear: ToyBrick, books: BookOpen, gift: Gift, cake: Cake, flower: Flower2, bow: Ribbon, moon: Moon, heart: Heart, letter: Mail, butterfly: Sparkles, cupcake: Cake, palette: Palette, balloon: Heart, star: Star, tulip: Flower2 };
/** Code-based decorative placeholders; replace with your own licensed artwork if desired. */
export function StoryArt({ kind, className = '' }: { kind: ArtKind; className?: string }) {
  const Icon = icons[kind];
  return <Icon className={`story-art art-${kind} ${className}`} width={256} height={256} strokeWidth={1} aria-hidden="true" style={{ color: '#bf718f' }}/>;
}
