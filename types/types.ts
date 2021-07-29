export interface NewNotionSiteFormValues {
  subdomain: string;
  name: string;
  description: string;
  notionPageUrl: string;
  ogImageUrl: string;
}

export interface NewGitHubSiteFormValues {
  repoUrl: string;
  subdomain: string;
  siteName: string;
}

export interface NotionSeoSettings {
  ogImageUrl: string;
  siteName: string;
  siteDesc: string;
}
export interface ShowcaseWebsites {
  siteName: string;
  subdomain: string;
  ogImageUrl: string;
  id: string;
}
