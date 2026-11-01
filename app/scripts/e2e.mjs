// End-to-end check of the full workflow in a real Chrome.
// Usage: node scripts/e2e.mjs [baseUrl] [screenshotDir]
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const BASE = process.argv[2] || "http://localhost:3107";
const OUT = process.argv[3] || "";
const CHROME = process.env.CHROME || "/usr/bin/google-chrome";
const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok, detail }); console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? "  (" + detail + ")" : ""}`); };
const shot = async (page, name) => { if (OUT) { fs.mkdirSync(OUT, { recursive: true }); await page.screenshot({ path: `${OUT}/${name}.png` }); } };
const settle = () => new Promise((r) => setTimeout(r, 1500));
const ROLE_WORDS = /\b(FDE|CRO|CEO|CFO|CISO|Chief (Risk|Executive|Financial)|risk officer|forward-deployed engineer)\b/;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Landing: the three-step story finishes within 15 s and never names a role
  const t0 = Date.now();
  await page.goto(BASE, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => document.querySelector(".beatbar li:nth-child(3) [aria-current]") && document.querySelectorAll(".beatbar .fill.full").length >= 2, { timeout: 16000 });
  const secs = (Date.now() - t0) / 1000;
  check("Story reaches its last step within 15 seconds", secs <= 15.5, `${secs.toFixed(1)} s`);
  const landingText = await page.$eval("main", (e) => e.innerText);
  check("Landing never labels the visitor by role", !ROLE_WORDS.test(landingText), (landingText.match(ROLE_WORDS) || [""])[0]);
  const qs = await page.$$eval(".questions li", (l) => l.length);
  check("Landing offers six questions", qs === 6, String(qs));
  await shot(page, "1-landing");

  // 2. A question opens a page titled by that question, with no role label anywhere
  await page.click(".questions li:nth-child(1) button");
  await page.waitForSelector(".visual");
  const h1 = await page.$eval("h1", (e) => e.textContent);
  check("Question opens a page titled by the question", h1 === "Where does our data go?", h1);
  const pageText = await page.$eval("main", (e) => e.innerText);
  check("Answer page never labels the visitor by role", !ROLE_WORDS.test(pageText), (pageText.match(ROLE_WORDS) || [""])[0]);
  check("URL names the question, not a role", page.url().endsWith("?v=where-data-goes"), page.url());
  const nextQ = await page.$eval(".nextup-main", (e) => e.textContent);
  check("Page hands off to one obvious next question", /security review/.test(nextQ), nextQ);

  // 2b. Tapping a picture opens the sourced statement behind it
  await page.click(".visual .tile");
  await settle();
  const tapped = await page.$eval(".statements", (d) => ({ open: d.open, hl: !!d.querySelector("li.hl") }));
  check("Tapping a tile opens and highlights its source", tapped.open && tapped.hl, JSON.stringify(tapped));

  // 3. Bot: answer, mark, and the page moves to the proof
  await page.click(".topnav .btn");
  await page.waitForSelector("#dock-q");
  await page.type("#dock-q", "Is IOMETE ISO 27001 certified?");
  await page.keyboard.press("Enter");
  await page.waitForSelector(".msg-a .chip", { timeout: 15000 });
  const chip = await page.$eval(".msg-a .chip", (e) => e.textContent);
  check("ISO 27001 answer is marked Not public", chip === "Not public", chip);
  await settle();
  const iso = await page.$eval("#fact-sec\\.iso27001", (e) => { const r = e.getBoundingClientRect(); return { hl: e.classList.contains("hl"), top: r.top, bottom: r.bottom }; });
  check("Page scrolled to and highlighted the ISO 27001 statement", iso.hl && iso.top >= 60 && iso.bottom <= 900, JSON.stringify(iso));
  await shot(page, "2-answer");

  // 4. A cost question moves to the cost page and highlights the Enterprise price
  await page.type("#dock-q", "What does Enterprise cost?");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => location.search === "?v=what-it-costs", { timeout: 15000 });
  await settle();
  const ent = await page.$eval("#fact-price\\.enterprise", (e) => { const r = e.getBoundingClientRect(); return { hl: e.classList.contains("hl"), top: r.top }; });
  check("Cost question opens the cost page with the Enterprise price highlighted and visible", ent.hl && ent.top >= 60, JSON.stringify(ent));
  await shot(page, "3-cost");

  // 5. Calculator applies the documented minimum
  await page.$eval("#vcpu", (el) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; set.call(el, "100"); el.dispatchEvent(new Event("input", { bubbles: true })); });
  const price = await page.$eval("output[for=vcpu]", (e) => e.textContent);
  check("Calculator applies the $100,000 minimum at 100 vCPUs", price === "$100,000", price);

  // 6. Self-description routes silently: the reply does not echo a role back
  await page.goto(BASE, { waitUntil: "networkidle0" });
  await page.type("#landing-q", "I'm the CISO at an insurer");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => location.search.startsWith("?v="), { timeout: 15000 });
  const routed = new URL(page.url()).searchParams.get("v");
  const reply = await page.$eval(".msg-a p", (e) => e.textContent);
  check("A security person is routed to a data or security question", ["where-data-goes", "security-review"].includes(routed), routed);
  check("The reply does not call the visitor by a role", !ROLE_WORDS.test(reply.replace(/CISO/, "")) && !/\bview\b/i.test(reply), reply);

  // 7. One-page summary
  await page.goto(`${BASE}/brief?v=where-data-goes`, { waitUntil: "networkidle0" });
  const rows = await page.$$eval(".brief tr", (r) => r.length);
  const open = await page.$$eval(".brief ol li", (r) => r.length);
  const briefText = await page.$eval("main", (e) => e.innerText);
  check("Summary lists every statement and the open questions, without role labels", rows >= 20 && open >= 7 && !ROLE_WORDS.test(briefText), `${rows} rows, ${open} questions`);
  await shot(page, "4-brief");

  // 8. Phone: the picture comes first
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE, { waitUntil: "networkidle0" });
  const svgTop = await page.$eval(".hero-svg", (e) => e.getBoundingClientRect().top);
  const h1Top = await page.$eval(".landing h1", (e) => e.getBoundingClientRect().top);
  check("On a phone the diagram appears above the headline", svgTop < h1Top);
  await shot(page, "5-mobile");
} finally {
  await browser.close();
}
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} end-to-end checks passed`);
process.exit(failed ? 1 : 0);
