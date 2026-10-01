import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Radio, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { PageHeader, SectionHeading } from "@/components/site/Bits";
import { Button } from "@/components/ui/button";
import { pickText, textLines } from "@/lib/queries";
import { getPublicPageSettings } from "@/lib/public-content.functions";
import { SITE, SITE_URL } from "@/lib/site-data";

const STREAM_RULES = [
  "Chat stays friendly — abuse, harassment or slurs get removed.",
  "No spam, self-promotion or links without asking first.",
  "Keep spoilers out of the chat unless the mods open it up.",
  "Mod calls are final; repeat rule-breaking leads to a timeout or ban.",
];

const COMMUNITY_RULES = [
  "Respect every member — in games, in chat and in person.",
  "No toxicity, discrimination or hate of any kind, on any platform.",
  "No cheating, exploiting or smurfing in community matches.",
  "Report issues to a mod privately instead of fighting it out publicly.",
];

const DEFAULT_INTRO =
  "Match days, community nights and events straight from The Hive. When we are offline you will see our latest broadcasts instead.";

const TITLE = "Watch Breda Guardians Live — Twitch Stream";
const DESCRIPTION =
  "Watch the Breda Guardians Twitch stream: match days, community nights and events from The Hive in Breda, with live chat alongside.";

const CHANNEL = SITE.twitchUrl.split("/").filter(Boolean).pop() ?? "bredaguardians";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `${SITE_URL}/live` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/live` }],
  }),
  loader: () => getPublicPageSettings(),
  component: LivePage,
});

function LivePage() {
  const settings = Route.useLoaderData();
  // Twitch only plays when every page that frames this one is listed as a parent.
  const [parents, setParents] = useState<string[] | null>(null);
  useEffect(() => {
    const hosts = new Set<string>([window.location.hostname]);
    try {
      const ancestors = window.location.ancestorOrigins;
      for (let i = 0; i < (ancestors?.length ?? 0); i += 1) {
        const origin = ancestors.item(i);
        if (origin) hosts.add(new URL(origin).hostname);
      }
    } catch {
      // Some browsers do not expose ancestor origins — the own host is enough there.
    }
    if (window.self !== window.top) {
      hosts.add("lovable.dev");
      hosts.add("lovable.app");
    }
    setParents([...hosts].filter(Boolean));
  }, []);

  const parentQuery = (parents ?? []).map((host) => `parent=${encodeURIComponent(host)}`).join("&");

  return (
    <>
      <PageHeader
        eyebrow="Live"
        title="Watch Us Live"
        intro={pickText(settings, "live_intro", DEFAULT_INTRO)}
      />

      <section className="section-y-first">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
            <div className="surface-card overflow-hidden bg-surface-2">
              <div className="aspect-video w-full bg-black">
                {parentQuery ? (
                  <iframe
                    title="Breda Guardians live stream"
                    src={`https://player.twitch.tv/?channel=${CHANNEL}&${parentQuery}&autoplay=false`}
                    allowFullScreen
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    className="size-full border-0"
                  />
                ) : (
                  <div className="grid size-full place-items-center text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Radio className="size-4 text-primary" aria-hidden /> Loading the stream…
                    </span>
                  </div>
                )}
              </div>
              <p className="flex flex-wrap items-center gap-2 border-t border-border/70 px-5 py-4 text-xs text-muted-foreground">
                Player not showing, or we are offline?
                <a
                  href={SITE.twitchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Watch on twitch.tv/{CHANNEL}
                </a>
              </p>
            </div>

            <div className="surface-card overflow-hidden bg-surface-2">
              <div className="h-[28rem] w-full bg-black lg:h-full lg:min-h-[32rem]">
                {parentQuery && (
                  <iframe
                    title="Breda Guardians stream chat"
                    src={`https://www.twitch.tv/embed/${CHANNEL}/chat?${parentQuery}&darkpopout`}
                    className="size-full border-0"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="max-w-2xl">
              <p className="eyebrow">House rules</p>
              <h2 className="mt-3 text-2xl md:text-3xl">The Short Version</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                For the stream and the community — a few simple things that keep both a good place to be.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="surface-card border border-border/50 p-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Radio className="size-4" aria-hidden /> On the stream
                </p>
                <ul className="mt-4 space-y-2.5">
                  {textLines(settings, "live_stream_rules", STREAM_RULES).map((rule) => (
                    <li key={rule} className="flex gap-3 text-sm text-muted-foreground">
                      <span aria-hidden className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-primary/60" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="surface-card border border-border/50 p-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Users className="size-4" aria-hidden /> In the community
                </p>
                <ul className="mt-4 space-y-2.5">
                  {textLines(settings, "live_community_rules", COMMUNITY_RULES).map((rule) => (
                    <li key={rule} className="flex gap-3 text-sm text-muted-foreground">
                      <span aria-hidden className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-primary/60" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="panel-gradient mt-10 flex flex-col items-start gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <SectionHeading
                eyebrow="Never miss a match"
                title="Follow The Channel"
                intro="Get a ping when we go live, and join the Discord to talk through the match with the rest of the Hive."
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={SITE.twitchUrl} target="_blank" rel="noreferrer">
                  <Radio className="size-4" aria-hidden /> Open on Twitch
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={SITE.discordUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" aria-hidden /> Join Discord
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
