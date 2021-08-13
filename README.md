![image](https://user-images.githubusercontent.com/69138026/127688763-0ac2fdb2-3f77-4de5-bacd-f56b3d600f31.png)
# Pagely
## Build blazing fast websites with Notion in light speed ⚡️

Launch SEO friendly, blazing fast websites from Notion,Google Sheets, GitHub,  Airtable with Pagely

## What's Pagely

Pagely is a no-code platform that helps you launch websites from your favourite apps such as Notion, GitHub, Google Sheets, Airtable and more 🤯. Instead of letting you handle all the SEO stuff, Pagely automatically makes it SEO friendly for you. Don't like the default styles of Notion? No worries, you can edit the CSS till your heart's content. And one of my most favourite features - custom subdomains. Pagely lets you choose your subdomain of choice Eg. lalit.pagely.site, your-name.pagely.site, etc... Yeah, you got it right - Hashnode does that too. All you need to do is type out the content of your website in Notion and your website gets updated live, in real-time!!. You can make a website for your open source project on GitHub just by adding a `pagely.json` too!!. . There are a ton more features in Pagely.

## Features

1. Free custom subdomains (eg. your-name.pagely.site)
2. **Live updating** website
3. Automatic OG Image generation ( **not with puppeteer** 🤯  read more to find out)
4. Custom styling ( with CSS )
5. Custom `<head>` tags ( for analytics and infinite more integrations )
6. **Showcase** your websites in the [showcase page](https://pagely.site/showcase)
7. Blazing **fast** websites
8. **Custom domains** ( via a workaround until [Vercel supports it](https://github.com/vercel/vercel/discussions/4840#discussioncomment-620716) )
9. Detailed **guides** on how to integrate Pagely with various subpages
10. Custom slugs/subpaths/subroutes/**pretty URLs** for Notion pages ( coming soon )
11. **Password protection** for websites ( via inbuilt StaticShield integration 😜 )
12. **Powerful integrations** such as Crisp.chat, Disqus, Google analytics, Stripe, Gumroad, etc..
13. On Vercel .Your Pagely website is **cached on Vercel's edge network**
14. **Automatic sitemaps** ( coming soon )
15. Custom **fonts**, **favicons**, and more
16. Automatic SSL ( **https** )
17. Create awesome websites from your **mobile phone** 🤯
18. **Full text search** for whole website ( coming soon )
19. **Syntax highlighting** for code blocks
20. **Dark mode** for all websites ( coming by tomorrow )
21. Live twitter preview of your website

## Soem handy links

- Live website → https://pagely.site
- GitHub repo → https://github.com/lalit2005/pagely
- Showcase → https://pagely.site/showcase
- Guides → https://guides.pagely.site
- Example site with Notion → https://lalit.pagely.site
- Example site with GitHub → https://pagely-with-github.pagely.site/

## Tech Stack 📚

This is one of the most surprising part of the blog. That's because Pagely is completely built with the Jamstack. Yeah, you heard me right. The whole app was made with Next.js (except for the automatic OG image generation service )

-  Next.js - The most amazing React framework on the planet
- Clerk - Authentication
- TailwindCSS - Styling
- Radix UI - Primitive react component library
- Headless UI - UI component library
- Supabase (Postgres) - Database
- Prisma - Database ORM
- Axios - API requests
- React Hook Form - Form validation
- Zod - Validation
- Web3forms - Form submissions
- SWR - Remote data fetching
- Typescript - Type checking
- Vercel - Hosting

## Contributing

You can contribute by submitting templates too!! For more details visit https://pagely.site/templates

- Clone this repo → `git clone https://github.com/Lalit2005/pagely`
- Set up Clerk's environment variables from Clerk's dashboard
- Spin up a free Postgres database in Supabase and get the connection URL/string
- Get your API key from Imgbb [here](https://imgbb.com/) (Only if you are contributing to the Image-uploading section)
- Install the dependencies → `yarn`
- Run the app on localhost → `yarn dev`
- Create a new branch
- Once finishing a new feature or fixing a bug, just open a PR :)

> Remember to use **conventional commits**. 
> - **fix: \<a bug\>** for a bug fix
> - **feat: \<a new feature\>** for a new feature
> - **refactor: \<a code refactor\>** for a code refactor
> - **chore: \<bump lodash\>** anything related to build step
> - **chore(deps): \<bump lodash\>** for a dependency update
> - **chore(deps-dev): \<bump vercel\>** for a dev-dependency update
> - **style: \<add margin\>** for anything related to styling of the application

## Support Me ☕️

If you would like to support me, you can by me a coffee here 👇


<a href="https://www.buymeacoffee.com/lalitcodes" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
