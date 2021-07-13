import { notionSites } from "@prisma/client";
import { BiLinkExternal } from "react-icons/bi";
import { SiNotion } from "react-icons/si";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { parsePageId } from "notion-utils";

const SiteCard: React.FC<{ siteData: notionSites }> = ({ siteData }) => {
  const { siteName, siteDesc, notionPageUrl, subdomain } = siteData;
  return (
    <a>
      <div className="px-10 py-5 mt-5 transition-all border rounded shadow hover:shadow-xl w-96">
        <Link href={`/notion-site/${parsePageId(notionPageUrl)}`}>
          <a>
            <h2 className="text-3xl font-medium">{siteName}</h2>
            <p className="mt-3 text-base text-gray-600">
              {siteDesc.length > 30 ? siteDesc.substr(0, 30) + "..." : siteDesc}
            </p>
          </a>
        </Link>
        <div className="flex">
          <div className="inline-block mr-4">
            <Tooltip.Root delayDuration={1}>
              <Tooltip.Trigger>
                <div className="p-2 mt-3 border rounded-full hover:bg-gray-200">
                  <a
                    href={"https://" + subdomain + ".pagely.site"}
                    target="_blank">
                    <BiLinkExternal />
                  </a>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content className="px-2 py-px text-gray-100 bg-gray-900 rounded">
                {subdomain + ".pagely.site"}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Root>
          </div>
          {/* </div>
      <div> */}
          <div className="inline-block mr-4">
            <Tooltip.Root delayDuration={1}>
              <Tooltip.Trigger>
                <div className="p-2 mt-3 border rounded-full hover:bg-gray-200">
                  <a href={notionPageUrl} target="_blank">
                    <SiNotion />
                  </a>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content className="px-2 py-px text-gray-100 bg-gray-900 rounded">
                Open {siteName}'s Notion page
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Root>
          </div>
        </div>
      </div>
    </a>
  );
};

export default SiteCard;
