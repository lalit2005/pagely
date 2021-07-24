import { z } from 'zod';

export const notionPageSeoSchema = z.object({
  siteName: z
    .string()
    .min(1, 'Name must be at least 1 character long.')
    .max(100, 'Name must be less than 100 characters long.')
    .nonempty('Please enter a name for the site.'),
  siteDesc: z
    .string()
    .min(1, 'Description must be at least 1 character long.')
    .max(100, 'Description must be less than 100 characters long.')
    .nonempty('Please fill in the description.')
    .optional(),
  ogImageUrl: z
    .string()
    .url("Please enter a valid URL for the site's OG image.")
    .min(1, 'Please enter a valid URL for the image.')
    .optional()
    .nullable(),
});
