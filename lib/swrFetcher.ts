const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export default fetcher;
