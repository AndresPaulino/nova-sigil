import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Multi-Location Data Extraction Tool — Nova Sigil",
  description:
    "A Python automation tool that extracts operational data from 600+ accounts on a third-party platform and delivers structured reports overnight.",
};

const SECTIONS = [
  {
    heading: "The Problem",
    paragraphs: [
      "A property management company operated 600+ parking locations and relied on a third-party platform called Parkonect to track hourly occupancy and revenue data. The data was critical for billing clients, analyzing location performance, and making operational decisions.",
      "The problem was access. Parkonect had no bulk export feature and no API. The only way to get data out was to log into each individual account through the web interface, navigate to the reporting section, set the date range, and manually export the results. With 600+ accounts, this was a full-time job. Someone on the operations team would spend their entire day logging in, clicking, waiting, downloading, and moving to the next account.",
      "The data was always stale by the time it was compiled. Manual errors crept in (skipped accounts, wrong date ranges, misnamed files). And if the person responsible was out sick or on vacation, the data simply didn't get pulled.",
    ],
  },
  {
    heading: "What We Built",
    paragraphs: [
      "We built a standalone automation tool in Python using Playwright for browser automation. The tool replicates exactly what a human would do, but faster, and without errors.",
      "Here's the workflow:",
    ],
    bullets: [
      "The tool reads from a configuration file containing all 600+ account credentials",
      "It launches a headless browser and sequentially logs into each account",
      "For each account, it navigates to the reporting section, sets the appropriate date range, and extracts the hourly data from the page",
      "All extracted data is compiled into structured Excel workbooks using openpyxl, organized by location and date",
      "The tool includes a desktop GUI built with Tkinter so the operations team can configure settings (date ranges, specific accounts to include/exclude) and run the tool themselves without touching any code",
      "Built-in progress tracking shows which accounts have been processed and provides an estimated completion time",
      "Resume capability means that if the browser crashes or the internet drops mid-run, the tool picks up from the last completed account instead of starting over",
      "Email notifications fire on completion, so the team knows when fresh reports are ready in their inbox",
    ],
  },
  {
    heading: "What We Built (continued)",
    paragraphs: [
      "The tool was designed to run overnight on a scheduled task. The operations team goes home, the tool runs while nobody is there, and a clean Excel file is waiting in their inbox the next morning.",
    ],
  },
  {
    heading: "The Outcome",
    paragraphs: [
      "What used to consume an entire workday of manual effort now runs autonomously overnight. The operations team gets consistent, accurate data every morning without lifting a finger.",
      "Data staleness was eliminated because the tool can run daily. Manual errors from skipped accounts or wrong date ranges disappeared because the process is deterministic. And the operations team is no longer blocked when someone is unavailable, because the tool doesn't need a human to operate.",
      "The tool was delivered as a self-contained application that the team runs on their own hardware. No ongoing developer dependency, no cloud hosting costs, no SaaS subscription. They own it outright and can run it whenever they need to.",
    ],
  },
];

const TECH_STACK = [
  "Python",
  "Playwright",
  "Tkinter (Desktop GUI)",
  "openpyxl (Excel Generation)",
  "SMTP (Email Notifications)",
  "Task Scheduler (Windows Automation)",
];

export default function AutomatedDataExtractionPage() {
  return (
    <CaseStudyLayout
      category="Automation / Data Engineering"
      title="Multi-Location Data Extraction Tool"
      summary="A Python automation tool that extracts operational data from 600+ accounts on a third-party platform and delivers structured reports overnight."
      sections={SECTIONS}
      techStack={TECH_STACK}
    />
  );
}
