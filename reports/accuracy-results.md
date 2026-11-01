# Accuracy results

Run 2026-11-01 05:34 UTC against http://localhost:3107. Engine: **retrieval**. Corpus: 392 pages, 4717 chunks, fetched 2026-10-31.

| Measure | Result |
|---|---|
| Question runs correct | 145 / 145 |
| Confident wrong answers (said documented when the truth is unknown) | 0 |
| Refusal guard unit tests | 21 / 21 |

## Questions (5 runs each)

| Question | Expected | Got (first run) | Correct runs |
|---|---|---|---|
| What does Enterprise cost? | documented · price.enterprise | documented · price.enterprise · route ceo | 5/5 |
| Which Kubernetes distributions are supported? | documented · deploy.models | documented · deploy.models · route fde | 5/5 |
| Does it work with Okta? | documented · sec.sso | documented · sec.sso · route cro | 5/5 |
| Can IOMETE staff see our data? | documented · sec.support-access | documented · sec.support-access · route cro | 5/5 |
| Does it phone home? | documented · sec.telemetry | documented · sec.telemetry · route cro | 5/5 |
| Does it have data lineage? | documented · feat.lineage | documented · feat.lineage · route fde | 5/5 |
| Is IOMETE open source? | documented · what.license | documented · what.license · route ceo | 5/5 |
| What version is current? | documented · arch.version | documented · arch.version · route fde | 5/5 |
| Does it support Delta Lake? | documented | documented · - | 5/5 |
| Can it run air-gapped? | claimed · deploy.airgap | claimed · deploy.airgap · route fde | 5/5 |
| Is it cheaper than Databricks? | claimed · price.savings | claimed · price.savings · route ceo | 5/5 |
| How long does install take? | claimed · deploy.time | claimed · deploy.time · route fde | 5/5 |
| Is IOMETE ISO 27001 certified? | unknown · sec.iso27001 | unknown · sec.iso27001 · route cro | 5/5 |
| Is it SOC 2 Type II? | unknown · sec.type2 | unknown · sec.type2 · route cro | 5/5 |
| What is the breach notification window? | unknown · sec.breach | unknown · sec.breach · route cro | 5/5 |
| Do you have a pen test report? | unknown · sec.pentest | unknown · sec.pentest · route cro | 5/5 |
| Do you publish an SBOM? | unknown · sec.sbom | unknown · sec.sbom · route cro | 5/5 |
| How long are audit logs retained? | unknown · sec.retention | unknown · sec.retention · route cro | 5/5 |
| How much does support cost? | unknown · price.support-cost | unknown · price.support-cost · route ceo | 5/5 |
| Who are your customers? | unknown · co.case-studies | unknown · co.case-studies · route ceo | 5/5 |
| How much funding has IOMETE raised? | unknown · co.funding | unknown · co.funding · route ceo | 5/5 |
| What is the capital of France? | unknown | unknown · - | 5/5 |
| What is the minimum contract? | documented · price.enterprise | documented · price.enterprise · route ceo | 5/5 |
| How many people work at IOMETE? | documented · co.size | documented · co.size · route ceo | 5/5 |
| Is there a HIPAA BAA? | unknown | unknown · - | 5/5 |
| What SLA do you give for uptime? | unknown | unknown · - | 5/5 |
| I'm the CISO at an insurer | route cro | documented · - · route cro | 5/5 |
| I run data platforms at a bank | route fde | documented · - · route fde | 5/5 |
| I'm the CFO | route ceo | documented · - · route ceo | 5/5 |

## Refusal guard

| Sentence | Must | Rules fired | OK |
|---|---|---|---|
| IOMETE saves 40-60% compared to Databricks. | block | savings-as-fact | yes |
| You will save 3x on your data platform bill. | block | savings-as-fact | yes |
| IOMETE is ISO 27001 certified. | block | iso-27001-certified | yes |
| IOMETE holds a SOC 2 Type II report. | block | soc2-type2 | yes |
| IOMETE is FedRAMP authorised. | block | other-certs | yes |
| IOMETE never phones home and sends no telemetry. | block | no-telemetry | yes |
| See docs.iomete.com for the install guide. | block | dead-docs-domain | yes |
| Kapital Bank is a customer of IOMETE. | block | named-customer | yes |
| IOMETE has raised $12 million. | block | headcount-or-funding | yes |
| IOMETE provides full data lineage across pipelines. | block | lineage-shipped | yes |
| The IOMETE platform is fully open source. | block | platform-open-source | yes |
| There is a documented air-gapped install guide. | block | documented-airgap | yes |
| IOMETE is available on the AWS Marketplace. | block | marketplace | yes |
| IOMETE guarantees 99.9% uptime. | block | uptime-sla | yes |
| IOMETE claims customers save 30-60% compared to SaaS platforms. | pass | none | yes |
| ISO 27001 is not public; a job posting lists it as readiness work. | pass | none | yes |
| SOC 2 Type II is unknown from public sources. | pass | none | yes |
| The licence lets IOMETE collect telemetry and usage data. | pass | none | yes |
| Data lineage is on the roadmap backlog, not shipped. | pass | none | yes |
| Enterprise costs $500 per vCPU per year with a $100,000 minimum. | pass | none | yes |
| IOMETE is built on open-source engines, Apache Spark and Apache Iceberg. | pass | none | yes |
