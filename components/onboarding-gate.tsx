"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { type KeyboardEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const ONBOARDING_CHOICE_KEY = "rituals:onboarding-choice";
const ONBOARDING_TIMEZONE_KEY = "rituals:selected-timezone";
const HERO_SETTLE_DELAY = 2100;

type OnboardingChoice = "guided" | "browse";
type OnboardingStatus = "checking" | "waiting" | "prompt" | "active" | "exiting" | "dismissed";

type TimezoneOption = {
  value: string;
  label: string;
  detail: string;
  searchText: string;
};

const timezoneOptions: TimezoneOption[] = [
  {
    value: "America/Los_Angeles",
    label: "Pacific Time",
    detail: "Los Angeles • Vancouver • Seattle"
  },
  {
    value: "America/Denver",
    label: "Mountain Time",
    detail: "Denver • Phoenix"
  },
  {
    value: "America/Chicago",
    label: "Central Time",
    detail: "Chicago • Dallas • Mexico City"
  },
  {
    value: "America/New_York",
    label: "Eastern Time",
    detail: "New York • Toronto • Miami"
  },
  {
    value: "Europe/London",
    label: "Greenwich Mean Time",
    detail: "London • Dublin"
  },
  {
    value: "Europe/Paris",
    label: "Central European Time",
    detail: "Paris • Berlin • Rome"
  },
  {
    value: "Asia/Kolkata",
    label: "India Standard Time",
    detail: "India"
  },
  {
    value: "Asia/Tokyo",
    label: "Japan Standard Time",
    detail: "Japan"
  },
  {
    value: "Australia/Sydney",
    label: "Australian Eastern Time",
    detail: "Sydney • Melbourne"
  },
  {
    value: "Pacific/Auckland",
    label: "New Zealand Time",
    detail: "Auckland"
  }
].map((option) => ({
  ...option,
  searchText: `${option.label} ${option.detail} ${option.value} ${option.value.replace(/[_/]/g, " ")}`.toLowerCase()
}));

function getHourInTimezone(timeZone: string) {
  let hourPart: string | undefined;

  try {
    hourPart = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone
    })
      .formatToParts(new Date())
      .find((part) => part.type === "hour")?.value;
  } catch {
    hourPart = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: "America/Los_Angeles"
    })
      .formatToParts(new Date())
      .find((part) => part.type === "hour")?.value;
  }

  return Number(hourPart ?? "0") % 24;
}

function routeForHour(hour: number) {
  if (hour >= 5 && hour < 12) return "/rituals/morning";
  if (hour >= 12 && hour < 17) return "/rituals/noon";
  if (hour >= 17 && hour < 21) return "/rituals/evening";
  return "/rituals/night";
}

function readStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The modal should still work for visitors who block storage.
  }
}

function removeStorage(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage can be unavailable in strict browser modes.
  }
}

