"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => <div className="h-12 w-full max-w-md" aria-hidden="true" />,
  }
);

const USERNAME = "TrindadeBRA";

const calendarTheme = {
  dark: ["#141414", "#2a2a2a", "#4a4a4a", "#7a7a7a", "#cfcfcf"],
  light: ["#141414", "#2a2a2a", "#4a4a4a", "#7a7a7a", "#cfcfcf"],
};

export default function HeroGithubCalendar() {
  return (
    <Link
      href={`https://github.com/${USERNAME}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contribuições no GitHub"
      className="hero-github group relative mt-10 block max-w-lg opacity-50 transition hover:opacity-80"
    >
      <div className="overflow-hidden mask-fade-x">
        <div className="origin-left scale-[0.72] sm:scale-[0.8]">
          <GitHubCalendar
            username={USERNAME}
            colorScheme="dark"
            blockSize={9}
            blockMargin={3}
            fontSize={11}
            showColorLegend={false}
            showMonthLabels={false}
            showTotalCount={false}
            theme={calendarTheme}
          />
        </div>
      </div>
    </Link>
  );
}
