import gh from 'parse-github-url';

export default function getFileUrlFromRepoUrl(repoUrl: string): string {
  const data = gh(repoUrl);
  const owner = data.owner;
  const name = data.name;
  return `https://raw.githubusercontent.com/${owner}/${name}/master/pagely.json`;
}
