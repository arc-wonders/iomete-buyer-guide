# IOMETE Security, Compliance & Governance Posture (public sources only) + Vendor Security Questionnaire Structure

Research date: 2026-11-01. Scope: what a "security questionnaire helper" could answer about IOMETE strictly from public documentation, what it must mark UNKNOWN, and the structure/size of standard questionnaires so an honest "unknown rate" can be computed.

Status labels used throughout: **DOCUMENTED** (exact public URL + wording), **IMPLIED** (reasonable reading of public material, not stated outright), **UNKNOWN** (not found in any public source checked).

Important navigation note for the report writer: `docs.iomete.com` does NOT resolve (DNS `ENOTFOUND` on 2026-11-01). IOMETE's documentation lives at `https://iomete.com/resources/...` (source repo `github.com/iomete/iom-docs`). All doc URLs below use that base.

---

## Key Question 1: Certifications and attestations IOMETE publicly claims (SOC 2, ISO 27001, GDPR, HIPAA, PCI, FedRAMP, trust center)

### Takeaway
IOMETE publicly documents a **SOC 2 Type I** report (Dec 2022, Prescient Assurance) and displays "SOC2 Certified / HIPAA Compliant / GDPR Compliant" badges on its homepage with no scope detail; it has a Vanta-hosted Trust Center whose contents could not be read (JavaScript-rendered). A removed job posting shows SOC 2 **Type II** and **ISO 27001** were still "readiness" projects in 2026. ISO 27001, SOC 2 Type II, PCI DSS and FedRAMP are **UNKNOWN / not claimed** in any public page found.

### Cited Findings

