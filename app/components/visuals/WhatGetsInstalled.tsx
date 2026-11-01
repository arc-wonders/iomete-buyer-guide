"use client";
import { Tile, type Pick } from "./shared";
import { InstallDiagram } from "./WhatGetsInstalled.diagram";
import { ScreenShowcase } from "./WhatGetsInstalled.showcase";

export function WhatGetsInstalled({ onPick }: { onPick: Pick }) {
  return (
    <figure className="visual wgi">
      <InstallDiagram onPick={onPick} />

      <div className="wgi-sec">
        <p className="wgi-eyebrow">Then your teams open the console</p>
        <ScreenShowcase onPick={onPick} />
      </div>

      <div className="wgi-sec">
        <p className="wgi-eyebrow">Where it runs</p>
        <div className="tiles wgi-deploy">
          <Tile id="deploy.models" label="EKS, AKS, GKE, OpenShift, Tanzu" onPick={onPick} />
          <Tile id="deploy.minimums" label="Starts at 12 CPU + one 4-CPU node" onPick={onPick} />
          <Tile id="feat.integrations" label="dbt, Airflow, Power BI, Tableau" onPick={onPick} />
          <Tile id="deploy.airgap" label="Air-gapped install" onPick={onPick} />
        </div>
      </div>
    </figure>
  );
}
