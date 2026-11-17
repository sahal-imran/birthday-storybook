"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";
import { birthday, welcome } from "../data/birthday";
import { birthdayReleaseAt, releaseCountdown } from "../lib/birthday";
import { StoryArt } from "./StoryArt";
import ReadyAnimation from "./ReadyAnimation";

export default function WelcomeScreen({ onOpen }: { onOpen: (password: string) => void }) {
  const [now, setNow] = useState<number | null>(null);
  const [guess, setGuess] = useState("");
  const [messageIndex, setMessageIndex] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const release = birthdayReleaseAt(
    birthday.edition,
    birthday.month,
    birthday.day,
  );
  const parts = now === null ? null : releaseCountdown(now, release);
  const canSubmit = now !== null && guess.trim().length > 0;
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      className="intro-screen release-welcome"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="welcome-panel">
        <div className="welcome-delivery">
          <ReadyAnimation kind="letter" />
          <StoryArt kind="flower" className="welcome-flower" />
          <StoryArt kind="bow" className="welcome-bow" />
          <span className="delivery-label">for {birthday.name}, with love ♡</span>
        </div>
        <span className="eyebrow">{welcome.eyebrow}</span>
        <h1 id="welcome-title">
          To my dearest <em>{birthday.name}</em>
        </h1>
        <p>{welcome.message}</p>
        <div
          className="welcome-countdown"
          role="group"
          aria-label="Countdown to the birthday surprise"
        >
          <span className="countdown-label">{parts?.released ? welcome.readyTimerLabel : welcome.timerLabel}</span>
          {parts?.released ? <p className="welcome-birthday-message" role="status">{welcome.readyTimerMessage}</p> : <div className="timer-grid">
            {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
              <div className="timer-unit" key={unit}>
                <strong>
                  {parts ? String(parts[unit]).padStart(2, "0") : "—"}
                </strong>
                <small>{unit}</small>
              </div>
            ))}
          </div>}
        </div>
        <form
          className="secret-guess"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSubmit) return;
            event.currentTarget.querySelector("input")?.blur();
            if (guess === welcome.password) {
              onOpen(guess);
              setGuess("");
              return;
            }
            setMessageIndex((previous) => {
              const count = welcome.guessResponses.length;
              if (count < 2) return 0;
              if (previous === null) return Math.floor(Math.random() * count);
              const next = Math.floor(Math.random() * (count - 1));
              return next >= previous ? next + 1 : next;
            });
            setGuess("");
          }}
        >
          <label htmlFor="secret-word">{welcome.guessLabel}</label>
          <div className="secret-guess-field">
            <input
              id="secret-word"
              type="password"
              name="birthday-guess"
              autoCorrect="off"
              autoCapitalize="off"
              autoFocus
              autoComplete="off"
              maxLength={100}
              disabled={now === null}
              placeholder={welcome.guessPlaceholder}
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              aria-describedby="guess-response"
            />
          </div>
          <button
            className="button-primary secret-open"
            type="submit"
            disabled={!canSubmit}
          >
            <LockKeyhole size={16} />
            {welcome.buttonLabel}
          </button>
          <p id="guess-response" role="status">
            {messageIndex === null
              ? welcome.guessHint
              : welcome.guessResponses[messageIndex]}
          </p>
        </form>
        <noscript>
          Please enable JavaScript to open your birthday surprise.
        </noscript>
      </div>
    </motion.div>
  );
}
