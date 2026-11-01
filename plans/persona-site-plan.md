# IOMETE, explained for you — persona-routed site plan

Status: planning, 1 Nov 2026. Inputs: `reports/IOMETE sales enablement research.md` and
`research_notes/IOMETE sales enablement research/site_component_inventory.md` (524-line
component inventory of iomete.com, with asset URLs and design tokens).

## 1. The idea in one paragraph

Take the components iomete.com already has, keep IOMETE's visual language, and re-route them
by who is looking. A visitor lands, sees one animated picture that explains "sovereign lakehouse"
in under 15 seconds, then either picks a door (FDE / CRO / CEO) or types one sentence to a bot.
From there the same site atoms are re-ordered, re-captioned and re-weighted for that person,
and every number on the page carries a hoverable source with one of three states:
**documented** (docs/legal/pricing URL), **claimed** (IOMETE marketing, quoted with attribution)
or **unknown** (we say so and route to the Vanta trust center or a contact). The bot does not
write essays; it answers in two sentences and *moves the page* to the component that proves it.

This fits the track's "I do not understand what this does" friction, and folds in the
role-based explainer the research scored as best delivered *as an output mode*, not a
standalone tool.

## 2. Persona assumptions (confirm before build)

| Door | Reading used in this plan | Why | Alternative reading |
|---|---|---|---|
| **FDE** | The hands-on engineer who would install and run it. IOMETE uses "forward-deployed engineer" for its own staff, so the door is literally "the person who deploys it". | Product pages already skew engineer; needs no new copy, only re-ordering. | Same. |
| **CRO** | **Chief Risk Officer.** Owns DORA, GDPR, vendor risk at a bank or insurer, which is IOMETE's stated buyer. | IOMETE's CISO/risk copy ("trust perimeter", "sovereign by architecture") maps directly. | Chief Revenue Officer. Unlikely to evaluate a data platform; if intended, this door becomes "sales leader at IOMETE" and the content turns into a talk track. Persona config is one JSON file, so the swap costs minutes, not hours. |
| **CEO** | The economic buyer: cost predictability, sovereignty strategy, vendor viability, time to value. | IOMETE's CFO/CDO copy covers it. | Same. |

Personas live in `content/personas.json`; adding a fourth (CISO, CFO, student) is additive.

## 3. Component breakdown of the current site

### 3.1 What the site is built from (from the inventory)

- **Stack:** Webflow marketing site (jQuery, GTM, HubSpot tracking with chatbot disabled,
  cookie-script, Leadsy, Tempa). Docs and blog on Docusaurus 3.10 at `/resources/`.
  University page on Astro. No search, no chat, no calculator, no video on Webflow pages.
- **Design tokens:** headings Archivo Light 300, body Inter variable, eyebrows DM Mono uppercase.
  Lime accent `#d3f52c` on dark green `#2d382d` and near-black `#202020`; page background
  `#fcfcf8`; diagram backgrounds stone `#f2eeeb`; secondary ramps lake (blue), reef (salmon),
  apricot (orange). Buttons 2.25rem high, 0.25rem radius, lime fill with dark text. Container 77rem.
- **Pages:** 44 in the sitemap. One homepage, 12 "data platform" pages on one template with the
  identical H1 "Un-SaaS your data.", 4 architecture pages, deployment, pricing, free plan, FAQ
  (38 Q&As), roadmap plus 16 items, partner program, about, contact, 3 policies. University is
  live but unlisted. `/customers`, `/case-studies`, `/security`, `/compare`, `/solutions`,
  `/book-a-demo` all 404.

### 3.2 The 30 reusable atoms and what we do with each

Legend: **Keep** = reuse as-is with IOMETE styling. **Reframe** = same component, new
caption/order per persona. **Fix** = keep but correct an accuracy problem. **Drop** = not in v1.

