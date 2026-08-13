import { notFound } from "next/navigation";

/* This page is intentionally hidden. The route still exists so nothing
   bookmarks or links to it, but every request renders a 404 — including a
   direct visit to /blogs. Keep this file if the page is needed again. */
export default function BlogsPage() {
  notFound();
}
