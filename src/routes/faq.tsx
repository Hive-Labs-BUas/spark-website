import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PageHeader } from "@/components/site/Bits";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useFaqs } from "@/lib/queries";
import { getPublicFaqs } from "@/lib/public-content.functions";
import { SITE_URL } from "@/lib/site-data";

const TITLE = "FAQ — Joining, Membership & The Hive | Breda Guardians";
const DESCRIPTION =
  "Answers about joining Breda Guardians, membership tiers, tryouts, the Hive and our community rules.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: `${SITE_URL}/faq` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
  }),
  loader: () => getPublicFaqs(),
  component: Faq,
});

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const SUGGESTED_KEYWORDS = ["join", "member", "tryout", "hive", "discord"];

function Faq() {
  const { data } = useFaqs(Route.useLoaderData());
  const all = data ?? [];

  const grouped = useMemo(() => {
    const map = new Map<string, typeof all>();
    for (const item of all) {
      const list = map.get(item.category) ?? [];
      map.set(item.category, [...(list ?? []), item] as typeof all);
    }
    return Array.from(map.entries());
  }, [all]);

  const categoryById = useMemo(() => {
    const map = new Map<string, string>();
    for (const [category, items] of grouped) {
      for (const item of items ?? []) map.set(item.id, category);
    }
    return map;
  }, [grouped]);

  const suggested = useMemo(() => {
    const scored = all
      .map((item) => ({
        item,
        category: categoryById.get(item.id) ?? "",
        score: SUGGESTED_KEYWORDS.reduce(
          (n, k) => n + (item.question.toLowerCase().includes(k) ? 1 : 0),
          0,
        ),
      }))
      .sort((a, b) => b.score - a.score);
    const picked: typeof all = [];
    const seenCats = new Set<string>();
    for (const { item, category } of scored) {
      if (picked.length >= 3) break;
      if (seenCats.has(category)) continue;
      seenCats.add(category);
      picked.push(item);
    }
    return picked;
  }, [all, categoryById]);

  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [openMap, setOpenMap] = useState<Record<string, string>>({});

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        let current: string | null = null;
        document.querySelectorAll<HTMLElement>("[data-faq-cat]").forEach((el) => {
          if (el.getBoundingClientRect().top <= 190) current = el.dataset["faqCat"] ?? null;
        });
        setActiveCat(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [all.length]);

  function jumpTo(category: string): void {
    const el = document.getElementById(`faq-${slugify(category)}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${slugify(category)}`);
  }

  function openQuestion(id: string): void {
    const category = categoryById.get(id);
    if (!category) return;
    setOpenMap((map) => ({ ...map, [category]: id }));
    jumpTo(category);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: all.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {all.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <PageHeader
        eyebrow="FAQ"
        title="Questions, Answered"
        intro="The things people ask us most, grouped by topic."
      />

      {all.length > 0 && (
        <nav
          aria-label="FAQ topics"
          className="sticky top-14 z-30 border-b border-border/70 bg-background/85 backdrop-blur-lg lg:top-20"
        >
          <div className="container-site flex gap-2 overflow-x-auto py-3 no-scrollbar">
            {grouped.map(([category]) => (
              <button
                key={category}
                onClick={() => jumpTo(category)}
                aria-current={activeCat === category ? "true" : undefined}
                className={cn(
                  "shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                  activeCat === category
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface text-muted-foreground hover:border-primary/60 hover:text-primary",
                )}
                style={{ clipPath: "polygon(0 0, calc(100% - 9px) 0, 100% 100%, 0 100%)" }}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>
      )}

      <section className="section-y-first">
        <div className="container-site">
          {suggested.length > 0 && (
            <div>
              <p className="eyebrow">Suggested questions</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {suggested.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openQuestion(item.id)}
                    className="surface-card group border-l-2 border-primary/70 p-4 text-left transition-colors hover:bg-surface-2"
                  >
                    <p className="text-sm font-semibold leading-snug">{item.question}</p>
                    <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                      {categoryById.get(item.id)}
                      <ArrowRight className="ml-1 inline size-3.5 transition-transform group-hover:translate-x-1" />
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>


      <div className="pb-24">
          {grouped.map(([category, items]) => (
            <section
              key={category}
              id={`faq-${slugify(category)}`}
              data-faq-cat={category}
              className="scroll-mt-36 pt-10 md:pt-14"
            >
              <div className="container-site">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-5 w-1 bg-primary" />
                  <h2 className="text-2xl uppercase md:text-3xl">{category}</h2>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  value={openMap[category] ?? ""}
                  onValueChange={(value) =>
                    setOpenMap((map) => ({ ...map, [category]: value ?? "" }))
                  }
                  className="mt-5 flex flex-col gap-2.5"
                >
                  {(items ?? []).map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="surface-card overflow-hidden border-transparent data-[state=open]:border-primary/40"
                    >
                      <AccordionTrigger className="min-h-14 px-4 text-left text-base hover:text-primary hover:no-underline md:text-lg [&>svg]:size-4 [&>svg]:text-primary">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="border-t border-border/60 px-4 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          ))}
      </div>
    </>
  );
}