| # | Atom (where it lives today) | Decision | Notes |
|---|---|---|---|
| 1 | Hero: eyebrow + H1 + lead + screenshot + Lottie (home) | **Reframe** | Becomes the 15-second concept animation (section 4). Persona changes the three captions, not the picture. |
| 2 | Logo marquee, 13 logos, no caption (home) | **Fix** | Add the caption the site lacks: "Logos shown on iomete.com; relationship not stated." Show only on CEO door. Research found no named case study anywhere. |
| 3 | IOMETE-vs-SaaS sticky comparison cards ×5 (home) | **Reframe + Fix** | CEO door shows Cost + Deployment; CRO door shows Data ownership + Security; FDE door hides them. "Save 2-5x" rendered as a *claim* chip with source, never as a fact. |
| 4 | Lime hexagon network diagram (home block 4) | **Keep** | The best visual on the site: IOMETE mark linked to AWS, Azure, GCP, on-prem. Reused as the hero animation's base. |
| 5 | Platform module chips ×8 (home) | **Reframe** | FDE: all 8 with doc links. CEO: collapsed to one line "SQL, Spark, notebooks, catalog, security in one install." CRO: only Advanced Data Controls and Data Catalog. |
| 6 | FDE pitch "Your team, extended" (home) | **Reframe** | Moves to the FDE door as "who runs it: you, or IOMETE's FDEs" with the ops-skills objection stated plainly. |
| 7 | Sticky feature showcase, 10 screenshots (home) | **Reframe** | FDE door keeps all 10. CRO door keeps Data security, Domains, Data catalog. CEO door shows none. |
| 8 | Compliance badge trio SOC2 / HIPAA / GDPR (home) | **Fix** | Keep the badges, add the footnote the site omits: SOC 2 **Type I**, Dec 2022, auditor Prescient Assurance; Type II and ISO 27001 listed as readiness work in a Sep 2026 posting; HIPAA/GDPR badges have no stated scope. Link to Vanta trust center. |
| 9 | Blog feature + 3 cards, hard-coded (home) | **Reframe** | Becomes "read next for your role" fed from the blog cluster list in the research notes. |
| 10 | "BOOK A DEMO" CTA band (everywhere) | **Reframe** | Persona-specific next step: FDE → Free plan (100 vCPU, manual approval) + install doc; CRO → trust center + "questions we could not answer" list; CEO → contact form prefilled with persona. |
| 11 | Breadcrumb hero (all subpages) | **Drop** | Single-page app; no breadcrumbs. |
| 12 | 12-tab sticky strip "Data Platfrom" (sic) | **Drop** | Replaced by the persona rail. Typo noted for IOMETE. |
| 13 | Deployment quartet: on-prem / public cloud / private cloud / hybrid (deployment page) | **Reframe + Fix** | FDE door, first screen. Add vendor marks (EKS, AKS, GKE, OpenShift, Tanzu, Nutanix NKP) which the page lacks. "Air-gapped" bullet gets state **claimed**: no offline install procedure is published. |
| 14 | Kubernetes feature lists (deployment) | **Keep** | FDE only. |
| 15 | Control-plane / data-plane diagram `architecture-2.svg` (data-mesh page) | **Keep + Fix** | The only labelled diagram. Caption from v4.0.0 release notes (30 Sep 2026). Flag that the Multi-Cluster doc page still says "no unified control plane". |
| 16 | Isometric hexagon illustration family (every subpage) | **Keep** | One per door as texture. No information content, so no accuracy risk. |
| 17 | Three-card grid (every product page) | **Reframe** | Generic container; filled per persona from facts store. |
| 18 | Two-group bullet pairs (product pages) | **Reframe** | FDE door only, with doc links per bullet. |
| 19 | Numbered 1-2-3 list (free plan, partner) | **Keep** | FDE door: "how to get it running" (form → email → Helm). |
| 20 | Stat strip "87%", "$12.9M", "100x" (AI and open-source pages) | **Drop** | Unsourced numbers; fail the accuracy criterion. |
| 21 | Pricing plan cards ×3 (pricing) | **Keep + Fix** | CEO door. Footnotes made visible: $100K = 200 vCPU minimum; $250K Business Critical; infra billed separately; support tier prices unpublished → **unknown**. |
| 22 | Support tier columns Silver / Gold / Platinum (pricing) | **Reframe** | CEO door collapsed to SLA response times; note Gold Sev-1 changed from 30 min to 1 h in 2026. |
| 23 | Webflow inquiry form, 9 fields (contact, free plan, partner) | **Fix** | One form, persona and intent prefilled. Country dropdown currently has placeholder options "First choice, Second choice"; ours uses a real list. |
| 24 | Partner logo rows (partner page) | **Drop** | Reseller marks unidentifiable; logos have no alt text. |
| 25 | Roadmap rows with status (roadmap) | **Reframe** | FDE door: "shipped vs roadmap" strip. Data lineage sits here as Backlog, which contradicts the homepage "lineage" wording. |
| 26 | FAQ groups, 38 Q&As (faq) | **Reframe** | Not rendered as a wall. Chunked into the bot's retrieval corpus; the bot answers by surfacing the relevant atom. |
| 27 | Policy scaffold (3 policies) | **Reframe** | CRO door quotes licence §4.2 (telemetry permitted) and §10.4 (support access only when SOW authorises). |
| 28 | University modules ×3, 9 videos (university) | **Keep** | FDE door "learn it" strip with YouTube links. |
| 29 | Founders photo, careers/investors block (about) | **Reframe** | CEO door "who you are buying from": YC W22, founders, 11–50 people, Gartner 2025 Market Guide inclusion (an overview, not a ranking). Funding total shown as "under $3M disclosed, sources conflict". |
| 30 | Nav mega-menu + 5-column footer | **Reframe** | Nav becomes persona rail + bot. Footer keeps IOMETE links so the visitor can leave into the real site. |

