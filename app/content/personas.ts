import type { Persona, PersonaId } from "@/lib/types";

export const PERSONAS: Record<PersonaId, Persona> = {
  fde: {
    id: "fde", label: "FDE", title: "Forward-deployed engineer", door: "I'd run it",
    headline: "Here is what lands in your cluster.",
    lead: "Where it runs, what gets installed, what your users will touch, and what is missing today. Every line links to IOMETE's docs.",
    atoms: ["deploy", "architecture", "showcase", "not-yet", "run-it"],
    next: [
      { label: "Request the free plan", href: "https://iomete.com/pricing/free-plan", note: "Up to 100 vCPUs. Access is reviewed manually." },
      { label: "Read the install guide", href: "https://iomete.com/resources/deployment/on-prem/install", note: "Helm chart, prerequisites, NKP and Azure Terraform paths." },
      { label: "Watch IOMETE University", href: "https://iomete.com/university", note: "9 free videos in 3 modules." },
      { label: "Download a one-page summary", href: "/brief?v=what-gets-installed", note: "Everything on this page with sources." },
    ],
  },
  cro: {
    id: "cro", label: "CRO", title: "Chief Risk Officer", door: "I'd sign off on it",
    headline: "Here is what you can verify, and what you still need to ask.",
    lead: "Where the data lives, which controls are documented, what the badges mean, and the questions public material leaves open.",
    atoms: ["perimeter", "controls", "attestations", "open-questions"],
    next: [
      { label: "Download a one-page summary", href: "/brief?v=where-data-goes", note: "Every claim on this page, its mark and its source. Ready for a vendor-risk file." },
      { label: "Open the trust center", href: "https://app.vanta.com/iomete.com/trust/mh7heslsoonlhblghsro7g", note: "Hosted by Vanta. Some documents are on request." },
      { label: "Read the licence", href: "https://iomete.com/policies/software-license-agreement", note: "§4.2 usage data, §10.4 support access." },
    ],
  },
  ceo: {
    id: "ceo", label: "CEO", title: "Chief Executive", door: "I'd pay for it",
    headline: "Here is what you would be buying, and what it costs.",
    lead: "The product in one sentence, the price list, where it sits in the market, and who is behind it.",
    atoms: ["plain", "pricing", "market", "vendor", "logos"],
    next: [
      { label: "Talk to IOMETE", href: "https://iomete.com/contact-us", note: "The site's only route to a demo." },
      { label: "Download a one-page summary", href: "/brief?v=what-it-costs", note: "One page to forward internally." },
      { label: "What will security ask?", href: "/?v=security-review", note: "The controls, the badges and the open questions." },
    ],
  },
};

export const PERSONA_IDS: PersonaId[] = ["fde", "cro", "ceo"];
