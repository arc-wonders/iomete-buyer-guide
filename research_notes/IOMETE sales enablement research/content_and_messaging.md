# IOMETE Public Content Ecosystem and Messaging (as of 1 Nov 2026)

Research date: 1 November 2026. All web content was fetched on this date unless noted. Relative dates ("3w ago") are relative to 1 Nov 2026.

## Key Question 1: IOMETE University — URL, modules, audience, format, access

### Takeaway
IOMETE University lives at https://iomete.com/university (not a separate subdomain; `university.iomete.com` does not resolve). As of Nov 2026 it is a small, free, ungated library of nine YouTube videos grouped into three modules aimed at data engineers and platform teams; there are no text lessons, quizzes, or certificates.

### Cited Findings
- `university.iomete.com` does not exist (DNS lookup fails: "getaddrinfo ENOTFOUND university.iomete.com"). The live page is linked from the iomete.com footer under Resources as "IOMETE University" — [iomete.com footer](https://iomete.com); [IOMETE University](https://iomete.com/university)
- Page title/tagline: "IOMETE University — Learn the Sovereign Data Lakehouse"; description: "A growing library of practical lessons for data engineers, platform teams, and anyone building a sovereign data lakehouse with IOMETE." — [IOMETE University](https://iomete.com/university)
- Format: nine YouTube videos in three modules; no text lessons, quizzes, or certificates; no login gate; lesson links open YouTube directly; no pricing stated (effectively free) — [IOMETE University](https://iomete.com/university)
- Module 01: Compute Clusters ("Understand and operate Spark compute"):
  1. "What is a compute cluster? Apache Spark on Kubernetes explained" — https://www.youtube.com/watch?v=c8_ALw2U4y0
  2. "How a Spark cluster starts, scales and gets sized" — https://www.youtube.com/watch?v=aZ6xw150JCM
  3. "Cluster topology: production, staging, analytics and ETL" — https://www.youtube.com/watch?v=Eq7oqnc14BU
  — [IOMETE University](https://iomete.com/university)
- Module 02: Connections & Troubleshooting ("Connect tools and diagnose workloads"):
  4. "JDBC vs SparkConnect vs Arrow Flight: which one to use" — https://www.youtube.com/watch?v=gnOE4U1iifs
  5. "Spark UI and cluster tabs: where to look when a query fails" — https://www.youtube.com/watch?v=HQz61eVIhC0
  — [IOMETE University](https://iomete.com/university)
- Module 03: Apache Iceberg ("Recover, version, and govern your data" — snapshots, time travel, rollback, branches, tags):
  6. "I Deleted Production Data on Purpose — Apache Iceberg Time Travel Explained" — https://www.youtube.com/watch?v=68BUqf9RlL4
  7. "How to Recover Deleted Data in Apache Iceberg (Time Travel + Rollback)" — https://www.youtube.com/watch?v=9CE3sRpibhE
  8. "Apache Iceberg Branches & Tags: Git for Your Data" — https://www.youtube.com/watch?v=RxIMU6gEIuU
  9. "Apache Iceberg Time Travel in the Real World: Compliance, GDPR, A/B Testing & More" — https://www.youtube.com/watch?v=5r86OWqJ_dU
  — [IOMETE University](https://iomete.com/university)
- The University videos were uploaded roughly 2–3 months before 1 Nov 2026 (i.e., Aug–Sep 2026), per the YouTube channel listing — [IOMETE YouTube videos tab](https://www.youtube.com/@iomete/videos)

### Inferences
- The University is a repackaging of recent YouTube uploads into a curriculum; a buyer-education tool should link module pages via the University URL but embed/cite the YouTube URLs above.
- Audience is technical (data engineers/platform teams); there is no executive or business-track content in the University as of Nov 2026.

### Gaps
- Video durations: YouTube's rendered listing did not expose durations in the HTML fetched; not recorded.
- Whether more modules are planned ("growing library") — not stated.

## Key Question 2: YouTube channel — URL, counts, notable videos

### Takeaway
The IOMETE YouTube channel (https://www.youtube.com/@iomete, channel ID UCWviqGuFppqdHvhhAdMTgkg) is small: 298 subscribers and about 19 public videos as of 1 Nov 2026, with the most-viewed being the platform demo (~1.3K views). Content is tutorial/explainer-style, not conference talks.

### Cited Findings
- Channel name "IOMETE"; description "The self-hosted data lakehouse platform"; 298 subscribers; channel ID UCWviqGuFppqdHvhhAdMTgkg — [IOMETE YouTube videos tab](https://www.youtube.com/@iomete/videos) (parsed from page data on 1 Nov 2026)
- 19 videos appeared in the videos tab listing (view counts and ages as of 1 Nov 2026; durations not captured):
  - "Running IOMETE Multi-Cluster on Three Raspberry Pis" — 208 views, ~3 weeks ago (≈Oct 2026) — https://www.youtube.com/watch?v=7Xj2RTWX11I
  - "What is a compute cluster? Apache Spark on Kubernetes explained" — 117 views, ~2 months ago — https://www.youtube.com/watch?v=c8_ALw2U4y0
  - "How a Spark cluster starts, scales and gets sized" — 62 views, ~2 months ago — https://www.youtube.com/watch?v=aZ6xw150JCM
  - "Cluster topology: production, staging, analytics and ETL" — 31 views, ~2 months ago — https://www.youtube.com/watch?v=Eq7oqnc14BU
  - "JDBC vs SparkConnect vs Arrow Flight: which one to use" — 44 views, ~2 months ago — https://www.youtube.com/watch?v=gnOE4U1iifs
  - "Spark UI and cluster tabs: where to look when a query fails" — 92 views, ~2 months ago — https://www.youtube.com/watch?v=HQz61eVIhC0
  - "How to Recover Deleted Data in Apache Iceberg (Time Travel + Rollback)" — 43 views, ~3 months ago — https://www.youtube.com/watch?v=9CE3sRpibhE
  - "Apache Iceberg Branches & Tags: Git for Your Data" — 32 views, ~3 months ago — https://www.youtube.com/watch?v=RxIMU6gEIuU
  - "Apache Iceberg Time Travel in the Real World: Compliance, GDPR, A/B Testing & More" — 54 views, ~3 months ago — https://www.youtube.com/watch?v=5r86OWqJ_dU
  - "I Deleted Production Data on Purpose — Apache Iceberg Time Travel Explained" — 84 views, ~3 months ago — https://www.youtube.com/watch?v=68BUqf9RlL4
  - "Build a Real-Time IoT → Lakehouse Pipeline with ESP32 and IOMETE (No Kafka, No Brokers)" — 124 views, ~4 months ago — https://www.youtube.com/watch?v=hdqtldgv0Qs
  - "OpenMetadata integration with IOMETE" — 100 views, ~6 months ago — https://www.youtube.com/watch?v=kSGzV-Uw8No
  - "IOMETE 2025 Product Recap" — 331 views, ~10 months ago (≈Dec 2025/Jan 2026) — https://www.youtube.com/watch?v=F8lwJvwB7zo
  - "Data Lakehouse platform | IOMETE Demo" — 1.3K views, ~1 year ago — https://www.youtube.com/watch?v=zxNdNokUYFo
  - "Apache Superset connection with IOMETE" — 282 views, ~1 year ago — https://www.youtube.com/watch?v=t8oFRF1uTws
  - "Jupyter Container IOMETE" — 279 views, ~1 year ago — https://www.youtube.com/watch?v=d5dFoJV35-M
  - "Hide sensitive data in Spark Jobs" — 130 views, ~1 year ago — https://www.youtube.com/watch?v=XsRduyMxYis
  - "Hive Thrift to Apache Arrow 10x BI connectivity" — 212 views, ~1 year ago — https://www.youtube.com/watch?v=LdxLKu6MeVE
  - "Git integration IOMETE SQL Editor" — 252 views, ~1 year ago — https://www.youtube.com/watch?v=mJpovXfZRGE
  — [IOMETE YouTube videos tab](https://www.youtube.com/@iomete/videos)
- The YouTube channel is linked from the iomete.com footer and from the docs "Community and videos" section — [iomete.com](https://iomete.com); [IOMETE Documentation](https://iomete.com/resources)

### Inferences
- The single general-audience "demo" video ("Data Lakehouse platform | IOMETE Demo", ~1 year old) is the best candidate for a non-technical walkthrough link; everything else is engineer-oriented.
- Upload cadence accelerated in mid-2026 (nine University videos within ~2 months), coinciding with the hire of a Community & Developer Advocate (see Q4/Q8).

### Gaps
- Exact video durations and absolute upload dates (YouTube only exposed relative ages in the fetched HTML).
- Total channel view count and join date — not exposed in the fetched page.
- Whether additional videos exist beyond the first page of 19 (a continuation token was present in the page; not followed).
- No conference-talk recordings were found on the channel.

## Key Question 3: Blog — URL, cadence, topic clusters, representative posts, non-technical explainers

### Takeaway
The blog at https://iomete.com/resources/blog has ~120 posts (Jul 2022–Oct 2026), accelerating to roughly 4–5 posts/month in 2026, and clusters around (a) sovereignty/compliance (DORA, EU AI Act, CLOUD Act), (b) Apache Iceberg operations (maintenance, compaction, ACID, encryption), (c) Kubernetes-native data engineering, (d) cost/TCO and competitor alternatives (Snowflake, Databricks, Cloudera, Dremio), and (e) AI-readiness. Tags are Release / Educational / Company / Engineering / Technical / Security / Compliance.

### Cited Findings
- Blog URL and URL pattern: `https://iomete.com/resources/blog/<slug>`; filter categories: All, Release, Educational, Company, Engineering, Technical — [IOMETE Blog](https://iomete.com/resources/blog)
- Cadence: 44 posts Jan–Oct 2026 (~4–5/month, bursty: seven posts dated May 30, 2026 and four on Jun 1, 2026); ~34 posts in 2025; only six in 2024; ~27 in 2023; nine in 2022 — [IOMETE Blog](https://iomete.com/resources/blog)
- Featured post: "IOMETE in the 2025 Gartner® Market Guide for Lakehouses" (Dec 5, 2025; Announcement/Company) — https://iomete.com/resources/blog/iomete-gartner-market-guide-2025
- Representative posts (title — date — URL), by cluster:
  - Sovereignty/compliance:
    - "What Is a Sovereign Data Platform? A Precise Definition" — May 30, 2026 — https://iomete.com/resources/blog/what-is-a-sovereign-data-platform
    - "Data Sovereignty for the public sector: a platform blueprint" — Aug 27, 2026 — https://iomete.com/resources/blog/public-sector-data-sovereignty-platform
    - "Data Sovereignty for Regulated Finance: DORA & Private Cloud" — Jun 1, 2026 — https://iomete.com/resources/blog/data-sovereignty-regulated-finance-dora-private-cloud
    - "DORA and EU AI Act compliance: data infrastructure checklist for financial institutions" — Mar 10, 2026 — https://iomete.com/resources/blog/dora-eu-ai-act-financial-institutions-data-infrastructure
    - "CLOUD Act Reality Check: Encryption Does Not Guarantee Data Sovereignty" — Mar 3, 2026 — https://iomete.com/resources/blog/cloud-act-reality-check
    - "Data Residency vs Data Sovereignty: Why Location Alone Doesn't Protect Your Data" — Feb 24, 2026 — https://iomete.com/resources/blog/data-residency-vs-data-sovereignty
    - "Why IOMETE is built for regulated enterprise data teams" — Mar 4, 2026 — https://iomete.com/resources/blog/data-lakehouse-for-regulated-enterprises
    - "Understanding Cloud Repatriation: The Shift Back to On-Premises Infrastructure" — Aug 29, 2025 — https://iomete.com/resources/blog/cloud-repatriation
  - Cost / TCO / alternatives:
    - "How Fortune 500 Companies Cut Data Platform Costs 40-60% With Self-Hosted Lakehouses" — Jan 18, 2026 — https://iomete.com/resources/blog/fortune-500-cost-reduction-self-hosted-vs-saas-tco
    - "Why Enterprises Move from SaaS to Self-Hosted Lakehouses" — Jan 17, 2026 — https://iomete.com/resources/blog/why-2026-enterprises-move-saas-to-selfhosted-lakehouses
    - "Databricks alternatives for self-hosted data lakehouses in 2026" — Mar 10, 2026 — https://iomete.com/resources/blog/databricks-alternatives
    - "Snowflake Alternatives for Self-Hosted and On-Prem Data" — Mar 17, 2025 — https://iomete.com/resources/blog/snowflake-iomete
    - "Cloudera Alternatives 2026" — dated Mar 7, 2024 on page — https://iomete.com/resources/blog/cloudera-alternatives
    - "Dremio is now SAP: what it means and how to migrate" — Oct 13, 2026 — https://iomete.com/resources/blog/dremio-sap-migration-guide
    - "The Data Cloud Is Greedy: Who Pays for SaaS Margins?" — Jul 27, 2022 — https://iomete.com/resources/blog/the-data-cloud-is-greedy
  - Lakehouse fundamentals / Iceberg:
    - "Data Warehouse to Lakehouse Evolution" — Jan 17, 2024 — https://iomete.com/resources/blog/from-data-warehouses-to-data-lakehouses
    - "data lakehouse vs data warehouse vs data lake" — Nov 24, 2022 — https://iomete.com/resources/blog/data-warehouses-vs-data-lakehouses
    - "Apache Iceberg ACID Transactions for Data Lakehouses" — Dec 16, 2025 — https://iomete.com/resources/blog/apache-iceberg-acid-transactions-catalog
    - "Running Iceberg Maintenance in Production: A Practical Guide for Data Teams" — Jul 6, 2026 — https://iomete.com/resources/blog/iceberg-maintenance-production-guide
    - "Why Is My Iceberg Compaction So Slow?" — Dec 2, 2025 — https://iomete.com/resources/blog/iceberg-compaction-slow
    - "Merge-on-Read vs Copy-on-Write in the Real World" — Dec 3, 2025 — https://iomete.com/resources/blog/merge-on-read-vs-copy-on-write
    - "Lakehouse encryption: hands-on lab with SSE, CSE, Spark and Iceberg" — Feb 24, 2026 — https://iomete.com/resources/blog/iceberg-encryption-lab
    - "Top Reasons Iceberg Conquers Table Formats" — Aug 25, 2023 — https://iomete.com/resources/blog/why-apache-iceberg-is-winning-table-format
  - Kubernetes / architecture:
    - "How to Build a Self-Hosted Data Lakehouse on Kubernetes" — Mar 9, 2026 — https://iomete.com/resources/blog/self-hosted-data-lakehouse-kubernetes
    - "Control Plane vs Data Plane in Kubernetes and IOMETE" — Aug 7, 2026 — https://iomete.com/resources/blog/control-plane-vs-data-plane
    - "IOMETE Deployment Models: On-Prem, Cloud, Hybrid, Air-Gap" — Feb 10, 2025 — https://iomete.com/resources/blog/iomete-deployment-models
    - "Why Data Engineering Teams Are Moving to Kubernetes" — May 26, 2025 — https://iomete.com/resources/blog/kubernetes-data-engineering-benefits
    - "On-premises lakehouse reference architecture for banks" — Aug 27, 2026 — https://iomete.com/resources/blog/on-premises-lakehouse-reference-architecture-banks
  - Spark / engineering:
    - "Comet in IOMETE 4.0: Same SQL, 42% Less Time" — Sep 7, 2026 — https://iomete.com/resources/blog/apache-datafusion-comet-spark-acceleration
    - "Runtime PII & PHI Masking in the Spark Query Engine" — Jul 22, 2026 — https://iomete.com/resources/blog/runtime-pii-phi-masking-row-level-security
    - "Migrating from Oracle to IOMETE/Spark" — Sep 4, 2025 — https://iomete.com/resources/blog/oracle-to-spark-migration
  - AI:
    - "Why Enterprise AI Fails: It's the Data, Not the Model" — May 30, 2026 — https://iomete.com/resources/blog/why-enterprise-ai-fails-data-not-models
    - "Sovereign AI: Run ML on a Private-Cloud Lakehouse" — Jun 1, 2026 — https://iomete.com/resources/blog/sovereign-ai-ml-private-cloud-lakehouse
    - "The Four Pillars of AI-Ready Data" — May 30, 2026 — https://iomete.com/resources/blog/four-pillars-of-ai-ready-data
    - "Local Enterprise AI Development with IOMETE Platform" — Dec 10, 2025 — https://iomete.com/resources/blog/local-enterprise-ai-development-iomete
  - Industry / business:
    - "Banking Data Lakehouse Use Cases That Actually Ship" — May 30, 2026 — https://iomete.com/resources/blog/banking-data-lakehouse-use-cases
    - "Data lakehouse for banks: what regulated institutions actually need" — May 4, 2026 — https://iomete.com/resources/blog/data-lakehouse-for-banks
    - "AI Use Cases in Retail, Telecom, and Finance" — May 30, 2026 — https://iomete.com/resources/blog/ai-use-cases-retail-telecom-finance
    - "How Data Federation Reshapes the Org Chart" — May 30, 2026 — https://iomete.com/resources/blog/data-federation-reshapes-org-chart
    - "Proof at Scale: The Sovereign Lakehouse Is Not Theoretical" — May 30, 2026 — https://iomete.com/resources/blog/sovereign-lakehouse-proof-at-scale
    - "Why IOMETE Is an On-Premise Data Lakehouse" — Sep 26, 2023 — https://iomete.com/resources/blog/why-we-choose-to-be-the-on-premise-data-lakehouse
  All from — [IOMETE Blog index](https://iomete.com/resources/blog)
- Named authors seen on individual posts: Vusal Dadalov ("founder @IOMETE"), Aytan Jalilova ("Developer Advocate @ IOMETE"), Altay Aliyev ("Head of Customer Success at IOMETE"), Rocco Verhoef ("Software Engineer at IOMETE") — [Deployment Models](https://iomete.com/resources/blog/iomete-deployment-models); [Regulated enterprises](https://iomete.com/resources/blog/data-lakehouse-for-regulated-enterprises); [Sovereign data platform](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform); [Iceberg ACID](https://iomete.com/resources/blog/apache-iceberg-acid-transactions-catalog)
- Older posts are periodically re-dated with "Last updated on ..." stamps (e.g., the Jan 2024 lakehouse-evolution post shows "Last updated on Oct 22, 2026") — [Data Warehouse to Lakehouse Evolution](https://iomete.com/resources/blog/from-data-warehouses-to-data-lakehouses)
- The Fortune 500 cost post's own worked example ($134K/year vs Snowflake $120K–$180K) does not support its 40–60% headline; its case studies show 20%, 1%, and 38% savings — [Fortune 500 TCO post](https://iomete.com/resources/blog/fortune-500-cost-reduction-self-hosted-vs-saas-tco)

### Inferences
- Posts tagged EDUCATIONAL/COMPANY and written in business language — "What Is a Sovereign Data Platform?", "Data Residency vs Data Sovereignty", "CLOUD Act Reality Check", "Why Enterprise AI Fails", "Understanding Cloud Repatriation", "How Fortune 500 Companies Cut Data Platform Costs", "Data lakehouse for banks", "Banking Data Lakehouse Use Cases That Actually Ship", "How Data Federation Reshapes the Org Chart" — function as explainers for non-technical readers (CFO/CISO/CTO). The Iceberg/Kubernetes/Spark posts are for engineers.
- The Dec 2025–Jun 2026 burst aligns with a deliberate SEO/positioning shift from "self-hosted" to "sovereign" vocabulary.

### Gaps
- Author bylines are not shown on the index page; only confirmed for the posts fetched individually.
- Two index dates look anomalous ("Cloudera Alternatives 2026" dated Mar 7, 2024; "Dremio is now SAP" dated Oct 13, 2026) — recorded as displayed.

## Key Question 4: LinkedIn — company page, followers, themes, example posts, advocates

### Takeaway
IOMETE's LinkedIn company page (https://www.linkedin.com/company/iomete/) had 12,175 followers on 1 Nov 2026, with the tagline "The Sovereign Data Lakehouse Platform | Your Data. Your Future." Recent posts (Oct 2026) center on product features (Event Streams, resource bundles, cluster creation), partner validations (Nutanix, SUSE, Wasabi), and regional reseller partnerships (Indonesia, India). The named employee advocates are co-founder/CEO Vusal Dadalov and Community & Developer Advocate Shyaamal Tripathi; posts by engineer Abhishek Pathania are reshared by the company.

### Cited Findings
- Followers: 12,175; tagline "The Sovereign Data Lakehouse Platform | Your Data. Your Future."; About excerpt "modern data lakehouse for enterprises that need stellar performance"; HQ Mountain View, California, second location Amsterdam, NL; "View all 43 employees" shown while company size listed as 11–50; industry Software Development; founded 2021, privately held; website https://www.iomete.com — [IOMETE LinkedIn (guest view)](https://www.linkedin.com/company/iomete/)
- Recent company posts (relative dates as of 1 Nov 2026):
  - 23h: Event Streams, "a Rust-based ingestion engine that takes JSON over HTTP and writes it into Iceberg tables"
  - 1d: IOMETE is Nutanix Ready validated on Nutanix Kubernetes Platform (NKP) 2.18 — "Your Nutanix cluster can now run a full lakehouse."
  - 4d: Event Streams — "One HTTP endpoint, no client libraries"
  - 5d: partnership with ICS Compute (Jakarta) for self-hosted lakehouses in Indonesia and ASEAN
  - 2w (repost): Abhishek Pathania on PII/PHI masking and row-level security "directly within Spark at query time"
  - 2w: hiring an AI Software Engineer, Data Lakehouse Intelligence, in the Netherlands
  - 2w: partnership with Jaipur-based Dataxis Labs — "we're bringing self-hosted data lakehouses to Indian enterprises"
  - 3w: resource bundles (one group owns Spark clusters/jobs; others get view/run/query access)
  - 3w (repost): Wasabi Technologies S3-compatible storage support; IOMETE "handles lakehouse compute, catalog management, and data governance"
  - 3w: creating a Spark cluster via a single form (driver/executor sizing, idle executor scale-down)
  — [IOMETE LinkedIn (guest view)](https://www.linkedin.com/company/iomete/)
- Vusal Dadalov's LinkedIn profile (co-founder/CEO) references a Stanford panel on October 15, 2026 and states IOMETE is "SUSE Ready certified" (search-snippet level) — [Vusal Dadalov LinkedIn](https://www.linkedin.com/in/vusaldadalov/)
- Shyaamal Tripathi is "a Community & Developer Advocate at IOMETE"; he "became lead organizer of hackCBS" in 2021 and is "building community presence for IOMETE, a data lakehouse platform" "in a technical space dominated by companies with far larger marketing budgets." His stated approach: "Content is your community when you don't have a platform." — [Community Inc.: "Community Before a Home"](https://community.inc/article/community-before-a-home); profile: [Shyaamal Tripathi LinkedIn](https://www.linkedin.com/in/shyaamal-tripathi-a389051b3/)
- A hackCBS contributor's LinkedIn post announced: "We're excited to welcome IOMETE as our Data & AI Partner for hackCBS!" ... "Thank you, IOMETE, for supporting hackCBS!" (search snippet; attributed to the profile of Muskan Goyal) — [Muskan Goyal LinkedIn](https://www.linkedin.com/in/its-muskan-goyal/)
- Other IOMETE social handles: X at x.com/iometedata; GitHub github.com/iomete — [iomete.com footer](https://iomete.com); [IOMETE GitHub](https://github.com/iomete)

### Inferences
- Recurring LinkedIn themes: (1) "sovereign/self-hosted lakehouse" positioning; (2) infrastructure-partner validations (Nutanix, SUSE, Wasabi, Dell); (3) emerging-market channel partnerships (Indonesia, India); (4) feature drops framed as simplicity ("one form", "one HTTP endpoint"); (5) security controls (masking, RLS).
- The India push (Dataxis Labs partnership, hackCBS sponsorship, an India-based community advocate) suggests hackCBS is part of a deliberate India developer-awareness effort.

### Gaps
- Direct permalinks to individual LinkedIn posts were not retrievable (LinkedIn returned HTTP 999 for profile pages; company-page posts were visible only as truncated guest-view text without URLs).
- Follower counts for individual advocates and Piet Jan de Bruin's posting activity — not retrieved.

## Key Question 5: Whitepapers, ebooks, webinars, podcasts, conference appearances

### Takeaway
IOMETE publishes no gated whitepapers or ebooks on its site as of Nov 2026; the docs/blog/University/YouTube are the whole content library. The only confirmed podcast is the Data Engineering Podcast (E332, Oct 2022). Confirmed speaking is limited to a regional Azerbaijani conference ("Lakehouse on Kubernetes" at Digital Heights) and an Oct 2026 Stanford panel mention; no Data + AI Summit, KubeCon, or Big Data LDN appearances were found.

### Cited Findings
- iomete.com footer "Resources" contains only: IOMETE blog, Partner program, FAQ, Trust center, Documentation, IOMETE University, Product roadmap, GitHub — no webinars, whitepapers, or events links — [iomete.com](https://iomete.com)
- The docs hub (https://iomete.com/resources) lists Getting Started, Guides, Reference, Integrations, Tutorials, Blog, Public Roadmap (https://iomete.com/roadmap), YouTube, GitHub; "The page doesn't include whitepapers, ebooks, webinars, case studies" — [IOMETE Documentation](https://iomete.com/resources)
- Docs entry points: "What is IOMETE?" https://iomete.com/resources/getting-started/what-is-iomete; Platform Tour https://iomete.com/resources/getting-started/platform-tour; Architecture https://iomete.com/resources/getting-started/architecture; Install https://iomete.com/resources/deployment/on-prem/install — [IOMETE Documentation](https://iomete.com/resources)
- Podcast: Data Engineering Podcast E332, "Making The Open Data Lakehouse Affordable Without The Overhead At Iomete", published 10 Oct 2022, host Tobias Macey, guest Vusal Dadalov, ~55 min; host intro calls IOMETE "an open and affordable lakehouse platform"; summary: built to "make the data lakehouse available to a wider audience" with "the motivation for a truly open architecture" — [Data Engineering Podcast](https://www.dataengineeringpodcast.com/episodepage/making-the-open-data-lakehouse-affordable-without-the-overhead-at-iomete)
- Conference: Digital Heights (Azerbaijan) listed "Vusal Dadalov Co-founder & CEO / iomete" with session "Lakehouse on Kubernetes" (11:30–12:00); page is an older archived version, year not stated — [Digital Heights](https://digitalheights.az/old-ver)
- Sessionize profile: "Co-founder of IOMETE, 'The Self-Hosted Data Lakehouse Platform'"; bio: on-prem lakehouse for highly regulated industries; ex-Uber distributed systems engineer; building "an open, vendor-agnostic data platform on Apache Iceberg"; no sessions listed — [Sessionize: Vusal Dadalov](https://sessionize.com/vusal-dadalov/)
- Older blog posts state they derive from "a webinar series on building an on-premise lakehouse" (search-snippet level; the 2023 Engineering posts "How to Build An On-premise Data Lakehouse", "Apache Spark in On-Premise Lakehouse Architecture", "Apache Iceberg in on-prem" are the likely artifacts) — [IOMETE Blog](https://iomete.com/resources/blog)
- Stanford panel on October 15, 2026 referenced on Dadalov's LinkedIn (snippet only; role unclear) — [Vusal Dadalov LinkedIn](https://www.linkedin.com/in/vusaldadalov/)
- Press: Webrazzi (Turkish tech press) profile, 11 Sep 2026: founders Vusal Dadalov (Azerbaijani; ex-Azercell, OLX Group, Careem, Uber) and Piet Jan de Bruin (Dutch); Y Combinator W22; investors Y Combinator, Thunder Future, Caucasus Ventures (Oct 2024), plus Eastlink Capital and Velar Capital in databases; cites a Dell Technologies deployment "covering more than 20 petabytes" (figure from IOMETE); product described as "egemen veri platformu" (sovereign data platform); included in Gartner 2025 Data Lakehouse Platforms Market Guide ("a market overview, not a ranking") — [Webrazzi](https://webrazzi.com/2026/09/11/kurumlarin-veriyi-kendi-altyapilarinda-tutmasina-odaklanan-girisim-iomete/)
- Gartner inclusion is IOMETE's main third-party proof point, used on the homepage and in a dedicated post — [iomete.com](https://iomete.com); [Gartner post](https://iomete.com/resources/blog/iomete-gartner-market-guide-2025)

### Inferences
- For a citation tool, the "whitepaper equivalents" are the long-form blog guides (reference architecture for banks, public-sector blueprint, DORA checklist, TCO post) and the Gartner announcement.
- The absence of a webinar/events page means event participation must be tracked via LinkedIn.

### Gaps
- No Data + AI Summit, KubeCon, Big Data LDN, or Middle East/Central Asia conference listings were found via search; absence of evidence, not proof of absence.
- Digital Heights talk year not confirmed.
- No IOMETE-branded podcast or case-study PDFs found.

## Key Question 6: Personas, core pitch, taglines, the "three words"

### Takeaway
IOMETE's current (2026) copy leads with "The sovereign data platform. Your data, your future." and the tagline "The Sovereign Data Lakehouse Platform"; the stated buyers are regulated enterprises (banks, insurers, healthcare, public sector) with the CDO/CTO and security teams as decision-makers and data engineers/analysts/data scientists as users. The three-word triad "sovereign / lakehouse / open" is not used verbatim; IOMETE's own triad is "modern architecture + flexible deployment + control."

### Cited Findings
- Homepage: title "The Sovereign Data Lakehouse Platform | IOMETE"; H1 "The sovereign data platform."; sub-tagline "Your data, your future."; eyebrow "the data platform for the ai era"; claims: "IOMETE operates entirely within the customer's trust perimeter."; "Save 2-5x over SaaS/cloud."; "No vendor lock-in, so you keep your future options open."; "Get an open and flexible platform."; badges SOC2 Certified, HIPAA Compliant, GDPR Compliant; offers "forward-deployed engineers (FDEs)"; references the 2025 Gartner Market Guide — [iomete.com](https://iomete.com)
- Homepage logos (relationship not stated): OverDrive, Central Bank of Uzbekistan, Y Combinator, Mercury Bank, Pasha Bank, Dell Technologies, UZcard, State Customs Committee, Ministry of Digital Technologies of Uzbekistan, Pasha Technology, Ministry of Economics Azerbaijan, Kapital Bank — [iomete.com](https://iomete.com)
- Product vocabulary on homepage: "IOMETE Sovereign Data Platform"; components Data Lakehouse(s), Data Catalog, SQL Editor, Advanced Data Controls, Spark Jobs, ML Notebooks, Spark Connect, Orchestration Engine; deployment options On-premises, Public cloud, Private cloud, Hybrid; architecture pillars Open source, Apache Iceberg, Apache Spark, Data mesh, Data security, Integrations & ecosystem — [iomete.com](https://iomete.com)
- LinkedIn tagline: "The Sovereign Data Lakehouse Platform | Your Data. Your Future."; YouTube description: "The self-hosted data lakehouse platform" (older wording) — [LinkedIn](https://www.linkedin.com/company/iomete/); [YouTube](https://www.youtube.com/@iomete/videos)
- Sovereignty definition/triad: a sovereign data platform is one where "three properties hold simultaneously": modern architecture, flexible deployment, and real control — "Drop any one and the platform is hosted, not sovereign." Summarized as "Sovereign = modern architecture + flexible deployment + control"; callout "Sovereign by architecture"; theme "Sovereignty isn't a deployment option you toggle later"; "there's no exit tax" (re open formats); frames sovereignty as "one of the most consequential" questions a CDO will answer this decade — [What Is a Sovereign Data Platform?](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform)
- Stated buyers: "banks, insurers, healthcare systems, public sector organizations"; "Most data platform decisions come down to performance and price."; "The data platform decision for regulated enterprises isn't really about features. It's about architecture."; "Kubernetes by choice, not by capability."; "IOMETE deploys inside your Kubernetes cluster, where your key management infrastructure already lives."; deployment ~25 minutes on AWS/GCP (≈15 min Terraform + 5 min Helm); KMS integrations AWS KMS, Azure Key Vault, Google Cloud KMS, HashiCorp Vault; controls: row/column-level security, dynamic masking, tag-based policies; regulatory hooks GDPR Art. 32, DORA ICT risk framework, HIPAA Security Rule; "Field Data Engineers handle the operational side" so teams avoid "becom[ing] Kubernetes specialists" — [Why IOMETE is built for regulated enterprise data teams](https://iomete.com/resources/blog/data-lakehouse-for-regulated-enterprises)
- CFO framing: "CFOs hate consumption-based pricing because it's unpredictable."; section "Hidden Costs of SaaS Platforms That CFOs Hate"; "how CFOs are forcing migration away from consumption-based pricing models"; anecdote: retailer expected $30K/month on Snowflake, hit $180K (6x); pricing "IOMETE charges $500 per vCPU per year for software licensing", fixed regardless of query volume/data scanned/users, infrastructure billed separately; TCO table claims 20–30% savings vs Snowflake and 40–60% vs Databricks (mid-size), up to 50–70% vs Databricks (Fortune 500) — [Fortune 500 TCO post](https://iomete.com/resources/blog/fortune-500-cost-reduction-self-hosted-vs-saas-tco)
- CFO framing (sovereignty post): "predictable economics"; "Costs scale with infrastructure you already own," no "per-query premiums or vendor-mediated egress fees" — [What Is a Sovereign Data Platform?](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform)
- CISO framing: "Security and compliance teams at regulated enterprises spend significant time on vendor risk assessments"; IOMETE turns vendor questions into internal ones; compliance "becomes structural rather than aspirational" — [Regulated enterprises post](https://iomete.com/resources/blog/data-lakehouse-for-regulated-enterprises); [Sovereign data platform post](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform)
- CTO/engineer framing: consolidation — SQL, Python, Java, Scala, R on the same data "without forcing them onto separate systems"; "Kubernetes-native software"; "A lakehouse in the literal sense: one storage layer, multiple workloads, open formats throughout." — [Sovereign data platform post](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform)
- Earlier (2022) positioning: "an open and affordable lakehouse platform"; make the lakehouse "available to a wider audience" — [Data Engineering Podcast E332](https://www.dataengineeringpodcast.com/episodepage/making-the-open-data-lakehouse-affordable-without-the-overhead-at-iomete)
- Deployment-model targeting: "ideal for organizations with strict data sovereignty requirements"; also those with existing data-center investments, regional sovereignty compliance needs, or existing cloud-provider relationships — [Deployment Models](https://iomete.com/resources/blog/iomete-deployment-models)

### Inferences
- Messaging evolution: 2022 "open and affordable lakehouse" → 2023–2025 "the self-hosted / on-premise data lakehouse platform" → 2026 "the sovereign data platform / sovereign data lakehouse platform." A tool should treat "self-hosted" and "sovereign" as synonyms in IOMETE's vocabulary.
- Role mapping for a buyer-education tool, in IOMETE's own words: CFO → predictable, fixed per-vCPU licensing vs consumption pricing, "2-5x" savings; CISO → "trust perimeter", "sovereign by architecture", your KMS/IdP/audit, vendor-risk reduction; CTO/architect → Kubernetes-native, open formats (Iceberg), no exit tax, control plane/data plane; data engineer → Spark on Kubernetes, Iceberg maintenance automation, Spark Connect, FDEs handle ops; student → University videos and GitHub.
- The titles "CFO" and "CISO" are mostly implicit in IOMETE copy (only the TCO post names CFOs explicitly); "CDO" is the executive title IOMETE names most.

### Gaps
- No single IOMETE page presents a role-by-role pitch; the role framing above is assembled from several posts.
- The exact triad "sovereign, lakehouse, open" was not found as a phrase in IOMETE material.
- "BYOC" and "air-gapped" do not appear on the homepage; "air-gapped" appears only in blog posts.

## Key Question 7: Glossary — how IOMETE's own material defines newcomer terms

### Takeaway
IOMETE's blog provides usable definitions for lakehouse, ACID, catalog, snapshot/metadata, control plane/data plane, on-prem/private cloud/hybrid, and sovereign platform; it does not formally define "data sovereignty", "data residency", "air-gapped", "BYOC", "time travel", or "compaction" in the posts fetched (though dedicated posts/videos exist on time travel and compaction).

### Cited Findings
- Data lakehouse: "A data lakehouse is a unified architecture that combines the best elements of data lakes and data warehouses"; adds ACID transactions, update/delete/merge, and governance to lake storage; lakes "predominantly operated on an insert and query basis"; warehouses "specifically designed to handle wide-column analytical systems" — [Data Warehouse to Lakehouse Evolution](https://iomete.com/resources/blog/from-data-warehouses-to-data-lakehouses)
- Lakehouse (sovereignty framing): "one storage layer, multiple workloads, open formats throughout" — [Sovereign data platform post](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform)
- ACID: "Atomicity: changes are applied all-or-nothing"; "Consistency: data remains valid after every operation"; "Isolation: concurrent operations do not interfere with each other"; "Durability: once committed, data is not lost" — [Apache Iceberg ACID Transactions](https://iomete.com/resources/blog/apache-iceberg-acid-transactions-catalog)
- Apache Iceberg: the table format at the core of IOMETE's platform; "Iceberg spec provides ACID guarantees" through immutable files and a single coordination point; file types: data files ("the files that contain the actual data"), manifest files ("detailed inventories grouping data files by snapshot"), and the metadata file ("the most important file, as it tracks which manifest lists belong to which snapshot") — [Apache Iceberg ACID Transactions](https://iomete.com/resources/blog/apache-iceberg-acid-transactions-catalog)
- Catalog: "The Iceberg Catalog on top provides three functions": "An overview of which databases, tables, and views exist"; "Store the location of the 'current' metadata file"; "Provide a transactional way to update the current metadata file to a new one" — [Apache Iceberg ACID Transactions](https://iomete.com/resources/blog/apache-iceberg-acid-transactions-catalog)
- Snapshot: "Readers in Iceberg always operate on a fixed snapshot that never changes during query execution." — [Apache Iceberg ACID Transactions](https://iomete.com/resources/blog/apache-iceberg-acid-transactions-catalog)
- Plain-language analogy (ACID/Iceberg): traditional databases are "a single waiter maintaining the book of all reservations"; "Iceberg inverts the system above" — customers update their own day-sheets ("Each reservation sheet (representing a day) can be copied and updated by any customer") and only the master-list pointer update needs coordination — [Apache Iceberg ACID Transactions](https://iomete.com/resources/blog/apache-iceberg-acid-transactions-catalog)
- Time travel / branches / tags: taught via University Module 03 videos ("Git for Your Data" framing; use cases compliance, GDPR, A/B testing) — [IOMETE University](https://iomete.com/university); the 2024 evolution post lists "time travel versioning" among lakehouse features without defining it — [Lakehouse Evolution](https://iomete.com/resources/blog/from-data-warehouses-to-data-lakehouses)
- Compaction / maintenance: dedicated posts "Why Is My Iceberg Compaction So Slow?" (Dec 2, 2025), "The Iceberg Maintenance Runbook: Snapshots, Orphan Files, and Metadata Bloat" (Dec 4, 2025), "Z-ORDER sorting during compaction" (Oct 25, 2023) — [IOMETE Blog](https://iomete.com/resources/blog) (definitions inside not extracted)
- Apache Spark: named among "processing engines such as Apache Spark, Apache Presto, and others" — [Lakehouse Evolution](https://iomete.com/resources/blog/from-data-warehouses-to-data-lakehouses); University Module 01 explains "Apache Spark on Kubernetes" and cluster sizing — [IOMETE University](https://iomete.com/university)
- Kubernetes: "It runs on Kubernetes, providing container orchestration."; control plane on Kubernetes for high availability — [Deployment Models](https://iomete.com/resources/blog/iomete-deployment-models)
- Control plane / data plane: "The Control Plane manages the overall platform operations" (resource allocation, security policies, monitoring); data planes handle processing/query execution and "Can operate in the same or different Kubernetes clusters"; "The Control Plane can manage multiple Data Planes across different locations" — [Deployment Models](https://iomete.com/resources/blog/iomete-deployment-models); see also [Control Plane vs Data Plane](https://iomete.com/resources/blog/control-plane-vs-data-plane)
- On-prem: "In an on-premises deployment, IOMETE operates entirely within the organization's data center infrastructure."; Private cloud: "follows a similar architectural pattern but operates within a private cloud environment."; Air-gapped: listed as a place IOMETE can run, not defined; described elsewhere as "air-gapped environments with no outbound connectivity" — [Deployment Models](https://iomete.com/resources/blog/iomete-deployment-models); [Sovereign data platform post](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform)
- Sovereign data platform: three simultaneous properties — modern architecture, flexible deployment, real control — [Sovereign data platform post](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform)
- Trust perimeter: "IOMETE operates entirely within the customer's trust perimeter." — [iomete.com](https://iomete.com); related terms "security perimeter" and "a single customer-controlled boundary" — [Sovereign data platform post](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform)
- Storage: works with any S3-compatible storage (AWS S3, Azure Blob, GCP Cloud Storage, MinIO, Ceph) — [Regulated enterprises post](https://iomete.com/resources/blog/data-lakehouse-for-regulated-enterprises)
- Connection protocols (JDBC vs Spark Connect vs Arrow Flight) explained in University Module 02 — [IOMETE University](https://iomete.com/university)
- Data residency vs sovereignty: dedicated explainer "Data Residency vs Data Sovereignty: Why Location Alone Doesn't Protect Your Data" (Feb 24, 2026) — https://iomete.com/resources/blog/data-residency-vs-data-sovereignty (not fetched; title only)

### Inferences
- For "data sovereignty", "data residency", "air-gapped", "BYOC", "time travel", and "compaction", a tool should link the dedicated IOMETE post/video but supply its own neutral definition, since IOMETE's fetched copy does not define them crisply.
- IOMETE never uses "BYOC" as a term; its equivalents are "your cloud account"/"dedicated cloud account" and "private cloud."

### Gaps
- Definitions inside the compaction, time-travel, data-residency, and CLOUD Act posts were not extracted (titles and URLs only).
- No IOMETE glossary page exists on the site as far as found.

## Key Question 8: hackCBS 9.0 and IOMETE's "Make Complex Tech Easy to Buy" track; past hackathon sponsorships

### Takeaway
hackCBS 9.0 ran offline on 31 Oct–1 Nov 2026 at Shaheed Sukhdev College of Business Studies, New Delhi, organized by Kronos (the SSCBS tech society). IOMETE is the "DATA & AI PARTNER" and sponsors an "exclusive challenge" titled "Make Complex Tech Easy to Buy" whose prize is mechanical keyboards for the top 2 winning teams (the ₹50,000 cash prize sometimes attributed to IOMETE actually belongs to title sponsor YugabyteDB's "Outstanding AI Agent Innovation" track). The track's problem statement text, judging criteria, and winners were not published on the site at the time of research; no prior IOMETE hackathon sponsorships were found.

### Cited Findings
- Event: "hackCBS 9.0 takes place offline on 31 October and 1 November 2026 at Shaheed Sukhdev College of Business Studies in New Delhi, Delhi, India."; organizer "Kronos - The Tech Society of SSCBS"; billed as "India's Biggest Student-run Hackathon", "Delhi University's first-ever Hackathon-cum-Conference and Asia's first MLH Member Hackathon"; "Prizes worth $220,000 USD, Unlimited Swag and much more." (meta description); "24 hours of building, learning, and hacking" — [hackCBS 9.0 site, structured data](https://hackcbs.tech/)
- Participation rules: teams of 2–4; students only (student ID verified); beginners welcome; no registration fee; international students welcome; support email hackcbssupport@gmail.com — [hackCBS 9.0 FAQ](https://hackcbs.tech/)
- Sponsors (from site JS data): TITLE SPONSOR — YugabyteDB; category partners — "DATA & AI PARTNER: IOMETE (https://iomete.com/)", "TECHNOLOGY PARTNER: Logitech", CAREER PARTNER, "HIRING PARTNER: GolfAI", "MEDIA PARTNER: Eventopia"; "PUBLISHING PARTNER: Minisodas Labs"; "PRODUCTION AI PARTNER: Prune"; "DOMAIN PARTNER: .xyz"; ECOSYSTEM PARTNER: Solana; "LEARNING PARTNER: Codecrafters"; "AI GROWTH PARTNER: Tin Computers"; "EVENT PARTNER: MLH" — [hackCBS 9.0 site bundle](https://hackcbs.tech/assets/index-DPsCUJyT.js)
- IOMETE sponsored track (exact site data): eyebrow "An exclusive challenge", title "Make Complex Tech Easy to Buy", prize "Mechanical Keyboards", detail "For the TOP 2 winning teams" — [hackCBS 9.0 site bundle](https://hackcbs.tech/assets/index-DPsCUJyT.js)
- YugabyteDB sponsored track (for disambiguation): "EXCLUSIVE PROBLEM STATEMENT" "Outstanding AI Agent Innovation"; 1ST PRIZE ₹50,000 Cash Prize; 2ND PRIZE "Awesome Tech Gadgets" "For the first runner-up team" — [hackCBS 9.0 site bundle](https://hackcbs.tech/assets/index-DPsCUJyT.js). Note: a web-search summary attributed the ₹50,000 to the IOMETE track; the site's own data contradicts this — [search result summary](https://hackcbs.tech/)
- Main prize ladder: FIRST PLACE ₹50,000 "Cash prize for the national winner"; SECOND ₹35,000; THIRD ₹25,000; special prizes Best Beginner Team, Best Girls Team, Best Social Innovation (INR 5,000 each + swag); MLH prizes include "Best Use of Gemini API" (Kreo Mechanical Keyboards), "Best Use of Tiger Data" (Stream Decks), MongoDB (M5Stack IoT Kit), "Best Use of Solana" (hardware wallets) — [hackCBS 9.0 site bundle](https://hackcbs.tech/assets/index-DPsCUJyT.js)
- Themes: Cloud, EdTech, Artificial Intelligence, FinTech, Internet of Things, HealthTech, Open Innovation — [hackCBS 9.0 site bundle](https://hackcbs.tech/assets/index-DPsCUJyT.js)
- Schedule: Sat 31 Oct — 08:00 check-in, 09:30 opening ceremony, 12:00 hackathon begins, 16:00 mentoring + workshops, 22:30 mentoring II; Sun 1 Nov — 10:00 submissions start (soft), 12:00 final submission deadline and Judging Round 1, 16:00–17:00 "Judging Round 2 (Pitching)" by shortlisted teams, 17:00–18:00 "Closing Ceremony & Winners Announcement" — [hackCBS 9.0 site bundle](https://hackcbs.tech/assets/index-DPsCUJyT.js)
- Registration/submission: "Register Now" links to https://hackculture.io/hackathons/hackcbs-9-0; the site loads the Devfolio apply SDK (https://apply.devfolio.co/v2/sdk.js); Discord: https://discord.gg/hackcbs-745636507263696928 (footer also http://bit.ly/hackcbs_discord); socials: https://www.instagram.com/hackcbs/, https://www.linkedin.com/company/hackcbs, https://x.com/hackCBS, https://www.facebook.com/hackcbs/; MLH Code of Conduct applies — [hackCBS 9.0 site](https://hackcbs.tech/); [bundle](https://hackcbs.tech/assets/index-DPsCUJyT.js)
- A hackcbs-9.devfolio.co page returned 404; the prior edition's Devfolio page exists at https://hackcbs-8.devfolio.co/ — [hackCBS 8.0 Devfolio](https://hackcbs-8.devfolio.co/)
- IOMETE's link to hackCBS: Shyaamal Tripathi, IOMETE's Community & Developer Advocate, was hackCBS lead organizer from 2021 and describes hackCBS as having "became one of India's largest student-run hackathons" — [Community Inc.](https://community.inc/article/community-before-a-home); his LinkedIn post promoted hackCBS 9.0 (31 Oct–1 Nov 2026) citing one-on-one mentorship, late-night talks, and recruiter connections (search snippet) — [Shyaamal Tripathi LinkedIn](https://www.linkedin.com/in/shyaamal-tripathi-a389051b3/)
- hackCBS organizer-side announcement: "We're excited to welcome IOMETE as our Data & AI Partner for hackCBS!" (search snippet) — [Muskan Goyal LinkedIn](https://www.linkedin.com/in/its-muskan-goyal/)
- hackCBS YouTube channel exists (https://www.youtube.com/c/hackCBS) with an "OPENING CEREMONY" video — [hackCBS YouTube](https://www.youtube.com/c/hackCBS); [Opening ceremony video](https://www.youtube.com/watch?v=JwMZfChm240) (edition not verified)

### Inferences
- "Make Complex Tech Easy to Buy" reads as a go-to-market/buyer-education challenge (explain a complex infrastructure product to non-technical buyers) rather than a build-on-IOMETE technical challenge; this matches the brief for a persona-based buyer-education tool. This is an inference from the title; the problem statement itself was not published on the site.
- Judging for all tracks follows the general two-round structure (Round 1 evaluation at 12:00, Round 2 pitching 16:00–17:00 on 1 Nov); IOMETE-specific criteria, if any, were likely communicated via Devfolio/Discord rather than the public site.

### Gaps
- Full problem-statement text, judging criteria, and submission form for the IOMETE track: not on hackcbs.tech; no public Devfolio page for 9.0 found (404); Discord content not accessible.
- Winners of the IOMETE track (event concluded 1 Nov 2026, the research date): not yet published anywhere found.
- Participant count for 9.0: not stated on the site.
- Past hackathons sponsored by IOMETE and what won: no evidence found in searches; hackCBS 9.0 appears to be the first publicly visible IOMETE hackathon sponsorship.
- Direct URLs for the IOMETE/hackCBS LinkedIn sponsor posts: LinkedIn blocked fetches (HTTP 999); only profile URLs are available.
