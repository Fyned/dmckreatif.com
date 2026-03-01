import { useEffect, useState } from "react";
import { loadEnNamespace, type EnNamespace } from "@/i18n";

export function useEnNamespace(...namespaces: EnNamespace[]): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadEnNamespace(...namespaces).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  return ready;
}
