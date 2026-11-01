# IOMETE.com — Component-Level Site Inventory

**Scope:** the public marketing website at https://iomete.com as served on **2026-11-01** (HTML fetched with curl, user-agent Mozilla/5.0; HTTP 200 on all 44 sitemap URLs). The Docusaurus docs/blog under `/resources/` is noted but not inventoried beyond its shell.
**Method:** full HTML of every sitemap URL plus 25 probe URLs saved to a scratch directory, parsed with BeautifulSoup (`python3 -I`), sections enumerated in DOM order. Stylesheet `iomete-v01.webflow.shared.fd2d1497d.min.css` parsed for tokens. Diagram SVGs and partner-logo SVGs downloaded and rendered to PNG to describe/identify them. Nothing below is taken from the company research notes; anything not obtainable is marked **NOT RETRIEVED**.
**Persona key used in tables:** ENG = engineer / data-platform practitioner; SEC = security, risk, compliance; FIN = finance / procurement; EXEC = executive / business sponsor; UNCLEAR = no identifiable buyer.

---

## Section A — URL list (sitemap.xml, 44 URLs) with page title and purpose

Source: https://iomete.com/sitemap.xml (44 `<loc>` entries; homepage lastmod 2026-09-30, product pages 2026-02-25, partner-program 2026-09-13). robots.txt also lists a second sitemap `https://iomete.com/resources/sitemap.xml` (docs; returned 1 `<loc>` when fetched — **docs sitemap contents NOT RETRIEVED**).

| # | URL | `<title>` | One-line purpose |
|---|---|---|---|
| 1 | https://iomete.com | The Sovereign Data Lakehouse Platform \| IOMETE | Homepage / "Why IOMETE" (nav item "Why IOMETE" links here) |
| 2 | https://iomete.com/product/data-platform/design-principles | Design Principles \| IOMETE | Eight numbered design principles; entry page for the "Data platform" tab set |
| 3 | https://iomete.com/product/data-platform/platform-overview | Platform Overview \| IOMETE | Platform modules list (lakehouses, SQL editor, Spark jobs, Spark Connect, catalog, access controls, ML notebooks) |
| 4 | https://iomete.com/product/data-platform/data-warehousing | Data Warehousing \| IOMETE | Warehousing feature/benefit lists |
| 5 | https://iomete.com/product/data-platform/data-governance | Data Goverance \| IOMETE *(sic, typo in live title)* | Governance feature lists (RBAC, masking, audit) |
| 6 | https://iomete.com/product/data-platform/data-engineering | Data Engineering \| IOMETE | Pipeline/processing feature lists |
| 7 | https://iomete.com/product/data-platform/data-management | Data Management \| IOMETE | Catalog, lifecycle, monitoring, security lists |
| 8 | https://iomete.com/product/data-platform/data-ingestion | Data Ingestion \| IOMETE | Connectors / ETL-ELT / CDC lists |
| 9 | https://iomete.com/product/data-platform/business-intelligence | Business Intelligence \| IOMETE | BI tool compatibility, JDBC/ODBC, 3-step connect |
| 10 | https://iomete.com/product/data-platform/real-time-analytics | Real-Time Analytics \| IOMETE | Streaming feature lists, use cases |
| 11 | https://iomete.com/product/data-platform/artificial-intelligence | AI Lakehouse \| IOMETE | AI data-quality framing with two statistics |
| 12 | https://iomete.com/product/data-platform/machine-learning | Machine Learning \| IOMETE | ML dev/training/ops lists |
| 13 | https://iomete.com/product/data-platform/data-science | Data Science \| IOMETE | Data-science workflow lists |
| 14 | https://iomete.com/product/deployment | Deployment Options \| IOMETE | On-prem / public cloud / private cloud / hybrid cards + Kubernetes feature lists |
| 15 | https://iomete.com/product/architecture/open-source | Open Source \| IOMETE | Apache Iceberg + Apache Spark foundation, stat strip |
| 16 | https://iomete.com/product/architecture/data-mesh | Data Mesh \| IOMETE | Control plane / data plane / domains |
| 17 | https://iomete.com/product/architecture/data-security | Data Security \| IOMETE | Trust-perimeter argument, access/auth/audit lists |
| 18 | https://iomete.com/product/architecture/integrations-ecosystem | Integrations & Data Ecosystem \| IOMETE | Named integrations (Tableau, Power BI, Superset, Airflow, dbt, NiFi, Jupyter) |
| 19 | https://iomete.com/partner-program | Partner Program \| IOMETE | Technology / Implementation / Reseller partner tiers + partnership form |
| 20 | https://iomete.com/contact-us | Get in Touch \| IOMETE | The only demo-request path; inquiry form |
| 21 | https://iomete.com/about-us | Our Vision & Mission \| IOMETE | Thesis vs cloud-SaaS, founders, team, careers, investors |
| 22 | https://iomete.com/policies/privacy-policy | Privacy Policy \| IOMETE | Legal (LAST UPDATED: NOV 11, 2024) |
| 23 | https://iomete.com/policies/cookie-policy | Cookie Policy \| IOMETE | Legal (LAST UPDATED: NOV 11, 2024) |
| 24 | https://iomete.com/policies/software-license-agreement | Software License Agreement \| IOMETE | EULA for self-hosted software (LAST UPDATED: MAR 16, 2026); breadcrumb reads "Terms of service" |
| 25 | https://iomete.com/pricing | Pricing Plans \| IOMETE | Three plan cards, three support tiers, professional services |
| 26 | https://iomete.com/pricing/free-plan | Free Plan \| IOMETE | Free-plan sign-up form (manual provisioning) |
| 27 | https://iomete.com/faq | FAQ \| IOMETE | 38 Q&As in five groups, with FAQPage JSON-LD |
| 28 | https://iomete.com/roadmap | Product Roadmap \| IOMETE | Table of 19 roadmap items with status |
| 29–44 | https://iomete.com/roadmap/{slug} (16 slugs: ai-based-iceberg-table-management, apache-comet, arrow-flight-support, automatic-table-maintenance-and-compaction, built-in-orchestration, data-lineage, event-streaming-service, iomete-unified-multi-catalog, jupyter-containers, live-integrations-with-governance-ecosystem, mcp-server-for-ai-agents, multi-kubernetes-cluster-deployment, native-bi-dashboards, resource-based-authorization-system, spark-4-0-upgrade, sql-editor-copilot-ai-assistance) | mostly bare "IOMETE" (CMS items have no per-item title) | Roadmap item detail pages (Webflow CMS collection `68e69c2f9c65339ea17e857a`) |

**Live URLs found that are NOT in sitemap.xml**

| URL | Status | Note |
|---|---|---|
| https://iomete.com/university | 200 | Astro-built page (not Webflow); linked from nav Resources dropdown and nowhere in the sitemap |
| https://iomete.com/roadmap/model-gateway | 200 | Listed in roadmap table; not in sitemap |
| https://iomete.com/roadmap/workload-optimization | 200 | Listed in roadmap table; not in sitemap |
| https://iomete.com/roadmap/troubleshooting-agent | 200 | Listed in roadmap table; not in sitemap |
| https://iomete.com/about | 200 → redirects to /about-us | |
| https://iomete.com/resources and /resources/blog | 200 | Docusaurus v3.10.2 docs + blog (out of scope) |
| https://iomete.com/docs | 200 → /resources | |

**Probed URLs returning the Webflow 404 page** (eyebrow "404", H2 "Page not found.", CTAs "Back to home" → `/`, "Get in touch" → `/contact-us`): /book-a-demo, /demo, /customers, /case-studies, /security, /trust, /careers, /why-iomete, /compare, /solutions, /industries, /partners, /contact, /news, /press, /events, /integrations, /community, /login, /signup.

