/** Line icons for the six questions, shared by the landing and the answer pages. */
export const ICONS: Record<string, React.ReactNode> = {
  "where-data-goes": <><rect x="4" y="8" width="20" height="16" rx="3" /><path d="M14 2v12m-4-4 4 4 4-4" /></>,
  "security-review": <><path d="M14 3 5 7v6c0 6 4 10 9 12 5-2 9-6 9-12V7z" /><path d="m10 14 3 3 5-6" /></>,
  "what-it-costs": <><circle cx="14" cy="14" r="10" /><path d="M17.5 10.5c-.7-1-2-1.5-3.5-1.5-2 0-3.5 1-3.5 2.5 0 3.5 7 2 7 5 0 1.5-1.5 2.5-3.5 2.5-1.6 0-3-.6-3.7-1.7M14 7v2m0 10v2" /></>,
  "why-not-saas": <><rect x="2" y="9" width="10" height="10" rx="2" /><rect x="16" y="9" width="10" height="10" rx="2" /><path d="M12 14h4" /></>,
  "what-gets-installed": <><path d="m14 3 10 5.5v11L14 25 4 19.5v-11z" /><path d="M4 8.5 14 14l10-5.5M14 14v11" /></>,
  "how-hard-to-run": <><circle cx="14" cy="14" r="4" /><path d="M14 2v4m0 16v4M2 14h4m16 0h4M5.5 5.5l2.8 2.8m11.4 11.4 2.8 2.8M5.5 22.5l2.8-2.8m11.4-11.4 2.8-2.8" /></>,
};

export function Icon({ slug }: { slug: string }) {
  return <svg className="qicon" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[slug]}</svg>;
}
