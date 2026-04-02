import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Extraction Tool Preview — Nova Sigil",
  robots: "noindex",
};

// ─── Log Entries ───

type LogLevel = "ok" | "retry" | "warn" | "info" | "success" | "complete";

interface LogEntry {
  time: string;
  text: string;
  detail?: string;
  level: LogLevel;
}

const LOG_ENTRIES: LogEntry[] = [
  { time: "03:38:41", text: "Account #609 - Dadeland Station Deck", detail: "OK (28 rows)", level: "ok" },
  { time: "03:38:58", text: "Account #610 - Hialeah Transit Hub", detail: "OK (31 rows)", level: "ok" },
  { time: "03:39:14", text: "Account #611 - Kendall Town Center", detail: "OK (19 rows)", level: "ok" },
  { time: "03:39:32", text: "Account #612 - South Beach Garage A", detail: "OK (36 rows)", level: "ok" },
  { time: "03:39:50", text: "Account #613 - Midtown Surface Lot", detail: "OK (22 rows)", level: "ok" },
  { time: "03:41:12", text: "Account #614 - Aventura Mall Garage", detail: "OK (31 rows)", level: "ok" },
  { time: "03:41:28", text: "Account #615 - Coconut Grove Lot", detail: "OK (24 rows)", level: "ok" },
  { time: "03:41:45", text: "Account #616 - Wynwood Surface Lot", detail: "OK (18 rows)", level: "ok" },
  { time: "03:42:03", text: "Account #617 - Brickell City Centre P3", detail: "OK (24 rows)", level: "ok" },
  { time: "03:42:18", text: "Account #618 - Coral Gables Plaza", detail: "RETRY (timeout)", level: "retry" },
  { time: "03:42:34", text: "Account #618 - Coral Gables Plaza", detail: "OK (22 rows)", level: "ok" },
  { time: "03:42:51", text: "Account #619 - Doral Corporate Park", detail: "OK (24 rows)", level: "ok" },
  { time: "03:43:15", text: "--- SKIPPED: Accounts #620-623 (credentials expired) ---", level: "warn" },
  { time: "03:43:16", text: "Compiling Excel workbook...", level: "info" },
  { time: "03:44:02", text: "Report generated: parking_data_2026-04-01.xlsx (2.4 MB)", level: "success" },
  { time: "03:44:05", text: "Sending email notification...", level: "info" },
  { time: "03:44:08", text: "Delivered to ops-team@company.com", level: "success" },
  { time: "03:44:08", text: "Run complete. 617 of 623 accounts processed. 4 skipped.", level: "complete" },
];

// ─── Color Map ───

const LEVEL_COLORS: Record<LogLevel, string> = {
  ok: "#999",
  retry: "#F59E0B",
  warn: "#F97316",
  info: "#555",
  success: "#c8a84e",
  complete: "#4ADE80",
};

const DETAIL_COLORS: Record<string, string> = {
  ok: "#4ADE80",
  retry: "#F59E0B",
};

// ─── Page ───

