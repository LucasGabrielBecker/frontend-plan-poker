import { useState, useEffect } from "preact/hooks";
import { EVENTS } from "../config/SocketEvents";
import { useReduce } from "../context/socket";
export function useFetch(url) {
  const { dispatch } = useReduce();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const abortController = new AbortController();
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        if (!abortController.signal.aborted) {
          const data = await response.json();
          dispatch({
            type: EVENTS.LISTENERS.UPDATE_CARDS,
            payload: {
              cards: data.room?.cards,
              users: data.connectedClients,
            },
          });
        }
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    })();

    return () => abortController.abort();
  }, [url]);
  return { error, loading };
}
