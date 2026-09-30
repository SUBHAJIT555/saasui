import {
  upcomingWebinars,
  webinarWhatsappNumber,
  type WebinarSession,
} from "@/config/data/webinar-schedule";

const IST_TIMEZONE = "Asia/Kolkata";

export function formatWebinarDate(scheduledAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: IST_TIMEZONE,
  }).format(new Date(scheduledAt));
}

export function formatWebinarDateWithWeekday(scheduledAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: IST_TIMEZONE,
  }).format(new Date(scheduledAt));
}

export function formatWebinarTime(scheduledAt: string): string {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: IST_TIMEZONE,
  }).format(new Date(scheduledAt));

  return `${time} IST`;
}

export function formatWebinarShortDate(scheduledAt: string): {
  month: string;
  day: string;
  weekday: string;
} {
  const date = new Date(scheduledAt);

  return {
    month: new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: IST_TIMEZONE,
    }).format(date),
    day: new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      timeZone: IST_TIMEZONE,
    }).format(date),
    weekday: new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: IST_TIMEZONE,
    }).format(date),
  };
}

export function isWebinarPast(webinar: WebinarSession): boolean {
  return new Date(webinar.scheduledAt).getTime() < Date.now();
}

export function isWebinarRegistrationAvailable(webinar: WebinarSession): boolean {
  if (webinar.registrationOpen === false) return false;
  return !isWebinarPast(webinar);
}

export const WEBINAR_JOIN_EARLY_MINUTES = 15;

export type WebinarJoinNoticeVariant = "no-link" | "before-start" | "after-start";

export function getWebinarMsUntilStart(scheduledAt: string, now = Date.now()): number {
  return Math.max(0, new Date(scheduledAt).getTime() - now);
}

export function getWebinarJoinNoticeVariant(
  webinar: WebinarSession,
  now = Date.now(),
): WebinarJoinNoticeVariant {
  if (!webinar.joinUrl) return "no-link";

  const startMs = new Date(webinar.scheduledAt).getTime();
  if (now < startMs) return "before-start";
  return "after-start";
}

export function formatWebinarCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (days > 0 || hours > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  parts.push(`${String(seconds).padStart(2, "0")}s`);
  return parts.join(" ");
}

export function getUpcomingWebinars(
  sessions: WebinarSession[] = upcomingWebinars,
): WebinarSession[] {
  return sessions
    .filter(isWebinarRegistrationAvailable)
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    );
}

export function formatWebinarOptionLabel(webinar: WebinarSession): string {
  return `${formatWebinarDate(webinar.scheduledAt)} · ${formatWebinarTime(webinar.scheduledAt)} · ${webinar.topic}`;
}

export function splitWebinarTopic(topic: string): {
  main: string;
  focus: string;
} {
  const marker = " (";
  const markerIndex = topic.lastIndexOf(marker);

  if (markerIndex === -1 || !topic.endsWith(")")) {
    return { main: topic, focus: "" };
  }

  return {
    main: topic.slice(0, markerIndex),
    focus: topic.slice(markerIndex),
  };
}

export function extractFocusText(focus: string): string {
  const normalized = focus.trim();
  return normalized.replace(/^\(\s*Focus:\s*/i, "").replace(/\)$/, "").trim();
}

export function formatWebinarSpeakers(
  speakers: WebinarSession["speakers"],
): string {
  return speakers
    .map((speaker) => `${speaker.name} (${speaker.title})`)
    .join(", ");
}

export function buildWebinarWhatsappUrl(webinar: WebinarSession): string {
  const number = webinarWhatsappNumber.replace(/\D/g, "");
  const date = formatWebinarDate(webinar.scheduledAt);
  const time = formatWebinarTime(webinar.scheduledAt);
  const speakers = webinar.speakers
    .map((speaker) => `${speaker.name} (${speaker.title})`)
    .join("\n");

  const message = `Hello CYBERLABS INDIA,

I would like to register for the following webinar:

*Topic:* ${webinar.topic}
*Date:* ${date}
*Time:* ${time}
*Speakers:*
${speakers}

Please share the registration details. Thank you!`;

  const encodedMessage = encodeURIComponent(message);

  if (number) {
    return `https://wa.me/${number}?text=${encodedMessage}`;
  }

  return `https://api.whatsapp.com/send?text=${encodedMessage}`;
}

const PREFERRED_CALL_BUFFER_MS = 12 * 60 * 60 * 1000;

export type PreferredCallTimeBounds = {
  /** Earliest selectable moment (now). */
  min: Date;
  /** Latest selectable moment (webinar start minus 12 hours). */
  max: Date | null;
  /** Last selectable calendar day (webinar day). */
  maxDate: Date | null;
};

/** Bounds for the pre-webinar consultation call picker. */
export function getPreferredCallTimeBounds(
  webinar: WebinarSession | null,
): PreferredCallTimeBounds {
  const min = new Date();
  if (!webinar) {
    return { min, max: null, maxDate: null };
  }

  const webinarStart = new Date(webinar.scheduledAt);
  const max = new Date(webinarStart.getTime() - PREFERRED_CALL_BUFFER_MS);

  if (max.getTime() <= min.getTime()) {
    return { min, max: min, maxDate: webinarStart };
  }

  return { min, max, maxDate: webinarStart };
}

export function isPreferredCallTimeValid(
  value: Date,
  bounds: PreferredCallTimeBounds,
): boolean {
  const selectedTime = value.getTime();
  if (selectedTime < bounds.min.getTime()) return false;
  if (bounds.max && selectedTime > bounds.max.getTime()) return false;
  return true;
}

export function formatPreferredCallDeadline(scheduledAt: string): string {
  const deadline = new Date(
    new Date(scheduledAt).getTime() - PREFERRED_CALL_BUFFER_MS,
  );

  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: IST_TIMEZONE,
  }).format(deadline);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: IST_TIMEZONE,
  }).format(deadline);

  return `${date} at ${time} IST`;
}
