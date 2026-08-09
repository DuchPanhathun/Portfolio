import type {
  Achievement,
  EducationItem,
  Research,
  VolunteerItem,
} from "./types";

export const research: Research = {
  title:
    "Improving Online Payment Fraud Detection with Feature Engineering and Cost-Sensitive Machine Learning",
  institution: "Royal University of Phnom Penh",
  date: "8 June 2025",
  doi: "10.5281/zenodo.15618190",
  doiUrl: "https://doi.org/10.5281/zenodo.15618190",
  summary:
    "An end-to-end machine-learning pipeline for financial fraud detection, published independently on Zenodo under CC-BY 4.0 and indexed on ResearchGate.",
  points: [
    "Engineered domain-specific behavioural and temporal features on a 6.36-million-transaction dataset — account-draining detection, empirically-derived hourly risk tiers and balance-matching flags.",
    "Applied statistical outlier analysis with z-score flagging and winsorisation to preserve anomaly signal while controlling extreme-value noise.",
    "Compared six algorithms — CatBoost, XGBoost, LightGBM, Random Forest, K-Nearest Neighbors and Logistic Regression — addressing severe class imbalance through cost-sensitive class weighting rather than synthetic oversampling.",
    "Quantified train/test overfitting analysis confirmed generalisation, outperforming the comparable published studies benchmarked against.",
  ],
  metrics: [
    { value: "6.36M", label: "Transactions analysed" },
    { value: "99.96%", label: "ROC-AUC (CatBoost)" },
    { value: "99.79%", label: "F1-score" },
    { value: "6", label: "Algorithms compared" },
  ],
};

export const education: EducationItem[] = [
  {
    qualification: "Bachelor of Information Technology Engineering",
    institution: "Royal University of Phnom Penh",
    date: "Graduated 22 May 2025",
    primary: true,
  },
  {
    qualification: "General English Program — Level 14",
    institution: "Stanford American School",
    date: "1 Dec 2020",
  },
  {
    qualification: "English Program — Level 12",
    institution: "Arizon School",
    date: "13 Jun 2019",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Top 20 — Pan-SEA AI Developer Challenge 2025",
    date: "22 Oct 2025",
    description:
      "Placed among 100+ teams across ASEAN in AI Singapore's regional challenge for an AI platform addressing real-world problems. Awarded USD 10,000 in AWS credits to develop and scale the solution.",
    featured: true,
  },
  {
    title: "International Seminar Delegate, China",
    date: "7 – 20 Aug 2024",
    description:
      "Selected as 1 of 8 participants to attend an international seminar on Management and Protection of Nature Reserves for Belt & Road Initiative countries.",
    featured: true,
  },
  {
    title: "Gold Medal — NAVA-Thon Hackathon",
    date: "22 Dec 2023",
    description:
      "Awarded for a Telegram chatbot promoting positive parenting and child protection to combat violence against children.",
    featured: true,
  },
  {
    title: "NICC 9th Startup Camp (ICT)",
    date: "19 – 22 Jun 2023",
    description:
      "Completed the training course and achieved the required level of competence.",
  },
  {
    title: "Samsung Innovation Campus Scholarship",
    date: "5 Apr 2022",
    description:
      "Selected among the top 60 students nationally for an ICT programme covering Python from basic to advanced, and data analysis.",
  },
  {
    title: "Silver Medal — Angkor Mathematics Cambodia",
    date: "15 Jan 2022",
    description: "Awarded among 2,000+ participants.",
  },
  {
    title: "Mathematics Outstanding Student Cambodia",
    date: "15 Oct 2021",
    description:
      "One of the top finalists in the national Mathematics Outstanding Student examination.",
  },
];

export const volunteering: VolunteerItem[] = [
  {
    role: "Registration & Protocol Team — 22nd ASJA–ASCOJA–JAC Symposium",
    date: "28 Jun 2024",
  },
  {
    role: "Ceremony Volunteer — SEA Games & ASEAN Para Games",
    date: "5 May – 9 Jun 2023",
  },
  { role: "Protocol Support — Earth Hour", date: "23 Mar 2023" },
  {
    role: "Event Organising Assistant — Angkor Mathematics Cambodia",
    date: "19 Feb 2023",
  },
  {
    role: "Event Organising Assistant — Math Kangaroo Cambodia",
    date: "11 Dec 2022",
  },
];
