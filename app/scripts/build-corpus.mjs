// Builds data/corpus.json from (1) the iom-docs repo and (2) live iomete.com marketing pages.
// Usage: node scripts/build-corpus.mjs [path-to-iom-docs]
import fs from "node:fs";
import path from "node:path";

const DOCS = process.argv[2] || path.resolve("../vendor/iom-docs");
const OUT = path.resolve("data/corpus.json");
const BASE = "https://iomete.com/resources";

// ---------- helpers ----------
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.mdx?$/.test(e.name) ? [p] : [];
  });
}
function frontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fm: {}, body: src };
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
  }
  return { fm, body: src.slice(m[0].length) };
}
const stripNum = (s) => s.replace(/^\d+[-_.]/, "");
function tablesToSentences(s) {
  // "| Delta Lake | 🔜 Planned |" -> "Delta Lake: Planned." ; header and separator rows dropped
  const lines = s.split("\n");
  const out = [];
  let header = null;
  for (const line of lines) {
    if (!/^\s*\|.*\|\s*$/.test(line)) { header = null; out.push(line); continue; }
    if (/^\s*\|[\s:|-]+\|\s*$/.test(line)) continue;
    const cells = line.trim().slice(1, -1).split("|").map((c) => c.replace(/[`*]/g, "").replace(/[\u{1F300}-\u{1FAFF}\u2705\u274C\u2714\u26A0\uFE0F]/gu, "").trim());
    if (!header) { header = cells; continue; }
    const [first, ...rest] = cells;
    const pairs = rest.map((v, i) => (header[i + 1] && v ? `${header[i + 1]} ${v}` : v)).filter(Boolean);
    out.push(`${first}: ${pairs.join(", ")}.`);
  }
  return out.join("\n");
}
function cleanMdx(s) {
  return tablesToSentences(s)
    .replace(/<Release\b([^>]*)>/g, (_, a) => {
      const g = (k) => (a.match(new RegExp(k + '="([^"]*)"')) || [])[1] || "";
      return `\n## ${g("name") || "Platform"} ${g("version")} (${g("date")})\n`;
    })
    .replace(/^import .*$/gm, "")
    .replace(/^export .*$/gm, "")
    .replace(/```[\s\S]*?```/g, (b) => (b.length < 600 ? b.replace(/```\w*/g, "") : " [code example] "))
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/:::(\w+)?/g, "")
    .replace(/\{[^}]{0,80}\}/g, "")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
function docUrl(root, file, fm, prefix) {
  if (fm.slug) {
    const s = fm.slug.startsWith("/") ? fm.slug : null;
    if (s) return BASE + (prefix ? "/" + prefix : "") + s.replace(/\/$/, "");
  }
  let rel = path.relative(root, file).replace(/\.mdx?$/, "");
  let parts = rel.split(path.sep).map(stripNum);
  if (fm.id) parts[parts.length - 1] = fm.id;
  if (/^(index|README)$/i.test(parts[parts.length - 1])) parts.pop();
  if (fm.slug && !fm.slug.startsWith("/")) parts[parts.length - 1] = fm.slug;
  return BASE + (prefix ? "/" + prefix : "") + (parts.length ? "/" + parts.join("/") : "");
}
function blogUrl(file, fm) {
  if (fm.slug) return `${BASE}/blog/${fm.slug.replace(/^\//, "")}`;
  let name = path.basename(file).replace(/\.mdx?$/, "");
  if (/^(index)$/.test(name)) name = path.basename(path.dirname(file));
  name = name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  return `${BASE}/blog/${name}`;
}
function chunk(text, size = 170) {
  const sections = text.split(/\n(?=#{1,4} )/);
  const out = [];
  for (const sec of sections) {
    const heading = (sec.match(/^#{1,4} (.*)/) || [])[1] || "";
    const words = sec.replace(/^#{1,4} .*\n?/, "").split(/\s+/).filter(Boolean);
    for (let i = 0; i < words.length; i += size) {
      const piece = words.slice(i, i + size + 30).join(" ");
      if (piece.length > 60) out.push({ heading, text: piece });
    }
  }
  return out;
}
function tierFor(url) {
  if (url.includes("/release-notes")) return 1;
  if (/\/resources\/(deployment|user-guide|getting-started|reference|integrations)/.test(url)) return 2;
  if (/\/(policies|pricing)/.test(url)) return 3;
  if (/\/faq|llms\.txt/.test(url)) return 4;
  return 5; // homepage, product pages, blog: marketing claims
}
function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<div class="nav-fixed[\s\S]*?<\/nav>/i, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<\/(h[1-6])>/gi, "\n")
    .replace(/<h([1-6])[^>]*>/gi, (_, n) => "\n" + "#".repeat(Math.min(+n, 4)) + " ")
    .replace(/<\/(p|li|div|tr|section)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&rsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&nbsp;/g, " ").replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();
}

// ---------- 1. docs repo ----------
const docs = [];
let sitemap = new Set();
try {
  const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
  sitemap = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/\/$/, "")));
  console.log(`docs sitemap: ${sitemap.size} URLs`);
} catch (e) {
  console.warn("could not fetch docs sitemap; URLs will not be validated");
}

const sources = [
  { dir: "docs", prefix: "" },
  { dir: "user-guide", prefix: "user-guide" },
];
let unmatched = 0;
for (const { dir, prefix } of sources) {
  const root = path.join(DOCS, dir);
  for (const f of walk(root)) {
    const { fm, body } = frontmatter(fs.readFileSync(f, "utf8"));
    if (fm.draft === "true" || fm.unlisted === "true") continue;
    let url = docUrl(root, f, fm, prefix);
    if (sitemap.size && !sitemap.has(url)) {
      // try a sitemap URL ending in the same last two segments
      const tail = url.split("/").slice(-2).join("/");
      const hit = [...sitemap].find((u) => u.endsWith("/" + tail));
      if (hit) url = hit; else { unmatched++; continue; }
    }
    docs.push({ url, title: fm.title || fm.sidebar_label || path.basename(f), date: fm.date || "", body: cleanMdx(body) });
  }
}
for (const f of walk(path.join(DOCS, "blog"))) {
  const { fm, body } = frontmatter(fs.readFileSync(f, "utf8"));
  let url = blogUrl(f, fm);
  if (sitemap.size && !sitemap.has(url)) { unmatched++; continue; }
  const date = (path.basename(f).match(/^(\d{4}-\d{2}-\d{2})/) || [])[1] || fm.date || "";
  docs.push({ url, title: fm.title || path.basename(f), date, body: cleanMdx(body) });
}
console.log(`docs repo: ${docs.length} pages mapped to live URLs, ${unmatched} skipped (not in sitemap)`);

// ---------- 2. marketing pages (live) ----------
const marketing = [
  "https://iomete.com/", "https://iomete.com/pricing", "https://iomete.com/pricing/free-plan",
  "https://iomete.com/faq", "https://iomete.com/about-us", "https://iomete.com/product/deployment",
  "https://iomete.com/product/architecture/data-security", "https://iomete.com/product/architecture/open-source",
  "https://iomete.com/product/architecture/data-mesh", "https://iomete.com/product/architecture/integrations-ecosystem",
  "https://iomete.com/product/data-platform/design-principles", "https://iomete.com/product/data-platform/platform-overview",
  "https://iomete.com/policies/software-license-agreement", "https://iomete.com/policies/privacy-policy",
  "https://iomete.com/roadmap", "https://iomete.com/roadmap/data-lineage", "https://iomete.com/llms.txt",
];
for (const url of marketing) {
  try {
    const res = await fetch(url, { headers: { "user-agent": "iomete-for-you corpus builder" } });
    if (!res.ok) throw new Error(res.status);
    const raw = await res.text();
    const title = (raw.match(/<title>([^<]*)<\/title>/) || [])[1] || url;
    const body = url.endsWith(".txt") ? raw : htmlToText(raw);
    docs.push({ url: url.replace(/\/$/, ""), title, date: "", body });
  } catch (e) {
    console.warn(`marketing fetch failed: ${url} (${e.message})`);
  }
}

// ---------- 3. chunk + write ----------
const fetchedAt = new Date().toISOString().slice(0, 10);
const chunks = [];
for (const d of docs) {
  for (const [i, c] of chunk(d.body).entries()) {
    chunks.push({
      id: `${d.url}#${i}`, url: d.url, title: d.title.replace(/ \| IOMETE$/, ""),
      heading: c.heading, date: d.date, tier: tierFor(d.url), text: c.text,
    });
  }
}
fs.writeFileSync(OUT, JSON.stringify({ fetchedAt, pages: docs.length, chunks }));
const byTier = chunks.reduce((a, c) => ((a[c.tier] = (a[c.tier] || 0) + 1), a), {});
console.log(`wrote ${chunks.length} chunks from ${docs.length} pages -> ${OUT}`, byTier);
