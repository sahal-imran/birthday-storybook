// Edit messages, photos and birthday settings here. Empty photo paths show illustrated placeholders.
export const birthday = {
  name: 'Birthday Friend', from: 'Your Friend', month: 11, day: 14, edition: 2026,
  dateLabel: 'November 14',
  music: { src: '/audio/happy-birthday-music-box.wav', title: 'Happy Birthday — a gentle music-box instrumental', volume: 0.28 },
  urduWish: 'سالگرہ مبارک',
  romanWish: 'Wishing you a wonderful birthday.',
  heroMessage: 'A little world of memories, wishes, and surprises to celebrate you.',
  wish: 'May this year bring you peace, beautiful adventures, shelves full of books, a thousand reasons to laugh, and everything your sweet heart has ever dreamed of.',
  shortWish: 'May this year bring you peace, good books, little adventures, and so many reasons to smile.',
  finale: 'Here is to another year of meaningful moments and wonderful possibilities.',
};
export type PhotoConfig = {
  src: string;
  caption: string;
  alt: string;
  position?: string;
  fit?: 'cover' | 'contain';
};
// Add your own photographs to public/photos and set src to /photos/your-file.webp.
// Empty paths intentionally render a labeled placeholder.
export const photos: Record<string, PhotoConfig> = Object.fromEntries(
  ['hero.jpg', 'memory-1.jpg', 'memory-2.jpg', ...Array.from({ length: 6 }, (_, i) => `gallery-${i + 1}.jpg`)]
    .map((key, i) => [key, { src: '', caption: `Your memory ${i + 1}`, alt: `Describe your photograph ${i + 1}` }])
);
export const galleryPhotos = ['gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg', 'gallery-5.jpg', 'gallery-6.jpg'];
// Sample chapters: replace these with your own story.
export const memories = [
  { year: 'Chapter one', title: 'The beginning', emoji: '🌱', description: 'Add the story of how you first met.' },
  { year: 'Chapter two', title: 'Everyday moments', emoji: '📚', description: 'Share a small moment that still makes you smile.' },
  { year: 'Chapter three', title: 'Learning together', emoji: '📖', description: 'Celebrate something you learned together.' },
  { year: 'Chapter four', title: 'A little encouragement', emoji: '🌱', description: 'Remember a time you supported each other.' },
  { year: 'Chapter five', title: 'New adventures', emoji: '🎁', description: 'Add a favorite adventure or a new experience.' },
  { year: 'Chapter six', title: 'Little celebrations', emoji: '🎂', description: 'Write about a happy occasion you shared.' },
  { year: 'Chapter seven', title: 'Favorite traditions', emoji: '🌷', description: 'Describe a tradition you would like to keep.' },
  { year: 'Chapter eight', title: 'A special memory', emoji: '✨', description: 'Give a treasured memory its own page.' },
  { year: 'The next chapter', title: 'More to look forward to', emoji: '🌙', description: 'Share what you are looking forward to next.' },
];

export const reasons = [
  { icon: '☀️', title: 'Your sunshine', text: 'You see hope where I sometimes see clouds.' },
  { icon: '🫶', title: 'Your loyalty', text: 'You have stood beside me through every version of myself.' },
  { icon: '📖', title: 'Your encouragement', text: 'Your encouragement makes a difference on difficult days.' },
  { icon: '🎨', title: 'Your belief in me', text: 'You believed in me while I was still figuring out how to build my future.' },
  { icon: '🧁', title: 'Your sweetness', text: 'Your cakes, your cooking, and the care behind every little thing.' },
  { icon: '🧸', title: 'Your little joys', text: 'Your joy over tiny toys and cute things is my favorite kind of magic.' },
  { icon: '🌷', title: 'Your patience', text: 'You stayed strong when our journey asked us to wait.' },
  { icon: '💗', title: 'Your heart', text: 'You make people feel safe, valued, and understood.' },
  { icon: '✨', title: 'Your positivity', text: 'You’ve helped me become softer, kinder, and braver.' },
  { icon: '🌙', title: 'Your presence', text: 'Even on ordinary days, knowing you’re there changes everything.' },
  { icon: '🎀', title: 'Your smile', text: 'Your cheerful way of meeting life brings so much happiness into mine.' },
  { icon: '♾️', title: 'Our forever', text: 'After all these years, I would still choose you. Every single time.' },
];

export const gifts = [
  { emoji: '📚', tag: 'For the reader', title: 'A thousand stories', text: 'If life were a library, I would still search every shelf until I found our story again.' },
  { emoji: '🧸', tag: 'For your little joys', title: 'Pocket-sized happiness', text: 'I love noticing the small, cute things that make you smile.' },
  { emoji: '🎂', tag: 'For my favorite baker', title: 'Something sweet', text: 'Your cakes may be delicious, but no recipe in the world could make someone as sweet as you.' },
];

// Replace this sample letter with a message in your own voice.
export const letterParagraphs = [
  'Happy Birthday! Today is a lovely reason to remind you how much you are appreciated.',
  'Thank you for the kindness, laughter, and encouragement you bring to the people around you.',
  'I hope the year ahead leaves plenty of room for your favorite things, new discoveries, and the dreams that matter to you.',
  'This little birthday world is a place for our memories and a few surprises. Here is to many more good moments ahead.',
];
export const littleWorld = [
  { art: 'books', title: 'The little library', tag: 'For the reader', note: 'For the books you love and the stories you have yet to discover. I hope there is always time in your day for one more chapter.' },
  { art: 'palette', title: 'Your sketchbook', tag: 'A tiny drawing, just for you', note: 'A little heart drawn here for anyone who loves to sketch. There is something lovely about making something simply because it brings you joy.' },
  { art: 'bear', title: 'A pocket-sized friend', tag: 'For your collection of little joys', note: 'This tiny teddy has one very small job: to sit here looking cute until you smile.' },
  { art: 'cake', title: 'The baking corner', tag: 'A little sweetness', note: 'For your love of baking, cooking, and trying something delicious. Today, this little cake is made especially for you.' },
  { art: 'gift', title: 'One tiny parcel', tag: 'No occasion needed', note: 'A reminder that you deserve care on ordinary days too. I hope today gives you plenty of little things to feel happy about.' },
];

export const welcome = {
  password: '12345',
  eyebrow: 'ONE LITTLE WORLD · ONE LITTLE SECRET',
  message: 'Books, tiny joys, and a little magic. All wrapped up for you.',
  timerLabel: 'A little mystery, ticking away',
  guessLabel: 'What could the secret word be?',
  guessPlaceholder: 'Your little guess…',
  guessHint: 'Just you, a secret word, and a curious little envelope. ♡',
  buttonLabel: 'Open your little world',
  readyTimerLabel: 'Happy Birthday!',
  readyTimerMessage: 'Your little world is ready. ♡',
  readyHint: 'Made with care, just for you.',
  guessResponses: [
    'Nice try. The teddy is keeping this one a secret. ♡',
    'Even the butterflies aren’t telling. Another little guess?',
    'That made the gift box blush. Still a secret, though!',
    'Your detective era is very cute. Try another?',
    'The bookshelf is being suspiciously quiet about this one…',
    'A very cute guess. The envelope remains mysterious. ♡',
    'Plot twist: the tiny teddy has hidden all the clues.',
    'Hmm… more imagination, a little sparkle, and another try?',
  ],
};
