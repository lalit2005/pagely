import * as z from 'zod';

const newGitHubSiteSchema = z.object({
  repoUrl: z
    .string()
    .url('Please enter a valid GitHub repo URL')
    .min(7, 'Please enter a valid GitHub repo URL.')
    .nonempty('Please enter a valid GitHub repo URL.'),
  subdomain: z
    .string()
    .nonempty('Please enter a valid subdomain for your website.'),
  siteName: z
    .string()
    .min(1, 'Name of the site should be at least 1 characters long.')
    .max(100, 'Name of the site should be 100 characters long at most.')
    .nonempty('Please enter a valid site name for your website.'),
});

export default newGitHubSiteSchema;
