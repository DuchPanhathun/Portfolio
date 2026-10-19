import type { Metadata } from "next";
import { PlaySandbox } from "@/components/play/PlaySandbox";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Interactive Creative Playground & Generative Physics",
  description: `Interactive HTML5 Canvas generative physics simulation, vector flow fields, and kinetic particle dynamics created by ${profile.name}.`,
  alternates: {
    canonical: "/play",
  },
  openGraph: {
    title: `Playground — Interactive Generative Physics | ${profile.name}`,
    description: `Interactive HTML5 Canvas generative physics simulation, vector flow fields, and kinetic particle dynamics created by ${profile.name}.`,
    url: "/play",
  },
};

export default function PlayPage() {
  return <PlaySandbox />;
}
