import { useCallback, useRef, useState } from 'react';

/** Evita duplo toque e mantém loading estável até a ação terminar. */
export function useLockedAction<T extends unknown[]>(
  action: (...args: T) => Promise<void> | void
) {
  const lock = useRef(false);
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (...args: T) => {
      if (lock.current) return;
      lock.current = true;
      setLoading(true);
      try {
        await action(...args);
      } finally {
        lock.current = false;
        setLoading(false);
      }
    },
    [action]
  );

  return { run, loading };
}
