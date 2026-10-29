import Link from "next/link";

export default function NotFound() {
  return <section className="empty-state section container"><span className="eyebrow">404 · Not found</span><h1>This page has wandered.</h1><p>Let’s take you back to the NARA collection.</p><Link className="button" href="/">Return home</Link></section>;
}
