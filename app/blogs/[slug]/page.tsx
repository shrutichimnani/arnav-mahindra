import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Clock, Calendar } from "@/components/icons";
import { blogPosts, getPostBySlug } from "@/lib/blogs";
import { company, SITE_URL } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Mahindra Modi Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blogs/${post.slug}`,
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  const postSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blogs/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [post.image],
        datePublished: post.date,
        author: { "@type": "Organization", name: company.name },
        publisher: { "@type": "Organization", name: company.name },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}/blogs` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blogs/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main className="min-h-screen bg-white pb-20" style={{ marginTop: "60px" }}>
        {/* HERO */}
        <section className="relative w-full h-[320px] lg:h-[420px] overflow-hidden bg-bg-2">
          <img
            src={post.image}
            alt={post.alt}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

          <div className="relative h-full flex flex-col justify-end container-px mx-auto max-w-[840px] pb-10">
            <Link
              href="/blogs"
              className="mb-4 inline-flex w-fit items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              &larr; Back to Blogs
            </Link>
            <span className="mb-3 inline-block w-fit text-xs font-bold uppercase tracking-wider text-brand">
              {post.category}
            </span>
            <h1 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl text-balance">
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-5 text-xs font-medium text-white/70">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
            </div>
          </div>
        </section>

        {/* ARTICLE BODY */}
        <article className="container-px mx-auto max-w-[760px] mt-10 lg:mt-14">
          <p className="text-lg leading-relaxed text-text font-medium">{post.excerpt}</p>
          <div className="mt-6 space-y-5">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <section className="container-px mx-auto max-w-[1200px] mt-16 lg:mt-20">
            <h3 className="mb-6 border-b border-border pb-4 font-display text-xl font-bold text-text">
              More in {post.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blogs/${r.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-2">
                    <img
                      src={r.image}
                      alt={r.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                      {r.category}
                    </span>
                    <h4 className="font-display text-sm font-bold leading-snug text-text group-hover:text-brand transition-colors">
                      {r.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA BANNER */}
        <section className="container-px mx-auto max-w-[1200px] mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] px-6 py-12 text-center md:px-12 md:py-16 shadow-xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="mb-3 font-display text-2xl font-bold text-white md:text-3xl">
                Need Help Choosing the Right Mahindra?
              </h3>
              <p className="mb-8 text-sm text-white/80 md:text-base max-w-lg mx-auto">
                Our experts are here to help you find the perfect SUV tailored to your lifestyle and budget.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/book-a-test-drive" className="w-full sm:w-auto rounded-md bg-brand px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-light">
                  Book a Test Drive
                </Link>
                <Link href="/contact-us" className="w-full sm:w-auto rounded-md border border-white/30 bg-black/40 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black">
                  Get a Quote
                </Link>
                <Link href={`tel:${company.phoneE164}`} className="w-full sm:w-auto rounded-md border border-white/30 bg-black/40 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black">
                  Call Dealer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