export function OnboardingGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<OnboardingStatus>("checking");
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [query, setQuery] = useState("");
  const [isSearchingTimezone, setIsSearchingTimezone] = useState(false);

  const visibleOptions = useMemo(() => {
    const normalizedQuery = isSearchingTimezone ? query.trim().toLowerCase() : "";
    if (!normalizedQuery) {
      return timezoneOptions;
    }

    return timezoneOptions
      .filter((option) => option.searchText.includes(normalizedQuery))
      .slice(0, 12);
  }, [isSearchingTimezone, query]);

  const selectedTimezoneLabel =
    timezoneOptions.find((option) => option.value === selectedTimezone)?.label ?? "";

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const shouldResetOnboarding = searchParams.get("onboarding") === "reset";
    const shouldBrowseArchive = searchParams.get("onboarding") === "browse";

    if (shouldResetOnboarding || shouldBrowseArchive) {
      removeStorage(ONBOARDING_CHOICE_KEY);
      if (shouldResetOnboarding) {
        removeStorage(ONBOARDING_TIMEZONE_KEY);
      }
      searchParams.delete("onboarding");
      const queryString = searchParams.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${queryString ? `?${queryString}` : ""}`);
    }

    if (shouldBrowseArchive) {
      writeStorage(ONBOARDING_CHOICE_KEY, "browse");
      setStatus("dismissed");
      return;
    }

    const savedChoice = shouldResetOnboarding ? null : (readStorage(ONBOARDING_CHOICE_KEY) as OnboardingChoice | null);
    const savedTimezone = shouldResetOnboarding ? null : readStorage(ONBOARDING_TIMEZONE_KEY);
    const supportedSavedTimezone = timezoneOptions.some((option) => option.value === savedTimezone);
    const activeSavedTimezone = supportedSavedTimezone ? savedTimezone : null;

    setSelectedTimezone(activeSavedTimezone || "");

    if (savedChoice === "guided" && activeSavedTimezone) {
      router.replace(routeForHour(getHourInTimezone(activeSavedTimezone)));
      return;
    }

    if (savedChoice === "browse") {
      setStatus("dismissed");
      return;
    }

    setStatus("waiting");
    const timer = window.setTimeout(() => setStatus("prompt"), reduceMotion ? 450 : HERO_SETTLE_DELAY);

    return () => window.clearTimeout(timer);
  }, [reduceMotion, router]);

  useEffect(() => {
    if (status !== "active" && status !== "prompt") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => searchRef.current?.focus(), 120);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [status]);

  function browseEveryRitual() {
    writeStorage(ONBOARDING_CHOICE_KEY, "browse");
    setStatus("exiting");
    window.setTimeout(() => setStatus("dismissed"), reduceMotion ? 80 : 760);
  }

  function continueWithMyDay() {
    if (!selectedTimezone) return;

    writeStorage(ONBOARDING_CHOICE_KEY, "guided");
    writeStorage(ONBOARDING_TIMEZONE_KEY, selectedTimezone);
    setStatus("exiting");
    window.setTimeout(
      () => router.push(routeForHour(getHourInTimezone(selectedTimezone))),
      reduceMotion ? 80 : 780
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      browseEveryRitual();
      return;
    }

    if (event.key !== "Tab" || !modalRef.current) return;

    const focusable = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute("disabled"));

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const promptVisible = status === "prompt";
  const modalVisible = status === "prompt" || status === "active" || status === "exiting";

  return (
    <>
      <div className={modalVisible ? "onboarding-content onboarding-content--locked" : "onboarding-content"}>
        {children}
      </div>

      <AnimatePresence>
        {modalVisible ? (
          <motion.div
            aria-hidden={false}
            className={`onboarding-overlay ${status === "exiting" ? "onboarding-overlay--exiting" : ""}`}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {promptVisible ? (
                <motion.div
                  aria-labelledby="onboarding-prompt-title"
                  aria-modal="true"
                  className="onboarding-modal onboarding-modal--prompt"
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.96, filter: "blur(18px)", y: -8 }
                  }
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.96, filter: "blur(12px)" }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  onKeyDown={handleKeyDown}
                  ref={modalRef}
                  role="dialog"
                  transition={{ duration: reduceMotion ? 0.01 : 0.64, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="onboarding-shimmer" />
                  <div className="onboarding-pulse-ring" />
                  <p className="onboarding-kicker">Begin at your hour</p>
                  <h2 id="onboarding-prompt-title">Pick your time zone to start the Ritual</h2>
                  <div className="onboarding-actions">
                    <Button className="onboarding-primary" onClick={() => setStatus("active")} type="button">
                      Pick Time Zone
                    </Button>
                    <Button className="onboarding-secondary" onClick={browseEveryRitual} type="button" variant="ghost">
                      Browse Every Ritual
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  aria-labelledby="onboarding-title"
                  aria-modal="true"
                  className={`onboarding-modal ${status === "exiting" ? "onboarding-modal--exiting" : ""}`}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 1.045, filter: "blur(22px)", y: -10 }
                  }
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(14px)" }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  onKeyDown={handleKeyDown}
                  ref={modalRef}
                  role="dialog"
                  transition={{ duration: reduceMotion ? 0.01 : 0.58, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="onboarding-shimmer" />
                  <div className="onboarding-diffusion" />
                  <p className="onboarding-kicker">Personal rhythm</p>
                  <h2 id="onboarding-title">Where does your day begin?</h2>
                  <p className="onboarding-subtitle">
                    Every place wakes at its own pace. Choose where your rituals begin, or explore the
                    archive at your own rhythm.
                  </p>

                  <div className="timezone-command">
                    <label htmlFor="timezone-search">Timezone</label>
                    <div className="timezone-search">
                      <Search aria-hidden="true" className="h-4 w-4" />
                      <input
                        autoComplete="off"
                        id="timezone-search"
                        onChange={(event) => {
                          setIsSearchingTimezone(true);
                          setQuery(event.target.value);
                        }}
                        onFocus={(event) => {
                          event.currentTarget.select();
                        }}
                        placeholder="Search city, region, or timezone"
                        ref={searchRef}
                        value={isSearchingTimezone ? query : selectedTimezoneLabel}
                      />
                    </div>
                    <div aria-label="Timezone results" className="timezone-results" role="listbox">
                      {visibleOptions.length ? (
                        visibleOptions.map((option) => (
                          <button
                            aria-selected={selectedTimezone === option.value}
                            className={`timezone-option ${selectedTimezone === option.value ? "timezone-option--selected" : ""}`}
                            key={option.value}
                            onClick={() => {
                              setSelectedTimezone(option.value);
                              setQuery("");
                              setIsSearchingTimezone(false);
                            }}
                            role="option"
                            type="button"
                          >
                            <span>{option.label}</span>
                            <small>{option.detail}</small>
                          </button>
                        ))
                      ) : (
                        <p className="timezone-empty">No matching timezone found.</p>
                      )}
                    </div>
                  </div>

                  <div className="onboarding-actions">
                    <Button
                      className="onboarding-primary"
                      disabled={!selectedTimezone}
                      onClick={continueWithMyDay}
                      type="button"
                    >
                      Continue With My Day
                    </Button>
                    <Button className="onboarding-secondary" onClick={browseEveryRitual} type="button" variant="ghost">
                      Browse Every Ritual
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
