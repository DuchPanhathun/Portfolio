import type { Metadata } from "next";
import { MyWorksClient } from "@/components/works/MyWorksClient";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "All Works & Projects Archive",
  description: `Complete catalog of applied machine learning, production web systems, and open-source tools developed by ${profile.name}.`,
  alternates: {
    canonical: "/myworks",
  },
};

export default function MyWorksPage() {
  return <MyWorksClient />;
}
