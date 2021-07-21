import { useClerk } from '@clerk/clerk-react';
import useSWR from 'swr';

export const useClerkSWR = <T>(url: string, fetcher = null) => {
  const { session } = useClerk();
  if (!session) {
    throw new Error('Cannot useClerkSWR when there is no session.');
  }
  const sessionId = session.id;

  // The fetcher is not included as part of useSWR's cache key,
  // so we must append clerk session ID directly to the URL
  const urlWithSession = new URL(url, window.location.href);
  urlWithSession.searchParams.set('_clerk_session_id', sessionId);

  // The default fetcher includes credentials and returns json
  if (!fetcher) {
    fetcher = (request, options) => {
      return fetch(request, { ...options, credentials: 'include' }).then((r) =>
        r.json()
      );
    };
  }
  // @ts-ignore
  return useSWR<T>(urlWithSession, fetcher);
};
