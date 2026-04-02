import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Digital Onboarding Platform Modernization — Nova Sigil",
  description:
    "Targeted automations and UX improvements that eliminated redundant data entry and cut onboarding time across a major bank's advisor platform.",
};

const SECTIONS = [
  {
    heading: "The Problem",
    paragraphs: [
      "Client onboarding at a major bank was slow, repetitive, and frustrating for everyone involved. Financial advisors were spending more time on data entry than on their actual clients.",
      "The core issue was fragmentation. Client information captured during the Know Your Customer (KYC) process lived in one system. PDF forms that needed to be filled and uploaded to the account record had to be completed by hand, re-entering the same data that was already in the system. When opening investment accounts on external platforms like Pershing, advisors had to copy fields one by one from their screen into a separate interface.",
      "Every redundant step multiplied the chance of error. A misspelled name here, a wrong address there, a missing field that triggers a compliance review and delays the entire process by days. Advisors had developed workarounds (sticky notes, personal spreadsheets, copy-pasting into text files) to manage the friction, which only made things less consistent.",
      "The onboarding flow itself had accumulated unnecessary steps over the years. Screens that asked for information already captured earlier. Approval gates that existed because of old org chart structures. Navigation paths that required 15 clicks when 5 would do.",
    ],
  },
  {
    heading: "What We Built",
    paragraphs: [
      "Rather than a single large rewrite, we took a targeted approach: identify the highest-friction points in the advisor workflow and eliminate them one by one.",
    ],
  },
  {
    heading: "Automated PDF Generation and Upload",
    paragraphs: [
      "We built a service that takes the client data already captured during KYC and automatically populates the required PDF forms. The completed documents are uploaded directly to the client's account record. Advisors no longer open a blank PDF and manually type in information the system already has.",
    ],
  },
  {
    heading: "Pre-Population for External Platforms",
    paragraphs: [
      "When an advisor needs to open a Pershing investment account, the form now loads with client data already filled in from the KYC record. Fields like name, SSN, address, date of birth, and account preferences carry over automatically. The advisor reviews and submits rather than re-entering from scratch.",
    ],
  },
  {
    heading: "Workflow Consolidation",
    paragraphs: [
      "We audited every step in the onboarding flow and identified screens that collected redundant information, approval steps that no longer served a purpose, and navigation paths that could be shortened. We consolidated multi-page sequences into single screens where the data model allowed it, and removed steps that existed as artifacts of older processes.",
    ],
  },
  {
    heading: "UI/UX Refinements",
    paragraphs: [
      "Smaller changes that added up: smarter default selections based on account type, inline validation so errors are caught before submission instead of after, progress indicators so advisors know where they are in the process, and keyboard shortcuts for the operations team that processes onboarding requests all day.",
    ],
  },
  {
    heading: "The Outcome",
    paragraphs: [
      "Onboarding time dropped significantly. The exact number varies by account complexity, but simple individual accounts that used to take 20+ minutes of advisor time now take under 5. Complex entity accounts saw similar proportional improvements.",
      "Form errors from manual data entry were nearly eliminated for the automated documents. The pre-population for Pershing accounts alone saved advisors several minutes per account opening while reducing rejection rates from the platform.",
      "The important thing is that none of these improvements required a full platform rewrite. Each one was a contained change that could be built, tested, and shipped independently. The cumulative effect was a process that felt fundamentally different to the people using it every day.",
    ],
  },
];

const TECH_STACK = [
  "React",
  "Node.js",
  "Python",
  "PDF Generation (reportlab)",
  "Pershing API Integration",
  "PostgreSQL",
  "REST APIs",
];

export default function OnboardingModernizationPage() {
  return (
    <CaseStudyLayout
      category="Financial Services / Platform Engineering"
      title="Digital Onboarding Platform Modernization"
      summary="Targeted automations and UX improvements that eliminated redundant data entry and cut onboarding time across a major bank's advisor platform."
      sections={SECTIONS}
      techStack={TECH_STACK}
    />
  );
}
