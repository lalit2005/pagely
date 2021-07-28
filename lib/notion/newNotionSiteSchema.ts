import * as z from 'zod';

export const newNotionSiteSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must be at least 1 character long.')
    .max(100, 'Name must be less than 100 characters long.')
    .nonempty('Please enter a name for the site.'),
  description: z
    .string()
    .min(1, 'Description must be at least 1 character long.')
    .max(100, 'Description must be less than 100 characters long.')
    .nonempty('Please fill in the description.')
    .optional(),
  notionPageUrl: z
    .string()
    .url('Please enter avalid URL for the Notion page.')
    .min(1, 'Please fill in the URL field with a valid notion page URL.')
    .nonempty('Please fill in the URL field with a valid notion page URL.'),
  subdomain: z
    .string()
    .min(1, 'Subdomain must be at least 1 character long.')
    .max(100, 'Subdomain must be less than 100 characters long.')
    .nonempty(
      'Please fill in the subdomain field with your favourite subdomain.'
    ),
  ogImageUrl: z.string().optional(),
});
