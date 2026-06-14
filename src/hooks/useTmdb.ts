import axios from "axios";
import { useEffect, useState } from "react";

console.log("TMDB effect");

export function useTmdb<T>(url: string, params: Record<string, unknown>) {
  const [data, setData] = useState<T | null>(null);
  const paramsString = JSON.stringify(params);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            ...JSON.parse(paramsString),
          },
          signal: controller.signal,
        });

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, paramsString]);

  return { data };
}
