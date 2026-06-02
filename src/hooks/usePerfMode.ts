import { useEffect, useState } from "react";
import { subscribePerfMode, isDegraded } from "@/lib/perfMode";

export function usePerfMode(): boolean {
  const [degraded, setDegraded] = useState<boolean>(isDegraded());
  useEffect(() => subscribePerfMode(setDegraded), []);
  return degraded;
}
