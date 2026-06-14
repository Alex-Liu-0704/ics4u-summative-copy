import { useEffect, useState } from "react";

export function useLocalStorage<T, S = T>(
  key: string,
  initialValue: T,
  options?: {
    serialize: (value: T) => S;
    deserialize: (stored: S) => T;
  },
) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);

    if (stored === null) {
      return initialValue;
    }

    try {
      const parsed = JSON.parse(stored);

      return options ? options.deserialize(parsed as S) : (parsed as T);
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    const data = options ? options.serialize(value) : value;

    localStorage.setItem(key, JSON.stringify(data));
  }, [key, value, options]);

  return [value, setValue] as const;
}
