import { useClerk } from '@clerk/clerk-react';

const useUrlWithSession = (url: string) => {
  const { session } = useClerk();
  if (!session) {
    throw new Error('Cannot useClerkSWR when there is no session.');
  }
  const sessionId = session.id;

  // The fetcher is not included as part of useSWR's cache key,
  // so we must append clerk session ID directly to the URL
  const urlWithSession = new URL(url, window.location.href);
  urlWithSession.searchParams.set('_clerk_session_id', sessionId);
  return urlWithSession.href;
};

export default useUrlWithSession;