**DOCUMENTED**
- Homepage displays three compliance badges: "SOC2 Certified, HIPAA Compliant, and GDPR Compliant. The page does not provide supporting detail or certification scope." Also: "IOMETE operates entirely within the customer's trust perimeter, whether on-premises or in the customer's cloud account." and "The cornerstone of our security strategy is our unique self-hosted architecture." — [IOMETE homepage](https://iomete.com/)
- Trust Center link (header "Resources" menu and footer): `https://app.vanta.com/iomete.com/trust/mh7heslsoonlhblghsro7g` — [IOMETE homepage](https://iomete.com/); also linked from docs footer — [IOMETE docs landing](https://iomete.com/docs)
- SOC 2 blog post (published Dec 25, 2022; page stamp "Last updated on Oct 22, 2026"): IOMETE "achieved SOC 2 Type I compliance in accordance with" AICPA SSAE 18; "Achieving this standard with an unqualified opinion serves as third-party industry validation"; audited by **Prescient Assurance**. Trust Services Criteria covered, audit period, and how to request the report are NOT stated. No mention of ISO 27001/HIPAA/GDPR. — [IOMETE achieved SOC-2 compliance](https://iomete.com/resources/blog/soc-achievement)
- FAQ: Q "Can IOMETE meet GDPR, HIPAA, and SOC 2 requirements?" A: "Yes, because you control the entire deployment." (framed as customer-controlled compliance, not a vendor certification). Q "Is IOMETE suitable for government and defense use?" A: "Yes." — can run in "secure, air-gapped, or government-cloud environments with full audit trails." — [IOMETE FAQ](https://iomete.com/faq)
- Privacy Policy ("LAST UPDATED: NOV 11, 2024"): GDPR data-subject rights listed; EU GDPR representative "Vusal Dadalov, IOMETE INC., privacy@iomete.com"; DPO "Piet Jan de Bruin, IOMETE INC., 1049 El Monte Avenue, Ste C #762, Mountain View, CA 94040"; data "will be processed in the United States"; relies on "binding, standard data protection clauses" under GDPR Art. 46; subprocessor list is a linked Google Doc; security language is only "IOMETE endeavors to apply suitable safeguards"; **breach notification not addressed**; product telemetry not addressed (website-only). — [IOMETE Privacy Policy](https://iomete.com/policies/privacy-policy)
- Job posting (Compliance & Finance Operations Lead; removed "Wednesday, Sep 09, 2026"): duties include "Own and drive SOC 2 Type II compliance and audit readiness", "Lead ISO 27001 readiness and certification preparation", "Coordinate HIPAA readiness and security controls where required", "Manage Vanta"; desired experience "such as SOC 2, GDPR, HIPAA readiness, ISO 27001, and FEDRAMP". — [Built In London job listing](https://builtinlondon.uk/job/compliance-finance-operations-lead/9349489)
- Blog "Why IOMETE is built for regulated enterprise data teams" (Mar 4, 2026): HIPAA, GDPR, DORA appear only as regulations customers must meet; "The page doesn't claim IOMETE is certified under any of them." — [IOMETE blog](https://iomete.com/resources/blog/data-lakehouse-for-regulated-enterprises)
- Product "Data security" page: lists no named certifications; links to the Vanta Trust Center. — [IOMETE Data security](https://iomete.com/product/architecture/data-security)
- `https://iomete.com/security` returns HTTP 404 (no dedicated security page at that path). — [checked 2026-11-01](https://iomete.com/security)

### Inferences
- **IMPLIED**: Because the Sept-2026 job description assigns ownership of "SOC 2 Type II ... audit readiness" and "ISO 27001 readiness and certification preparation," SOC 2 Type II and ISO 27001 were most likely not yet achieved as of mid-2026. The homepage badge "SOC2 Certified" is therefore best read as resting on the 2022 Type I report unless the Trust Center shows otherwise.
- **IMPLIED**: "HIPAA Compliant" and "GDPR Compliant" badges are self-declarations (there is no HIPAA certification regime); no BAA template or GDPR DPA is published.
- A questionnaire helper should answer "SOC 2" = "Type I report (Dec 2022, Prescient Assurance); Type II: UNKNOWN", "ISO 27001" = UNKNOWN (readiness in progress per job posting), "PCI DSS" = UNKNOWN/not claimed, "FedRAMP" = UNKNOWN/not claimed.

### Gaps
- Vanta Trust Center contents (which frameworks, documents, subprocessors, controls it lists) — page is JS-rendered; raw HTML returned only the Vanta app shell; Chrome extension not connected. **Must be read manually in a browser.**
- SOC 2 Type I: Trust Services Criteria in scope, report date/period, whether a Type II has since been issued.
- ISO 27001, PCI DSS, FedRAMP, CSA STAR, TX-RAMP, Cyber Essentials, C5, ISO 27701, ISO 42001: no public claim found.
- Subprocessor list (Google Doc linked from privacy policy) not fetched.
- The "Security Addendum" and "Data Processing Addendum (DPA)" referenced in the license agreement are not published at guessable URLs (`/policies/security-addendum`, `/policies/dpa` both 404).

---

## Key Question 2: Documented security features in IOMETE docs (authN, authZ, encryption, KMS, network, air-gap, secrets, audit, lineage, catalog, retention, backup/DR, multi-tenancy)

### Takeaway
Identity/authorization/data-security controls are **well documented** (SAML 2.0, OIDC, LDAP/AD, SCIM, groups/roles, Resource Authorization System, access/masking/row-filter/tag-based policies, classifications with approval workflow, Kubernetes NetworkPolicies, Kubernetes/Vault secrets, Iceberg-backed audit tables). **Thinly or not documented**: encryption in transit between services (mTLS), TLS versions/ciphers, encryption of object storage (delegated to customer storage/KMS), log retention, SIEM export, backup/DR procedures, data lineage, data retention/deletion, MFA (delegated to IdP), and any air-gapped install procedure.

### Cited Findings

**Authentication — DOCUMENTED**
- Security Overview: methods are "local credentials, LDAP directory sync, and federated identity via SAML/OIDC"; named providers Okta, OneLogin, Microsoft Entra ID; SCIM provisioning; users "created locally or synced from an external directory." — [Security Overview](https://iomete.com/resources/user-guide/security-overview)
- SSO page: supports SAML 2.0 and OpenID Connect; "Your identity provider (IdP) must support at least one of these protocols." MFA is **not enforced by IOMETE**: "you can enable multi-factor authentication through your identity provider." Without SSO, users "can login to IOMETE using the username & password." Sub-pages: `/single-sign-on/saml`, `/oidc`, `/okta`, `/onelogin`, `/entra-id`, `/scim`, `/scim-okta`. — [SSO Configuration](https://iomete.com/resources/user-guide/single-sign-on)
- Users page: account types "Person or Service Account"; origins "IOMETE (local), LDAP (directory sync), or IDP (SAML/OIDC)"; most user management requires `IAM_MANAGER` admin role; new users get temporary password and forced "Update Password" on first login; service accounts get API access tokens. **Not covered**: MFA, password policy, session management. — [Users](https://iomete.com/resources/user-guide/users)
- LDAP guide (Oct 30, 2025): covers LDAP "or more commonly, Active Directory (AD)"; periodic full sync (suggested 86400s); nested groups via AD matching-rule OID `1.2.840.113556.1.4.1941`. **Not addressed**: LDAPS/TLS, bind credential storage, deprovisioning details. — [LDAP Integration blog](https://iomete.com/resources/blog/ldap-integration-and-automatic-sync)
- Release notes: v2.0.0 (Oct 7, 2024) removed Keycloak, moving "`LDAP` and `SAML/OIDC Connect` support" into IOMETE; v2.1.0 (Oct 31, 2024) "Implemented the System for Cross-domain Identity Management (SCIM) API." v4.0.1 (Oct 8, 2026): "A failed token sign-in no longer reveals whether the username exists"; "New tokens are stored only as a one-way hash." v3.19.0 (Aug 24, 2026): "LDAP sync now emits an audit event to `platform_event_logs` for every user↔group membership." — [Platform Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)

**Authorization / fine-grained data security — DOCUMENTED**
- Groups are "the primary unit of permission management" and "can be nested"; platform roles e.g. `IAM_MANAGER`, `DATA_SECURITY_AND_AUDIT_MANAGER`; Resource Authorization System (RAS) with Resource Bundles and per-resource-type permissions (e.g. `CREATE_COMPUTE`, `VIEW_SECRETS`); Data Security policies: Access Policy (SELECT/INSERT/UPDATE/DELETE/ALTER/CREATE on databases/tables/columns), Data Masking ("masked, hashed, null, or custom SQL"), Row-Level Filter ("appends a WHERE condition"), Tag-based Access Policy and Tag-based Data Masking via classification tags (e.g. `PII`) with an "approval workflow." — [Security Overview](https://iomete.com/resources/user-guide/security-overview)
- Data Security overview: policy engine not named; "Classifications must be predefined by admins or security teams"; adding/removing a classification requires approval and "Every change is tracked through Classification Requests." Sub-pages: access-policy, data-masking, row-level-filter, tag-based-access-policy, tag-based-data-masking, check-access, data-security-api, classifications, classification-best-practices. — [Data Security Overview](https://iomete.com/resources/user-guide/data-security/overview)
- Masking types: "Mask" (alpha→x, numeric→n), "Mask Hash", "Mask Null", "Mask Show Last 4", "Mask Show First 4", "Mask Date (Show Year)", "Custom" (user SQL expression), "Mask None". Applies "dynamically in the query output." "All data masking operations require the **Data Security and Audit Manager** admin role." — [Data Masking](https://iomete.com/resources/user-guide/data-security/data-masking)
- Architecture page: Identity Service "also manages Apache Ranger policies"; Ranger policies "control row-level filtering, column masking, and table-level permissions"; Iceberg REST Catalog Service: "Every data request passes through" Ranger policy enforcement. — [Architecture](https://iomete.com/resources/getting-started/architecture)
- Release notes v2.0.0 (Oct 7, 2024): "We have removed Apache Ranger, fully integrating its data access policy management functionality within IOMETE." (Note: later docs/release notes still refer to "Ranger policies"/"Ranger audit" — the Ranger policy model appears retained internally; exact current engine is IMPLIED, see below.) — [Platform Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)
- Release notes v3.18.0 (Aug 5, 2026): read-only admin role "grants read-only (GET) access to all admin APIs without any write access." v4.0.1: domain endpoints "now require access to the domain and the matching permission." — [Platform Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)
- Marketing (Data governance page): "Role-based access control (RBAC)", "Column-level security", "Row-level security", "Dynamic data masking", "Tag-based access policies", "Hierarchical security policies". — [Data governance](https://iomete.com/product/data-platform/data-governance)
- Marketing (Data security page): "SAML 2.0 integration", "OAuth support", "LDAP integration", "Multi-factor authentication", "Row-level security", "Column-level security", "Dynamic data masking", "Tag-based access policies", "Comprehensive audit logs", "Activity monitoring", "Compliance reporting", "Security analytics". No encryption/KMS/lineage/multi-tenancy detail; footer "© 2025 IOMETE Inc." — [Data security](https://iomete.com/product/architecture/data-security)

**Encryption & key management — PARTIALLY DOCUMENTED (delegated to customer infrastructure)**
- Release notes v4.0.0 (Sep 30, 2026): platform secrets "encrypted with AES-256-GCM and scoped per domain"; "The encryption key is generated at install time and kept across every later upgrade"; REST catalog "no longer returns server-side credentials, including the database password and S3 access keys"; "Refresh tokens are verified against the signing key before new tokens are issued"; "Calls between a control plane and its data planes are verified with a shared trust secret." — [Platform Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)
- Ingress TLS: requires a Kubernetes TLS secret in `istio-system` matching the data plane DNS name; CA-issued or self-signed; set `ingress.httpsEnabled: true`. **TLS versions/ciphers, Istio mTLS, and internal traffic encryption not covered.** — [Configure Ingress](https://iomete.com/resources/deployment/configure-ingress)
- Deployment architecture: "PostgreSQL SSL is optional." When enabled JDBC uses `sslmode=verify-full`. Encryption at rest/in transit for object storage "is not covered." — [Deployment Architecture](https://iomete.com/resources/deployment/architecture-deployment)
- Regulated-enterprise blog (Mar 4, 2026): encryption at rest handled by the storage layer "using your own keys"; integrates with AWS KMS, Azure Key Vault, Google Cloud KMS, HashiCorp Vault; IOMETE "does not hold or manage your encryption keys itself"; CMK/BYOK "implemented at the infrastructure level." — [IOMETE blog](https://iomete.com/resources/blog/data-lakehouse-for-regulated-enterprises)
- Encryption blog (Dec 18, 2025): describes SSE-S3/SSE-KMS/SSE-C/client-side options; FAQ says IOMETE "relies on envelope encryption via cloud or external KMS systems." Term "BYOK" not used (uses "CMEK"). — [Data Lakehouse Encryption](https://iomete.com/resources/blog/data-lakehouse-encryption-iceberg)
- Marketing claims (unspecific): "Military-grade encryption", "Encryption at rest and in transit", "End-to-end encryption", "Secure key management". — [Data governance](https://iomete.com/product/data-platform/data-governance)

**Secrets management — DOCUMENTED**
- Backends: Kubernetes Secrets (default; domain secrets in `iomete-secret-store-{domain}`, global in `iomete-secret-store`), HashiCorp Vault (read-only integration, "Vault credentials are stored in dedicated Kubernetes secrets, never exposed via APIs"), platform database holds only references, values "fetched at runtime." Domain secret values "cannot be viewed after saving." Rotation = update in K8s/Vault and redeploy; no schedule given. — [Secrets](https://iomete.com/resources/user-guide/secrets)
- Release notes v3.16.0 (Feb 9, 2026): "Use Vault (KV v2) alongside Kubernetes secrets with App Role or Token authentication"; v3.18.0: secret values previously "could appear in plain text" in Spark UI, now redacted; v1.20.0 (Aug 26, 2024) first Vault support. — [Platform Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)

**Network isolation — DOCUMENTED (Kubernetes-native)**
- Three NetworkPolicies: Spark Operator webhook (ingress only from K8s API server IP), IOMETE Namespaces Communication (ingress only from namespaces labeled `iomete.com/managed: "true"`; egress to all), Jupyter Containers policy (off by default; ingress only from gateway on TCP 8888; egress blocks RFC1918/link-local/CGNAT ranges). "The page does not name any registries, license servers, telemetry endpoints, or hostnames that IOMETE pods need." — [Network Policies](https://iomete.com/resources/deployment/network-policies)
- All platform services in "a single Kubernetes namespace"; Gateway (Nginx reverse proxy) is "a single" entry point; services exposed as ClusterIP. — [Architecture](https://iomete.com/resources/getting-started/architecture)

**Audit logging — DOCUMENTED (contents), UNKNOWN (retention, SIEM export)**
- System tables in `spark_catalog.iomete_system_db`: `platform_event_logs` "stores all platform audit events. This includes user actions, service operations, and other platform-level activities" (user, service, action, success flag, JSON payload; token ID and masked token for token requests); `data_access_audit` covers "all data access attempts, policy evaluations, and access control decisions" (flag `dataAccessAudit`, on by default); `query_archive` (SQL history, flag off by default). Ranger audit copy also written to object storage "partitioned by day as ORC files" at `s3a://<your-bucket>/ranger/audit/day=yyyyMMdd/`. **Retention: not stated. Who can query: not stated. SIEM export: not mentioned.** — [System Tables](https://iomete.com/resources/user-guide/system-tables)
- Release notes: v3.15.0 (Jan 5, 2026) "Introduced event/audit logging for platform activities"; v3.16.0 "Event Streams are also used internally by IOMETE for platform audit logs and Ranger data access audit logs"; v3.18.0 "All API requests are now logged to `platform_event_logs`"; v4.0.0 "The audit page now reads from Iceberg tables instead of Ranger ORC files." — [Platform Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)
- Data Platform Security blog (Sep 20, 2025): "Every authorization decision is logged, providing a complete audit trail." Denied requests also logged. — [Data Platform Security](https://iomete.com/resources/blog/data-platform-security)
- Webhooks / Event Stream user-guide pages exist (`/user-guide/webhook-notifications`, `/user-guide/event-stream`) — not fetched; may be the SIEM-forwarding path. — [User guide sidebar](https://iomete.com/resources/user-guide/compute-clusters/overview)

**Data catalog, lineage, retention — PARTIAL**
- Data Catalog: "full-text and semantic search across indexed assets", hierarchical Data Explorer, tagging, Classifications tab ("tag definitions, managed by admins"), Classification Requests approval workflow, scheduled Catalog Sync Job. **"The page doesn't mention lineage, PII or sensitive-data classification [as auto-detection], a business glossary, or ownership."** — [Data Catalog Overview](https://iomete.com/resources/user-guide/data-catalog/overview)
- Marketing only: "Data lineage tracking", "Business glossary", "Data retention policies", "Archival management". — [Data governance](https://iomete.com/product/data-platform/data-governance)

**Backup / DR / HA — PARTIAL**
- HA: several services run multiple replicas (NATS 3, event stream 2), rolling updates, optional HPA; `iom-sql` fixed at one replica. "Backup and disaster recovery procedures are not covered." — [Deployment Architecture](https://iomete.com/resources/deployment/architecture-deployment)
- Storage Migration guide exists (`/resources/deployment/storage-migration`) — not fetched. — [Docs landing](https://iomete.com/docs)

**Multi-tenancy / isolation — PARTIAL**
- "Everything ships as a single Helm chart" into one namespace; optional extra namespaces for Spark workloads ("IOMETE doesn't create the quotas themselves"); domains and resource bundles for authorization; workspaces are a SQL-editor construct; "The page doesn't describe how isolation works." — [Deployment Architecture](https://iomete.com/resources/deployment/architecture-deployment); Namespace Quotas page exists — [User guide sidebar](https://iomete.com/resources/user-guide/compute-clusters/overview)

### Inferences
- **IMPLIED**: Authorization engine = an embedded Ranger-derived policy model (release notes say Ranger was "removed" and "fully integrated" in v2.0.0 while later docs still speak of "Ranger policies" and "Ranger audit"). A questionnaire answer should say "built-in policy engine based on the Apache Ranger model; not an external Ranger deployment" and cite both pages.
- **IMPLIED**: Encryption at rest is entirely the customer's object-store/KMS responsibility; IOMETE's own at-rest encryption claim applies to platform secrets (AES-256-GCM, v4.0.0) only.
- **IMPLIED**: Encryption in transit is documented only at the edge (ingress TLS) and for PostgreSQL (optional). Service-to-service encryption inside the cluster is UNKNOWN (Istio is present as ingress; mTLS not documented).

### Gaps
- MFA for local (non-SSO) accounts; password complexity/lockout; session timeout — not documented.
- Log retention periods, log integrity/tamper-evidence, SIEM/Syslog forwarding — not documented (webhook/event-stream pages unfetched).
- Data lineage — marketing claim only, no doc page found.
- Data deletion/retention procedures at product level (crypto-shredding, Iceberg expire-snapshots policy) — not documented as a security control.
- Backup/restore runbooks for PostgreSQL metadata and object storage — not documented.
- Container image hardening baseline (distroless?), CIS benchmarks, FIPS mode — not documented.

---

## Key Question 3: What "sovereign" and "air-gapped" mean concretely (phone-home, license checks, telemetry, registries, internet during install, offline updates)

### Takeaway
IOMETE **asserts** air-gap compatibility and "no external control plane," but publishes **no air-gapped install procedure, no image-mirroring list, no license-activation mechanism, and no telemetry statement** in its docs. The standard install pulls the Helm chart from `chartmuseum.iomete.com` and files from GitHub; images moved to Azure Container Registry in v3.2.0. The Software License Agreement explicitly reserves the right to collect "Usage Data" including telemetry — a point a questionnaire helper must surface rather than assume "no phone home."

### Cited Findings

**DOCUMENTED — marketing/FAQ definitions**
- FAQ: "What does air-gapped deployment mean?" — "IOMETE can be fully deployed and operated in these isolated networks"; air-gapped defined as no internet connectivity, "all components running on your infrastructure." — [IOMETE FAQ](https://iomete.com/faq)
- Deployment page: "Support for air-gapped environments" listed as a feature "with no further detail"; "Works with any Kubernetes distribution"; OpenShift, VMware Tanzu listed under private cloud. — [Deployment](https://iomete.com/product/deployment?type=on-premises)
- Sovereign definition blog (May 30, 2026): "A sovereign data platform is one where three properties hold simultaneously" (modern architecture, flexible deployment, real control); sovereign storage, compute, metadata and audit logs can run in "air-gapped environments with no outbound connectivity"; "There's no vendor data plane your data flows through"; customer holds "the encryption keys, along with administrator access and the audit trail." **No statements about telemetry, license checks, or offline updates.** — [What Is a Sovereign Data Platform?](https://iomete.com/resources/blog/what-is-a-sovereign-data-platform)
- Public-sector blog (Aug 27, 2026): "no external control plane"; "encryption keys stay in the agency's own key management system"; deployment "including fully air-gapped environments." "The page does not say how IOMETE delivers software or updates to disconnected networks." No FedRAMP/IL mention. — [Public sector data sovereignty](https://iomete.com/resources/blog/public-sector-data-sovereignty-platform)
- Deployment Models blog (Feb 10, 2025): air-gapped mentioned once: "IOMETE runs this inside your own perimeter: on-premises, private cloud, or air-gapped." Nothing on offline image delivery, licensing, updates, connectivity, telemetry. — [IOMETE Deployment Models](https://iomete.com/resources/blog/iomete-deployment-models)

**DOCUMENTED — what the install actually needs**
- Install page: Helm chart repo `https://chartmuseum.iomete.com`; example values/CRD/webhook files from `raw.githubusercontent.com` (`iomete/iomete-deployment`); chart on Artifact Hub; PostgreSQL required; object storage: Apache Ozone, MinIO, Dell ECS, IBM COS, S3-compatible, S3, Azure Blob, GCS. **"License key or activation: Not covered." "Air-gapped or offline install: Not covered." "Runtime internet or IOMETE connections, telemetry: Not covered."** No registry hostnames named; `docker.imagePullSecrets` referenced. Resource minimums: 12 CPU / 24 GB for platform services (incl. Istio), Spark node 4 CPU / 32 GB. — [Install](https://iomete.com/resources/deployment/on-prem/install)
- Private Docker Registry (K8s) page: create image pull secret on `lakehouse-service-account`; "IOMETE does not copy the secret for you" (apply per namespace); from v3.19.1 use `docker.imagePullSecrets` in values.yaml. **No default registry named, no image list, no mirroring procedure, no image signing/verification.** — [Private Docker Registry](https://iomete.com/resources/user-guide/k8s/private-docker-registry)
- Release notes v3.2.0 (Mar 10, 2025): IOMETE moved to Azure Container Registry "to enable image immutability and avoid limitations of docker hub." v3.14.0 (Oct 27, 2025): "Suggesting `tag aliases` on docker images in private registries." No release note mentions air-gapped/offline, license, telemetry, SBOM, or signing. — [Platform Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)
- Docs sidebar has "Private Docker Registry" and "Docker Tag Aliases" pages (`/user-guide/private-docker-registry`, `/user-guide/docker-tag-aliases`). — [User guide sidebar](https://iomete.com/resources/user-guide/compute-clusters/overview)
- Architecture page: Health Check Service "monitors internal platform services only, and the page describes no telemetry export or license validation." — [Architecture](https://iomete.com/resources/getting-started/architecture)
- GitHub `iomete/iomete-deployment`: folders `on-prem`, `kubernetes`, `istio-ingress`, `minio`, `ozone`, `terraform`, `database`; no README content on air-gap, registries, license, SECURITY.md, SBOM or cosign visible on landing page. — [iomete-deployment](https://github.com/iomete/iomete-deployment)

**DOCUMENTED — license agreement on telemetry**
- Software License Agreement ("LAST UPDATED: MAR 16, 2026") §4.2: "IOMETE may collect and use Usage Data related to the operation and performance of the Software for purposes including" improving the Software, technical support, and security; Usage Data "include[s] logs, telemetry, performance metrics, and metadata"; "Usage Data does not include Customer Data." License verification/phone-home: "Not addressed in the agreement." Preamble: "The Software processes Customer Data exclusively within the Customer Environment." — [Software License Agreement](https://iomete.com/policies/software-license-agreement)

### Inferences
- **IMPLIED**: Internet access is needed at least from the admin workstation (Helm repo, GitHub raw files) and from the cluster (container registry, likely Azure Container Registry) during a standard install; an air-gapped install therefore requires mirroring the chart and images into a private registry using the documented `imagePullSecrets` mechanism — but IOMETE publishes no step-by-step for this.
- **IMPLIED**: There is no documented license server or online activation; combined with "no external control plane," runtime phone-home appears not to be architecturally required — but the SLA's Usage Data clause means a helper must answer "telemetry: contractually permitted; technical mechanism and opt-out UNKNOWN."
- **IMPLIED**: Offline update delivery = re-mirroring new chart/image versions; not documented.

### Gaps
- Authoritative image list / mirroring manifest for offline install.
- Default registry hostname(s) (ACR path) — not published on fetched pages.
- License enforcement mechanism (file-based? none?) and expiry behaviour offline.
- Whether any telemetry endpoint exists in the product, what it sends, and how to disable it.
- Signed images / provenance / SBOM availability for supply-chain verification in air-gapped import.

---

## Key Question 4: Shared responsibility; IOMETE access to customer data/clusters (support access, control plane)

### Takeaway
The public Software License Agreement (Mar 16, 2026) is the only source that defines access: IOMETE may access Customer Data "solely to the extent necessary to provide technical support" and "only ... when such access is specifically authorized in the applicable SOW," read-only and limited to dev/test unless the SOW says otherwise; the customer owns the "Customer Environment" and its security controls. There is **no IOMETE-hosted control plane**; all services run in the customer's Kubernetes cluster. Breach notification, audit rights, and the referenced Security Addendum/DPA are not public.

### Cited Findings
- SLA §2.1: IOMETE may access and process Customer Data "solely to the extent necessary to provide technical support, resolve service or technical issues, or comply with applicable law." §10.4: "IOMETE will only access Customer Data when such access is specifically authorized in the applicable SOW"; access is read-only and limited to Customer's development or testing environment unless the SOW says otherwise; Customer supplies "unique IOMETE credentials, which Customer alone manages." §8.3: IOMETE "does not review Customer Data." §3.1: parties "shall comply with the Security Addendum" (not public). §2.3: "the parties will comply with the Data Processing Addendum (DPA)" (not public). "Operational Responsibility": "IOMETE is not responsible for outages, downtime, data loss, or security incidents" resulting from customer-side failures or misconfiguration; Customer is responsible for provisioning and maintaining the Customer Environment "including security controls." §10.6 subcontractors for Technical Services allowed, IOMETE remains responsible. §12.1(c): Data Protection Liability Cap = "two (2) times the General Liability Cap." §13.11: Customer must not provide ITAR-controlled information. **Breach notification: "Not addressed." Audit rights: "Not addressed." Open source components: not addressed.** — [Software License Agreement](https://iomete.com/policies/software-license-agreement)
- Architecture: "deploys as a Helm chart into a Kubernetes cluster" on any cloud or on-prem; "Every service runs in the customer's cluster"; "The page doesn't say IOMETE hosts anything." — [Architecture](https://iomete.com/resources/getting-started/architecture)
- Deployment architecture: "The page doesn't say whether IOMETE hosts any component as a SaaS control plane"; control plane/data plane terms used only for node placement; "Calls between a control plane and its data planes are verified with a shared trust secret" (v4.0.0). — [Deployment Architecture](https://iomete.com/resources/deployment/architecture-deployment); [Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)
- Deployment Models blog (Feb 10, 2025): on-premises section says the control plane runs on Kubernetes and manages all data planes across the organization's infrastructure. — [IOMETE Deployment Models](https://iomete.com/resources/blog/iomete-deployment-models)
- Support page: existing users file tickets via a Jira Service Desk support portal or support@iomete.com; "our team will respond promptly" (no SLA, severity levels, or statement on staff access to customer environments / diagnostics sharing). — [Support](https://iomete.com/resources/getting-started/support)
- Regulated-enterprise blog: mentions "Field Data Engineers who can handle operations for customers who want that, but doesn't define their access scope." — [IOMETE blog](https://iomete.com/resources/blog/data-lakehouse-for-regulated-enterprises)
- Public-sector blog FAQ: advises contracts specify "time-boxed operator access, logged sessions, and key management outside the operator's reach" — "guidance for procurement, not a stated IOMETE commitment." — [Public sector blog](https://iomete.com/resources/blog/public-sector-data-sovereignty-platform)
- FAQ: "Unlike SaaS platforms such as Snowflake or Databricks, IOMETE runs entirely on your infrastructure." "You have complete control over data location." — [IOMETE FAQ](https://iomete.com/faq)
- Homepage: it is "impossible for us to lose your data simply because it is stored in your trusted environment." — [IOMETE homepage](https://iomete.com/)

### Inferences
- **IMPLIED** shared-responsibility split: Customer = Kubernetes cluster, nodes, network, object storage & its encryption/KMS, PostgreSQL, TLS certs, IdP/MFA, NetworkPolicy enforcement (CNI must support it), backups, image mirroring. IOMETE = application code, platform RBAC/data-policy engine, platform secret encryption, CVE patching in images, support on request.
- **IMPLIED**: Default posture is "no standing vendor access"; any access is SOW-gated and customer-credentialed. Optional managed-operations ("Field Data Engineers") changes this and would need contract review.

### Gaps
- Security Addendum and DPA text (breach notification window, subprocessor change notice, audit rights, personnel screening, return/deletion).
- Support SLA / severity matrix; remote-support tooling (screen share vs. credentials); whether diagnostic bundles contain customer data.
- Formal shared-responsibility matrix document — none published.

---

## Key Question 5: Vulnerability management, pen testing, responsible disclosure, SBOM, image signing

### Takeaway
The only public evidence is **release-note CVE remediation** (repeated across 2025–2026) and privilege-reduction changes. No penetration-test summary, vulnerability-disclosure policy, SECURITY.md, bug bounty, SBOM, image signing, or patch-SLA statement was found anywhere public.

### Cited Findings
- Release notes CVE/vuln entries: v3.2.0 (Mar 10, 2025) "Significant amount of vulnerabilities remediated across our systems"; v3.14.2 (Dec 1, 2025) "We have patched various outstanding security vulnerabilities in iom services"; v3.16.0 (Feb 9, 2026) Hive Metastore 4.0.0 "addresses multiple security vulnerabilities"; v3.18.0 (Aug 5, 2026) "Patched critical and high-severity CVEs in the Hive Metastore image", "The base image was also migrated to remove the affected OS packages entirely", "closing an unauthenticated WebSocket event-ingestion endpoint"; v3.19.1 (Oct 1, 2026) "no longer lets IOMETE manage Kubernetes Roles and RoleBindings"; v4.0.0 (Sep 30, 2026) "Resolved critical and high-severity CVEs in the backend services", production errors "no longer return stack traces and raw exception messages"; v4.0.1 (Oct 8, 2026) "Resolved high-severity CVEs in the console's bundled JavaScript dependencies". — [Platform Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)
- Release cadence evidenced by notes: v3.18.0 Aug 5 → v3.19.0 Aug 24 → v4.0.0 Sep 30 → v3.19.1 Oct 1 → v4.0.1 Oct 8, 2026 (roughly monthly, with patch releases on prior minor). — [Platform Release Notes](https://iomete.com/resources/deployment/on-prem/release-notes/)
- GitHub org `iomete` (24 repos; "The Self-Hosted Data Lakehouse Platform"; verified domain): "No SECURITY.md, security policy, SBOM, cosign/signing, or vulnerability disclosure reference appears." — [github.com/iomete](https://github.com/iomete)
- Data Platform Security blog (Sep 20, 2025): vulnerability management and pen testing "Not mentioned." — [Data Platform Security](https://iomete.com/resources/blog/data-platform-security)
- Privacy policy and SLA: no security-testing commitments. — [Privacy Policy](https://iomete.com/policies/privacy-policy); [SLA](https://iomete.com/policies/software-license-agreement)

### Inferences
- **IMPLIED**: Image scanning happens (CVE-driven base-image migrations), but the tooling, scan cadence, and severity SLA are undisclosed.

### Gaps
- Third-party penetration test (frequency, scope, summary letter) — likely in Vanta Trust Center "documents on request," unverified.
- Coordinated vulnerability disclosure / security.txt / bounty — none found.
- SBOM (SPDX/CycloneDX) per release; image signing (cosign/Notary); provenance (SLSA) — none found.
- Secure SDLC statements (code review, SAST/DAST, dependency pinning) — none found.

---

## Key Question 6: Standard questionnaire frameworks — structure, question counts, free availability

### Takeaway
Freely usable with full question text: **CSA CAIQ** (v4.0: 261 Qs / 17 domains; v4.1 (Jan 27–28, 2026): 283 Qs / 17 domains; free CSA account), **VSA** (VSA-Full 8 sections, VSA-Core 6 sections; free; counts not officially published), **Google VSAQ** (Apache-2.0, archived Nov 25, 2022; 4 templates). **SIG Lite/Core** question text is **licensed** (~$7,000/yr corporate, AI-use prohibited) so it cannot be used as an open scoring base; public secondary counts are SIG Lite ≈133–150, SIG Core ≈810–855, 21 domains. NIST CSF 2.0 (6/22/106) and ISO 27001:2022 Annex A (93 controls, 4 themes) are control catalogues, not questionnaires, but are freely mappable.

### Cited Findings

**CSA CAIQ / CCM**
- CAIQ v4.0 per-domain counts (from CCM v4.0.8 workbook, total 261): DSP 24, CEK 23, DCS 23, IAM 21, HRS 20, BCR 18, LOG 18, STA 15, UEM 15, IVS 14, TVM 12, AIS 11, CCC 11, SEF 11, GRC 9, A&A 8, IPY 8. Article (Jun 25, 2026) also notes CAIQ v4.1 "has since been published, with 283 questions across the same 17 domains." — [Wolfia: all 261 CAIQ v4 questions by domain](https://wolfia.com/blog/we-mapped-all-261-caiq-v4-questions-by-domain)
- CSA 2021 announcement: v4 reduced to "261 (compared to the 310 of the V3.1)" questions. — [CSA blog, Jun 7 2021](https://cloudsecurityalliance.org/blog/2021/06/07/caiq-v4-released-changes-from-v3-1-to-v4)
- CSA CCM v4.1 transition blog: "Consensus Assessments Initiative Questionnaire (CAIQ) v4.1 now includes 283 questions aligned with the latest controls"; both v4.0 and v4.1 accepted by STAR "until December 2027". — [CSA: CCM v4.1 transition timeline](https://cloudsecurityalliance.org/blog/2026/02/19/ccm-v4-1-transition-timeline)
- CSA CCM v4.1 artifact page lists release 01/27/2026. — [CSA CCM v4.1 artifact](https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4-1)
- CCM research page: 17 domains named (A&A, AIS, BCR, CCC, CEK, DCS, DSP, GRC, HRS, IAM, IPY, IVS, LOG, SEF, STA, TVM, UEM); "197 control objectives" (v4.0 figure); license needed "to customize the CCM, use it commercially (including within products), or use it in consulting projects. No license is needed for internal use." CAIQ is the basis of STAR Level 1 self-assessment. — [CSA Cloud Controls Matrix](https://cloudsecurityalliance.org/research/cloud-controls-matrix)
- Vorp Labs tracker: CCM v4.1 = 207 controls (11 added in DCS, LOG, SEF, STA, TVM; 1 IAM removed); CAIQ v4.1 = 283; downloads "require a free CSA account"; v4.0.x withdrawn January 2028. — [Vorp Labs CSA CAIQ page](https://vorplabs.com/security-framework-changes/csa-caiq)
- Conflict: 6clicks lists CAIQ v4.1.0 as "261 yes-or-no assessment questions mapped to 207 controls" — contradicts CSA's own 283 figure; treat CSA as authoritative. — [6clicks marketplace](https://marketplace.6clicks.com/c/consensus-assessment-initiative-questionnaire-v4-1-0)

**Shared Assessments SIG**
- SIG 2026 released September 19, 2025; 21 risk domains retained; ISO/IEC 42001:2023 mapping added in AI domain; NIST SP 800-171 remap; license "$7,000 for a one-year corporate license, or included with membership"; June 2025 subscription agreement "broadly prohibits using licensed SIG content for AI training, testing, benchmarking, content generation, and other AI purposes"; "public pages do not state question counts"; "The SIG is licensed rather than open." — [Vorp Labs SIG page](https://vorplabs.com/security-framework-changes/sig)
- Mitratech (Feb 26, 2026): 21 domains listed — Access Control; Application Management; Artificial Intelligence; Asset and Information Management; Cloud Services; Compliance Management; Cybersecurity Incident Management; Endpoint Security; Enterprise Risk Management; ESG; Human Resources Security; Information Assurance; IT Operations Management; Network Security; Nth-Party Management; Operational Resilience; Physical and Environmental Security; Privacy Management; Server Security; Supply Chain Risk Management; Threat Management. Counts: "SIG Lite: 133 questions", "SIG Core: 810 questions". (Vendor/licensee figures; edition year not stated.) — [Mitratech: SIG explained](https://www.mitratech.com/resource-hub/blog/standard-information-gathering-sig-questionnaire-explained/)
- Mitratech SIG 2026 update (Mar 5, 2026): "no new risk domains were added"; scoping presets "Lite," "Core," "Detail"; ISO 42001 mapping; Operational Resilience Framework integration; DORA/NIS2 were introduced in 2025. No counts. — [Mitratech: SIG 2026 key updates](https://mitratech.com/resource-hub/blog/sig-2026-key-updates-and-considerations/)
- Older secondary counts (2022–2023): SIG Lite ≈150; SIG Core 825 or 855; domains cited as 18–21. — [search summary; e.g. Rocketdocs](https://rocketdocs.com/resources/blog/sig-questionnaire-guide)
- Shared Assessments launched "SIG Evolution, or SIG EV" on 17 March 2026 (browser-based assessment platform). — [search result, Mitratech/Shared Assessments coverage](https://mitratech.com/resource-hub/blog/sig-2026-key-updates-and-considerations/)
- The official `sharedassessments.org/sig/` page returned a Microsoft Entra sign-in interstitial (content gated). — [Shared Assessments SIG](https://sharedassessments.org/sig/)

**Vendor Security Alliance (VSA)**
- VSA-Full: first published 2016; eight sections — Service Overview; Data Protection & Access Control; Policies & Standards; Proactive Security; Reactive Security; Software Supply Chain; Customer Facing Application Security; Compliance. VSA-Core: critical items plus a privacy section (US breach-notification laws, CCPA, GDPR). Both "free to use", downloadable from vendorsecurityalliance.org, "updated annually." Question counts not stated. (Article Jul 8, 2025.) — [UpGuard: VSA questionnaire](https://www.upguard.com/blog/vendor-security-alliance-questionnaire)
- VSA-Core sections (6): Service introduction; Data inventory; Security CORE Controls ("40+ security and privacy controls"); Privacy introduction; USA privacy; GDPR privacy ("20+ requirements"). VSA-Full 8 sections as above. "free to download on the VSA's website." — [Vanta: VSA questionnaire](https://www.vanta.com/collection/trust/vendor-security-alliance-questionnaire)
- Third-party estimates: VSA-Core "fewer than 100", "approximately 75 core questions"; VSA-Full "a few hundred questions". — [search summary (UpGuard/others)](https://www.upguard.com/blog/top-vendor-assessment-questionnaires.md)
- Official site `vendorsecurityalliance.org/questions` is JS-rendered (2,987-byte shell); question text not retrievable without a browser. — [VSA questions page](https://www.vendorsecurityalliance.org/questions)

**Google VSAQ**
- Repo `google/vsaq`: Apache-2.0; "This repository was archived by the owner on Nov 25, 2022. It is now read-only." — [google/vsaq](https://github.com/google/vsaq)
- Templates in `questionnaires/`: `webapp.json`, `infrastructure.json`, `physical_and_datacenter.json`, `security_privacy_programs.json` (+ test templates). Question counts not shown. — [google/vsaq questionnaires](https://github.com/google/vsaq/tree/master/questionnaires)
- Google 2016 launch: open-sourced "the VSAQ Framework (Apache License Version 2) and the generally applicable parts of our questionnaires on GitHub." — [Google Security Blog, Mar 2016](https://security.googleblog.com/2016/03/scalable-vendor-security-reviews.html?m=1)

**NIST CSF 2.0**
- Published Feb 26, 2024; 6 functions (Govern, Identify, Protect, Detect, Respond, Recover), 22 categories, 106 subcategories (down from 108 in v1.1); Sprinto outlier says 107. Secondary sources; verify against NIST CSF 2.0 Reference Tool. — [SaltyCloud NIST CSF 2.0 guide](https://www.saltycloud.com/blog/nist-csf-2-0/); [Wikipedia](https://en.wikipedia.org/wiki/NIST_Cybersecurity_Framework)

**ISO/IEC 27001:2022 Annex A**
- 93 controls in 4 themes: Organizational 37, People 8, Physical 14, Technological 34 (replacing 114 controls / 14 domains in 2013 edition; 11 new controls). Control text is copyrighted (ISO), so only control titles/IDs are freely usable. — [Scrut: ISO 27001:2022 Annex A controls](https://www.scrut.io/hub/iso-27001/iso-27001-controls); [NordLayer](https://nordlayer.com/learn/iso/iso-27001-controls/)

### Inferences
- For an open "unknown rate" metric, **CAIQ v4.0/v4.1** is the best denominator: free, full yes/no question text, fixed 17-domain structure, widely recognised (STAR Level 1). VSA-Full/Core is a free secondary. SIG cannot be redistributed or used for AI-assisted generation under its license; use only domain names (public) for mapping.
- **Indicative CAIQ-domain answerability for IOMETE from public docs** (my mapping, not a vendor statement): well-covered → IAM (SSO/SCIM/RBAC/RAS), DSP (policies, masking, classifications; retention weak), LOG (audit tables; retention/SIEM weak), CEK (partial: secrets AES-256-GCM, ingress TLS, KMS delegated), IVS (NetworkPolicy, namespaces, Helm), AIS (partial: API hardening in release notes); mostly UNKNOWN → A&A, GRC, HRS, DCS (N/A for self-hosted software, but IOMETE's own corporate controls unknown), BCR (customer-side), CCC (no SDLC statement), SEF (no IR/breach process public), STA (no SBOM/signing/subprocessor detail), TVM (CVE fixes evidenced; no program statement), UEM (corporate, unknown), IPY (Iceberg/open formats documented in product pages — answerable). Roughly 6 of 17 domains substantially answerable, ~5 partially, ~6 essentially unknown from public sources; by question count this suggests an unknown rate in the ~45–60% range for CAIQ, but this must be computed question-by-question by the tool.

### Gaps
- Exact official SIG Lite/Core/Detail 2026 question counts (licensed content; not public).
- Official VSA-Core/VSA-Full question counts and current edition year (site JS-only).
- VSAQ per-template question counts.
- CAIQ v4.1 per-domain breakdown (only v4.0 per-domain counts found).

---

## Key Question 7: Questions a self-hosted-only vendor answers differently from a SaaS vendor

### Takeaway
Public guidance is thin and mostly vendor marketing, but the consistent pattern is: for self-hosted software the hosting/residency/subprocessor/breach-exposure questions shift to the customer, **except** for whatever still touches the vendor — support access, telemetry/usage data, update/registry channels, and vendor corporate controls. For IOMETE specifically, the license agreement's Usage Data clause and SOW-gated support access are exactly the residual items.

### Cited Findings
- Self-hosted vendor position (marketing, not independent): deployment on customer-owned infrastructure means no DPA to negotiate, "no subprocessors to review," and no vendor-side breach exposure. — [Temps Security & Trust Center](https://temps.sh/security)
- Dual-model vendor practice: each FAQ answer is labelled as applying to cloud, self-hosted, or both; "Where an answer differs between the cloud and self-hosted versions, the answer says which it covers." — [Kendis trust FAQ](https://trust.kendis.io/faq)
- Residency questions include "where your subprocessors sit"; sub-processor residency "catches vendors who claim US-only residency while routing through an offshore support center." — [Wolfia: data sovereignty/residency question](https://wolfia.com/security-questionnaire-questions/how-do-you-handle-data-sovereignty-and-residency-requirements)
- Breach notification: GDPR baseline 72 hours; buyers expect vendor commitments of "24 to 72 hours with a defined trigger"; for self-hosted, the answer should state whether the vendor would ever receive incident information. — [Vaquill: 47 questions](https://www.vaquill.ai/blog/vendor-security-questionnaire-in-house-counsel-2026); [Wolfia top 50](https://wolfia.com/blog/top-50-vendor-security-assessment-questions-for-2026)
- VSA-Core explicitly contains a privacy section on "US data breach notification laws, the CCPA, and the GDPR" — questions a pure self-hosted vendor typically answers "customer is controller and processor; vendor processes no Customer Data." — [UpGuard: VSA](https://www.upguard.com/blog/vendor-security-alliance-questionnaire)
- IOMETE-specific residuals: SLA §4.2 Usage Data (telemetry) may be collected; §10.4 SOW-authorised, read-only support access; Helm chart from `chartmuseum.iomete.com`; images from vendor registry (ACR). — [SLA](https://iomete.com/policies/software-license-agreement); [Install](https://iomete.com/resources/deployment/on-prem/install); [Release Notes v3.2.0](https://iomete.com/resources/deployment/on-prem/release-notes/)
- CAIQ DCS (Data Center Security, 23 Qs) and much of BCR/UEM/HRS concern the vendor's own operating environment, which for self-hosted software applies to the vendor's corporate/dev environment, not to customer data hosting. — [Wolfia CAIQ domain mapping](https://wolfia.com/blog/we-mapped-all-261-caiq-v4-questions-by-domain)

### Inferences
- Recommended answer pattern for the helper on "customer-infrastructure" questions (hosting region, data center controls, backups, encryption-at-rest keys, network perimeter, DR): "Customer-controlled — IOMETE is deployed into the customer's Kubernetes cluster and object storage; see [URL]. IOMETE does not host customer data." Mark as **N/A-with-explanation**, not UNKNOWN.
- Residual vendor-side questions that must NOT be marked N/A for IOMETE: telemetry/usage data (SLA §4.2 — mechanism UNKNOWN), support access process (SLA §10.4), software supply chain (registry, signing, SBOM — UNKNOWN), vendor corporate security program (SOC 2 Type I 2022 only; Type II/ISO 27001 UNKNOWN), breach notification to customer for vendor-side incidents (UNKNOWN; not in SLA or privacy policy), subprocessors for support services (SLA §10.6 permits; list UNKNOWN beyond website-privacy Google Doc).

### Gaps
- No authoritative (Shared Assessments/CSA) guidance found on scoring "N/A" for self-hosted vendors; treatment is buyer-specific.
- IOMETE publishes no shared-responsibility matrix or self-hosted-specific questionnaire guidance.

---

## Appendix: Quick DOCUMENTED / IMPLIED / UNKNOWN matrix for the helper

| Topic | Status | Primary URL |
|---|---|---|
| SOC 2 Type I (Dec 2022, Prescient Assurance) | DOCUMENTED | https://iomete.com/resources/blog/soc-achievement |
| SOC 2 Type II | UNKNOWN (readiness per Sep-2026 job post) | https://builtinlondon.uk/job/compliance-finance-operations-lead/9349489 |
| ISO 27001 | UNKNOWN (readiness per job post) | same |
| HIPAA / GDPR "compliant" badges | DOCUMENTED claim, no scope | https://iomete.com/ |
| PCI DSS, FedRAMP, CSA STAR | UNKNOWN / not claimed | — |
| Trust Center exists (Vanta) | DOCUMENTED (contents unread) | https://app.vanta.com/iomete.com/trust/mh7heslsoonlhblghsro7g |
| Privacy policy (GDPR, DPO, EU rep, SCCs) | DOCUMENTED (Nov 11, 2024) | https://iomete.com/policies/privacy-policy |
| DPA / Security Addendum | REFERENCED, not public | https://iomete.com/policies/software-license-agreement |
| SSO SAML 2.0 / OIDC; Okta, OneLogin, Entra ID; SCIM | DOCUMENTED | https://iomete.com/resources/user-guide/single-sign-on |
| LDAP / AD sync | DOCUMENTED | https://iomete.com/resources/user-guide/security-overview |
| MFA | DOCUMENTED as IdP-delegated; local-account MFA UNKNOWN | https://iomete.com/resources/user-guide/single-sign-on |
| RBAC / groups / admin roles / RAS bundles | DOCUMENTED | https://iomete.com/resources/user-guide/security-overview |
| Row-level filter, column masking (7 types), tag-based policies, classifications w/ approval | DOCUMENTED | https://iomete.com/resources/user-guide/data-security/overview |
| Policy engine | IMPLIED (built-in, Ranger-model) | https://iomete.com/resources/getting-started/architecture |
| Audit logs (platform_event_logs, data_access_audit) | DOCUMENTED; retention/SIEM UNKNOWN | https://iomete.com/resources/user-guide/system-tables |
| Secrets (K8s / Vault; AES-256-GCM at rest from v4.0.0) | DOCUMENTED | https://iomete.com/resources/user-guide/secrets |
| Encryption at rest for data | IMPLIED customer storage/KMS; IOMETE holds no keys | https://iomete.com/resources/blog/data-lakehouse-for-regulated-enterprises |
| TLS at ingress | DOCUMENTED; versions/ciphers/mTLS UNKNOWN | https://iomete.com/resources/deployment/configure-ingress |
| Network isolation (K8s NetworkPolicy) | DOCUMENTED | https://iomete.com/resources/deployment/network-policies |
| Multi-tenancy / namespaces / domains | PARTIAL | https://iomete.com/resources/deployment/architecture-deployment |
| Data lineage | UNKNOWN (marketing claim only) | https://iomete.com/product/data-platform/data-governance |
| Backup / DR | UNKNOWN (HA documented) | https://iomete.com/resources/deployment/architecture-deployment |
| Air-gapped install procedure / image list | UNKNOWN (claimed supported) | https://iomete.com/faq |
| License activation / phone-home | UNKNOWN (not addressed) | https://iomete.com/resources/deployment/on-prem/install |
| Telemetry | DOCUMENTED as contractually permitted (SLA §4.2); mechanism UNKNOWN | https://iomete.com/policies/software-license-agreement |
| Vendor access to data | DOCUMENTED (SOW-gated, read-only, dev/test) | https://iomete.com/policies/software-license-agreement |
| Breach notification commitment | UNKNOWN | — |
| CVE patching evidence | DOCUMENTED (release notes) | https://iomete.com/resources/deployment/on-prem/release-notes/ |
| Pen test, disclosure policy, SBOM, image signing | UNKNOWN | https://github.com/iomete |
