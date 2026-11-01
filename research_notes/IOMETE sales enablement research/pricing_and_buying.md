# IOMETE: Pricing, Packaging, Licensing and Buying Journey (as of 1 Nov 2026)

Research scope: everything public about IOMETE's commercial model and buying journey, for a business-case / sales-prep tool. All numbers are sourced inline. Where pricing is not public, that is stated explicitly. Vendor marketing claims are quoted verbatim and labelled as such. Items marked UNKNOWN could not be confirmed from any public source.

Method note: iomete.com pages were fetched live on 1 Nov 2026; historical pricing was pulled from Wayback Machine captures (Dec 2023, Nov 2024, Apr 2025, Sep 2025). G2, Capterra, TrustRadius, Software Advice and Gartner Peer Insights returned HTTP 403 to direct fetches, so only their search-snippet content is used, and is flagged as such.

---

## 1. Editions / tiers, inclusions and exclusions, free tier / trial / sandbox

### Takeaway
IOMETE publishes three self-hosted license tiers: Free (zero license cost, capped at 100 vCPUs, core features, community support), Enterprise ($500/vCPU/year, $100,000/year minimum = 200 vCPUs, adds data masking, row-level security, disaster zone, auditing), and Business Critical (custom price, $250,000/year minimum, adds hybrid/multi-region and dedicated engineers). There is no hosted sandbox or time-limited trial today; the Free plan is the on-ramp and access is "reviewed manually".

