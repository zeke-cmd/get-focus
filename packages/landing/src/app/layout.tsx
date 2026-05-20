import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "focus — own your day",
  description:
    "the anti-productivity app. no cloud. no subscriptions. no distractions. just you and your tasks, running entirely on your device.",
  keywords: [
    "focus",
    "productivity",
    "task management",
    "pomodoro",
    "habit tracker",
    "offline",
    "privacy",
  ],
  openGraph: {
    title: "focus — own your day",
    description:
      "the anti-productivity app. no cloud. no subscriptions. no distractions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "focus — own your day",
    description:
      "the anti-productivity app. no cloud. no subscriptions. no distractions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
