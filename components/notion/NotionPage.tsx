import {
  NotionRenderer,
  Code,
  Collection,
  CollectionRow,
} from "react-notion-x";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";

const Pdf = dynamic(() =>
  import("react-notion-x").then((notion) => notion.Pdf)
);

const Equation = dynamic(() =>
  import("react-notion-x").then((notion) => notion.Equation)
);

const Tweet = dynamic(() => import("react-tweet-embed"));

const Modal = dynamic(
  () => import("react-notion-x").then((notion) => notion.Modal),
  { ssr: false }
);

export default function Home({ recordMap, customCss }) {
  if (!recordMap) {
    return null;
  }

  useEffect(() => {
    const pageIcon = document?.querySelector(".notion-page-icon");
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${pageIcon.innerHTML}</text></svg>`;
    document.getElementsByTagName("head")[0]?.appendChild(link);

    const title = document?.createElement("title");
    title.innerHTML = document.querySelector(".notion-title")?.innerHTML;
    document.getElementsByTagName("head")[0]?.appendChild(title);
  }, []);

  return (
    <div>
      <Head>
        <style>{customCss}</style>
      </Head>
      <NotionRenderer
        className="pagely-container"
        showCollectionViewDropdown={false}
        components={{
          pdf: Pdf,
          modal: Modal,
          tweet: Tweet,
          collection: Collection,
          collectionRow: CollectionRow,
          equation: Equation,
          code: Code,
          pageLink: ({
            href,
            as,
            passHref,
            prefetch,
            replace,
            scroll,
            shallow,
            locale,
            ...props
          }) => (
            <Link
              href={href}
              as={as}
              passHref={passHref}
              prefetch={prefetch}
              replace={replace}
              scroll={scroll}
              shallow={shallow}
              locale={locale}>
              <a {...props} />
            </Link>
          ),
        }}
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
      />
    </div>
  );
}