### 3.3 Known defects in the current site worth naming in the pitch

Typos ("Data Goverance", "Data Platfrom", "Beaver"), duplicate RBAC bullet, dead pager links,
2025 copyright, Webflow placeholder options in the Country dropdown, JSON-LD claiming a 5/5
rating from 2 reviews that nobody can see, and a `docs.iomete.com` domain still indexed by
search engines but no longer resolving. These are small, but they are the kind of friction the
track is about, and fixing them in our version is cheap evidence of "working execution".

## 4. The 15-second landing

One screen, no scroll, three beats, under 15 seconds. The visual is the existing lime hexagon
network diagram, animated.

1. **0–5 s.** A dark green frame labelled "YOUR INFRASTRUCTURE" draws itself (on-prem rack,
   AWS, Azure, GCP icons inside it). The lime IOMETE hexagon lands *inside* the frame.
   Caption: "A data lakehouse that runs inside your own infrastructure."
2. **5–10 s.** Two grey marks labelled "SaaS data platform" sit *outside* the frame with a
   dotted line pulling data out. The line is cut. Caption: "Your data never leaves. No vendor
   can see it. No bill per query."
3. **10–15 s.** Three doors slide up: **FDE** "I'd run it", **CRO** "I'd have to sign off on it",
   **CEO** "I'd have to pay for it". Under them, one input: "Or just tell me who you are and
   what you're trying to do."

Everything above uses the real tokens: Archivo Light headings, DM Mono eyebrows, lime on racing
green. It should feel like iomete.com on a good day.

## 5. What each door shows, in order

Each door is the same page skeleton: concept strip → three proof blocks → one honest
"what we could not confirm" block → one next step. Only the atoms and captions change.

**FDE door**
1. Deployment quartet with real distro marks; air-gapped marked *claimed*.
2. Control-plane / data-plane diagram with v4.0.1 version chip, Spark 3.5.7 / Iceberg 1.9.0,
   first Spark 4.1.3 image Oct 2026.
3. Module chips → feature showcase (10 screenshots) → integrations row (dbt-iomete, Airflow,
   Power BI, Tableau, Superset, JDBC/ODBC, Spark Connect, MCP server beta).
4. "Not yet": no CLI, Terraform Azure-only, lineage on backlog, table maintenance beta,
   Kubernetes version matrix unpublished.
5. Next step: Free plan (100 vCPU, manually reviewed) + install doc + University videos.

**CRO door**
1. Trust-perimeter diagram with the sentence "IOMETE does not host your data; it runs in your
   Kubernetes and your object store" sourced to the deployment docs and licence.
2. Controls grid: SAML/OIDC/SCIM/LDAP, 7 masking types, row filters, tag policies with approval
   workflow, audit system tables, Kubernetes NetworkPolicies, Vault secrets.
3. Regulation mapping strip (DORA, GDPR Art. 32, CLOUD Act) linking IOMETE's own posts, labelled
   as IOMETE's interpretation.
4. Badges with footnote (SOC 2 Type I 2022; Type II/ISO 27001 not public) and the licence
   clauses on telemetry and support access.
5. "Questions you will still have to ask": breach-notification window, pen test, SBOM, image
   signing, audit retention, DPA. Each marked **unknown** with a link to the Vanta trust center.
6. Next step: export this list as a one-page PDF to attach to the vendor-risk file.

**CEO door**
1. One sentence: "Software you run on your own servers or cloud account that stores huge data
   cheaply and queries it in SQL, built on open formats so you can leave."
2. Cost card: fixed licence $500/vCPU/year, $100K minimum, infrastructure separate, no
   per-query fees (documented). Savings shown as "IOMETE claims 2–5x / 30–60% / 40–60%,
   figures differ by page" with links. Nothing else.
3. Market card: Databricks and Snowflake are SaaS-only; Dremio acquired by SAP in 2026;
   Gartner 2025 Market Guide inclusion.
4. Vendor card: YC W22, founders, 11–50 people, remote across 7 countries, Dell deployment
   "20+ PB" labelled as an IOMETE-supplied figure.
5. Logo wall with the honesty caption.
6. Next step: "Talk to IOMETE" form, persona prefilled, or jump to the CRO door for the risk view.

## 6. The bot: a navigator, not a chatbot

- **Input:** one sentence, or a follow-up question on any door.
- **Output:** two sentences max, a state chip (documented / claimed / unknown), one source link,
  and a **page action**: scroll to atom, highlight fact, or switch door.
