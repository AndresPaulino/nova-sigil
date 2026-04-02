import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DocuSign Orchestration Preview — Nova Sigil",
  robots: "noindex",
};

// ─── Signer Data ───

const SIGNERS = [
  { name: "Sarah Chen", role: "Authorized Signer", color: "#4A9EFF", bg: "rgba(74,158,255,0.08)", border: "rgba(74,158,255,0.25)" },
  { name: "Marcus Rivera", role: "Beneficial Owner", color: "#4ADE80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.25)" },
  { name: "Diana Okafor", role: "Managing Member", color: "#C084FC", bg: "rgba(192,132,252,0.08)", border: "rgba(192,132,252,0.25)" },
];

const DOCUMENTS = [
  { name: "LLC Operating Agreement", copies: 3 },
  { name: "Beneficial Ownership Certification", copies: 1 },
  { name: "Corporate Resolution", copies: 3 },
  { name: "W-9 Form", copies: 3 },
  { name: "Account Agreement", copies: 2 },
];

// ─── Fake Text Lines ───

const FORM_LINES = [
  { w: "92%", mt: 0 },
  { w: "88%", mt: 6 },
  { w: "95%", mt: 6 },
  { w: "70%", mt: 6 },
  { w: "90%", mt: 20 },
  { w: "85%", mt: 6 },
  { w: "93%", mt: 6 },
  { w: "78%", mt: 6 },
  { w: "88%", mt: 6 },
  { w: "60%", mt: 6 },
];

const FORM_LINES_2 = [
  { w: "90%", mt: 20 },
  { w: "86%", mt: 6 },
  { w: "94%", mt: 6 },
  { w: "72%", mt: 6 },
];

// ─── Page ───

