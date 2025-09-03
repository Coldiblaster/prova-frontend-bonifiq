import { useEffect } from "react";

export function usePostMessage<T = unknown>(
  callback: (data: T, event: MessageEvent<T>) => void,
  options?: { origin?: string }
) {
  useEffect(() => {
    function handleMessage(event: MessageEvent<T>) {
      if (options?.origin && event.origin !== options.origin) return;
      callback(event.data, event);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [callback, options?.origin]);
}