- **Grounding:** retrieval over a corpus built from `github.com/iomete/iom-docs` (MDX mapped to
  `iomete.com/resources/...` URLs, `internal_docs/` excluded), the 44 marketing pages, the
  38 FAQ items, the 3 policies and pricing. Roughly 500 documents; BM25 or a small embedding
  index is enough. Authority order: release notes > deployment/user guide > legal/pricing >
  FAQ/llms.txt > homepage/blog. Third-party aggregators excluded as sources.
- **Facts store:** `content/facts.json`, one record per claim: `id, text, state, source_url,
  quoted_span, tier, fetched_at`. UI components render by fact id, so the hover citation and the
  bot share one truth.
- **Refusal list enforced in code, not prompt:** a post-check rejects any answer that states a
  savings percentage, a certification beyond SOC 2 Type I, "no telemetry", a named customer,
  a `docs.iomete.com` URL, or a headcount/funding figure, unless the sentence is wrapped as an
  attributed claim with its URL. The full list is in the research report, section
  "What the tools must refuse to assert".
- **Model:** Claude via the Messages API with tool use; tools are `navigate(atom_id)`,
  `highlight(fact_id)`, `switch_persona(id)`, `cite(fact_id)`. Persona is passed as system
  context so the same question gets a different door and tone.

## 7. Architecture

- **Frontend:** Next.js + Tailwind, tokens copied from the inventory (fonts self-hosted, colour
  ramps as CSS variables). Single route, persona in URL (`/?p=cro`) so a rep can send a link.
  Framer Motion for the hero sequence. All IOMETE images referenced by their CDN URL, not
  re-hosted.
- **Content:** `content/personas.json` (door order, captions, atom list), `content/facts.json`,
  `content/atoms/*.json` (copy per atom per persona). No CMS in v1.
- **Backend:** one API route for the bot (retrieval + Claude + post-check) and one for the PDF
  export. Corpus built by a script that clones iom-docs and fetches the 44 pages; re-run on a
  schedule so freshness dates are real.
- **Handoff path to IOMETE:** the whole thing is embeddable in Webflow as an iframe or custom
  code block, and the bot API can be pointed at HubSpot (portal 26884041 is already on the site)
  for the contact handoff. That is the "real tool, not hackathon toy" route.

## 8. How we prove it (mapped to the rubric)

| Criterion | Weight | Proof |
|---|---|---|
| Practical impact | 35% | Before/after: the current site has one H1 for 12 pages and no role routing. Ours gives three visibly different first screens from the same atoms, plus a CRO export that pre-answers part of a vendor-risk file. |
| Buyer clarity | 25% | 15-second test: five people outside the team watch the hero without sound and write one sentence on what IOMETE is. Pass if four say "runs in your own infra" or equivalent. |
| Accuracy | 25% | Ten fixed questions with known states (e.g. "is it ISO 27001 certified?" → unknown; "can it run air-gapped?" → claimed; "what does Enterprise cost?" → documented). Run 5 times each; one confident wrong answer fails. Show the refusal list executing live. |
| Working execution | 15% | End-to-end: land → door → bot question → page moves → citation hover → export PDF. |

## 9. Build plan

Judging is today, 1 Nov: Round 1 at 12:00, pitching 16:00–17:00. Phase 0 is scoped to that.

**Phase 0, demo (next ~9 hours)**
1. Scaffold Next.js + Tailwind, port tokens and fonts. (1 h)
2. Hero animation, three beats, three doors. (2 h)
3. `facts.json` seeded with ~60 facts from the research notes, each with URL and state. (1 h, parallel)
4. Door skeleton + 8 atoms: deployment quartet, comparison cards, pricing cards, badge trio,
   module chips, controls grid, vendor card, "unknown" list. (3 h)
5. Bot: BM25 over FAQ + pricing + 20 key docs pages, Claude with 4 tools, regex post-check. (2 h, parallel)
6. Ten-question accuracy run, screenshots of three doors, 15-second test with five people. (1 h)

**Phase 1, real tool (week of 3 Nov)**
Full iom-docs ingestion with scheduled refresh; embedding index; PDF export; CISO and CFO doors;
analytics on which atoms each persona dwells on; fix list for IOMETE's own site delivered as a
PR-style document.

**Phase 2, handoff**
Webflow embed, HubSpot handoff, a facts-store owner at IOMETE, and a review loop where an
IOMETE engineer grades 30 bot answers against the cited URL.

## 10. Open decisions

1. CRO = Chief Risk Officer (assumed) or Chief Revenue Officer. Changes the door's content, not the build.
2. Whether to show the logo wall at all on the CEO door, given no case study backs it.
3. Whether the bot speaks on the landing screen or only after a door is chosen. Plan assumes both.
