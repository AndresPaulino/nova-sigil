import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "DocuSign Orchestration for Complex Entity Structures — Nova Sigil",
  description:
    "A custom API that automates document assembly, signer routing, and tab placement for multi-entity bank account onboarding.",
};

const SECTIONS = [
  {
    heading: "The Problem",
    paragraphs: [
      "Banks manage hundreds of document types that need to be filled, routed, and signed by the right people at the right time. For individual accounts this is manageable, but when you're onboarding complex legal entities like LLCs, trusts, and corporate structures with multiple authorized signers, the process breaks down fast.",
      "The existing workflow was entirely manual. An operations team member would look up the account type, determine which documents were needed, figure out who needed to sign each one, manually create the DocuSign envelope, place signature tabs by hand, and hope nothing got missed. For a single complex entity, this could take 30 minutes or more. Errors were common: wrong signer assigned, tabs in the wrong location, missing documents discovered days later.",
    ],
  },
  {
    heading: "What We Built",
    paragraphs: [
      "We designed and built a custom API layer in Python (Flask) that sits between the bank's onboarding platform and DocuSign's API. The service centralizes all the document logic that previously lived in people's heads and scattered reference sheets.",
      "Here's how it works:",
    ],
    bullets: [
      "The onboarding system sends a request with the account type, entity structure, and the list of related parties and their roles",
      "The API determines which document templates are required based on business rules tied to the account type and entity classification",
      "For multi-signer scenarios, it automatically duplicates documents when each signer needs their own copy and assigns the correct signature, initial, and date tabs to each party based on their role (authorized signer, beneficial owner, trustee, etc.)",
      "Signature tab placement uses anchor text strings embedded in the document templates rather than fixed coordinates. This means that when the compliance team updates a form's layout or wording, the tabs automatically land in the correct position without any engineering changes",
      "Signer identity and contact information is pulled directly from the account relationship data in the database, eliminating manual data entry",
    ],
  },
  {
    heading: "What We Built (continued)",
    paragraphs: [
      "The API also handles edge cases that the manual process frequently got wrong: documents that require signatures from parties outside the primary account holders, conditional documents that are only required based on specific entity attributes, and the correct ordering of signers when sequential signing is required.",
    ],
  },
  {
    heading: "The Outcome",
    paragraphs: [
      "Document packages that previously took 30+ minutes of manual assembly now generate in seconds with a single API call. Signature routing errors dropped to near zero because the logic is deterministic rather than dependent on individual knowledge.",
      "When business rules change (a new document is required for a specific entity type, or a signing order needs to be updated), the change happens in one place in the API configuration rather than retraining an entire operations team.",
      "The system currently handles the full range of account types: individual, joint, LLC, corporation, partnership, trust, and estate, each with their own document and signing requirements.",
    ],
  },
];

const TECH_STACK = [
  "Python",
  "Flask",
  "DocuSign eSignature API",
  "PostgreSQL",
  "REST API",
  "PDF Template Management",
];

export default function DocuSignOrchestrationPage() {
  return (
    <CaseStudyLayout
      category="Financial Services / Document Automation"
      title="DocuSign Orchestration for Complex Entity Structures"
      summary="A custom API that automates document assembly, signer routing, and tab placement for multi-entity bank account onboarding."
      sections={SECTIONS}
      techStack={TECH_STACK}
    />
  );
}
