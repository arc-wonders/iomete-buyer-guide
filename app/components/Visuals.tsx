"use client";
import type { Pick } from "./visuals/shared";
import { WhereDataGoes } from "./visuals/WhereDataGoes";
import { SecurityReview } from "./visuals/SecurityReview";
import { Cost } from "./visuals/Cost";
import { WhyNotSaas } from "./visuals/WhyNotSaas";
import { WhatGetsInstalled } from "./visuals/WhatGetsInstalled";
import { HowHardToRun } from "./visuals/HowHardToRun";

export { Dot } from "./visuals/shared";

/** One picture per question page. Each lives in its own file under components/visuals/. */
export const VISUALS: Record<string, (p: { onPick: Pick }) => React.ReactElement> = {
  "where-data-goes": WhereDataGoes,
  "security-review": SecurityReview,
  "what-it-costs": Cost,
  "why-not-saas": WhyNotSaas,
  "what-gets-installed": WhatGetsInstalled,
  "how-hard-to-run": HowHardToRun,
};
