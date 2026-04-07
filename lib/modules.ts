import { cache } from "react";
import { logError } from "@/lib/logger";
import { getSupabasePublicClient } from "@/lib/supabasePublic";
import type { TrainingModule } from "@/lib/types";

export const getPublishedModules = cache(async (): Promise<TrainingModule[]> => {
  const supabasePublic = getSupabasePublicClient();
  const { data, error } = await supabasePublic
    .from("modules")
    .select("id, title, description, video_url, position, is_published")
    .eq("is_published", true)
    .order("position", { ascending: true });

  if (error) {
    logError("Impossible de recuperer les modules publies.", { error });
    return [];
  }

  return (data || []) as TrainingModule[];
});
