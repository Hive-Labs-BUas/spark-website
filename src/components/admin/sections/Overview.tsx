import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, Check, ChevronRight, Eye, FileText, Globe2, Mail, TrendingUp, UserCheck, Users } from "lucide-react";

import type { AdminData } from "@/lib/admin-data";
import { getVisitorStats } from "@/lib/analytics.functions";
import { countryFlag } from "@/lib/people";
import { formatDate } from "@/lib/queries";

export type AdminSectionId =
  | "overview"
  | "articles"
  | "results" | "teams"
  | "requests"
  | "members"
  | "shop"
  | "hive"
  | "staff"
  | "site";


function Stat({
  icon: Icon,
  label,
  value,
  hint,
  onClick,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  hint?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="admin-metric group w-full border border-border/70 bg-surface/70 p-4 text-left transition-all hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:p-5"
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4 text-primary" aria-hidden />
        <p className="text-xs uppercase tracking-wider">{label}</p>
      </div>
      <p className="mt-3 font-display text-3xl text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </button>
  );
}

export function Overview({
  data,
  isLoading,
  onGo,
}: {
  data: AdminData | undefined;
  isLoading: boolean;
  onGo: (section: AdminSectionId) => void;
}) {
  const loadStats = useServerFn(getVisitorStats);
  const visitors = useQuery({ queryKey: ["visitor-stats"], queryFn: () => loadStats({}) });
  const orders = data?.orders ?? [];
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const monthRevenue =
    orders
      .filter((order) => new Date(order.created_at) >= monthStart)
      .reduce((sum, order) => sum + order.amount_cents, 0) / 100;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount_cents, 0) / 100;
  const openMessages = (data?.messages ?? []).filter((m) => m.status !== "done").length;
  const openApplications = (data?.applications ?? []).filter((a) => a.status !== "done").length;
  const activeMembers = (data?.memberships ?? []).filter((m) => m.status === "active").length;
  const drafts =
    (data?.news ?? []).filter((n) => !n.published).length +
    (data?.research ?? []).filter((r) => !r.published).length;

  const pendingShop = (data?.shopRequests ?? []).filter((r) => r.status === "awaiting_payment").length;
  const unlinkedResults = (data?.results ?? []).filter((r) => !r.team_id).length;
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const attention: { label: string; done: string; count: number; go: AdminSectionId }[] = [
    { label: `${plural(openMessages, "contact message")} waiting for a reply`, done: "No open contact messages", count: openMessages, go: "requests" },
    { label: `${plural(openApplications, "internship application")} to review`, done: "No applications to review", count: openApplications, go: "requests" },
    { label: `${plural(pendingShop, "shop request")} awaiting payment`, done: "No pending shop requests", count: pendingShop, go: "shop" },
    { label: `${plural(unlinkedResults, "match result")} not linked to a team`, done: "All match results linked to a team", count: unlinkedResults, go: "results" },
  ];
  const openTodos = attention.filter((item) => item.count > 0).length;

  const stats = visitors.data;
  const maxDay = Math.max(1, ...(stats?.daily ?? []).map((d) => d.views));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Stat
          icon={UserCheck}
          label="Active members"
          value={isLoading ? "—" : activeMembers}
          onClick={() => onGo("members")}
        />
        <Stat
          icon={TrendingUp}
          label="Monthly revenue"
          value={isLoading ? "—" : `€${monthRevenue.toFixed(2)}`}
          hint={`€${totalRevenue.toFixed(2)} all time`}
          onClick={() => onGo("shop")}
        />
        <Stat icon={Mail} label="Open messages" value={isLoading ? "—" : openMessages} onClick={() => onGo("requests")} />
        <Stat icon={Users} label="Newsletter" value={isLoading ? "—" : data?.signups.length ?? 0} onClick={() => onGo("members")} />
        <Stat
          icon={FileText}
          label="Published"
          value={isLoading ? "—" : (data?.news ?? []).filter((n) => n.published).length + (data?.research ?? []).filter((r) => r.published).length}
          hint={`${drafts} draft${drafts === 1 ? "" : "s"}`}
          onClick={() => onGo("articles")}
        />
        <Stat icon={AlertTriangle} label="Applications" value={isLoading ? "—" : openApplications} onClick={() => onGo("requests")} />
      </div>

      <div className="admin-panel border border-border/70 bg-surface/65 p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="flex items-center gap-2 text-2xl">
            <Eye className="size-5 text-primary" aria-hidden /> Website visits
          </h2>
          <p className="text-xs text-muted-foreground">
            Anonymous page views — no names or emails are stored. Last 30 days.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { label: "Today", value: stats?.today },
            { label: "Last 7 days", value: stats?.week },
            { label: "Last 30 days", value: stats?.month },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-background/45 p-3 sm:p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
              <p className="mt-2 font-display text-3xl text-primary">
                {visitors.isLoading ? "—" : item.value ?? 0}
              </p>
            </div>
          ))}
        </div>

        {(stats?.daily ?? []).length > 0 && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Views per day</p>
            <div className="mt-3 flex h-24 items-end gap-1.5">
              {(stats?.daily ?? []).map((day) => (
                <div
                  key={day.day}
                  title={`${day.day}: ${day.views} views`}
                  className="flex-1 rounded-t bg-primary/60"
                  style={{ height: `${Math.max(4, (day.views / maxDay) * 100)}%` }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Most visited pages</p>
            <ul className="mt-3 space-y-2 text-sm">
              {(stats?.pages ?? []).map((page) => (
                <li key={page.key} className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-muted-foreground">{page.key}</span>
                  <span className="font-semibold text-primary">{page.views}</span>
                </li>
              ))}
              {(stats?.pages ?? []).length === 0 && (
                <li className="text-muted-foreground">
                  {visitors.isLoading ? "Loading…" : "No visits recorded yet."}
                </li>
              )}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Globe2 className="size-3.5 text-primary" aria-hidden /> Where visitors come from
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {(stats?.countries ?? []).map((country) => (
                <li key={country.key} className="flex items-baseline justify-between gap-3">
                  <span className="text-muted-foreground">
                    {countryFlag(country.key) ?? ""} {country.key}
                  </span>
                  <span className="font-semibold text-primary">{country.views}</span>
                </li>
              ))}
              {(stats?.countries ?? []).length === 0 && (
                <li className="text-muted-foreground">
                  {visitors.isLoading ? "Loading…" : "Country data appears once the site is live."}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="admin-panel border border-border/70 bg-surface/65 p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-2xl">Needs attention</h2>
            <span className="text-xs text-muted-foreground">
              {isLoading ? "—" : openTodos === 0 ? "All clear" : `${openTodos} open`}
            </span>
          </div>
          <ul className="mt-4 space-y-2">
            {attention.map((item) => {
              const done = !isLoading && item.count === 0;
              return (
                <li key={item.done}>
                  <button
                    type="button"
                    onClick={() => onGo(item.go)}
                    className={`flex min-h-12 w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${done ? "border-border/40 text-muted-foreground/70" : "border-primary/30 bg-primary/5 text-foreground"}`}
                  >
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${done ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}>
                      {done ? <Check className="size-4" aria-hidden /> : isLoading ? "…" : item.count}
                    </span>
                    <span className={`flex-1 ${done ? "line-through decoration-muted-foreground/40" : ""}`}>
                      {done ? item.done : item.label}
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="admin-panel border border-border/70 bg-surface/65 p-5 sm:p-6">
          <h2 className="text-2xl">Latest membership activity</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {(data?.events ?? []).slice(0, 6).map((event) => (
              <li key={event.id} className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-primary">{event.event_type}</span>
                <span className="text-muted-foreground">
                  {event.email ?? "—"} · {formatDate(event.created_at)}
                </span>
              </li>
            ))}
            {(data?.events ?? []).length === 0 && (
              <li className="text-muted-foreground">No membership activity yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
