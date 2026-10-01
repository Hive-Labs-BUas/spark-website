import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/lib/queries";

/**
 * Short editable texts used on public pages (for example the Minecraft server
 * address shown on the About page).
 */
export function SiteSettingsEditor({
  keys,
  intro,
  multiline = [],
}: {
  keys: string[];
  intro: string;
  multiline?: string[];
}) {
  const { data, isLoading } = useSiteSettings();
  const queryClient = useQueryClient();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const rows = (data ?? [])
    .filter((row) => keys.includes(row.key))
    .sort((a, b) => keys.indexOf(a.key) - keys.indexOf(b.key));

  async function save(id: string, value: string): Promise<void> {
    const { error } = await supabase.from("site_settings").update({ value } as never).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved");
    await queryClient.invalidateQueries({ queryKey: ["site_settings"] });
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{intro}</p>

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {rows.map((row) => {
        const value = drafts[row.id] ?? row.value;
        return (
          <div key={row.id} className="surface-card space-y-3 bg-surface-2 p-5">
            <div className="space-y-2">
              <Label htmlFor={`setting-${row.id}`}>{row.label}</Label>
              {multiline.includes(row.key) || value.length > 90 ? (
                <Textarea
                  id={`setting-${row.id}`}
                  rows={multiline.includes(row.key) ? 6 : 3}
                  value={value}
                  onChange={(e) => setDrafts({ ...drafts, [row.id]: e.target.value })}
                />
              ) : (
                <Input
                  id={`setting-${row.id}`}
                  value={value}
                  onChange={(e) => setDrafts({ ...drafts, [row.id]: e.target.value })}
                />
              )}
              {row.description ? (
                <p className="text-xs text-muted-foreground">{row.description}</p>
              ) : null}
            </div>
            <Button onClick={() => void save(row.id, value.trim())} disabled={value.trim() === row.value}>
              Save
            </Button>
          </div>
        );
      })}

      {!isLoading && rows.length === 0 && (
        <p className="text-sm text-muted-foreground">Nothing to edit here yet.</p>
      )}
    </div>
  );
}