**llms.txt cross-check** (https://iomete.com/llms.txt, 200): lists the same product/architecture/deployment/pricing/about/FAQ URLs as the sitemap, plus `https://iomete.com/about` (alternate), docs URLs, and 10 blog posts. It references `https://iomete.com/resources/community-deployment/overview` as the Community Edition page (not in sitemap; **not fetched**). It does not list /university, /roadmap, /partner-program, /contact-us, or /pricing/free-plan. It also states "Founder / CEO contact: support@iomete.com", "Editions: Community Edition … Enterprise Edition" — note the naming differs from the pricing page (Free / Enterprise / Business Critical).

---

## Section B — Per-page ordered component tables

### B.0 Shared shell (present on every Webflow page)

| # | Component | Text | Notes | Source |
|---|---|---|---|---|
| S1 | Skip link | "Skip to Main Content" → `#page-top` | first element in `div.nav-fixed` | https://iomete.com |
| S2 | Nav bar (fixed, mega-menu) | see Section C | inline SVG wordmark (140×24), two hover dropdowns, "Get in touch" button | https://iomete.com |
| S3 | Cookie banner | loaded by `cdn.cookie-script.com/s/9ebcabb667ce2f62faaaad5b6fae6016.js` | banner markup is injected by JS — **text NOT RETRIEVED** | https://iomete.com |
| S4 | Footer | see Section C | dark theme `u-theme-primary__base950`; "© 2025 IOMETE Inc." hard-coded, but a script replaces `.year` with the current year | https://iomete.com |
| S5 | Chat widget | **none**. HubSpot tracking loads (`js.hs-scripts.com/26884041.js`) but Webflow's HubSpot app injects `disable-hubspot-chatbot.js` | no chat on any page | https://iomete.com |
| S6 | Trackers | GTM `GTM-W4ZH33W` (script + noscript iframe), HubSpot 26884041, cookie-script, `r2.leadsy.ai/tag.js` (visitor identification), `app.tempa.agency/static/tempa-full-site-attribution.js` | | https://iomete.com |

### B.1 Homepage — https://iomete.com

Title: "The Sovereign Data Lakehouse Platform | IOMETE". Meta description: "Unlock the power of a self-hosted data lakehouse with IOMETE. Scalable, secure, and cost-effective – modern data management built for performance." OG image: `…/696df3c26df3fbd4f6c8391d_iomete-meta-image.png`. JSON-LD: `Organization` (foundingDate "2020", logo `…/68dd02f8ff7faec0750ce3ba_IOMETE%20Logo.svg`, contactPoint type "Sales") and `WebSite` (description "The intelligent data lakehouse platform for on premise and hybrid environments").

| # | Component type | Headline / eyebrow / sub | Key copy & claims (exact) | CTAs → targets | Media | Persona |
|---|---|---|---|---|---|---|
| 1 | Hero (dark green theme `racing900`) | Eyebrow: "the data platform for the ai era" · H1: "The sovereign data platform. Your data, your future." | "A sovereign data lakehouse, self-hosted in your trusted environment. Built to handle the scale, cost, and privacy challenges of the AI era. Run it on-premise, in your cloud, or hybrid — always under your control." | "Get in touch" → /contact-us · "About us" → /about-us | Product screenshot `69769268918b075e88fec399_hero-image copy.webp` (3600px, no alt; desktop + mobile copies); floating screenshot `69769d4d3f6f252554c7744d_spark-monitoring.webp`; Lottie `67ce4df7f71b4b2d91bd0b17_connections-2_6-5.json` (loop, autoplay; mobile variant `…connections-2-mobile_11-2.json`) | EXEC (sovereignty, cost, privacy) |
| 2 | Logo wall (marquee, duplicated list for infinite scroll) | none | 13 logos ×2: OverDrive, CBAR (Central Bank of Azerbaijan logo file `cbar-logo-en`), Y Combinator, Mercury Bank, PASHA Bank, Dell Technologies, UZcard, Central Bank of Uzbekistan, State Customs Committee (png), Ministry of Digital Technologies of the Republic of Uzbekistan, Pasha Technology, Ministry of Economics Azerbaijan, Kapital Bank. No heading, no "trusted by" label. Only 6 of 13 have alt text. | none | SVG/PNG logo files under `cdn.prod.website-files.com/6799ec9d00832d1abf08b380/6873ccb…` and `6a67…` | EXEC / SEC (social proof; heavy on Azerbaijan/Uzbekistan public sector & banks) |
| 3 | Sticky stacked comparison cards ("Why IOMETE?") — 5 cards, each IOMETE vs Competitors, cards stack with JS-computed `--sticky-top` | Eyebrow: "WHY IOMETE?" · H2: "Yesterday's platforms were built for the cloud era. IOMETE was built for the AI era." | Intro: "Data volumes are exploding and privacy and data ownership is more critical than ever. Why limit yourself to public cloud alone? Why stomach forever growing bills? Why endure vendor lock-in? Why risk data breaches? Yesterday's data platforms were not created to power tomorrow's AI. Ours was built for it." Cards (eyebrow / IOMETE tag "SELF-HOSTED" / Competitors tag "SaaS"): **DEPLOYMENT** "Hybrid first" vs "Public cloud only" — "Cloud SaaS solutions such as Databricks and Snowflake run on US public clouds only." · **DATA OWNERSHIP** "Customer-controlled" vs "Vendor-controlled" · **DATA SECURITY AND PRIVACY** "Customer independence" vs "Vendor-dependent" · **COST** "Cost efficient" — "Save 2-5x over SaaS/cloud." vs "Expensive" — "Forever pay the SaaS cloud premium; this gets expensive quickly at petabyte-size." · **SERVICE MODEL** "Customizable" vs "One-size-fits-all" | none | none (text cards) | EXEC + FIN (cost), SEC (ownership) |
| 4 | Diagram section (dark `racing900`) with 4 mono labels | Eyebrow: "Only cloud is too restrictive" · H2: "Built for the hybrid era." | "Store your data anywhere. Organize it into clear data domains and apply mesh principles for true self-serve. Advanced access controls let you fine-tune permissions down to users, teams, tables, columns, or rows — so every team gets precisely the data they need." Labels: ON-PREMISES / AWS CLOUD / AZURE CLOUD / GOOGLE CLOUD | none | SVG `67ac85cfcbd091fc38f78024_home-content.svg` — central lime hexagon mark connected by lime lines to AWS, Azure, Google Cloud and server-rack icons on a hex-grid background (no text in SVG) | ENG / SEC |
| 5a | Platform module list + CTA (two-column) | Eyebrow: "all-in-one platform" · H2: "With IOMETE, your team can easily manage massive data sets and turn them into business results." · H3: "IOMETE Sovereign Data Platform" | 8 module chips: Data Lakehouse(s), Data Catalog, SQL Editor, Advanced Data Controls, Spark Jobs, ML Notebooks, Spark Connect, Orchestration Engine | "Explore our platform" → /product/data-platform/design-principles | Lottie `67c0bc91e4a29d8d472d9f02_IOMETE-businesspurpose-animation_3-2.json` | ENG |
| 5b | FDE pitch (same section) | Eyebrow: "UNIQUE ENGINEERING APPROACH" · H2: "Our forward-deployed engineers: Your team, extended." | "Sometimes software is only a part of the solution. We can provide FDEs that become an extension of your team." "They bridge the gap between technology and execution, making sure you see results faster." | "Learn about our team" → /about-us | Lottie `67c0bc91034865b6bf9f75e3_IOMETE-engineeringteam-animation_3-2.json` | EXEC |
| 6 | Sticky-scroll feature showcase (left link list drives right screenshot card; collapses to accordion ≤991px) — 10 items | Eyebrow: "PLATFORM FEATURES" · H2: "See what IOMETE can do." | Items (h5 + screenshot + copy): **Compute** (multiple lakehouses for dev/test/prod or business units; "Spark Connect lets you seamlessly run Spark workloads… Python, R, or SQL"); **Jupyter notebooks**; **SQL editor** ("intelligent autocompletion, query history, and visual explain plans"); **Query history**; **Spark applications** (streams from "Apache Kafka, Amazon Kinesis, and Apache Pulsar"; reusable workflows); **Data catalog** ("metadata, lineage, and quality information"); **Database explorer**; **Data security** (table/row/column × user/group/team/department; masking with "realistic but fictional values"; tag-based policies); **Domains** ("subject area (e.g. customer, product, finance)… regulations like GDPR"); **Connect BI tool** ("using the SQL endpoint") | none | Screenshots (alt = item name) from a second Webflow asset bucket `679e8e39ccda840d403b4bb5`: `compute.webp`, `jupyter-notebooks.webp`, `sql-editor.gif`, `query-history.webp`, `spark-applications.webp`, `data-catalog.gif`, `database-explorer.webp`, `data-security.webp`, `domains.webp`, `connect-bi-tool.webp` | ENG |
| 7 | Trust / compliance badges | Eyebrow: "SECURITY AND TRUST" · H2: "The cornerstone of our security strategy is our unique self-hosted architecture." | Badges: "SOC2 Certified", "HIPAA Compliant", "GDPR Compliant". Copy: "IOMETE operates entirely within the customer's trust perimeter, whether on-premises or in the customer's cloud account…" "…it's impossible for us to lose your data simply because it is stored in your trusted environment." | "Visit our trust center" → https://app.vanta.com/iomete.com/trust/mh7heslsoonlhblghsro7g (external, Vanta) | SVG badges `679f6073…_SOC2 Certified.svg` (alt "APICPA SOC certificate" *(sic)*), `…_HIPAA Compliant.svg`, `…_GDPR Compliant.svg` | SEC |
| 8 | Blog feature + 3 cards | Eyebrow: "IOMETE BLOG" · H2: "Read our latest insights." | Featured: "Dec 9, 2025 · COMPANY · Interpreting the Gartner® Market Guide for Data Lakehouse Platforms — IOMETE made the 2025 Gartner® Market Guide for Data Lakehouse Platforms…". Cards: "Building an enterprise data platform" (Jan 20, 2025, EDUCATIONAL), "Data as a product for large enterprises" (Feb 9, 2025, TECHNICAL), "Evolution of data architecture" (Jan 27, 2025, EDUCATIONAL) — hard-coded, not a live feed | "View all articles" → https://iomete.com/resources/blog · "Continue reading" → …/blog/iomete-gartner-market-guide-2025 | `6939a24d…_Gartner image for homepage.png`, `blog cover_2/3/4.webp` | EXEC |
| 9 | CTA band | Eyebrow: "BOOK A DEMO" · H2: "Starting with IOMETE is simple. Book a demo with us today." | "The IOMETE data platform helps you achieve more. Book a personalized demo and experience the impact firsthand." | "Get in touch" → /contact-us | none | EXEC |
| 10 | Footer | — | see Section C | | | |

### B.2 Shared "Data platform" page template (pages 2–13)

All twelve `/product/data-platform/*` pages share one layout:

| # | Component | Text | Source |
|---|---|---|---|
| 1 | Breadcrumb + hero | "Home" → `/` · "DATA PLATFORM" · Eyebrow "THE SMART ALTERNATIVE" · **H1 "Un-SaaS your data."** · "SaaS isn't the right model for enterprise data infrastructure. It's rigid, expensive and may result in vendor lock-in and data leaks. So we started over and built a modern self-hosted data platform based on recent, real-world user feedback." (identical on all 12 pages; the H1 does not change per page) | e.g. https://iomete.com/product/data-platform/data-warehousing |
| 2 | Sticky vertical tab strip (12 links, rendered twice for desktop/mobile), label "Data Platfrom" *(sic)* | Design principles · Platform overview · Data warehousing · Data governance · Data engineering · Data management · Data ingestion · Business intelligence · Real-time analytics · Artificial intelligence · Machine learning · Data science (each → `/product/data-platform/{slug}#top`); decorative tab SVGs `67a1fa7d…_Tab top round.svg`, `67a1f8eb…_Tab container.svg` | all 12 |
| 3 | Page body (eyebrow + H2 + H3 lead + "card_list" grids + one illustration) | per page below | |
| 4 | Prev/next pager | two `btn` links to adjacent tabs (first/last page have one) | all 12 |
| 5 | CTA block ("BOOK A DEMO" eyebrow, H2 varies, "Get in touch" → /contact-us) | per page below | all 12 |

Per-page bodies (component order inside block 3):

**design-principles** — https://iomete.com/product/data-platform/design-principles
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Section intro | Eyebrow "RETHINKING DATA PLATFORMS" · H2 "Design principles" | "The usual suspects started out 10-15 years ago, carry significant technical debt and have transitioned from nimble engineering teams into bloated sales armies." | — | SVG `67a392e8…_OUR DESIGN PRINCIPLES.svg` (label "OUR DESIGN PRINCIPLES") | EXEC |
| 3b | Numbered principle list (8) with 3 interleaved labelled SVGs | 1 Complete data sovereignty · 2 Enterprise-grade security by design · 3 True deployment flexibility · 4 Cost optimization at scale · 5 Unified data infrastructure · 6 Performance without compromise · 7 Enterprise integration by default · 8 Partnership in innovation | Claims: "You pay them boatloads of money and then they lock you in..."; "In 2023, over 300 million individuals were affected by publicly reported data breaches, with the average data breach costing companies $4.45 million."; "military-grade encryption"; "often delivering 2-3x cost efficiency compared to traditional solutions"; "consistent performance from gigabytes to petabytes" | "Get in touch" → /contact-us · "Platform overview" → …/platform-overview#top | SVGs `…_TRUST PERIMETER.svg` (label "TRUST PERIMETER"), `…_UNIFIED IOMETE PLATFORM .svg` (label "UNIFIED IOMETE PLATFORM – CONSISTENT EXPERIENCE ACROSS ENVIRONMENTS"), `67ac868e…_platform-1d-2.svg` (label "UNIFIED DATA INFRASTRUCTURE") | EXEC / SEC / FIN |

**platform-overview** — https://iomete.com/product/data-platform/platform-overview
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "INTRODUCTION TO IOMETE" · H2 "Platform overview" | "IOMETE combines the flexibility of data lakes with the performance of data warehouses…" | — | — | EXEC |
| 3b | 3-card benefit grid "User benefits" | COMPLETE CONTROL · COST OPTIMIZATION · ENTERPRISE-GRADE SECURITY | "Achieve 2-3x cost savings compared to SaaS alternatives."; "military-grade encryption" | — | — | EXEC / FIN / SEC |
| 3c | Platform modules diagram + 7 module paragraphs | H3 "Platform modules": Data lakehouse(s) · SQL editor · Spark jobs · Spark connect · Data catalog · Data access controls · ML notebooks | "Built on Apache Iceberg, it provides ACID transaction support and schema evolution"; "Spin up unlimited data lakehouses"; ML notebooks "Python, R, and Scala" | — | SVG `67ac8692…_platform-2a-2.svg` — isometric stack of 7 labelled hexagonal layers (DATA LAKEHOUSES, SQL EDITOR, SPARK JOBS, SPARK CONNECT, DATA CATALOG, DATA ACCESS CONTROLS, ML NOTEBOOKS) with ON-PREMISES / HYBRID / CLOUD callouts; second SVG `67ac869d…_platform-2b-2.svg` | ENG |
| 5 | CTA | "Experience the power of the modern data lakehouse platform." · "Don't overpay for yesterday's technology. Explore the next generation data platform." | | "Get in touch" → /contact-us; pager "Design principles", "Data warehousing" | | FIN |

**data-warehousing** — https://iomete.com/product/data-platform/data-warehousing
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "MODERN DATA WAREHOUSING CAPABILITIES" · H2 "Data warehousing" | — | — | — | ENG |
| 3b | 3-card "Key features" | HIGH PERFORMANCE QUERY ENGINE · ACID TRANSACTIONS ("powered by Apache Iceberg") · SCHEMA EVOLUTION | | | | ENG |
| 3c | Diagram + 3 bullet groups "Warehousing capabilities" | PERFORMANCE OPTIMIZATION (4 bullets) · ENTERPRISE INTEGRATION ("Standard JDBC/ODBC interfaces") · DATA MANAGEMENT ("Built-in backup and recovery") | | | SVG `67ac86a1…_platform-3-2.svg` | ENG |
| 3d | 2-group "Business benefits" | COST EFFICIENCY (Flexible storage tiering, Cloud cost optimization, Infrastructure reuse) · ENTERPRISE CONTROL (Data sovereignty, Compliance management) | | | | FIN / SEC |
| 5 | CTA | "Extract business value from your data." | | Get in touch; pager Platform overview / Data governance | | EXEC |

**data-governance** — https://iomete.com/product/data-platform/data-governance (title typo "Data Goverance"; breadcrumb "Home" links to `#` not `/`)
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "CONTROL AND COMPLIANCE FOR YOUR DATA" · H2 "Data governance" | | | | SEC |
| 3b | 3-card "Key features" (5 bullets each) | ACCESS CONTROL (RBAC, column-level, row-level, dynamic masking, tag-based) · DATA PROTECTION ("Military-grade encryption", at rest/in transit, key management) · AUDIT & COMPLIANCE | | | | SEC |
| 3c | Diagram + 6 bullet groups under 3 sub-heads | Enterprise security framework (ACCESS MANAGEMENT, DATA SECURITY) · Compliance framework (AUDIT CAPABILITIES, COMPLIANCE MANAGEMENT) · Data management controls (LIFECYCLE MANAGEMENT, METADATA MANAGEMENT incl. "Data lineage tracking", "Business glossary") | | | SVG `67ac86a8…_platform-4-2.svg` | SEC |
| 3d | 3-card "Business benefits" | COMPLETE CONTROL · RISK REDUCTION · OPERATIONAL EFFICIENCY | | | | SEC / EXEC |
| 5 | CTA | "Take control of your data governance." | | Get in touch; pager Data warehousing / Data engineering | | SEC |

**data-engineering** — https://iomete.com/product/data-platform/data-engineering
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "STREAMLINED SOLUTIONS FOR DATA PIPELINES" · H2 "Data engineering" | "Your complete toolkit for modern data engineering." | | | ENG |
| 3b | 3-card "Essential tools for data teams" | DATA PIPELINE TOOLS ("Visual ETL builder", "Pipeline versioning") · PROCESSING ENGINE ("Apache Spark integration") · QUALITY CONTROLS | | | | ENG |
| 3c | Diagram + 8 bullet groups under 4 sub-heads | Pipeline development · Data processing · Data integration · Pipeline monitoring ("SLA monitoring") | | | SVG `67ac86ac…_platform-5-2.svg` | ENG |
| 3d | 3-card "Team benefits" | INCREASED PRODUCTIVITY · REDUCED COMPLEXITY ("Eliminate tool sprawl") · COMPLETE CONTROL | | | | ENG |
| 5 | CTA | "Ready to empower your data team?" | | Get in touch; pager Data governance / Data management | | ENG |

**data-management** — https://iomete.com/product/data-platform/data-management
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "END-TO-END CONTROL OF YOUR DATA" · H2 "Data management" | | | | ENG |
| 3b | 3-card "Core features" | DATA ORGANIZATION · PROCESSING ENGINE (label reused; bullets are validation/profiling/anomaly) · QUALITY CONTROLS (bullets are version control/retention/archival/purge) | labels don't match bullets | | | ENG |
| 3c | Diagram + 8 groups under 4 sub-heads | Enterprise data catalog · Data governance · Data monitoring ("Cost tracking") · Data security | | | SVG `67ac86b0…_platform-6-2.svg` | ENG / SEC |
| 3d | 3-card "Business benefits" | OPERATIONAL EFFICIENCY · RISK REDUCTION · DATA VALUE | | | | EXEC |
| 5 | CTA | "Take control of your data." | | Get in touch; pager Data engineering / Data ingestion | | |

**data-ingestion** — https://iomete.com/product/data-platform/data-ingestion
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "SEAMLESS INTEGRATION FOR ALL DATA SOURCES" · H2 "Data ingestion" | | | | ENG |
| 3b | 3-card "Key capabilities" | SOURCE CONNECTORS · DATA PROCESSING (ETL/ELT) · INTEGRATION TYPES ("Change data capture") | | | | ENG |
| 3c | Diagram + 8 groups under 4 sub-heads | Data source connectivity ("All major databases") · Data processing · Integration management ("Visual pipeline builder") · Security & governance | | | SVG `67ac86b4…_platform-7-2.svg` | ENG |
| 3d | 3-card "Enterprise benefits" | SIMPLIFIED INGESTION ("pre-built connectors") · COMPLETE CONTROL · ENTERPRISE SECURITY | | | | ENG |
| 5 | CTA | "Start integrating your data." | | Get in touch; pager Data management / Business intelligence | | |

**business-intelligence** — https://iomete.com/product/data-platform/business-intelligence
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro + paragraph | Eyebrow "UNIVERSAL BI CONNECTIVITY" · H2 "Business intelligence" · H3 "Seamless BI integration" | "instant connectivity to all major BI tools through standard JDBC/ODBC interfaces… no complex setup or configuration required." | | | ENG (analytics) |
| 3b | 3-card "Supported BI Tools" | ENTERPRISE BI: Tableau, Power BI, Looker, Qlik, MicroStrategy · MODERN ANALYTICS: Preset, Metabase, Apache Superset, Redash, Mode Analytics · NOTEBOOKS & IDEs: Jupyter, DataSpell, "Beaver" *(sic, likely DBeaver)*, "SL IDEs" *(sic)*, Custom tools | text only, no vendor logos | | | ENG |
| 3c | Diagram + 8 groups under 4 sub-heads "Connection features" | Universal connectivity · Query performance · Security controls (SSO, LDAP, OAuth 2.0, token) · Connection management | | | SVG `67ac86b8…_platform-8-2.svg` | ENG |
| 3d | 3-step numbered list "Easy connection steps" | 1 GET CONNECTION DETAILS · 2 CONFIGURE BI TOOL · 3 START ANALYZING | | | | ENG |
| 5 | CTA | "Connect your BI tools today." | | Get in touch; pager Data ingestion / Real-time analytics | | |

**real-time-analytics** — https://iomete.com/product/data-platform/real-time-analytics
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "INSTANT INSIGHTS FROM LIVE DATA STREAMS" · H2 "Real-time analytics" | | | | ENG |
| 3b | 3-card "Core capabilities" | STREAM PROCESSING ("Exactly-once processing") · DATA INTEGRATION ("Native Kafka integration") · OPERATIONS | | | | ENG |
| 3c | Diagram + 8 groups under 4 sub-heads | Stream processing features · Enterprise reliability ("Disaster recovery") · Security framework · Monitoring & analytics (note British spellings "optimisation/utilisation/Authorisation" on this page only) | | | SVG `67ac86bc…_platform-9-2.svg` | ENG |
| 3d | 3-card "Common use cases" | REALTIME STREAMING · IoT PROCESSING · EVENT PROCESSING | | | | ENG |
| 5 | CTA | "Start processing real-time data." | | Get in touch; pager Business intelligence / Artificial intelligence | | |

**artificial-intelligence** — https://iomete.com/product/data-platform/artificial-intelligence (title "AI Lakehouse | IOMETE")
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro + paragraph | Eyebrow "POWERING AI WITH TRUSTED DATA" · H2 "Artificial intelligence" · H3 "The impact of data quality on AI" | "Research shows that 87% of AI projects fail to reach production due to data quality issues. Poor data quality costs organizations an average of $12.9 million annually." (no source cited) | | | EXEC |
| 3b | **Stat strip** (2 big numbers, h1 size) | "87%" — "OF AI PROJECTS FAIL TO REACH PRODUCTION DUE TO DATA QUALITY ISSUES" · "$12.9 M" — "ANNUAL COSTS INCURRED BY ORGANIZATIONS DUE TO POOR DATA QUALITY" | | | | EXEC |
| 3c | 3-card "Foundations for AI success" | DATA QUALITY · DATA GOVERNANCE · ACCESS CONTROL | | | | SEC / ENG |
| 3d | Diagram + 8 groups under 4 sub-heads "AI platform features" | Data quality management · Data governance framework · Security framework · Comprehensive monitoring ("Drift detection") | | | SVG `67ac86c2…_platform-10-2.svg` | ENG |
| 3e | 4-card pipeline "End-to-end quality assurance" | DATA INGESTION · PROCESSING · STORAGE · CONSUMPTION | | | | ENG |
| 5 | CTA | "Ensure your AI success." | | Get in touch; pager Real-time analytics / Machine learning | | EXEC |

**machine-learning** — https://iomete.com/product/data-platform/machine-learning
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "SCALABLE SOLUTIONS FOR MACHINE LEARNING" · H2 "Machine learning" | | | | ENG (DS/ML) |
| 3b | 3-card "Key capabilities" | ML DEVELOPMENT · DISTRIBUTED TRAINING ("GPU support", "Parameter servers") · MODEL OPERATIONS ("A/B testing support") | | | | ENG |
| 3c | Diagram + 8 groups under 4 sub-heads | ML (FRAMEWORKS: TensorFlow, PyTorch, Scikit-learn, Custom) · ML infrastructure · ML monitoring · Security & governance | | | SVG `67ac86ca…_platform-11-2.svg` | ENG |
| 3d | 3-card "Enterprise benefits" | COMPLETE CONTROL · SCALABLE PERFORMANCE · ENTERPRISE SECURITY | | | | EXEC |
| 5 | CTA | "Ready to scale your ML operations?" | | Get in touch; pager Artificial intelligence / Data science | | |

**data-science** — https://iomete.com/product/data-platform/data-science
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "UNIFIED PLATFORM FOR DATA SCIENCE" · H2 "Data science" | | | | ENG (DS) |
| 3b | 3-card "Essential tools for data scientists" | DEVELOPMENT ENVIRONMENT ("Interactive Python/R/Scala") · ML TOOLS ("Experiment tracking") · DATA ACCESS ("Feature store") | | | | ENG |
| 3c | Diagram + 8 groups under 4 sub-heads "End-to-end ML workflow" | Data preparation · Model development · Model training ("GPU support") · Model deployment ("Real-time scoring") | | | SVG `67ac86ce…_platform-12-2.svg` | ENG |
| 3d | 3-card "Team benefits" | ACCELERATED DEVELOPMENT · ENTERPRISE SCALE · FULL CONTROL | | | | ENG |
| 5 | CTA | "Ready to transform your data science workflow?" | | Get in touch; pager Machine learning (only) | | |

### B.3 Deployment — https://iomete.com/product/deployment

Title "Deployment Options | IOMETE". No tab strip. Nav deep-links `?type=on-premises|public-cloud|private-cloud|hybrid` are handled by an inline script that smooth-scrolls to the card with matching `data-type` after 600 ms (no tabs, no state change).

| # | Component type | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 1 | Breadcrumb + hero | "Home" · "DEPLOYMENT" · Eyebrow "BUILT ON KUBERNETES" · H1 "Flexible deployment options." | "IOMETE runs on Kubernetes across all environments – from on-premises data centers to any cloud provider." | — | — | ENG / EXEC |
| 2 | Full-width illustration | — | — | — | SVG `67ac88aa…_deployment-1.svg` — four isometric stacks of hexagonal slabs (green, blue, salmon, mixed w/ yellow) on dotted frame; no labels | — |
| 3 | 4-card deployment grid (`deployment-4col_grid`) | Tags: ON PREMISES · PUBLIC CLOUD · PRIVATE CLOUD · HYBRID DEPLOYMENT | On-prem: "Deploy on your own Kubernetes clusters in your data centers." — any K8s distribution, existing infra, hardware/network control, local security systems, "Support for air-gapped environments". Public cloud: "Amazon EKS", "Azure AKS", "Google GKE", auto-scaling, cloud-native integration. Private cloud: "OpenShift support", "VMware Tanzu", custom distributions. Hybrid: "Multi-cluster management", "Cross-cluster data access", "Unified governance", "Workload distribution", "Geographic optimization" | none | none (no vendor logos) | ENG |
| 4 | Feature lists (4 sub-heads × 2 groups) | Eyebrow "ENTERPRISE-GRADE KUBERNETES" · H2 "Kubernetes platform features" | Container orchestration · Automatic Scaling · High Availability ("Zero-downtime updates") · Kubernetes Security (Pod security policies, Network policies, RBAC…) | — | — | ENG |
| 5 | 3-card benefit | Eyebrow "WHY KUBERNETES?" · H2 "Kubernetes benefits" | CONSISTENT OPERATIONS · ENTERPRISE SCALE · FUTURE PROOF | — | — | EXEC |
| 6 | CTA band | "BOOK A DEMO" · "Deploy IOMETE anywhere." | | "Get in touch" → /contact-us | | |

### B.4 Architecture pages (shared template)

Hero on all four: breadcrumb "Home" · "Architecture" · Eyebrow "Modern data architecture" · **H1 "Architected for the age of AI."** · "We built IOMETE as a self-hosted, open, and user-friendly platform… In the AI era, self-hosting triumphs over rigid, costly SaaS solutions…". Same sticky tab-strip component as data-platform pages (label still "Data Platfrom"), here with **4 tabs** (rendered twice for desktop/mobile): "Open source, Apache Iceberg, Apache Spark" → /product/architecture/open-source#top · "Data mesh" · "Data security" · "Integrations & ecosystem". Each ends with a "BOOK A DEMO" CTA + pager.

**open-source** — https://iomete.com/product/architecture/open-source
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "BUILT ON OPEN SOURCE EXCELLENCE" · H2 "Open source, Apache Iceberg, Apache Spark" | | | | ENG |
| 3b | Bullet list "Benefits of open core" (5) | "Full visibility into core technology"… "Freedom from vendor lock-in" | | | | EXEC / ENG |
| 3c | Diagram + two tech blocks | H3 "Apache Iceberg and Apache Spark" · H4 Apache Iceberg: "Companies like Dell, Apple, Netflix, and Adobe use Iceberg" + INDUSTRY-PROVEN RELIABILITY (4) + TECHNICAL CAPABILITIES (8: ACID, time travel, schema/partition evolution, hidden partitioning…) · H4 Apache Spark: "Up to 100x faster than traditional systems" + PROCESSING CAPABILITIES (8) | | | SVG `67ac8928…_architecture-1.svg` | ENG |
| 3d | 3-card "Combined power" | ENTERPRISE SCALE · FUTURE-PROOF · FULL CONTROL | | | | EXEC |
| 3e | **Stat strip** "Performance at scale" | "100×" FASTER PROCESSING · "PB+" DATA SCALE · "1000+" ENTERPRISE USERS | unsourced | | | EXEC |
| 5 | CTA | "Experience open source excellence." | | Get in touch; pager "Machine learning" → /product/data-platform/machine-learning, "Data mesh" | | |

**data-mesh** — https://iomete.com/product/architecture/data-mesh
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro + 4 bullets | Eyebrow "MODERN DATA ARCHITECTURE WITH IOMETE DATA MESH" · H2 "Data mesh" · H3 "Data mesh: A revolutionary approach" | domain-oriented ownership, data as product, self-service, federated governance | | | ENG / EXEC |
| 3b | **Architecture diagram** + two plane descriptions | H3 "Control and data planes" · Control plane (4 bullets) · Data plane (4 bullets) | | | SVG `67ac892b…_architecture-2.svg` — labelled isometric layers: CONTROL PLANE (Governance, Monitoring, Security, Resource Manager) over DATA PLANE (Processing, Storage) over DATA PRODUCTS, with FINANCE / SALES / MARKETING DOMAIN columns and products "Financial reports, Transactions, Sales analytics, Customer data, Campaign data, Market analysis" | ENG |
| 3c | 3-card "Data domains and ownership" | DOMAIN AUTONOMY · BUDGET CONTROL · TEAM OWNERSHIP | | | | EXEC / FIN |
| 3d | 2-group "Implementation benefits" | FOR ORGANIZATIONS · FOR TEAMS | | | | EXEC |
| 5 | CTA | "Ready to transform your data architecture?" | | Get in touch; pager Open source / Data security | | |

**data-security** — https://iomete.com/product/architecture/data-security
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro + 2 bullet lists | Eyebrow "ENTERPRISE-GRADE DATA SECURITY WITH IOMETE" · H2 "Data security" · H3 "Complete data sovereignty" (3 bullets) · H3 "Minimized data movement" (3 bullets) | "your data never leaves your security perimeter" | | | SEC |
| 3b | Diagram + 3-card "Enterprise security architecture" | ACCESS CONTROL (row/column, dynamic masking, tag-based) · AUTHENTICATION ("SAML 2.0 integration", "OAuth support", "LDAP integration", "Multi-factor authentication") · AUDIT & COMPLIANCE | | | SVG `67ac892e…_architecture-3.svg` | SEC |
| 3c | 2-group "Freedom from vendor lock-in" | INFRASTRUCTURE INDEPENDENCE · DATA FORMAT FREEDOM ("No proprietary data formats") | | | | EXEC |
| 5 | CTA | "Ready to take control of your data security?" | | Get in touch; pager Data mesh / Integrations & ecosystem | | SEC |

**integrations-ecosystem** — https://iomete.com/product/architecture/integrations-ecosystem
| # | Component | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 3a | Intro | Eyebrow "ENTERPRISE INTEGRATION ECOSYSTEM" · H2 "Integrations & ecosystem" | | | | ENG |
| 3b | 3-card "Ready-made integrations" | BUSINESS INTELLIGENCE: Tableau, Power BI, Apache Superset · DATA INTEGRATION: Apache Airflow, dbt, Apache NiFi · ML & ANALYTICS: Jupyter Notebooks, Apache Spark ML, Python Data Science | text only | | | ENG |
| 3c | 2-card "Open core benefits" | STANDARDS COMPATIBILITY (JDBC/ODBC, REST, Iceberg) · EXTENSIBILITY | | | | ENG |
| 3d | 3-card "Enterprise integration features" | SECURITY (SSO, LDAP/AD, "Role-based access control" listed twice) · DATA SOURCES · APIs ("Webhooks") | | | SVG `67ac8931…_architecture-4.svg` (contains brand-coloured marks: fills include Airflow blue #017CEE, Superset #20A7C9, dbt-like orange) | ENG |
| 5 | CTA | "Take control of your data." | | Get in touch; pager Data security / "Integrations & ecosystem" → `#` (dead link) | | |

### B.5 Pricing — https://iomete.com/pricing

JSON-LD `SoftwareApplication` with offers Free ($0, max 100 vCPUs), Enterprise (price "500"), Business Critical (price "999" — placeholder, not shown on page) and **`aggregateRating` 5/5 from 2 reviews** (no reviews visible on the page).

| # | Component type | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 1 | Breadcrumb + hero | "PRICING" · Eyebrow "TRANSPARENT PRICING" · H1 "Tired of hidden costs and billing surprises? So are we." | "…the generous Free Tier provides access to all core features, the Enterprise Plan adds advanced data access and security features with enterprise-grade support, and the Business Critical Plan delivers hybrid and multi-region deployment with dedicated expert assistance." | — | — | FIN |
| 2 | **Three plan cards** (rows: LICENSE COST / MAX # OF vCPUS / DEPLOYMENT OPTIONS / FEATURE SET / SUPPORT PLAN) | **Free** "The world's most generous free plan" · **Enterprise** "Scale and performance with peace of mind" · **Business Critical** "Tailored for mission-critical infrastructure" | Free: Zero · Max 100 vCPUs · Self-hosted, on-premises deployment · Core features · Community support. Enterprise: "$500 license cost per vCPU per year ¹" · Unlimited vCPUs · Self-hosted, on-premises deployment · "Core features + Data masking, Role level security, Disaster zone, Auditing" · Enterprise support. Business Critical: "Custom license cost ²" · Unlimited · "Self-hosted, on-premises or hybrid deployment" · "Enterprise features + Multi-region" · "Enterprise support + Dedicated engineers". Footnotes: "¹ $100,000 per year (200 vCPU) minimum commitment" · "² $250,000 per year minimum commitment" | Free: "Start now" → /pricing/free-plan · Enterprise: "Get in touch" → /contact-us · Business Critical: "Get in touch" → /contact-us | none | FIN |
| 3 | Support tier table (3 columns: Silver / Gold / Platinum) | Eyebrow "ENTERPRISE SUPPORT" · H2 "IOMETE's enterprise support ensures your data operations stay on track…" | Silver "Enterprise support": Non-custom break/fix · Round robin · Customer support engineer · Max 5 tickets/month via portal · Updates & patches included · Max 2 portal users · Sev 1 24x7x365, Sev 2-4 9am–6pm local M–F · SLA Sev1 1 hour, Sev2/3/4 1 business day · urgent upgrade/priority queue not included · onboarding scoped separately. Gold "Priority Enterprise support": break/fix + general inquiries · unlimited tickets · Max 5 users · SLA 1h / 4h / 8h / 1 business day · urgent upgrade included · priority queue not included. Platinum "Dedicated support": Dedicated expert · Technical support engineer · "Unlimited via portal and Slack/email" · "Max 5 per BU" · Sev 1 & 2 24x7x365 · SLA "SEP: 30 minutes / 4 hours / 8 hours / 1 business day" · urgent + priority included | "Get in touch" → /contact-us | none | FIN / ENG (ops) |
| 4 | Professional services blurb | Eyebrow "PROFESSIONAL SERVICES" · H2 "IOMETE's professional services help you maximize your data's potential…" | "From seamless onboarding to advanced optimization…" | "Get in touch" → /contact-us | none | EXEC |

No pricing toggle, no calculator, no FAQ on this page.

### B.6 Free plan — https://iomete.com/pricing/free-plan

| # | Component type | Headline | Key copy | CTAs / form | Media | Persona |
|---|---|---|---|---|---|---|
| 1 | Breadcrumb + hero | "FREE PLAN" · Eyebrow "SIGN UP" · H1 "Unlock the world's best free plan." | "Enjoy unlimited access to core features and up to 100 vCPUs – free, forever." | — | — | ENG / FIN |
| 2 | 3-step numbered instructions | Eyebrow "FREE PLAN SIGN-UP INSTRUCTIONS" | "1 Provide your information. 2 Receive installation instructions per email. 3 Follow the installation instructions and start using IOMETE." | — | — | ENG |
| 3 | **Form** `wf-form-Free-Plan-Sign-Up` (Webflow native, method GET, no action) | Eyebrow "STEP 1" · H2 "Provide your information." | fields in Section E | Submit "Submit"; success: "Your message has been submitted. We will be in touch shortly." + "Send another message" → /contact-us; error: "Oops! Something went wrong while submitting the form." | — | ENG |

No download link, no Helm/Docker command, no self-serve provisioning on this page.

### B.7 FAQ — https://iomete.com/faq

Single `section-sticky` with eyebrow "faq" repeated before each group; H1 is the first group heading. Q&As are plain div/p pairs (no accordion markup, no `details`). FAQPage JSON-LD mirrors the content.

| # | Component | Group heading | Questions (exact) | Notable claims | Persona |
|---|---|---|---|---|---|
| 1 | Q&A group | H1 "Platform Overview" (5) | What is IOMETE? · What's the difference between a data lakehouse and a data warehouse? · Why do companies choose self-hosted data platforms over SaaS? · How is IOMETE different from Snowflake or Databricks? · Can one platform really replace both my data warehouse and data lake? | "Snowflake and Databricks only run on the three main US public clouds (AWS, Azure and Google Cloud)" | EXEC |
| 2 | Q&A group | H2 "Technical Architecture & Performance" (8) | What is Apache Iceberg and why should I care? · How does IOMETE handle real-time data? · What is time travel and when would I use it? · Can IOMETE scale to petabytes of data? · Does IOMETE work on Kubernetes? · How fast are queries on large datasets? · Can IOMETE support thousands of users at once? · Does IOMETE work across multiple regions or cloud providers? | "sub-second responses on billion-row tables" (qualified) | ENG |
| 3 | Q&A group | H2 "Security, Compliance & Cost" (9) | How secure is IOMETE? · Can IOMETE meet GDPR, HIPAA, and SOC 2 requirements? · What does air-gapped deployment mean? · Is IOMETE suitable for government and defense use? · How do I control where my data is stored? · How much money can I save with IOMETE? · Can I use my existing cloud discounts? · Does IOMETE work with spot instances? · How do I track and control costs? | "Most organizations save 30-60% compared to SaaS data platforms."; discounts "can save you 30-70% on compute costs"; spot "save 60-90% on compute"; "Government agencies and defense contractors use IOMETE for classified workloads" | SEC / FIN |
| 4 | Q&A group | H2 "Integration, Tools & Migration" (6) | What BI tools work with IOMETE? · Can I use DBT with IOMETE? · Does IOMETE support Jupyter notebooks and Python? · How do I build data pipelines in IOMETE? · How do I migrate from Hadoop or legacy data warehouses? · Can I run IOMETE alongside my existing data platform? | "dbt-spark adapter"; "Airflow or Prefect"; answer to last Q begins "es, and many…" (typo) | ENG |
| 5 | Q&A group | H2 "AI & Machine Learning" (7) | Can I run machine learning workloads directly on IOMETE? · How does IOMETE help reduce the cost of AI/ML training and inference? · Can I use GPUs with IOMETE? · How do data scientists connect their notebooks or IDEs to IOMETE? · What advantages does IOMETE offer for AI/ML compared to cloud SaaS platforms? · How does IOMETE support MLOps? · How does IOMETE handle AI governance and compliance? | "IOMETE supports GPU-accelerated clusters"; "integrates with tools like MLflow" | ENG |
| 6 | Empty section (`g-section`, no content) | — | — | — | — |
| 7 | CTA band | "BOOK A DEMO" · "Starting with IOMETE is simple. Book a demo with us today." → "Get in touch" /contact-us | | | EXEC |

### B.8 Roadmap index — https://iomete.com/roadmap

| # | Component | Headline | Content | CTAs | Persona |
|---|---|---|---|---|---|
| 1 | Breadcrumb + hero | "Roadmap" · Eyebrow "Product roadmap" · H1 "IOMETE Product Roadmap" | "Welcome to the IOMETE Product roadmap! Get a sneak peek into the priorities of the IOMETE Team." | — | ENG |
| 2 | Table (columns "Aa Name / Status / Last Updated"; rows are links) | 19 rows: Jupyter Containers (Completed, Dec 1 2025) · Arrow Flight Support (Completed, Jul 1 2026) · Native BI Dashboards (Completed) · Automatic Table Maintenance and Compaction (In-Progress) · Event Streaming Service (In-Progress) · Spark 4.x Upgrade (In-Progress) · Resource Bundles (Completed) · ✨ MCP Server for AI Agents (Beta) (Completed, Sep 30 2026) · ✨ Model Gateway (In-Progress) · ✨ Workload Optimization (In-Progress) · ✨ Troubleshooting Agent (Backlog) · IOMETE Enterprise Catalog (In-Progress) · ✨ SQL Editor Copilot & AI Assistance (Backlog, Oct 13 2025) · Built-In Orchestration (Backlog) · Multi-Kubernetes Cluster Deployment (In-Progress) · Data Lineage (Backlog) · Live Integrations with Governance Ecosystem (Backlog) · ✨ AI based Iceberg Table Management (Backlog) · Apache Comet (Planned) | each → /roadmap/{slug} | ENG |
| 3 | CTA band | standard BOOK A DEMO band | "Get in touch" → /contact-us | |

### B.9 Roadmap item template (CMS) — e.g. https://iomete.com/roadmap/mcp-server-for-ai-agents

| # | Component | Content | Persona |
|---|---|---|---|
| 1 | Breadcrumb (Home / Roadmap / item) + eyebrow "ROADMAP" + H1 (item name) + meta rows "Status" (tag, e.g. "Completed"), "Release Version" (e.g. "4.0.0"), "Last Updated" (e.g. "September 30, 2026") | | ENG |
| 2 | Rich-text body (H4 sections: Overview · Use cases · Features · Security and governance · Deployment · What's next) | MCP page states "Version 1 ships in IOMETE 4.0 as a beta feature", "17 tools in five groups", "Tested with Claude Code, Codex, Antigravity CLI and Devin", read-only by default, audit-logged, 100-row cap | ENG |
| 3 | Standard BOOK A DEMO CTA band | | |

### B.10 Partner program — https://iomete.com/partner-program

| # | Component type | Headline | Key copy | CTAs / form | Media | Persona |
|---|---|---|---|---|---|---|
| 1 | Breadcrumb + hero | "PARTNER PROGRAM" · Eyebrow "BELIEVE IN OUR VISION?" · H1 "Partner with IOMETE today." | "Join our ecosystem of technology and service partners…" | — | — | EXEC (partner) |
| 2 | Three partner-type rows, each with 4 logo tiles | H2 "Technology" — "Integrate your solutions with IOMETE's platform…" · H2 "Implementation" — "Help organizations implement and optimize…" · H2 "Reseller" — "Expand your portfolio…" | Logos have **no alt text**; identified by rendering: Technology = AWS (`Frame 298.svg`), Google Cloud (`Frame 300.svg`), Microsoft Azure (`Frame 299.svg`), DigitalOcean (`Frame 301.svg`); Implementation = Accenture (`acce.svg`), EY (`ey.svg`), Deloitte (`del.svg`), PwC (`pw.svg`); Reseller = four marks in files `12.svg`, `11.svg`, `10.svg`, `09.svg` (embedded PNG bitmaps; blue hatched-stripe mark, green hexagon mark, blue/black circular mark, green/blue X-arrow mark — **identities NOT RETRIEVED**) | — | 12 SVGs under `…/67a50f…` and `…/67a510…` | EXEC |
| 3 | 3-item numbered benefit list | Eyebrow "PARTNER BENEFITS" · H2 "Our ecosystem partners enjoy a host of exclusive perks and benefits." | 1 REVENUE SHARE "Earn competitive commissions on all referred business." · 2 TECHNICAL SUPPORT · 3 CO-MARKETING | — | — | EXEC |
| 4 | Intro + **Form** `wf-form-Partnership-Form` | Eyebrow "LET'S WORK TOGETHER" · H2 "Become a partner." · Eyebrow "INQUIRY FORM" · H2 "Send us a message." | | fields in Section E; success/error states as contact form | — | |

### B.11 Contact — https://iomete.com/contact-us (the site's only demo path)

| # | Component type | Headline | Key copy | CTAs / form | Persona |
|---|---|---|---|---|---|
| 1 | Breadcrumb + hero | "Contact us" · Eyebrow "GET IN TOUCH" · H1 "We'd love to hear from you." | "Do you have a question, wish to book a demo or simply need more details? Fill out the inquiry form below…" | — | all |
| 2 | Three info cards | CAREERS: "We do not accept job applications via this form…" · PRODUCT SUPPORT: "…open a ticket directly within our support portal." · CONTACT INFORMATION | | "View job openings" → https://app.dover.com/jobs/iomete · "Email us" → mailto:careers@iomete.com · "Support portal" → https://iomete.com/resources/getting-started/support · links: support@iomete.com, address (copy-to-clipboard), LinkedIn, GitHub, Twitter (X), YouTube | |
| 3 | **Form** `wf-form-Contact-Form` | Eyebrow "INQUIRY FORM" · H2 "Send us a message." | | fields in Section E | |

No calendar/scheduler embed, no phone number, no regional offices.

### B.12 About — https://iomete.com/about-us

Loads Splide carousel JS (`@splidejs/splide@4.1.4` + auto-scroll) but no `splide` markup exists in the HTML (unused).

| # | Component type | Headline | Key copy / claims | CTAs | Media | Persona |
|---|---|---|---|---|---|---|
| 1 | Breadcrumb + hero | "ABOUT US" · Eyebrow "OUR INSIGHT" · H1 "Cloud-SaaS is not the right delivery model to manage and extract value from large data sets in a cost-efficient manner." | "…cloud-SaaS data platforms such as Snowflake and Databricks… one-size-fits-all… vendor lock-in and unnecessary data movement… over the past four years, we've built a data platform…" | — | — | EXEC |
| 2 | Full-width illustration | — | — | — | SVG `67b85665…_about-graphic.svg` (dark green hex-grid, cluster of translucent hexagonal prisms with lime connector lines; no labels) | — |
| 3 | Text block | Eyebrow "WHY WE'VE BUILT IOMETE" · H2 repeats hero sentence | "It is significantly more cost-efficient (> 2x) than cloud-SAAS alternatives." | — | — | FIN / EXEC |
| 4 | Founders block | Eyebrow "OUR ROOTS" · H2 "Vusal and Piet met in Amsterdam… In 2021, they partnered up to start IOMETE. Together, they went through Y Combinator in early 2022…" · caption "OUR FOUNDERS / Vusal Dadalov and Piet Jan de Bruin" | | — | photo `67bef575…_our-founders.webp` (no alt) | EXEC |
| 5 | Team statement | Eyebrow "Who we are" · H2 "IOMETE is built by engineers, for engineers. Our team is fully remote, spanning seven different countries." | "Our journey began in the trenches of the likes of Amazon, Google, Meta and Uber…" | — | — | ENG / EXEC |
| 6 | Empty spacer section | — | — | — | — | — |
| 7 | Careers + Investors (two columns) | Eyebrow "CAREERS" · H2 "We're hiring." · Eyebrow "INVESTORS" · H2 "Back our vision." | "…send your resume to careers@iomete.com." | "View job openings" → https://app.dover.com/jobs/iomete · "Email us" → mailto:careers@iomete.com · "Get in touch" → /contact-us | — | — |

No team grid, no logos of investors (Y Combinator / Mercury appear only in the homepage logo wall), no press section, no timeline. Footer link "Investors" → /about-us#investors — **no element with id `investors` exists in the HTML**.

### B.13 IOMETE University — https://iomete.com/university (not in sitemap)

Built with **Astro v6.1.9** (meta generator), Tailwind utility classes, assets under `/_ploy_static/_astro/`; reuses the Webflow nav/footer markup (absolute links, "© 2026 IOMETE Inc."). Title "IOMETE University — Learn the Sovereign Data Lakehouse | " (trailing separator).

| # | Component | Headline | Content | Media | Persona |
|---|---|---|---|---|---|
| 1 | Breadcrumb + hero | "Home / University" · H1 "IOMETE University" | "A growing library of practical lessons for data engineers, platform teams, and anyone building a sovereign data lakehouse with IOMETE." | — | ENG |
| 2 | Module "01 — COMPUTE CLUSTERS" · H2 "Understand and operate Spark compute." | 3 video cards → YouTube: c8_ALw2U4y0 "What is a compute cluster? Apache Spark on Kubernetes explained"; aZ6xw150JCM "How a Spark cluster starts, scales and gets sized"; Eq7oqnc14BU "Cluster topology: production, staging, analytics and ETL" | | `i.ytimg.com/vi/{id}/hqdefault.jpg` thumbnails | ENG |
| 3 | Module "02 — CONNECTIONS & TROUBLESHOOTING" · H2 "Connect tools and diagnose workloads." | gnOE4U1iifs "JDBC vs SparkConnect vs Arrow Flight: which one to use"; HQz61eVIhC0 "Spark UI and cluster tabs: where to look when a query fails" | | | ENG |
| 4 | Module "03 — APACHE ICEBERG" · H2 "Recover, version, and govern your data." | 68BUqf9RlL4 "I Deleted Production Data on Purpose — Apache Iceberg Time Travel Explained"; 9CE3sRpibhE "How to Recover Deleted Data in Apache Iceberg (Time Travel + Rollback)"; RxIMU6gEIuU "Apache Iceberg Branches & Tags: Git for Your Data"; 5r86OWqJ_dU "Apache Iceberg Time Travel in the Real World: Compliance, GDPR, A/B Testing & More" | | | ENG |

Anomaly: the page head contains two `googleads.g.doubleclick.net/pagead/viewthroughconversion/17027470691/…` script tags whose `url=` parameter references an unrelated third-party domain (`deziservicosgo.com.br`) — appears to be an artefact baked into the static build; **cause NOT DETERMINED**. No cookie-script, leadsy or tempa on this page.

### B.14 Policy pages — /policies/privacy-policy, /policies/cookie-policy, /policies/software-license-agreement

Shared template: breadcrumb · sticky "Table of contents" (Finsweet-style `fs-toc_link` anchors, hrefs `#`) · eyebrow "LAST UPDATED: …" · H1 · numbered H2 sections. Privacy (12 sections; DPO "Piet Jan de Bruin, IOMETE INC., 1049 El Monte Avenue, Ste C #762, Mountain View, CA 94040", privacy@iomete.com; states "Since it was founded, IOMETE has received zero government requests for information."). Cookie policy (Application · Policy · Appendix A: Cookie Tables; names Google Analytics). SLA (Introduction + 14 sections; "The Software is not provided as a hosted or software-as-a-service (SaaS) offering"; breadcrumb label "Terms of service"). No DPA, no SLA for support, no subprocessor list on the site.

---

## Section C — Navigation and footer structure (identical on all Webflow pages; University reproduces it with absolute URLs)

**Top nav** (`div.nav-fixed`, hover-open dropdowns with `data-hover="true"`, decorative corner PNGs `67a34fb4…_left-nav.png` / `_right-nav.png`):

1. Logo (inline SVG wordmark, aria-label "IOMETE home") → `/`
2. **Why IOMETE** → `/` (homepage)
3. **Product** (mega-menu, three columns)
   - DATA PLATFORM (header → /product/data-platform/design-principles): Design principles · Platform overview · Data warehousing · Data governance · Data engineering · Data management · Data ingestion · Business intelligence · Real-time analytics · Artificial intelligence · Machine learning · Data science
   - DEPLOYMENT (header → /product/deployment): On-premises deployment (?type=on-premises) · Public cloud deployment (?type=public-cloud) · Private cloud deployment (?type=private-cloud) · "Hybrid development" *(sic)* (?type=hybrid)
   - ARCHITECTURE (header → /product/architecture/open-source): Open source · Apache Iceberg (→ open-source) · Apache Spark (→ open-source) · Data mesh · Data security · Integrations & ecosystem
4. **Pricing** → /pricing
5. **Resources** (dropdown): three icon boxes — PRODUCT ROADMAP → /roadmap (icon `67dc93fe…_resources-roadmap.svg`) · DOCUMENTATION → https://iomete.com/resources (`…_resources-documentation.svg`) · IOMETE UNIVERSITY → https://iomete.com/university (icon file is named `…_resources-github.svg`); then eyebrow "ADDITIONAL RESOURCES": IOMETE blog → https://iomete.com/resources/blog · Partner program → /partner-program · Trust center → https://app.vanta.com/iomete.com/trust/mh7heslsoonlhblghsro7g · Github → https://github.com/iomete
6. **About us** → /about-us
7. Button **Get in touch** → /contact-us (variant `w-variant-052759b4…`, i.e. secondary/stroke style)

An inline script highlights the active nav item by URL prefix map (`/product`→product, `/resource|/policies|/roadmap|/partner`→resource, `/pricing`→price). No search box, no login link, no language switcher, no "Book a demo" label anywhere in the nav (the docs site's nav does have "Book a demo" → /contact-us?ref=docs-nav&cta=nav).

**Footer** (`footer.u-theme-primary__base950`, five eyebrow-labelled columns + brand row):
- COMPANY: Why IOMETE (/) · About us (/about-us) · Careers (https://app.dover.com/jobs/iomete) · Investors (/about-us#investors — anchor missing)
- PRODUCT: Data platform (/product/data-platform/design-principles) · Deployment (/product/deployment) · Architecture (/product/architecture/open-source) · Product roadmap (/roadmap) · Documentation (https://iomete.com/resources) · GitHub (https://github.com/iomete)
- RESOURCES: IOMETE blog (https://iomete.com/resources/blog) · Partner program (/partner-program) · Faq (/faq) · Trust center (Vanta URL above)
- POLICIES: Privacy policy · Cookie policy · Software License Agreement
- CONTACT US: Get in touch (/contact-us) · "1049 El Monte Avenue, Mountain View, CA 94040, United States of America" (copy-to-clipboard link with "copied" tooltip) · icon links LinkedIn (https://www.linkedin.com/company/iomete/), GitHub, X (https://x.com/iometedata/), YouTube (https://www.youtube.com/@iomete)
- Brand row: logo (inline SVG) → `/` · "© 2025 IOMETE Inc. All Rights Reserved." (year replaced by JS) · "Back to top" → #page-top

**Docs site nav (for reference, /resources/*):** Getting Started · Guides · Reference · Integrations · Tutorials · Blog · Search · "Book a demo" button. Logo files `/resources/logo-black.svg`, `/resources/logo-white.svg`.

---

## Section D — Tech stack, design system, assets

**Platform**
- Marketing site: **Webflow** (site id `6799ec9d00832d1abf08b380`, `data-wf-domain="webflow.iomete.com"`, served via Cloudflare in front of Webflow/CloudFront, header `x-wf-region: us-east-1`). CSS: `https://cdn.prod.website-files.com/6799ec9d00832d1abf08b380/css/iomete-v01.webflow.shared.fd2d1497d.min.css`. JS: jQuery 3.5.1 + `webflow.schunk.*.js`. Roadmap items are a Webflow CMS collection. Second Webflow asset bucket `679e8e39ccda840d403b4bb5` hosts homepage feature screenshots and blog covers (likely the old/other site).
- /university: **Astro v6.1.9** + Tailwind-style utilities (`_ploy_static/_astro/*`).
- /resources (docs + blog): **Docusaurus v3.10.2**, Google Fonts Inter.
- Forms: Webflow native forms (`data-wf-page`, `method="get"`, empty action). HubSpot portal **26884041** tracking script present; HubSpot chatbot explicitly disabled. No HubSpot form embeds, no Calendly/HubSpot Meetings.
- Analytics/attribution: GTM **GTM-W4ZH33W**, cookie-script.com (consent), Leadsy.ai, Tempa attribution, Google Analytics (per cookie policy).
- Trust center: Vanta (external).
- Careers ATS: Dover. Support portal: docs page /resources/getting-started/support.
- Hosting for policies ToC: Finsweet-style `fs-toc` classes.

**Typography** (from stylesheet tokens)
- Headings: `--_typography---fonts--heading-font: Archivo, "Palatino Linotype", sans-serif` — self-hosted `Archivo-Light.ttf` (300) and `Archivo-LightItalic.ttf`; all h1–h6 weight **300**. Sizes: h1 2.5rem, h2 2.25rem, h3 2rem, h4 1.75rem, h5 1.5rem, h6 1.3125rem (desktop tokens).
- Body: `--_typography---fonts--primary-font: Inter, "Palatino Linotype", sans-serif` — self-hosted `InterVariable.ttf` (100–900). p-lg 1.125rem, p-md 1rem, p-sm .875rem, p-xs .75rem.
- Eyebrows / mono labels: `--_typography---fonts--secondary-font: Dmmono, …` — `DMMono-Regular.ttf` (400), `DMMono-Medium.ttf` (500); `.eyebrow` and `.u-text-sm-cap-mono` are uppercase .875rem.
- Buttons `.btn`: height 2.25rem, radius .25rem, font-size 1.125rem, weight 500, letter-spacing -.03em; default fill `--button-foluor--bg` (lime) with dark text.
- Container max-width 77rem.

**Colour tokens** (hex from `:root`)
- Brand accent "fluoro" (lime): **#d3f52c** (400, primary button/eyebrow icon), #c6e51c (500 hover), 50 #f7ffcc, 100 #f0fcac, 200 #e8fa82, 300 #dff75e, 600 #b7cc3d, 700 #88991c, 800 #667302, 900 #53591e
- Neutral "base": 0 #fff, 50 #fcfcf8 (page bg), 100 #e6e6e2, 200 #d0d0cd (borders), 300 #babab7, 400 #a4a4a2, 500 #8e8e8c, 600 #737371, 700 #626261 (body text), 800 #4c4c4c, 900 #363636, **950 #202020** (footer, dark theme)
- "racing" (dark green): **900 #2d382d** (hero/dark sections), 800 #344234, 700 #415441, 600 #4e664e, 500 #617a61, 400 #7b967b, 300 #a0b8a0, 200 #b8cdb8, 100 #d3e5d3, 50 #e8f7e8
- "lake" (blue): 900 #373a63, 800 #424778, 700 #565f9c, 600 #707ecf, 500 #8292e0, 400 #96a7eb, 300 #b1c4f2, 200 #cbdcf8, 100 #dce9fa, 50 #e8f3fd
- "stone" (warm beige): 900 #473733, 800 #54433e, 700 #6b5851, 600 #806e66, 500 #9e8b82, 400 #b0a097, 300 #c9b9ad, 200 #d6cac1, 100 #e8e1da, **50 #f2eeeb** (diagram backgrounds)
- "reef" (salmon): 900 #752414, 700 #b03e27, 600 #cf543c, 500 #ed7e68, 400 #fa9884, 300 #f5beb3, 200 #fad0c8, 100 #fae1dc, 50 #faf2f0
- "apricot" (yellow-orange): 900 #6b3b1b, 700 #995b25, 600 #d18538, 500 #e39740, 400 #eba54b, 300 #f7c77e, 200 #fcdca3, 100 #fceccc, 50 #faf3e3
- Semantic: danger #ed7e68, warning #e39740, success #617a61. Legacy "primary orange" #d14424 appears 12× in the compiled CSS (deleted variable).
- Section themes: `u-theme-primary__racing900` (dark green), `__base950` (near-black), `__base50`, `__base0`, `__stone50`, `__lake900/300/100`, `__racing300/100`.

**Logo & icon assets**
- Wordmark: inline SVG 140×24 in nav and footer; standalone file (from JSON-LD) `https://cdn.prod.website-files.com/6799ec9d00832d1abf08b380/68dd02f8ff7faec0750ce3ba_IOMETE%20Logo.svg` (200, 2.9 KB). Docs: `https://iomete.com/resources/logo-black.svg`, `/resources/logo-white.svg`.
- Favicons: `…/679cbd900d0376c3f6f03626_favicon.png`, `…/6a03188fe291f1c9c9928b94_favicon-light.png`, webclip `…/679cbd94293a3bc37c573734_webclip.png`.
- OG images: `…/696df3c26df3fbd4f6c8391d_iomete-meta-image.png` (all Webflow pages), pricing JSON-LD image `…/67c988bd86d87be7460067b9_og-image_racing-900.png`, docs `/resources/IOMETE-og-docs.png`, blog `/resources/IOMETE-og-blog.png`.
- Compliance badges: `…/679f6073da3dcdeafa5f3796_SOC2%20Certified.svg`, `…/679f607327d250b730cc0385_HIPAA%20Compliant.svg`, `…/679f6073e9c94fbd16959579_GDPR%20Compliant.svg`.
- Diagrams (all vector, text outlined to paths, stone-50 backgrounds unless noted): home `67ac85cf…_home-content.svg`; deployment `67ac88aa…_deployment-1.svg`; architecture `67ac8928…_architecture-1.svg`, `67ac892b…_architecture-2.svg` (control/data plane — the only diagram with semantic labels), `67ac892e…_architecture-3.svg`, `67ac8931…_architecture-4.svg`; design principles `67a392e8…_OUR%20DESIGN%20PRINCIPLES.svg`, `67a392e7…_TRUST%20PERIMETER.svg`, `67a392e8…_UNIFIED%20IOMETE%20PLATFORM%20.svg`, `67ac868e…_platform-1d-2.svg`; platform pages `67ac8692…_platform-2a-2.svg` (7-layer module stack), `67ac869d…_platform-2b-2.svg`, `platform-3-2` … `platform-12-2.svg`; about `67b85665…_about-graphic.svg` (dark).
- Lottie JSON: `67ce4df7…_connections-2_6-5.json`, `67ce4df7…_connections-2-mobile_11-2.json`, `67c0bc91…_IOMETE-businesspurpose-animation_3-2.json`, `67c0bc91…_IOMETE-engineeringteam-animation_3-2.json`.
- Product screenshots: hero `69769268…_hero-image%20copy.webp` (+ responsive -p-500…-p-3200 variants), `69769d4d…_spark-monitoring.webp`; feature showcase set under bucket `679e8e39ccda840d403b4bb5` (`67beec2d…_compute.webp`, `67beec3b…_jupyter-notebooks.webp`, `67beec52…_sql-editor.gif`, `67beec64…_query-history.webp`, `67beec70…_spark-applications.webp`, `67beec81…_data-catalog.gif`, `67beecea…_database-explorer.webp`, `67beecf8…_data-security.webp`, `67beed0e…_domains.webp`, `67beed19…_connect-bi-tool.webp`).
- Customer logos (homepage): `6873ccb7…_OverDrive_Logo%202020%201.svg`, `6873ccb7…_cbar-logo-en%201.svg`, `6873ccb6…_Y%20Combinator…svg`, `6873ccb6…_Mercury%20Bank…svg`, `6873ccb6…_pashabank-logo-en%201.svg`, `6873ccb6…_BrandLogo.org%20-%20Dell%20Technologies%20Logo%20Black%202016%201.svg`, `6a6756ba…_uzcard.svg`, `6a674b8f…_CBU.svg`, `6a67a713…_state-customs-committee-base50.png`, `6a6755af…_ministry-digital-tecnology-uzbekistan.svg`, `6a674b8e…_pasha-technology.svg`, `6a6752f6…_ministry-of-economy-azerbaijan.png`, `6a674b8f…_Kapital_Bank.svg`.
- Founders photo: `67bef575…_our-founders.webp`.

---

## Section E — Interactive elements and forms

| Element | Page(s) | Details |
|---|---|---|
| Contact / demo form `wf-form-Contact-Form` | https://iomete.com/contact-us | Fields: First name* (text, "John") · Last name* (text, "Smith") · Company* (text, "Acme Inc.") · Email* (email, "john@acme.inc") · Country* (select — **options are Webflow placeholders: "Select...", "First choice", "Second choice", "Third choice", "Another option"**) · Phone (tel, "Optional") · Contact reason* (select: Request a demo / Technical support for existing customers / Partnership opportunities / Other) · Message* (textarea) · "How did you hear about us?"* (text, "Please specify") · Submit. Success copy "Your message has been submitted. We will be in touch shortly." |
| Free-plan form `wf-form-Free-Plan-Sign-Up` | https://iomete.com/pricing/free-plan | Same fields as contact minus Contact reason (First, Last, Company, Email, Country* with same placeholder options, Phone, Message*, Attribution*). |
| Partnership form `wf-form-Partnership-Form` | https://iomete.com/partner-program | Same as contact but "TYPE OF PARTNERSHIP"* select: Technology partnership / Implementation partnership / Reseller partnership / Other. Country select has the same placeholder options. |
| Mega-menu hover dropdowns | all | `data-hover="true" data-delay="0"` |
| Sticky stacking comparison cards | https://iomete.com | `.why_card` with JS-set `--sticky-top` (8rem + 3rem·index) |
| Scroll-linked feature showcase | https://iomete.com | `.platform_link` ↔ `.platform_right-card` activation on scroll; accordion behaviour ≤991px |
| Logo marquee | https://iomete.com | duplicated list (CSS animation) |
| Lottie animations (4) | https://iomete.com | hero connections, business-purpose, engineering-team (loop + autoplay) |
| Copy-to-clipboard address | footer (all), https://iomete.com/contact-us | `a[data-elt="copy"]` → tooltip "copied" |
| Deep-link scroll | https://iomete.com/product/deployment | `?type=` → smooth scroll to `[data-type]` card |
| Sticky tab strip | 12 data-platform pages (12 tabs), 4 architecture pages (4 tabs) | plain links with `#top` anchors |
| Table of contents | 3 policy pages | anchor links (href `#`, JS-driven) |
| Video | https://iomete.com/university only | 9 YouTube links (open youtube.com; no embedded player). **No video embeds on any Webflow page.** |
| Cookie consent banner | all Webflow pages | cookie-script.com |
| Chat bot | none | HubSpot chat disabled |
| Pricing toggle / calculator / ROI tool | none | — |
| Search | none on marketing site (docs has search) | — |
| Roadmap table | https://iomete.com/roadmap | static rows (no filter/sort controls) |

---

## Section F — Gaps versus typical enterprise-buyer expectations (observed absences)

1. **No customer case studies or named customer stories** anywhere; the only proof is an unlabelled logo marquee (homepage) and a Gartner Market Guide blog post. /customers and /case-studies → 404.
2. **No testimonials or quotes** on any page; pricing JSON-LD claims a 5/5 rating from 2 reviews with nothing visible.
3. **No dedicated "Book a demo" page** (/book-a-demo, /demo → 404); every CTA funnels to the generic contact form, whose Country dropdown still holds Webflow placeholder options.
4. **No comparison / alternatives pages** on the marketing site (/compare → 404). Competitor positioning (Databricks, Snowflake) appears only inside the homepage comparison cards, the About hero and FAQ; competitor comparison content lives only in blog posts.
5. **No role-based or industry-based paths** (/solutions, /industries → 404). Nav is organised purely by capability. Financial services / public sector / defence appear only in FAQ answers and logo files.
6. **No security page on iomete.com**; "Trust center" is an external Vanta link. No DPA, subprocessor list, pen-test summary, SOC 2 report request flow, or security whitepaper link. Compliance claims (SOC2, HIPAA, GDPR) are three badges with no explanatory copy.
7. **No ROI / TCO calculator or pricing toggle**; cost claims are inconsistent across pages ("2-5x" homepage, "2-3x" product pages, "> 2x" about, "30-60%" FAQ).
8. **No site search**, no login/console link, no language variants.
9. **No reference architecture / sizing content on the marketing site** (diagrams are abstract isometric art with outlined text; only `architecture-2.svg` carries labels). No product screenshots outside the homepage.
10. **No partner directory** (the Partner page shows logos for AWS/GCP/Azure/DigitalOcean/Accenture/EY/Deloitte/PwC without stating relationship status) and no marketplace listings.
11. **No release notes / changelog link** in marketing nav (lives in docs). No events, press, news or careers page on the main domain (careers → Dover).
12. **No "Community Edition" page** although llms.txt points to one (`/resources/community-deployment/overview`, not fetched).
13. **No video on Webflow pages**; University (9 YouTube links) is unlisted in the sitemap and only reachable via the Resources dropdown.
14. **Housekeeping issues a rebuild should fix:** H1 "Un-SaaS your data." repeated on 12 pages; title typo "Data Goverance"; "Data Platfrom" label; "Beaver", "SL IDEs", "Hybrid development" labels; BI page lists tools without logos; duplicate "Role-based access control" bullet; dead pager link `#` on integrations page; missing `#investors` anchor; empty sections on FAQ and About; copyright year hard-coded as 2025; `resources-github.svg` icon used for University; data-management card labels mismatched to bullets.

---

## Section G — Reusable atoms (de-duplicated) and where they appear

| Atom | Description | Appears on |
|---|---|---|
| **Eyebrow + H2 + lead** section header | DM Mono uppercase eyebrow, Archivo-light heading, optional h6-styled lead paragraph | every page |
| **Breadcrumb hero** | "Home" link · active crumb · eyebrow · H1 · p-lg | all non-home pages |
| **"BOOK A DEMO" CTA band** | eyebrow BOOK A DEMO · H2 (page-specific or the default "Starting with IOMETE is simple. Book a demo with us today.") · p · `Get in touch` → /contact-us | home, all 12 data-platform pages, deployment, 4 architecture, faq, roadmap, 19 roadmap items (default copy on home/faq/roadmap) |
| **`btn` button pair** | lime fill primary + stroke secondary (`w-variant-052759b4…`) | hero (home), nav, contact, about, 404 |
| **Logo marquee (customers)** | 13 logos duplicated for infinite scroll, no caption | home only |
| **Compliance badge trio** | SOC2 Certified / HIPAA Compliant / GDPR Compliant SVG + label | home only (badges) |
| **IOMETE-vs-Competitors sticky card** | eyebrow category · "IOMETE / SELF-HOSTED / claim" vs "Competitors / SaaS / claim" | home ×5 (Deployment, Data ownership, Data security and privacy, Cost, Service model) |
| **Deployment-options quartet** | ON PREMISES / PUBLIC CLOUD / PRIVATE CLOUD / HYBRID cards with 5 bullets each | /product/deployment; as text labels ON-PREMISES / AWS / AZURE / GOOGLE CLOUD on home block 4; as callouts ON-PREMISES / HYBRID / CLOUD inside `platform-2a-2.svg` |
| **Platform module list (8 or 7 items)** | Data Lakehouse(s), Data Catalog, SQL Editor, Advanced Data Controls (= Data access controls), Spark Jobs, ML Notebooks, Spark Connect, Orchestration Engine | home block 5 (8 chips); platform-overview (7 paragraphs + 7-layer diagram, no Orchestration Engine) |
| **Sticky feature showcase (screenshot + copy)** | 10 items with product screenshots/GIFs | home only |
| **Three-card `card_list` grid** | eyebrow + 1 paragraph or 4–5 bullets per card | every product/architecture page (Key features / Business benefits / etc.), deployment ("Kubernetes benefits"), partner benefits |
| **Two-group bullet pair under a sub-head** | sub-head (p-md medium) + two eyebrow-labelled 4-bullet lists | all 12 data-platform pages, deployment, data-security, integrations |
| **Numbered list (small-number)** | 1/2/3 with eyebrow + sentence | business-intelligence (3 steps), partner-program (3 benefits), free-plan (3 steps); 1–8 variant on design-principles |
| **Stat strip (h1-sized figure + mono caption)** | "87%" / "$12.9 M" ; "100×" / "PB+" / "1000+" | artificial-intelligence, open-source |
| **Control-plane / data-plane diagram** | `architecture-2.svg`, labelled | data-mesh only (concept also described in FAQ and llms.txt) |
| **Isometric hexagon illustration family** | stone-50 background, racing/lake/reef/apricot slabs, outlined labels | all product/architecture/deployment/about pages (one per page) |
| **Lime hexagon "network" diagram** | IOMETE mark linked to AWS/Azure/GCP/on-prem icons | home block 4 |
| **Pricing plan card** (5 labelled rows + tag + CTA) | Free / Enterprise / Business Critical | /pricing |
| **Support tier column** (Silver / Gold / Platinum: 7 feature rows + 4 SLA rows + 4 extras) | | /pricing |
| **Webflow inquiry form** (9 fields, shared field set + one page-specific select) | | contact-us, pricing/free-plan, partner-program |
| **Partner logo row (4 tiles)** | | partner-program ×3 |
| **Blog feature + 3-card grid** | hard-coded | home |
| **Roadmap row** (Name · Status tag · Last Updated) | | /roadmap (19 rows); item page header reuses Status / Release Version / Last Updated |
| **FAQ group** (eyebrow "faq" + heading + question/answer pairs, no accordion) | | /faq ×5 |
| **Policy page scaffold** (sticky ToC + LAST UPDATED eyebrow + numbered sections) | | 3 policy pages |
| **University module** (number — TITLE eyebrow, H2, lead, 2–4 YouTube cards) | | /university ×3 |
| **Founders photo + "OUR FOUNDERS /" caption** | | /about-us |
| **Careers / Investors twin block** | | /about-us (and careers card on /contact-us) |
| **Copy-to-clipboard address link** | | footer (all), /contact-us |
| **Nav mega-menu (3 columns) + Resources icon boxes** | | all pages |
| **Footer 5-column** | | all pages |
| **404 block** | eyebrow 404 · "Page not found." · two buttons | any unknown URL |
