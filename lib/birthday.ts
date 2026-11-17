export function birthdayCountdown(now: number, month = 11, day = 14) {
  const year = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', year: 'numeric' }).format(now));
  const start = (y: number) => Date.UTC(y, month - 1, day) - 5 * 3600000;
  const birthday = start(year);
  const today = now >= birthday && now < birthday + 86400000;
  const target = now >= birthday + 86400000 ? start(year + 1) : birthday;
  const diff = Math.max(0, target - now);
  return { today, days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24, minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60 };
}

/** One release date for this gift; unlike the annual countdown it never relocks next year. */
export function birthdayReleaseAt(year: number, month = 11, day = 14) {
  return Date.UTC(year, month - 1, day) - 5 * 3600000;
}

export function releaseCountdown(now: number, releaseAt: number) {
  const total = Math.max(0, Math.ceil((releaseAt - now) / 1000));
  return { released: now >= releaseAt, days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24, minutes: Math.floor(total / 60) % 60, seconds: total % 60 };
}

