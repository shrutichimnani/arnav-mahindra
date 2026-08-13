import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} | Mahindra Modi Blog` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  /* This blog post page is intentionally hidden along with /blogs. Any
     direct visit renders a 404. */
  notFound();
}