export default function DocuSignPreview() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] font-body text-white">
      {/* ════════ LEFT PANEL ════════ */}
      <div className="flex w-[35%] shrink-0 flex-col border-r border-white/[0.06] p-8">
        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c8a84e]">
            Signer Assignment Engine
          </span>
          <div className="mt-2 h-px bg-gradient-to-r from-[#c8a84e]/30 to-transparent" />
        </div>

        {/* Entity Structure */}
        <div className="mb-8">
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-[#555]">
            Entity Structure
          </span>
          <div className="rounded-lg border border-white/[0.06] bg-[#111] p-5">
            {/* Entity header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#c8a84e]/30 bg-[#c8a84e]/10">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="12" height="12" rx="2" stroke="#c8a84e" strokeWidth="1" />
                  <rect x="4" y="4" width="6" height="6" rx="1" stroke="#c8a84e" strokeWidth="0.75" strokeOpacity="0.5" />
                </svg>
              </div>
              <div>
                <div className="font-headline text-sm font-semibold text-white">
                  Meridian Holdings LLC
                </div>
                <div className="font-mono text-[10px] text-[#555]">
                  EIN: ••••-•••4821
                </div>
              </div>
            </div>

            {/* Connecting line */}
            <div className="relative ml-4 border-l border-white/[0.06] pl-6">
              {/* Signers */}
              <div className="flex flex-col gap-3">
                {SIGNERS.map((signer, i) => (
                  <div
                    key={signer.name}
                    className="relative flex items-center gap-3 rounded-md border p-3"
                    style={{
                      backgroundColor: signer.bg,
                      borderColor: signer.border,
                    }}
                  >
                    {/* Horizontal connector */}
                    <div
                      className="absolute -left-6 top-1/2 h-px w-6"
                      style={{ backgroundColor: signer.border }}
                    />
                    {/* Dot */}
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: signer.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-white">
                        {signer.name}
                      </div>
                      <span
                        className="mt-1 inline-block rounded-full px-2 py-0.5 font-mono text-[9px]"
                        style={{
                          color: signer.color,
                          backgroundColor: signer.bg,
                          border: `1px solid ${signer.border}`,
                        }}
                      >
                        {signer.role}
                      </span>
                    </div>
                    {/* Signer number */}
                    <span className="font-mono text-[10px] text-[#555]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Documents Required */}
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-[#555]">
            Documents Required
          </span>
          <div className="rounded-lg border border-white/[0.06] bg-[#111] p-4">
            <div className="flex flex-col gap-2">
              {DOCUMENTS.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-white/[0.02]"
                >
                  {/* Checkbox */}
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#c8a84e]/40 bg-[#c8a84e]/10">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5.5L4 7.5L8 3"
                        stroke="#c8a84e"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="flex-1 text-xs text-[#999]">
                    {doc.name}
                  </span>
                  <span className="rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-[#555]">
                    &times;{doc.copies}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-4 border-t border-white/[0.06] pt-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#555]">
                  Total envelopes
                </span>
                <span className="font-mono text-xs text-[#c8a84e]">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Processing status at bottom */}
        <div className="mt-auto pt-6">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ADE80]" />
            <span className="font-mono text-[10px] text-[#555]">
              Ready to generate envelopes
            </span>
          </div>
        </div>
      </div>

      {/* ════════ RIGHT PANEL ════════ */}
      <div className="flex flex-1 flex-col p-8">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#555]">
              Document Preview
            </span>
            <div className="h-px w-8 bg-white/[0.06]" />
            <span className="text-xs text-white/80">Account Agreement</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Anchor info */}
            <div className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-[#111] px-3 py-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="#c8a84e" strokeWidth="0.75" />
                <path d="M6 3.5V6.5" stroke="#c8a84e" strokeWidth="0.75" strokeLinecap="round" />
                <circle cx="6" cy="8.5" r="0.5" fill="#c8a84e" />
              </svg>
              <span className="font-mono text-[10px] text-[#999]">
                6 anchor points detected
              </span>
            </div>
            {/* Page nav */}
            <div className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-[#111] px-3 py-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3 1L7 5L3 9" stroke="#555" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[10px] text-[#999]">
                Page <span className="text-white">1</span> of 4
              </span>
            </div>
          </div>
        </div>

        {/* Document surface */}
        <div className="relative flex-1">
          {/* Document page */}
          <div className="relative mx-auto h-full max-w-[680px] rounded-sm bg-white shadow-[0_0_80px_rgba(0,0,0,0.5),0_0_2px_rgba(255,255,255,0.05)]">
            {/* Page content */}
            <div className="px-14 pt-12 pb-10">
              {/* Document header */}
              <div className="mb-8 flex items-start justify-between border-b border-gray-200 pb-6">
                <div>
                  {/* Fake bank logo */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="8" width="14" height="8" rx="1" stroke="#374151" strokeWidth="1" />
                        <path d="M9 2L16 8H2L9 2Z" stroke="#374151" strokeWidth="1" strokeLinejoin="round" />
                        <line x1="5" y1="10" x2="5" y2="14" stroke="#374151" strokeWidth="0.75" />
                        <line x1="9" y1="10" x2="9" y2="14" stroke="#374151" strokeWidth="0.75" />
                        <line x1="13" y1="10" x2="13" y2="14" stroke="#374151" strokeWidth="0.75" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">
                        First National Securities
                      </div>
                      <div className="text-[9px] text-gray-400">
                        Member FINRA / SIPC
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-800">
                    Account Agreement
                  </div>
                  <div className="mt-0.5 text-[9px] text-gray-400">
                    Form AA-2024 Rev. 03
                  </div>
                  <div className="mt-0.5 text-[9px] text-gray-400">
                    Meridian Holdings LLC
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <div className="mb-2 text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Section 1 — Account Information
              </div>
              {FORM_LINES.map((line, i) => (
                <div
                  key={i}
                  className="rounded-sm bg-gray-100"
                  style={{
                    width: line.w,
                    height: 6,
                    marginTop: line.mt,
                  }}
                />
              ))}

              {/* Section 2 */}
              <div className="mb-2 mt-8 text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Section 2 — Authorized Representatives
              </div>
              {FORM_LINES_2.map((line, i) => (
                <div
                  key={i}
                  className="rounded-sm bg-gray-100"
                  style={{
                    width: line.w,
                    height: 6,
                    marginTop: line.mt,
                  }}
                />
              ))}

              {/* ─── Signature Tab Overlays ─── */}

              {/* Signer 1 — Sarah Chen */}
              <div className="relative mt-10">
                <div
                  className="absolute -left-2 -top-1 h-[1px] w-3"
                  style={{ backgroundColor: SIGNERS[0].color }}
                />
                <div
                  className="inline-flex flex-col rounded border px-4 py-2.5"
                  style={{
                    backgroundColor: "rgba(74,158,255,0.08)",
                    borderColor: "rgba(74,158,255,0.4)",
                  }}
                >
                  <span
                    className="text-[8px] font-bold uppercase tracking-wider"
                    style={{ color: SIGNERS[0].color }}
                  >
                    Sign Here
                  </span>
                  <span className="mt-0.5 border-b border-dashed text-[10px] text-gray-600" style={{ borderColor: "rgba(74,158,255,0.3)" }}>
                    Sarah Chen
                  </span>
                  <span className="mt-1 text-[7px] text-gray-400">
                    Authorized Signer
                  </span>
                </div>

                {/* Date tab next to signature */}
                <div className="ml-4 inline-flex flex-col rounded border border-gray-300 bg-gray-50 px-3 py-2.5">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                    Date
                  </span>
                  <span className="mt-0.5 border-b border-dashed border-gray-300 text-[10px] text-gray-400">
                    mm / dd / yyyy
                  </span>
                </div>
              </div>

              {/* Signer 2 — Marcus Rivera */}
              <div className="relative mt-6">
                <div
                  className="absolute -left-2 -top-1 h-[1px] w-3"
                  style={{ backgroundColor: SIGNERS[1].color }}
                />
                <div
                  className="inline-flex flex-col rounded border px-4 py-2.5"
                  style={{
                    backgroundColor: "rgba(74,222,128,0.08)",
                    borderColor: "rgba(74,222,128,0.4)",
                  }}
                >
                  <span
                    className="text-[8px] font-bold uppercase tracking-wider"
                    style={{ color: SIGNERS[1].color }}
                  >
                    Initial Here
                  </span>
                  <span className="mt-0.5 border-b border-dashed text-[10px] text-gray-600" style={{ borderColor: "rgba(74,222,128,0.3)" }}>
                    M.R.
                  </span>
                  <span className="mt-1 text-[7px] text-gray-400">
                    Beneficial Owner
                  </span>
                </div>
              </div>

              {/* Signer 3 — Diana Okafor */}
              <div className="relative mt-6">
                <div
                  className="absolute -left-2 -top-1 h-[1px] w-3"
                  style={{ backgroundColor: SIGNERS[2].color }}
                />
                <div
                  className="inline-flex flex-col rounded border px-4 py-2.5"
                  style={{
                    backgroundColor: "rgba(192,132,252,0.08)",
                    borderColor: "rgba(192,132,252,0.4)",
                  }}
                >
                  <span
                    className="text-[8px] font-bold uppercase tracking-wider"
                    style={{ color: SIGNERS[2].color }}
                  >
                    Sign Here
                  </span>
                  <span className="mt-0.5 border-b border-dashed text-[10px] text-gray-600" style={{ borderColor: "rgba(192,132,252,0.3)" }}>
                    Diana Okafor
                  </span>
                  <span className="mt-1 text-[7px] text-gray-400">
                    Managing Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Connecting lines from left panel signers to document tabs */}
          {/* These are decorative curved lines on the left edge of the document */}
          <div className="pointer-events-none absolute -left-8 top-0 h-full w-8">
            <svg width="32" height="100%" viewBox="0 0 32 600" fill="none" preserveAspectRatio="none" className="h-full">
              <path d="M0 180 C16 180, 16 340, 32 340" stroke="rgba(74,158,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M0 300 C16 300, 16 420, 32 420" stroke="rgba(74,222,128,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M0 420 C16 420, 16 490, 32 490" stroke="rgba(192,132,252,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[#555]">
              Anchor text detected:
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono text-[10px] text-[#777]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4A9EFF]" />
                3 signature fields
              </span>
              <span className="text-[#333]">/</span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-[#777]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                2 initial fields
              </span>
              <span className="text-[#333]">/</span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-[#777]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/20" />
                1 date field
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#c8a84e]/60">
            nova sigil
          </span>
        </div>
      </div>
    </div>
  );
}
