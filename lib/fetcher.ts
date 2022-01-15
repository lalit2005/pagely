import useSWR from 'swr';
import useUrlWithSession from './useUrlWithSession';

export const useClerkSWR = <T>(url: string, fetcher = null) => {
  if (!fetcher) {
    fetcher = (request, options) => {
      return fetch(request, { ...options, credentials: 'include' }).then((r) =>
        r.json()
      );
    };
  }

  const newUrl = useUrlWithSession(url);

  return useSWR<T>(newUrl, fetcher);
};
