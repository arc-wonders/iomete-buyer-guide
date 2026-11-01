"use client";
export default function PrintButton() {
  return <button className="btn btn-lime no-print" onClick={() => window.print()}>Print or save as PDF</button>;
}
