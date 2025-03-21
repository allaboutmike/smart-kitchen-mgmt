"use client";
import { useState } from "react";


export function useMutation<T>(mutationType: mutationType, url: string) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = async (payload?: Record<string, string | boolean | unknown>): Promise<MutationResponse<T>> => {
    setIsPending(true);
    setError(null);

    try {
      console.log(`${mutationType} request to`, process.env.NEXT_PUBLIC_BASE_URL + url);

      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, {
        method: mutationType,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("the response", response, response.ok);
      if (!response.ok) throw new Error(response.statusText);

      const contentType = response.headers.get("content-type");

      let data: T | null = null;
      if (contentType?.includes("application/json")) {
        data = await response.json();
        console.log("JSON response", data);
      }

      return {
        success: true,
        data
      }

    } catch (error) {
      console.log("Error in updateData:", error);
      setError(`${error} Could not update data`);
      return {
        success: false,
        data: null,
      }
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, error, updateData };
}

type mutationType = "PUT" | "POST" | "DELETE";

type MutationResponse<T> = {
  success: boolean;
  data: T | null;
};