### Cited Findings
- Pricing page intro, verbatim: "Tired of hidden costs and billing surprises? So are we. ... Our pricing model embodies this vision: the generous Free Tier provides access to all core features, the Enterprise Plan adds advanced data access and security features with enterprise-grade support, and the Business Critical Plan delivers hybrid and multi-region deployment with dedicated expert assistance." — [IOMETE Pricing](https://iomete.com/pricing)
- **Free tier**, verbatim fields: tagline "The world's most generous free plan"; LICENSE COST "Zero"; MAX # OF vCPUS "Max 100 vCPUs"; DEPLOYMENT OPTIONS "Self-hosted, on-premises deployment"; FEATURE SET "Core features"; SUPPORT PLAN "Community support"; CTA "Start now" — [IOMETE Pricing](https://iomete.com/pricing)
- **Enterprise tier**, verbatim: tagline "Scale and performance with peace of mind"; LICENSE COST "$500 license cost per vCPU per year" with footnote "¹ $100,000 per year (200 vCPU) minimum commitment"; "Unlimited vCPUs"; "Self-hosted, on-premises deployment"; FEATURE SET "Core features + Data masking, Role level security, Disaster zone, Auditing"; SUPPORT PLAN "Enterprise support"; CTA "Get in touch" — [IOMETE Pricing](https://iomete.com/pricing)
- **Business Critical tier**, verbatim: tagline "Tailored for mission-critical infrastructure"; LICENSE COST "Custom license cost" with footnote "² $250,000 per year minimum commitment"; "Unlimited vCPUs"; "Self-hosted, on-premises or hybrid deployment"; FEATURE SET "Enterprise features + Multi-region"; SUPPORT PLAN "Enterprise support + Dedicated engineers"; CTA "Get in touch" — [IOMETE Pricing](https://iomete.com/pricing)
- Free plan landing page, verbatim: "Unlock the world's best free plan." / "Enjoy unlimited access to core features and up to 100 vCPUs – free, forever." Sign-up steps: "Provide your information." → "Receive installation instructions per email." → "Follow the installation instructions and start using IOMETE." Gate: "Access is reviewed manually — tell us your real use case so we can provision it." Form fields: first name, last name, company, email, country, phone, message, how you heard about IOMETE. — [IOMETE Free Plan](https://iomete.com/pricing/free-plan)
- The Free plan page does not list exclusions, a license key mechanism, Helm steps, supported environments or an upgrade path; installation instructions arrive by email only. — [IOMETE Free Plan](https://iomete.com/pricing/free-plan)
- The Software License Agreement contains no community/free-tier clause or usage limits; it does define "Sample Data" (§1.4) "for demonstration or evaluation purposes" and "Preview Features" (§1.7) for "internal evaluation purposes" only. Pricing metric (vCPU) is not defined in the SLA; it is left to the Order Form. — [IOMETE Software License Agreement](https://iomete.com/policies/software-license-agreement)
- Third-party summary consistent with the live page: "Free: $0 for up to 100 vCPUs, with community support. Enterprise: $500 per vCPU per year, with a $100,000 annual minimum (200 vCPUs). Business Critical: Custom licensing with a $250,000 annual minimum, aimed at hybrid and multi-region needs." Also: "Advanced masking and role-level security require paid Enterprise packaging." — [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)
- Historical (Dec 2023 capture): the site then offered a "Try Sandbox" / "Try sandbox" CTA and a "Start Free Trial" CTA for a cloud offering (see Section 2 history). These no longer appear on the live site. — [Wayback: iomete.com/pricing, 2 Dec 2023](https://web.archive.org/web/20231202055653/https://iomete.com/pricing)
- A 2025 community install guide deployed the Helm chart `iomete/iomete-data-plane-enterprise` from chartmuseum.iomete.com with images from iomete.azurecr.io, config from the iomete-deployment GitHub repo, and describes no license-key or registration step; cluster prerequisite quoted as "At least 32GB of RAM and 4 CPU cores available in your cluster for IOMete's components", Kubernetes 1.21+, PostgreSQL (Bitnami chart) and MinIO as default storage. — [DEV Community, Setting Up IOMete (10 Jun 2025)](https://dev.to/jverhoeks/setting-up-iomete-a-cloud-independent-data-platform-based-on-spark-4b23)

### Inferences
- "Core features" vs. Enterprise: the only features the pricing page names as Enterprise-only are data masking, row-level ("Role level") security, disaster zone and auditing; multi-region is Business Critical-only. Everything else in the product (Spark/Iceberg lakehouse, SQL editor, catalog, jobs, integrations) is presumably "core", but IOMETE does not publish a feature matrix per tier (see Gaps).
- The Free tier is effectively a gated, perpetual community edition rather than a self-serve download: a human reviews the use case and emails instructions. For a sales tool, treat "Free plan request" as a top-of-funnel lead event, not an anonymous download.
- The 100-vCPU cap and 200-vCPU Enterprise minimum create a gap (101–199 vCPUs) where a buyer must pay the $100k minimum; the rfp.wiki profile calls the minimum "a high bar for mid-market buyers".

### Gaps
- UNKNOWN: full feature-by-tier matrix (e.g., whether SSO, BYOK encryption, Jupyter notebooks, lineage, PII detection are "core" or Enterprise). The 2023/2024 pricing pages listed a long feature table but did not split it by tier, and the live page only names four Enterprise deltas.
- UNKNOWN: whether the Free tier is restricted to on-premises only (page says "Self-hosted, on-premises deployment") or also allowed on a customer's own cloud Kubernetes; the Free plan page does not say.
- UNKNOWN: whether a time-boxed Enterprise trial or POC license exists; nothing public says so.
- UNKNOWN: how the 100-vCPU cap is enforced (license key, telemetry, honor system).

---

## 2. Pricing model, list prices, and pricing history

### Takeaway
Current model (live since at least April 2025): a self-hosted software license priced per vCPU per year, billed as an annual commitment, with the buyer paying their own infrastructure. List price is $500/vCPU/year with a $100,000/year (200 vCPU) minimum for Enterprise; Business Critical is quote-only above a $250,000/year floor. The model has changed three times since 2023 (per-core on-prem + storage-tiered cloud → $0.05/vCPU-hour public cloud → per-vCPU-year license).

### Cited Findings
**Current list prices (live page, 1 Nov 2026)**
- "$500 license cost per vCPU per year"; "$100,000 per year (200 vCPU) minimum commitment" (Enterprise); "Custom license cost" / "$250,000 per year minimum commitment" (Business Critical); "Zero" license cost up to "Max 100 vCPUs" (Free). — [IOMETE Pricing](https://iomete.com/pricing)
- Payment/legal terms: "payment terms are set forth in the applicable Order Form" (§6.1); "all payment obligations are non-cancelable and all Fees are non-refundable" except as stated; Customer pays Taxes (§6.2); purchases "through a Reseller are governed by a separate Reseller Arrangement" (§6.4); each Order Form runs for "the License Term specified in the applicable Order Form" (§7.1); governing law Delaware (§13.4); liability cap = fees paid in prior 12 months, 2x for data-protection claims (§12.1). — [IOMETE Software License Agreement](https://iomete.com/policies/software-license-agreement)
- IOMETE's own blog uses the same list price in its worked example: "License: $500 per vCPU per year" and "Example (200 vCPUs): Licensing: $100K/year". — [IOMETE blog, Fortune 500 cost reduction (18 Jan 2026)](https://iomete.com/resources/blog/fortune-500-cost-reduction-self-hosted-vs-saas-tco)
- Third-party characterisation: IOMETE bills "a self-hosted software license rather than a consumption SaaS credit model"; "Buyers pay their cloud or on-prem providers directly. IOMETE does not mark up compute or storage." "Negotiation room appears mainly in Business Critical packaging, support upgrades, and services scope, not in public list-price discounts." — [RFP.wiki IOMETE vs Databricks](https://www.rfp.wiki/artificial-intelligence/data-lakehouse-platforms/iomete/databricks)
- Pricing tracker (captured 28 Sep 2026) lists Enterprise as "$500 per vCPU per month, Billed annually" — this CONFLICTS with the live page ("per vCPU per year") and with IOMETE's own blog math; treat PricingSaaS's "per month" as an error. Same tracker records only one change since 28 Feb 2026: "IOMETE doubles Gold plan's SEV 1 response SLA to 1 hour" (from 30 minutes), a support change, not a price change. — [PricingSaaS IOMETE](https://pricingsaas.com/companies/iomete)
- A SaaS-discount broker lists "iomete Discount - Up to 20% off" regular subscription rates; this is a broker listing, not an IOMETE page, and may be stale. — [Spendbase iomete](https://www.spendbase.co/?p=17820)

**Pricing history from Wayback Machine captures**
- **2 Dec 2023** — headline: "If you don't save > 50% over your existing solution we'll eat our shoe." Two plans: "On Premise — Pricing based on the number of CPU cores. $50 / per CPU core per month. Charged annually upfront. Fully-managed experience. Enterprise-level support. [Book a call]" and "Cloud — Pricing based on the amount of data stored. Start for Free. < 5 TB of data stored: Free. 5 - < 50 TB of data stored: $1,000 per month. 50 - < 100 TB of data stored: $5,000 per month. > 100 TB of data stored: Custom pricing. Charged annually upfront. [Start Free Trial]". Site also had "Try Sandbox" and an Amsterdam EMEA office: "IOMETE B.V. | EMEA, Rokin 92-96, Amsterdam, 1012 KZ, Netherlands". — [Wayback 2 Dec 2023](https://web.archive.org/web/20231202055653/https://iomete.com/pricing)
- **7 Nov 2024** — headline "Self-host the IOMETE Data Lakehouse on premise, on private or on public cloud." Two plans: "On Premise or Private Cloud — Pricing based on # CPU cores. Custom Pricing. Tailored to your needs. ... Charged annually upfront. [Get a Quote]" and "Public Cloud (AWS, Azure, GC) — Pricing based on compute. $0.05 / per vCPU per hour. Straightforward pricing. No surprises. No pre-paid compute credits or steep markups. Runs on any cloud. Access to all data lakehouse features. Charged at the end of the month. [Start Now]". — [Wayback 7 Nov 2024](https://web.archive.org/web/20241107201839/https://iomete.com/pricing)
- **20 Apr 2025** — the current three-tier model (Free / Enterprise $500 per vCPU per year, $100k min / Business Critical $250k min) and the Silver/Gold/Platinum support table are already present, identical to today except Gold SEV 1 = "30 minutes". — [Wayback 20 Apr 2025](https://web.archive.org/web/20250420102031/https://iomete.com/pricing)
- **15 Sep 2025** — same three-tier model as April 2025. — [Wayback 15 Sep 2025](https://web.archive.org/web/20250915041102/https://iomete.com/pricing)
- Stale third-party listings still reflect the 2022–2023 managed-AWS era: a regional Capterra listing shows a starting price of "$25 USD" and another says "AWS users get the platform basically for free"; Capterra describes the product as "designed for AWS-based organizations of any size". These are search-snippet-only (pages returned 403) and are inconsistent with the live pricing page. — [Capterra iomete (search snippet)](https://www.capterra.com/p/265658/iomete/)
- An Oct 2024 Azerbaijani trade article describes IOMETE as offering "Pay-as-you-go: customers pay only for the resources they use" and "subscriptions", noting customers can keep the open-source stack "even if they decide not to renew their IOMETE subscription". — [InfoCity (Oct 2024)](https://infocity.tech/2024/10/data-lakehouse-its-time-to-step-into-the-future-of-data-management/)

### Inferences
- Arithmetic from list price: $500/vCPU/yr ≈ $41.67/vCPU/month ≈ $0.057/vCPU-hour at 8,760 hrs/yr; this is close to the Nov 2024 public-cloud rate of $0.05/vCPU-hour, suggesting the per-year license was set to be roughly revenue-neutral with the prior hourly model for always-on clusters.
- Because the license is per vCPU licensed (not per vCPU-hour consumed), the effective cost per compute-hour falls with utilisation; IOMETE's own blog models infra at 176 hours/month (business hours) while the license is flat, which favours bursty buyers in SaaS comparisons but penalises them on license.
- The "Charged annually upfront" language (2023/2024) plus "non-cancelable ... non-refundable" (SLA) implies annual prepay is the default commercial structure; monthly billing is not offered publicly for Enterprise.

### Gaps
- UNKNOWN: whether the $500/vCPU/yr rate is tiered/volume-discounted above 200 vCPUs (page says "Unlimited vCPUs" at a single rate; no volume table). The blog's Profile 2/3 totals imply effective rates below $500/vCPU (e.g., 1,000 vCPUs priced at $480k–$720k total including infra), which cannot be reconciled with list price — see Section 4.
- UNKNOWN: multi-year discounts, true-up / true-down mechanics, how "vCPU" is counted (allocated to Spark executors vs. total node vCPU vs. control-plane vCPU).
- UNKNOWN: Business Critical rate card beyond the $250k floor.
- UNKNOWN: whether the 2023 Amsterdam entity (IOMETE B.V.) is still the EMEA contracting entity; the live site lists only Mountain View, CA.

---

## 3. Cloud marketplace presence (AWS, Azure, GCP)

### Takeaway
No IOMETE listing could be found on AWS Marketplace, Azure Marketplace or Google Cloud Marketplace, and IOMETE's own site, docs and FAQ make no marketplace claim. One AI-generated comparison site asserts marketplace availability (and even quotes "RU pack" prices) but cites no listing URL; treat as unverified.

### Cited Findings
- Targeted searches for "IOMETE" restricted to aws.amazon.com/marketplace returned no IOMETE product page; results were generic AWS Marketplace pages and unrelated listings. — [WebSearch: "IOMETE" site:aws.amazon.com/marketplace](https://aws.amazon.com/marketplace/sitemap)
- Searches for IOMETE on Azure Marketplace / Google Cloud Marketplace returned only directory profiles describing deployment flexibility ("can be deployed on premise, in your private cloud or on any major cloud (AWS, Azure, Google Cloud)"), not listings. — [Extruct.ai IOMETE profile](https://www.extruct.ai/hub/iomete-com/)
- RFP.wiki vendor profile: "No cloud marketplace listings are mentioned." — [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)
- CONFLICT: a search-result snippet attributed to an rfp.wiki page claimed "IOMETE is available on AWS Marketplace through annual RU packs, for example 20,000 RUs for $20,000, with overage listed at $1.10/RU" and another snippet said "buyers can use managed Galaxy, cloud marketplace billing, or self-managed/BYOC options". When the rfp.wiki IOMETE-vs-Databricks page was fetched directly it did "not mention an AWS Marketplace listing, RU packs, prices, or overage charges for IOMETE." "Galaxy" is Starburst's product name, so this appears to be AI-generated cross-contamination from Starburst's pricing. Treat as FALSE/unverified. — [RFP.wiki IOMETE vs Databricks (direct fetch)](https://www.rfp.wiki/artificial-intelligence/data-lakehouse-platforms/iomete/databricks)
- IOMETE's deployment page describes running on "Amazon EKS", "Azure AKS", "Google GKE", "OpenShift, VMware Tanzu, and custom Kubernetes distributions" with CTAs "BOOK A DEMO" and "Get in touch" — no marketplace purchase path. — [IOMETE Deployment Options](https://iomete.com/product/deployment?type=public-cloud)
- IOMETE docs reference a "Marketplace Jobs" release-notes section; this is an in-product job template marketplace, not a cloud procurement marketplace. — [IOMETE Docs index](https://iomete.com/resources)

### Inferences
- Procurement is direct (Order Form under the SLA) or via reseller (SLA §6.4). A buyer wanting to burn down AWS/Azure/GCP committed spend via private offer cannot do so publicly today; a sales rep should expect this question and have an answer ready (UNKNOWN whether private offers can be arranged).

### Gaps
- UNKNOWN: whether IOMETE has any unlisted/private marketplace offers or is in the process of listing. No press release or site content found.
- Could not fetch marketplace search pages directly (JS-rendered); conclusion rests on search-engine indexing plus IOMETE's own silence.

---

## 4. Stated cost value proposition (claims vs SaaS / Databricks / Snowflake)

### Takeaway
IOMETE's cost messaging has four public anchors: "Save 2-5x over SaaS/cloud" (homepage), "more than 2x as cost-efficient as cloud-SaaS alternatives" (About), "Most organizations save 30-60% compared to SaaS data platforms" (FAQ), and a detailed blog claiming "40-60% lower total cost of ownership" with worked Snowflake/Databricks comparisons. The mechanisms claimed are: no vendor markup on infrastructure, use of the customer's existing cloud discounts/reserved/spot capacity, and no per-query or per-user fees. All are vendor-authored; no independent audit exists.

### Cited Findings
**Homepage (live)**
- "the data platform for the ai era"; "The sovereign data platform. Your data, your future."; "Save 2-5x over SaaS/cloud."; "Put cloud discounts in your own pocket."; competitor framing: "Forever pay the SaaS cloud premium; this gets expensive quickly at petabyte-size."; "Yesterday's platforms were built for the cloud era. IOMETE was built for the AI era." The homepage names Databricks and Snowflake only in a deployment comparison, not in a numeric cost claim, and makes no "no egress" claim. — [IOMETE homepage](https://iomete.com/)

**About page (live)**
- Platform described as "more than 2x as cost-efficient as cloud-SaaS alternatives"; "Designed to empower enterprise data teams." — [IOMETE About](https://iomete.com/about)

**FAQ (live)**
- "Most organizations save 30-60% compared to SaaS data platforms." Attributed to paying infrastructure costs without vendor markup, using existing cloud discounts, and "there are no per-query or per-user fees". Cloud discounts: reserved instances and committed-use discounts "can save 30-70% on compute costs". Spot: "60-90% on compute" for batch/non-critical workloads. Cost tracking: spending by team, project, cluster, or job, with resource quotas and cost allocation. — [IOMETE FAQ](https://iomete.com/faq)

**Blog: "How Fortune 500 Companies Cut Data Platform Costs 40-60% With Self-Hosted Lakehouses" (18 Jan 2026, updated 4 Jun 2026, author Aytan Jalilova, Developer Advocate)** — [IOMETE blog](https://iomete.com/resources/blog/fortune-500-cost-reduction-self-hosted-vs-saas-tco)
- Headline claim: self-hosted lakehouses deliver "40-60% lower total cost of ownership" than SaaS.
- Anecdote: a Fortune 500 retailer budgeted ~$30K/month on Snowflake and hit $180K/month after six months (6x).
- Spend benchmarks asserted: mid-sized companies $15K–$50K/month on Snowflake or Databricks; enterprises $100K–$500K/month.
- Snowflake model: $2–$4/credit; XSmall 1 credit/hr, Medium 4, Large 8; Medium 8 hrs/day × 22 days = 704 credits = $2,112/month at $3; multi-warehouse $10K–$15K/month before storage/transfer; cross-region transfer up to $0.09/GB; markup claim "Snowflake charges 2x-4x markup on cloud infrastructure" (e.g., $0.50/hr AWS → $2–$3/hr in credits); 50TB/100 analysts = $8K–$12K/month; 500TB+ = $50K–$200K/month.
- Databricks model: SQL ~$0.22/hr DBU + m5.large $0.096/hr = $0.32/hr; 10 nodes × 8 hrs × 22 days ≈ $563/month per cluster; mid-sized $15K–$30K/month; enterprise (200TB, ML, streaming) $30K–$80K/month, $100K+ at scale; Delta Lake 10–20% storage overhead; spot "advertised at 70%" but unreliable for production.
- IOMETE worked example (200 vCPUs): licensing $100K/yr; compute 12.5 × m5.4xlarge at $0.768/hr = $9.60/hr × 176 hrs/month = $1,690/month; storage 50TB S3 Standard at $0.023/GB/month = $1,150/month; infra $2,840/month; total "about $134K/year"; egress ~$0.02/GB multi-region.
- TCO tables: Profile 1 (50TB, 100 users): Snowflake $120K–$180K/yr, Databricks $180K–$300K/yr, IOMETE (200 vCPUs) $100K–$120K/yr → "20-30%" vs Snowflake, "40-60%" vs Databricks. Profile 2 (200TB, streaming, ML): Snowflake $600K–$1.2M, Databricks $960K–$1.8M, IOMETE (1,000 vCPUs) $480K–$720K → 20–40% / 40–60%. Profile 3 (1PB+, global): Snowflake $2.4M–$6M, Databricks $3.6M–$7.2M, IOMETE (3,000–5,000 vCPUs) $1.44M–$3M → 40–60% / 50–70%.
- Mini "case studies" in the post: Financial services ($300M revenue): Snowflake $540K/yr vs IOMETE 500 vCPUs ($250K) + $180K cloud = $430K (stated 20% saving). E-commerce ($2B GMV): Databricks $1.44M/yr vs IOMETE 2,000 vCPUs ($1M) + $420K cloud = $1.42M (stated 1% saving). Manufacturing: Snowflake $960K/yr vs IOMETE 1,200 vCPUs ($600K) on existing Kubernetes = $600K (stated 38% saving).
- Hidden-cost claims: FinOps engineers $150K–$200K/yr; third-party optimisation tools (Keebo, Artica.AI) $20K–$50K/yr; migration 4–6 months typical, 9–12 months for thousands of tables, 3–4 months for simpler deployments; break-even "typically 50-100TB and 50+ users"; performance "within 10-20% variance" of Snowflake on TPC-DS/TPC-H (no source cited).
- Internal inconsistencies noted on fetch: Profile 1's $100K–$120K IOMETE total equals license alone and omits the ~$34K/yr infra the post itself computed; Profile 2's 1,000 vCPUs would be $500K license alone but total range starts at $480K; Profile 3's 3,000 vCPUs would be $1.5M license but range starts at $1.44M; the headline 40–60% does not match Profile 1's 20–30% vs Snowflake.

**Historical claims (archived)**
- Dec 2023 pricing page: "If you don't save > 50% over your existing solution we'll eat our shoe." Feature copy: "up to 10x better price performance"; "Data is compressed by 5-20x, which translates into an equivalent monetary saving". — [Wayback 2 Dec 2023](https://web.archive.org/web/20231202055653/https://iomete.com/pricing)
- Nov 2024 pricing page: "No pre-paid compute credits or steep markups." — [Wayback 7 Nov 2024](https://web.archive.org/web/20241107201839/https://iomete.com/pricing)

**Third-party relays of the claims**
- "Iomete claims a factor of '> 2x' cost efficiency compared to SaaS at scale ... By hosting the data themselves, enterprises can leverage their existing cloud discounts, spot instances, and reserved instances". — [Acciyo iomete review (search snippet)](https://www.acciyo.com/iomete-com-reviews/)
- "Public materials claim 30-60% savings versus SaaS lakehouses when cloud discounts and spot capacity are used" — flagged as "vendor-authored marketing claims without independent audited case studies". — [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)
- Other IOMETE cost-themed posts (titles/dates only): "A cost-efficient data lakehouse platform" (9 Aug 2023); "Snowflake cost cutting" (26 Sep 2023); "On-Prem vs Cloud Data Lakehouse: Cost, Control, Compliance" (25 Nov 2023); "Understanding Cloud Repatriation" (29 Aug 2025); "Why Enterprises Move from SaaS to Self-Hosted Lakehouses" (17 Jan 2026); "Databricks alternatives for self-hosted data lakehouses in 2026" (10 Mar 2026); "Snowflake Alternatives for Self-Hosted and On-Prem Data" (17 Mar 2025). — [IOMETE blog index](https://iomete.com/resources/blog)

### Inferences
- The savings claim has escalated/varied over time and across pages: ">50%" (2023), ">2x" (About), "30-60%" (FAQ), "40-60%" (blog headline), "2-5x" (homepage). A business-case tool should let users pick the conservative figure (20–30% vs Snowflake per IOMETE's own Profile 1) and show the sensitivity.
- The claimed mechanism is structurally sound but asymmetric: IOMETE removes the SaaS vendor's compute markup and lets buyers use their own cloud discounts, but adds a fixed per-vCPU license and shifts platform operations to the buyer. IOMETE's own e-commerce example shows a 1% saving, i.e., savings are not guaranteed at Databricks-heavy, high-utilisation workloads.
- IOMETE does not publicly claim "no egress"; the blog explicitly budgets egress (~$0.02/GB). Do not attribute a no-egress claim to IOMETE.

### Gaps
- UNKNOWN: any independent (analyst, customer-authored, audited) validation of the 2x / 30–60% / 40–60% figures. None found.
- UNKNOWN: the exact page carrying the "2-5x" homepage claim's methodology; none is linked.

---

## 5. Buying journey on the site and stated ICP

### Takeaway
The journey is demo-led and sales-mediated: every paid tier routes to "Get in touch" / "Book a demo" via a web form (no calendar embed on the contact page, though docs link a Calendly discovery call); the Free plan is also form-gated with manual review. Stated ICP: enterprise data teams in regulated sectors (banks, public sector, telecom, manufacturing) that "expect data sovereignty" and operate at petabyte scale, with explicit de-positioning of small/GB-scale startups. Observable customer logos skew to Azerbaijan/Uzbekistan banking and government, plus Dell Technologies.

### Cited Findings
**CTAs and funnel**
- Homepage CTAs: "Get in touch" (repeated), "Book a demo" (under heading "BOOK A DEMO"), "Explore our platform", "Visit our trust center"; no free-download CTA; "Documentation" only in nav. — [IOMETE homepage](https://iomete.com/)
- Pricing page CTAs: Free → "Start now"; Enterprise → "Get in touch"; Business Critical → "Get in touch"; Enterprise support → "Get in touch"; Professional services → "Get in touch". Links present on the page: /contact-us, /partner-program, /policies/software-license-agreement, /pricing/free-plan, /resources, /resources/blog. — [IOMETE Pricing](https://iomete.com/pricing)
- Contact form fields: First name, Last name, Company, Email, Country (dropdown), Phone (optional), Contact reason (dropdown: "Request a demo", "Technical support for existing customers", "Partnership opportunities", "Other"), Message (5000-char limit), "How did you hear about us?". No phone number listed; no calendar embed; success message "Your message has been submitted. We will be in touch shortly."; team replies "as soon as possible". Address: "1049 El Monte Avenue, Mountain View, CA 94040". Emails: support@iomete.com, careers@iomete.com. — [IOMETE Contact](https://iomete.com/contact-us)
- Docs support page offers prospects "info@iomete.com, or book a discovery call at https://calendly.com/iomete/iomete-discovery-call"; existing users use the Jira Service Desk portal https://iomete.atlassian.net/servicedesk/customer/portals. — [IOMETE Docs: Support](https://iomete.com/resources/getting-started/support)
- Free plan: form-gated, "Access is reviewed manually — tell us your real use case so we can provision it." — [IOMETE Free Plan](https://iomete.com/pricing/free-plan)
- FAQ's only CTA is "Book a demo". — [IOMETE FAQ](https://iomete.com/faq)
- Docs-first assets available: documentation at iomete.com/resources (on-prem install guide, deployment architecture, integrations for dbt/Airflow/Prefect/Power BI/Tableau/Redash), public roadmap at iomete.com/roadmap, GitHub github.com/iomete, Vanta trust center, "IOMETE University" at iomete.com/university. — [IOMETE Docs index](https://iomete.com/resources); [IOMETE Free Plan](https://iomete.com/pricing/free-plan)
- Contact "Technical support for existing customers" is deliberately routed to the support portal ("fastest response"). — [IOMETE Contact](https://iomete.com/contact-us)

**Stated ICP / positioning**
- Homepage: audience is enterprises that "expect data sovereignty"; SaaS is "suboptimal" at petabyte scale; de-positions "a startup with a few gigabytes" where SaaS "may not matter". Compliance badges: "SOC2 Certified, HIPAA Compliant, GDPR Compliant". Deployment: "Our platform runs on-premises, in your data centers, in your private cloud, your public cloud or all of the above (hybrid)." "Hybrid first". — [IOMETE homepage](https://iomete.com/)
- Homepage logo wall (unlabeled as customers): Kapital Bank, Pasha Bank, Mercury Bank, Central Bank of Uzbekistan, UZcard, Ministry of Digital Technologies of the Republic of Uzbekistan, Ministry of Economics Azerbaijan, Pasha Technology, State Customs Committee, OverDrive, Y Combinator, Dell Technologies, "cbar" (likely Central Bank of Azerbaijan — inference). — [IOMETE homepage](https://iomete.com/)
- About: "Designed to empower enterprise data teams." Team "fully remote, spanning seven different countries." Founded 2021 by Vusal Dadalov and Piet Jan de Bruin; YC early 2022. — [IOMETE About](https://iomete.com/about)
- Sept 2026 Turkish press profile: target customers "Banks, public institutions, and telecom companies" and "other regulated organizations"; go-to-market is "Direct sales to regulated sectors, with emphasis on data residency, control, and reduced dependence on external providers"; positioning as a "sovereign data platform". — [Webrazzi (11 Sep 2026)](https://webrazzi.com/2026/09/11/kurumlarin-veriyi-kendi-altyapilarinda-tutmasina-odaklanan-girisim-iomete/)
- CB Insights–hosted press text: "IOMETE powers production workloads in manufacturing, consumer goods, financial services, telecommunications, and public-sector environments." — [CB Insights IOMETE (search snippet)](https://www.cbinsights.com/company/iomete)
- Dec 2023 site had vertical pages: "IOMETE for Financial Institutions", "IOMETE for Healthcare", "IOMETE for Public Sector", "IOMETE for Data resellers", plus "Replace Cloudera" and "Augment Snowflake" use cases; and an EMEA office in Amsterdam. — [Wayback 2 Dec 2023](https://web.archive.org/web/20231202055653/https://iomete.com/pricing)
- 2026 blog themes reinforce ICP: "Data Sovereignty in 2026: DORA & EU AI Act Guide" (18 Jan 2026); "CLOUD Act Reality Check" (3 Mar 2026); "Data lakehouse for banks" (4 May 2026); "Data Sovereignty for Regulated Finance: DORA & Private Cloud" (1 Jun 2026); "Data sovereignty for the public sector: a platform blueprint" (27 Aug 2026); "Why IOMETE is built for regulated enterprise data teams" (4 Mar 2026). — [IOMETE blog index](https://iomete.com/resources/blog)
- Gartner Peer Insights profile (search snippet): self-hosted lakehouse provider, founded 2020, "11–50 employees". — [Gartner Peer Insights IOMETE (snippet)](https://www.gartner.com/reviews/product/iomete-1525459597)
- RFP.wiki: buyer types "Data engineering and analytics teams, and sovereignty-focused buyers"; "$100k minimum is described as a high bar for mid-market buyers"; "The $100k minimum can feel steep for lightweight proofs of concept." — [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)

### Inferences
- Minimum deal size ($100k Enterprise, $250k Business Critical) plus "Book a demo" everywhere indicates an enterprise field-sales motion; expected sales cycle is long (IOMETE's own blog cites 4–12 month migrations).
- Regional footprint evidence: HQ US (Mountain View), founders Azerbaijani/Dutch, historical Amsterdam EMEA entity, logo wall dominated by Azerbaijan and Uzbekistan banks/government, 2026 content aimed at EU regulation (DORA, EU AI Act, CLOUD Act). Inference: strongest traction in Caucasus/Central Asia with a push toward EU-regulated finance and public sector; US presence is corporate rather than a visible customer base.
- Logos are shown without the word "customer"; a sales tool should cite them as "logos displayed on iomete.com" not as confirmed references unless a case study exists (none named publicly).

### Gaps
- UNKNOWN: customer count, ARR, typical deal size, sales cycle length, named reference customers with permission.
- UNKNOWN: whether a self-serve demo environment/sandbox exists today (the 2023 "Try Sandbox" is gone).
- UNKNOWN: data-team-size ICP guidance; nothing public specifies team size.

---

## 6. Public case studies with numbers

### Takeaway
IOMETE publishes no named, numeric customer case study. The closest are (a) a May 2026 blog with three anonymised deployments (notably "100,000+ vCPUs" across 4 data centres for a "global technology manufacturer", and a Caucasus Tier-1 bank moving from overnight batch to "sub-60-second" processing with time-to-deploy "from quarters to weeks"), (b) a Sept 2026 press mention of a Dell Technologies deployment "more than 20 petabytes" across multiple data centres, and (c) illustrative (not real-customer) cost scenarios in the TCO blog.

### Cited Findings
- "Proof at Scale: The Sovereign Lakehouse Is Not Theoretical" (30 May 2026, updated 2 Jun 2026): Case 1 "Global technology manufacturer" — on-premises, "4 data centers; 100,000+ vCPUs of lakehouse compute", "Five legacy analytics platforms ... consolidated onto one IOMETE lakehouse"; no data volume, users, savings or deployment time. Case 2 "Tier-1 bank in the Caucasus region" — first warehouse 2019; outcomes: card issuing/acquiring "from overnight batch processing to sub-60-second live transaction processing"; credit portfolio reporting "from day-old snapshots to intraday visibility"; "Time to first deployment: from quarters to weeks"; quote "We chose capability, not technology."; no cost savings stated. Case 3 "Large national bank" — 15-year-old Oracle warehouse, ~4,000 tables, phased modernization in progress to Medallion/Iceberg with dbt, Airflow, Debezium, Kafka; no outcomes yet. — [IOMETE blog: Proof at Scale](https://iomete.com/resources/blog/sovereign-lakehouse-proof-at-scale)
- Dell Technologies deployment: "spans multiple data centers and covers more than 20 petabytes" — figure attributed to IOMETE by the journalist. — [Webrazzi (11 Sep 2026)](https://webrazzi.com/2026/09/11/kurumlarin-veriyi-kendi-altyapilarinda-tutmasina-odaklanan-girisim-iomete/)
- Dell described in Oct 2024 as a customer that "continues to expand the use of the platform" after its initial implementation and "is migrating data from more departments". — [InfoCity (Oct 2024)](https://infocity.tech/2024/10/data-lakehouse-its-time-to-step-into-the-future-of-data-management/)
- "On-premise Analytics Platform case study" (26 Sep 2023): unnamed "large organization", payments/billing/operations data, problem = silos/performance/tool diversity, solution = single Kubernetes cluster, Iceberg on NAS, RBAC, GPU ML pods; "Numeric outcomes: None." Author is an IOMETE Developer Advocate; no customer quotes. — [IOMETE blog: On-premise case study](https://iomete.com/resources/blog/on-premise-case-study)
- Illustrative cost scenarios (not identified customers): financial services ($300M revenue) 20% saving; e-commerce ($2B GMV) 1% saving; manufacturing 38% saving — see Section 4 for the arithmetic. — [IOMETE blog: Fortune 500 cost reduction](https://iomete.com/resources/blog/fortune-500-cost-reduction-self-hosted-vs-saas-tco)
- Search for Kapital Bank / Central Bank of Uzbekistan / UZcard + IOMETE found no deployment write-up; only a LinkedIn post by an engineer who moved from Kapital Bank to IOMETE. — [LinkedIn: Valid Akhundov (search snippet)](https://az.linkedin.com/in/validakhundov)
- RFP.wiki: "No independent public benchmarks against Databricks or Snowflake"; "No public NPS, no verified CSAT". — [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)

### Inferences
- The "100,000+ vCPUs" manufacturer and the ">20 PB" Dell deployment are plausibly the same account (Dell is a technology manufacturer and is on the logo wall), but no source links them explicitly — inference only.
- At list price, 100,000 vCPUs × $500 = $50M/yr, which is implausible for a single customer of a company that has raised <$1M; this strongly implies either heavy enterprise discounting, a different licensing basis for that deal, or that the vCPU count describes cluster capacity rather than licensed vCPUs. A sales tool should not assume list price holds at large scale.

### Gaps
- UNKNOWN: any customer-attributed TCO or $ savings figure. None public.
- UNKNOWN: time-to-deploy metrics beyond "from quarters to weeks" (bank) and the blog's 3–12 month migration ranges.

---

## 7. TCO structure for a self-hosted lakehouse (background for a calculator)

### Takeaway
Public sources (IOMETE's own TCO blog, rfp.wiki's buyer checklist, and generic self-hosted TCO literature) converge on a cost stack of: platform license (per vCPU/yr) + support tier + compute infrastructure (Kubernetes nodes, at customer's negotiated cloud/on-prem rates) + object storage + network/egress + platform operations staffing (SRE/platform engineers) + one-time migration/professional services + optional FinOps/optimization tooling. No analyst-published TCO model specific to self-hosted lakehouses was found.

### Cited Findings
- IOMETE's own TCO components (worked example): license ($500/vCPU/yr), compute (EC2 m5.4xlarge at $0.768/hr, 16 vCPU each, 176 hrs/month), storage (S3 Standard $0.023/GB/month), egress (~$0.02/GB multi-region), plus "hidden costs": FinOps engineers $150K–$200K/yr, optimization tools $20K–$50K/yr, migration 3–12 months. Break-even "typically 50-100TB and 50+ users". — [IOMETE blog: Fortune 500 cost reduction](https://iomete.com/resources/blog/fortune-500-cost-reduction-self-hosted-vs-saas-tco)
- IOMETE FAQ: customers can apply "reserved instances and committed-use discounts" (claimed "30-70% on compute") and spot/preemptible (claimed "60-90% on compute") because infrastructure is bought directly; platform provides cost allocation "by team, project, cluster, or job" with quotas. — [IOMETE FAQ](https://iomete.com/faq)
- RFP.wiki buyer checklist: "license fees are only one part of TCO beside infrastructure, migration, and platform operations the buyer owns"; model "cloud infrastructure, migration scope, support tier, GPU or observability add-ons, admin staffing, and egress or idle-cluster waste"; "Total cost rises with licensed vCPU count, the support tier (Silver, Gold, or Platinum), separately scoped services, and the Kubernetes and object-storage footprint the buyer runs"; "Migration, pipeline rewrites, and parallel-run validation are buyer costs that can dominate first-year spend"; "Self-hosting shifts upgrade, capacity, and reliability work to the buyer's team." — [RFP.wiki IOMETE vs Databricks](https://www.rfp.wiki/artificial-intelligence/data-lakehouse-platforms/iomete/databricks); [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)
- Minimum platform footprint from a community install: "At least 32GB of RAM and 4 CPU cores" for IOMETE components, plus PostgreSQL and MinIO (or cloud object store), Kubernetes 1.21+. — [DEV Community (10 Jun 2025)](https://dev.to/jverhoeks/setting-up-iomete-a-cloud-independent-data-platform-based-on-spark-4b23)
- Supported infra for the calculator's infra line: Amazon EKS, Azure AKS, Google GKE, OpenShift, VMware Tanzu, custom Kubernetes; object stores S3, GCS, Azure Blob/ADLS, MinIO, Dell ECS, on-prem backends; air-gapped supported. — [IOMETE Deployment Options](https://iomete.com/product/deployment?type=public-cloud); [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)
- Comparator inputs IOMETE uses for SaaS side: Snowflake $2–$4/credit; Databricks SQL ~$0.22/hr DBU + VM; Databricks listed "from $0.07 per DBU" on TrustRadius (per search summary). — [IOMETE blog: Fortune 500 cost reduction](https://iomete.com/resources/blog/fortune-500-cost-reduction-self-hosted-vs-saas-tco); [TrustRadius IOMETE vs Databricks (snippet)](https://www.trustradius.com/compare-products/iomete-vs-databricks-data-intelligence-platform)
- Generic staffing heuristics from adjacent self-hosted categories (not lakehouse-specific): self-hosted data catalog takes "a quarter to a full platform engineer, and 2+ FTEs at enterprise scale". — [Atlan: open-source vs commercial data catalog TCO](https://atlan.com/know/data-catalog/open-source-vs-commercial-data-catalog-total-cost-of-ownership/)
- Generic on-prem warehouse benchmark (not lakehouse): "total on-premises TCO for a 5TB warehouse with 50 users: $400-800K/year depending on platform and staffing". — [Xylity Tech: data platform TCO cloud vs lakehouse](https://xylitytech.com/data-analytics/data-platform-tco-cloud-vs-lakehouse/)
- Support cost is a separate line: Silver/Gold/Platinum tiers exist with no published prices; "Onboarding services: Scoped separately". — [IOMETE Pricing](https://iomete.com/pricing)

### Inferences
- Suggested calculator line items (synthesised from the above): (1) IOMETE license = licensed vCPUs × $500, floor $100k (Enterprise) or $250k (Business Critical); (2) support tier uplift — UNKNOWN %, must be an input; (3) one-time onboarding/PS — UNKNOWN, input; (4) compute nodes at the buyer's effective cloud rate after RI/CUD/spot, or on-prem depreciation + power/cooling + DC; (5) control-plane overhead (≥4 vCPU/32GB + Postgres + MinIO/object store); (6) object storage $/GB-month; (7) egress/cross-region $/GB; (8) platform ops FTEs (Kubernetes/SRE) — IOMETE omits this from its tables; (9) migration engineering (3–12 months by IOMETE's own ranges); (10) FinOps/optimisation tooling avoided or incurred.
- Because IOMETE's license is capacity-based while SaaS is consumption-based, the biggest swing factor in any comparison is cluster utilisation; the calculator should expose hours/month and % of licensed vCPUs actually used.

### Gaps
- UNKNOWN: any Gartner/Forrester/IDC TCO model specific to self-hosted lakehouses; the 2025 Gartner Market Guide is paywalled and its IOMETE content is not public.
- UNKNOWN: IOMETE's recommended ops staffing (FTEs) per cluster size; docs reference "Kubernetes cluster recommendations ... in the setup guide" but figures were not retrievable.

---

## 8. Support, SLAs, professional services, onboarding

### Takeaway
IOMETE publishes three enterprise support plans (Silver, Gold, Platinum) with severity-based response targets (Sev 1 from 1 hour down to 30 minutes, 24x7x365), ticket volume limits, and portal-user caps; prices are not published. Professional services and onboarding are offered but "Scoped separately" with no rate card. No uptime SLA is published (the software is self-hosted, so IOMETE disclaims the customer environment).

### Cited Findings
- **Silver ("Enterprise support")**: Scope "Non-custom break/fix"; Type "Round robin"; Expert "Customer support engineer"; Amount "Max 5 tickets per month via portal"; Updates & patches "Included"; Portal user access "Max 2"; Hours: "Sev 1: 24x7x365 / Sev 2, 3 & 4: 9am–6pm Local M–F"; SLA response: Sev 1 "1 hour", Sev 2/3/4 "1 business day"; Upgrade ticket to urgent "Not included"; Priority support queue "Not included"; Onboarding services "Scoped separately". — [IOMETE Pricing](https://iomete.com/pricing)
- **Gold ("Priority Enterprise support")**: Scope "Break/fix + general technical inquiries"; Round robin; Customer support engineer; "Unlimited via portal"; patches included; portal users "Max 5"; hours same as Silver; SLA: Sev 1 "1 hour" (live page), Sev 2 "4 hours", Sev 3 "8 hours", Sev 4 "1 business day"; upgrade to urgent "Included"; priority queue "Not included". — [IOMETE Pricing](https://iomete.com/pricing)
- Gold Sev 1 was "30 minutes" in the April and September 2025 captures; it is "1 hour" on the live page, consistent with PricingSaaS's 28 Sep 2026 change log "IOMETE doubles Gold plan's SEV 1 response SLA to 1 hour". — [Wayback 20 Apr 2025](https://web.archive.org/web/20250420102031/https://iomete.com/pricing); [PricingSaaS IOMETE](https://pricingsaas.com/companies/iomete)
- **Platinum ("Dedicated support")**: Scope "Break/fix + general technical inquiries"; Type "Dedicated expert"; Expert "Technical support engineer"; Amount "Unlimited via portal and Slack/email"; patches included; portal users "Max 5 per BU"; Hours "Sev 1 & 2: 24x7x365 / Sev 3 & 4: 9am–6pm Local M–F"; SLA: Sev 1 "30 minutes", Sev 2 "4 hours", Sev 3 "8 hours", Sev 4 "1 business day"; upgrade to urgent "Included"; priority queue "Included"; onboarding "Scoped separately". — [IOMETE Pricing](https://iomete.com/pricing)
- Support marketing copy: "IOMETE's enterprise support ensures your data operations stay on track with flexible plans tailored to your needs. ... From essential troubleshooting to priority assistance, we offer round-the-clock help and expert guidance. For critical workloads, upgrade to dedicated support with direct access to our team". Professional services: "hands-on help covering onboarding through advanced optimization" with "Get in touch" CTA; no pricing. — [IOMETE Pricing](https://iomete.com/pricing)
- Tier mapping: Free = "Community support"; Enterprise = "Enterprise support"; Business Critical = "Enterprise support + Dedicated engineers". — [IOMETE Pricing](https://iomete.com/pricing)
- Legal: support provided at the level "specified in the applicable Order Form, in accordance with the Support Policy"; "IOMETE is not responsible for the availability or performance of the Customer Environment" (§9.1); warranty of "substantial conformity with the Documentation" with refund remedy (§8.1); services "professional and workmanlike manner", claims within 30 days of SOW completion. — [IOMETE Software License Agreement](https://iomete.com/policies/software-license-agreement)
- Support channels: Jira Service Desk portal (https://iomete.atlassian.net/servicedesk/customer/portals); support@iomete.com; prospects info@iomete.com or Calendly discovery call; page promises to "respond promptly" but defines no SLA, severity definitions, hours or what "community support" means. — [IOMETE Docs: Support](https://iomete.com/resources/getting-started/support)
- "No public uptime percentage or external status page." — [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)
- Historical (2023/2024 feature table): "First Class Onboarding", "Migration Assistance", "Enterprise Level 24 x 7 Support", "Dedicated Communication Channel (e.g. Slack, MS Teams, Discord)", "SLA" listed as features. — [Wayback 7 Nov 2024](https://web.archive.org/web/20241107201839/https://iomete.com/pricing)
- Training asset: "IOMETE University" at iomete.com/university. — [IOMETE Free Plan](https://iomete.com/pricing/free-plan)

### Inferences
- "Enterprise support" bundled in the Enterprise tier most plausibly corresponds to Silver (whose subtitle is literally "Enterprise support"), with Gold ("Priority Enterprise support") and Platinum ("Dedicated support") as paid uplifts; Business Critical's "Dedicated engineers" aligns with Platinum. IOMETE does not state this mapping explicitly.
- Response-time SLAs are the only SLAs; there is no availability SLA because the customer runs the software.

### Gaps
- UNKNOWN: price of Silver/Gold/Platinum (absolute or % of license).
- UNKNOWN: what "Community support" consists of (forum? GitHub issues? Slack?). No community forum URL found; GitHub org exists.
- UNKNOWN: professional-services day rates, typical onboarding package scope/duration, or whether onboarding is mandatory for Enterprise.
- UNKNOWN: contents of the "Support Policy" referenced in the SLA; not published at a found URL.

---

## 9. Partners, resellers, system integrators

### Takeaway
IOMETE runs a three-track partner program (Technology, Implementation, Reseller) with commission-based referral economics, but names no partners in text (logos only). Public evidence of partners: DataLead Consulting (Azerbaijan-region services firm "actively promoting" IOMETE), Dell Technologies (customer and infrastructure partner; Dell ECS storage support), Smarttech Summit 2026 ("business partner"), and investor/accelerator relationships (Y Combinator, UtrechtInc, Caucasus Ventures, Eastlink Capital, innoland, Thunder Future, Velar Capital).

### Cited Findings
- Partner program page, verbatim: headline "Partner with IOMETE today."; tracks — Technology: "Integrate your solutions with IOMETE's platform to create powerful data solutions."; Implementation: "Help organizations implement and optimize their IOMETE data infrastructure." (four unnamed logos); Reseller: "Expand your portfolio with IOMETE's modern data platform solution." (four unnamed logos). Benefits: "Earn competitive commissions on all referred business."; "Access to dedicated partner support and resources."; "Explore joint marketing opportunities and effective campaign support." No requirements stated; inquiry form (name, company, email, country, phone, partnership type, message, how you heard). — [IOMETE Partner Program](https://iomete.com/partner-program)
- SLA §6.4: purchases "through a Reseller are governed by a separate Reseller Arrangement" for invoicing and payment — confirms a reseller channel exists contractually. — [IOMETE Software License Agreement](https://iomete.com/policies/software-license-agreement)
- Contact form offers "Partnership opportunities" as a contact reason. — [IOMETE Contact](https://iomete.com/contact-us)
- DataLead Consulting (CEO Ruslan Mammadov): "actively promoting the Data Lakehouse solution by IOMETE"; "we are actively developing expertise in the field of Data Lakehouse"; firm background in Oracle/MS-SQL/PostgreSQL DBA services, "More than 20 years of experience", government and banking clients; article does not label it reseller vs integrator. — [InfoCity (Oct 2024)](https://infocity.tech/2024/10/data-lakehouse-its-time-to-step-into-the-future-of-data-management/)
- Dell Technologies: named customer in Oct 2024 ("continues to expand the use of the platform"), >20 PB deployment per Sept 2026 press, logo on homepage, Dell ECS listed as supported object storage. — [InfoCity (Oct 2024)](https://infocity.tech/2024/10/data-lakehouse-its-time-to-step-into-the-future-of-data-management/); [Webrazzi (11 Sep 2026)](https://webrazzi.com/2026/09/11/kurumlarin-veriyi-kendi-altyapilarinda-tutmasina-odaklanan-girisim-iomete/); [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)
- Smarttech Summit 2026 post: "Thank you to our valued business partner, IOMETE" (event partnership). — [search result summary; original post not fetched]
- Technology integrations that function as ecosystem partners: Ataccama ONE documents an "iomete connection"; dbt adapter; Airflow, Prefect, Power BI, Tableau, Redash integrations; MLflow (per rfp.wiki). — [Ataccama docs: iomete connection](https://docs.ataccama.com/one/17.1.0/sources/iomete-connection.html); [IOMETE Docs index](https://iomete.com/resources); [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete)
- Historical: Dec 2023 site had a solutions page "IOMETE for Data resellers". — [Wayback 2 Dec 2023](https://web.archive.org/web/20231202055653/https://iomete.com/pricing)
- Investors/accelerators: Y Combinator (W22; "Convertible Note, $0.5M, February 9, 2022"), UtrechtInc (Netherlands), Eastlink Capital, Caucasus Ventures (Azerbaijan; investment announced 7 Oct 2024, amount undisclosed; fund typical ticket "$50,000 to $200,000"), innoland (Azerbaijan). Total raised: "$500K across 2 rounds" (CB Insights) vs "~$700K" (VCBacked, per search summary) — sources conflict. Webrazzi also lists Thunder Future and Velar Capital. — [CB Insights IOMETE financials](https://www.cbinsights.com/company/iomete/financials); [Tech.az (7 Oct 2024)](https://tech.az/en/posts/caucasus-ventures-has-invested-in-a-y-combinator-graduate-startup-4259); [Webrazzi (11 Sep 2026)](https://webrazzi.com/2026/09/11/kurumlarin-veriyi-kendi-altyapilarinda-tutmasina-odaklanan-girisim-iomete/)
- Analyst recognition: "IOMETE Included in the 2025 Gartner® Market Guide for Data Lakehouse Platforms" (press release 9 Dec 2025; blog 5 Dec 2025); IOMETE's own blog notes a Market Guide "is not a ranking or a purchase recommendation". — [IOMETE blog: Gartner Market Guide 2025](https://iomete.com/resources/blog/iomete-gartner-market-guide-2025); [CB Insights IOMETE](https://www.cbinsights.com/company/iomete)
- Review-site presence is thin: rfp.wiki reports "Sparse or no verified reviews on G2, Capterra, Software Advice, Trustpilot, and PeerSpot"; Capterra listing shows a 0.0 customer-service score with no reviews (search snippet). — [RFP.wiki IOMETE vendor profile](https://www.rfp.wiki/vendors/iomete); [Capterra iomete (snippet)](https://www.capterra.com/p/265658/iomete/)

### Inferences
- The partner economics disclosed ("commissions on all referred business") describe a referral/agent model; margin-based resale terms, if any, are in the private "Reseller Arrangement".
- Given the small team (11–50 per Gartner Peer Insights) and sub-$1M disclosed funding, implementation capacity is likely to come from partners like DataLead in-region; a sales tool should prompt reps to identify the implementation partner early.

### Gaps
- UNKNOWN: names of the eight implementation/reseller logos on the partner page (image-only).
- UNKNOWN: partner margins, tiering, certification requirements, deal registration.
- UNKNOWN: any global SI (Accenture, Deloitte, etc.) or cloud-provider co-sell relationship — none found.
- UNKNOWN: whether the Dell relationship is a formal reseller/OEM agreement or purely a customer deployment; no joint press release found.
