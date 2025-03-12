"use client";
import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        console.log("Fetching data from:", process.env.NEXT_PUBLIC_BASE_URL + url);
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url);
        if (!response.ok) throw new Error(response.statusText);
        const json: T = await response.json();
        console.log("JSON", json)
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data`);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, error };
}