export default function ExtractionPreview() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] p-8 font-body text-white">
      {/* ════════ HEADER ════════ */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#c8a84e]/30 bg-[#c8a84e]/10">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="10" rx="2" stroke="#c8a84e" strokeWidth="1" />
              <path d="M4 7H12" stroke="#c8a84e" strokeWidth="0.75" />
              <path d="M4 9.5H9" stroke="#c8a84e" strokeWidth="0.75" strokeOpacity="0.5" />
            </svg>
          </div>
          <div>
            <span className="font-headline text-sm font-semibold text-white">
              Parkonect Data Extraction
            </span>
            <span className="ml-3 font-mono text-[10px] text-[#555]">
              v2.1.4
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/[0.06] px-3 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
          <span className="font-mono text-[10px] text-[#4ADE80]">
            Run completed successfully
          </span>
        </div>
      </div>

      {/* ════════ TOP ROW — Stat Cards ════════ */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {/* Accounts Processed */}
        <div className="rounded-lg border border-white/[0.06] bg-[#111] p-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#555]">
            Accounts Processed
          </span>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-headline text-3xl font-bold text-white">
              617
            </span>
            <span className="font-headline text-lg text-[#555]">
              / 623
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.04]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#c8a84e] to-[#dabb65]"
              style={{ width: "99%" }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#555]">
              4 skipped (credentials)
            </span>
            <span className="font-mono text-[10px] text-[#c8a84e]">
              99.0%
            </span>
          </div>
        </div>

        {/* Run Duration */}
        <div className="rounded-lg border border-white/[0.06] bg-[#111] p-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#555]">
            Run Duration
          </span>
          <div className="mt-3">
            <span className="font-headline text-3xl font-bold text-white">
              3h 42m
            </span>
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#555" strokeWidth="0.75" />
                <path d="M5 2.5V5.5L7 7" stroke="#555" strokeWidth="0.75" strokeLinecap="round" />
              </svg>
              <span className="font-mono text-[10px] text-[#555]">
                Started: 12:02 AM
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#555" strokeWidth="0.75" />
                <path d="M3 5L4.5 6.5L7 3.5" stroke="#555" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[10px] text-[#555]">
                Finished: 3:44 AM
              </span>
            </div>
          </div>
        </div>

        {/* Report Status */}
        <div className="rounded-lg border border-white/[0.06] bg-[#111] p-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#555]">
            Report Status
          </span>
          <div className="mt-3 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="3.5" width="16" height="11" rx="1.5" stroke="#c8a84e" strokeWidth="1" />
              <path d="M1 5L9 10.5L17 5" stroke="#c8a84e" strokeWidth="1" />
            </svg>
            <span className="font-headline text-3xl font-bold text-[#c8a84e]">
              Delivered
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5L4.5 7.5L8 3" stroke="#4ADE80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-mono text-[10px] text-[#999]">
              ops-team@company.com
            </span>
            <span className="ml-1 font-mono text-[10px] text-[#333]">
              &bull; 3:44 AM
            </span>
          </div>
        </div>
      </div>

      {/* ════════ MIDDLE — Terminal Log ════════ */}
      <div className="relative mb-6 flex-1 overflow-hidden rounded-lg border border-white/[0.06] bg-[#141414]">
        {/* Terminal header bar */}
        <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span className="font-mono text-[10px] text-[#555]">
              extraction_runner.py — output log
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#333]">
              623 total &bull; 617 processed &bull; 2 retried &bull; 4 skipped
            </span>
          </div>
        </div>

        {/* Top fade */}
        <div className="pointer-events-none absolute left-0 right-0 top-[37px] z-10 h-16 bg-gradient-to-b from-[#141414] to-transparent" />

        {/* Log content */}
        <div className="px-5 py-4">
          {/* Faded "earlier" entries */}
          <div className="mb-1 font-mono text-[11px] leading-relaxed text-[#333]">
            <span className="text-[#252525]">[03:36:20]</span>{" "}
            Account #605 - Downtown Parking Tower... OK (24 rows)
          </div>
          <div className="mb-1 font-mono text-[11px] leading-relaxed text-[#333]">
            <span className="text-[#252525]">[03:37:08]</span>{" "}
            Account #606 - Airport Economy Lot B... OK (42 rows)
          </div>
          <div className="mb-1 font-mono text-[11px] leading-relaxed text-[#333]">
            <span className="text-[#252525]">[03:37:55]</span>{" "}
            Account #607 - FIU Campus Garage... OK (16 rows)
          </div>
          <div className="mb-3 font-mono text-[11px] leading-relaxed text-[#333]">
            <span className="text-[#252525]">[03:38:22]</span>{" "}
            Account #608 - Little Havana Lot... OK (20 rows)
          </div>

          {/* Main entries */}
          {LOG_ENTRIES.map((entry, i) => (
            <div
              key={i}
              className="mb-1 font-mono text-[11px] leading-relaxed"
            >
              <span className="text-[#555]">[{entry.time}]</span>{" "}
              <span
                style={{
                  color:
                    entry.level === "warn"
                      ? LEVEL_COLORS.warn
                      : entry.level === "complete"
                        ? LEVEL_COLORS.complete
                        : entry.level === "success"
                          ? LEVEL_COLORS.success
                          : entry.level === "info"
                            ? "#777"
                            : "#ccc",
                }}
              >
                {entry.text}
              </span>
              {entry.detail && (
                <span
                  style={{
                    color:
                      DETAIL_COLORS[entry.level] ?? "#999",
                  }}
                >
                  {" "}
                  {entry.detail}
                </span>
              )}
            </div>
          ))}

          {/* Blinking cursor */}
          <div className="mt-2 font-mono text-[11px]">
            <span className="text-[#555]">[03:44:08]</span>{" "}
            <span className="inline-block h-3.5 w-1.5 animate-pulse bg-[#c8a84e]/60" />
          </div>
        </div>
      </div>

      {/* ════════ BOTTOM ROW ════════ */}
      <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#111] px-5 py-4">
        {/* File info */}
        <div className="flex items-center gap-6">
          {/* Excel icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#217346]/30 bg-[#217346]/10">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="14" height="14" rx="2" stroke="#217346" strokeWidth="1" />
                <path d="M4 5L8 11M8 5L4 11" stroke="#217346" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="10" y1="5" x2="10" y2="11" stroke="#217346" strokeWidth="0.75" strokeOpacity="0.5" />
                <line x1="12" y1="5" x2="12" y2="11" stroke="#217346" strokeWidth="0.75" strokeOpacity="0.5" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-medium text-white">
                parking_data_2026-04-01.xlsx
              </span>
              <div className="mt-0.5 font-mono text-[10px] text-[#555]">
                Generated at 3:44 AM
              </div>
            </div>
          </div>

          {/* Stat pills */}
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-[10px] text-[#999]">
              2.4 MB
            </span>
            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-[10px] text-[#999]">
              617 locations
            </span>
            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-[10px] text-[#999]">
              14,808 data rows
            </span>
            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-[10px] text-[#999]">
              24 hourly columns
            </span>
          </div>
        </div>

        {/* Next run */}
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#555" strokeWidth="0.75" />
            <path d="M6 3V6.5L8.5 8" stroke="#555" strokeWidth="0.75" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[10px] text-[#555]">
            Next scheduled run: Tonight at 12:30 AM
          </span>
        </div>
      </div>
    </div>
  );
}
