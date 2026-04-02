import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding Dashboard Preview — Nova Sigil",
  robots: "noindex",
};

// ─── Steps ───

const STEPS = [
  { label: "Client Info", status: "complete" },
  { label: "KYC Review", status: "complete" },
  { label: "Document Generation", status: "active" },
  { label: "Account Opening", status: "pending" },
  { label: "Complete", status: "pending" },
] as const;

// ─── Documents ───

const DOCUMENTS = [
  { name: "W-9 Form", size: "24 KB", pages: 1 },
  { name: "Account Agreement", size: "156 KB", pages: 8 },
  { name: "Disclosure Package", size: "312 KB", pages: 14 },
  { name: "Signature Cards", size: "48 KB", pages: 2 },
];

// ─── Form Fields ───

const FIELDS = [
  { label: "Account Holder", value: "Sarah Chen" },
  { label: "SSN", value: "***-**-4521" },
  { label: "Account Type", value: "Individual Brokerage", isDropdown: true },
  { label: "Address", value: "1200 Brickell Ave, Suite 400, Miami, FL 33131" },
  { label: "Date of Birth", value: "03/15/1985" },
  { label: "Citizenship", value: "United States" },
] as const;

// ─── Icons ───

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 2H14L20 8V22H6V2Z" stroke="currentColor" strokeWidth="1" />
      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1" />
      <line x1="9" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
      <line x1="9" y1="16" x2="15" y2="16" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
      <line x1="9" y1="19" x2="16" y2="19" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KycBadge() {
  return (
    <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-[#c8a84e]/20 bg-[#c8a84e]/[0.06] px-2 py-0.5 font-mono text-[9px] text-[#c8a84e]">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M1.5 4L3.5 6L6.5 2.5" stroke="#c8a84e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      From KYC
    </span>
  );
}

// ─── Page ───

export default function OnboardingPreview() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] font-body text-white">
      {/* ════════ TOP BAR — Progress Stepper ════════ */}
      <div className="border-b border-white/[0.06] px-12 py-6">
        {/* Header row */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#c8a84e]/30 bg-[#c8a84e]/10">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="#c8a84e" strokeWidth="1" />
                <path d="M4 7H10" stroke="#c8a84e" strokeWidth="0.75" />
                <path d="M7 4V10" stroke="#c8a84e" strokeWidth="0.75" />
              </svg>
            </div>
            <div>
              <span className="font-headline text-sm font-semibold text-white">
                New Account Onboarding
              </span>
              <span className="ml-3 font-mono text-[10px] text-[#555]">
                Case #ONB-2024-4821
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#555]">Advisor:</span>
            <span className="text-xs text-[#999]">James Mitchell</span>
            <div className="ml-2 h-6 w-6 rounded-full bg-[#1a1a1a] ring-1 ring-white/10" />
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-0">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex items-center gap-3">
                {/* Step indicator */}
                {step.status === "complete" ? (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c8a84e]/40 bg-[#c8a84e]/15">
                    <CheckIcon className="text-[#c8a84e]" />
                  </div>
                ) : step.status === "active" ? (
                  <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c8a84e] bg-[#c8a84e]/20">
                    <span className="font-mono text-[10px] font-bold text-[#c8a84e]">
                      {i + 1}
                    </span>
                    <div className="absolute inset-0 animate-ping rounded-full border border-[#c8a84e]/20" />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-[#111]">
                    <span className="font-mono text-[10px] text-[#333]">
                      {i + 1}
                    </span>
                  </div>
                )}
                <span
                  className={`whitespace-nowrap text-xs ${
                    step.status === "active"
                      ? "font-semibold text-[#c8a84e]"
                      : step.status === "complete"
                        ? "text-[#999]"
                        : "text-[#333]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="mx-4 h-px flex-1 bg-white/[0.06]">
                  <div
                    className="h-full"
                    style={{
                      width: step.status === "complete" ? "100%" : "0%",
                      backgroundColor: "rgba(200,168,78,0.3)",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ════════ MAIN CONTENT ════════ */}
      <div className="flex flex-1 gap-0">
        {/* ─── LEFT COLUMN — Auto-Generated Documents ─── */}
        <div className="flex w-1/2 flex-col border-r border-white/[0.06] p-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#555]">
                Auto-Generated Documents
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c8a84e]/25 bg-[#c8a84e]/[0.06] px-3 py-1 font-mono text-[10px] text-[#c8a84e]">
              <CheckIcon className="text-[#c8a84e]" />
              4 of 4 Complete
            </span>
          </div>

          {/* Document cards */}
          <div className="flex flex-col gap-3">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.name}
                className="group flex items-center gap-4 rounded-lg border border-white/[0.06] bg-[#111] p-4 transition-colors hover:border-white/[0.1]"
              >
                {/* Thumbnail */}
                <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded border border-white/[0.06] bg-[#0a0a0a]">
                  <DocIcon className="text-[#555]" />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {doc.name}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#c8a84e]">
                      <CheckIcon className="text-[#c8a84e]" />
                      Pre-filled from KYC
                    </span>
                    <span className="text-[10px] text-[#333]">&bull;</span>
                    <span className="font-mono text-[10px] text-[#555]">
                      {doc.pages} {doc.pages === 1 ? "page" : "pages"}
                    </span>
                  </div>
                </div>

                {/* Size + action */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#555]">
                    {doc.size}
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded border border-white/[0.06] text-[#555] transition-colors group-hover:border-[#c8a84e]/30 group-hover:text-[#c8a84e]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2V8M6 8L3.5 5.5M6 8L8.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 10H10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-auto flex items-center gap-2 pt-6">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#555" strokeWidth="0.75" />
              <path d="M6 3.5V6.5" stroke="#555" strokeWidth="0.75" strokeLinecap="round" />
              <circle cx="6" cy="8.5" r="0.5" fill="#555" />
            </svg>
            <span className="font-mono text-[10px] text-[#555]">
              All documents uploaded to account record automatically
            </span>
          </div>
        </div>

        {/* ─── RIGHT COLUMN — Pershing Account Opening ─── */}
        <div className="flex w-1/2 flex-col p-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#555]">
                Pershing Account Opening
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4A9EFF]/25 bg-[#4A9EFF]/[0.06] px-3 py-1 font-mono text-[10px] text-[#4A9EFF]">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M4 1V4.5L6 6" stroke="#4A9EFF" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="4" cy="4" r="3.25" stroke="#4A9EFF" strokeWidth="0.75" />
              </svg>
              Auto-populated
            </span>
          </div>

          {/* Form */}
          <div className="rounded-lg border border-white/[0.06] bg-[#111] p-6">
            <div className="flex flex-col gap-5">
              {FIELDS.map((field) => (
                <div key={field.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#555]">
                      {field.label}
                    </label>
                    <KycBadge />
                  </div>
                  <div className="relative">
                    <div className="flex items-center rounded-md border border-white/[0.08] bg-[#0a0a0a] px-4 py-3">
                      <span className="flex-1 text-sm text-[#c8a84e]">
                        {field.value}
                      </span>
                      {"isDropdown" in field && field.isDropdown && (
                        <ArrowIcon />
                      )}
                    </div>
                    {/* Subtle glow on auto-filled fields */}
                    <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-[#c8a84e]/[0.08]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ADE80]" />
                <span className="font-mono text-[10px] text-[#555]">
                  Connection active
                </span>
              </div>
              <button
                type="button"
                className="rounded-md bg-[#c8a84e] px-8 py-3 text-sm font-bold text-black transition-all hover:bg-[#dabb65] hover:shadow-[0_0_20px_rgba(200,168,78,0.3)]"
              >
                Submit to Pershing
              </button>
            </div>
          </div>

          {/* Transfer log */}
          <div className="mt-6 rounded-lg border border-white/[0.06] bg-[#111] p-4">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-[#555]">
              Field Mapping Log
            </span>
            <div className="flex flex-col gap-1.5">
              {[
                { from: "kyc.full_name", to: "pershing.account_holder", time: "0.02s" },
                { from: "kyc.ssn_masked", to: "pershing.tax_id", time: "0.01s" },
                { from: "kyc.address", to: "pershing.mailing_address", time: "0.03s" },
                { from: "kyc.dob", to: "pershing.date_of_birth", time: "0.01s" },
                { from: "kyc.citizenship", to: "pershing.country", time: "0.01s" },
              ].map((entry) => (
                <div key={entry.from} className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="text-[#4A9EFF]">{entry.from}</span>
                  <span className="text-[#333]">&rarr;</span>
                  <span className="text-[#4ADE80]">{entry.to}</span>
                  <span className="ml-auto text-[#333]">{entry.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
