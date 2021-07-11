import { NotionAPI } from "notion-client";
import Homepage from "@/components/Homepage";
import { GetServerSideProps } from "next";
import NotionPage from "@/components/notion/NotionPage";
export default function Page({ homepage, subdomain, integration, recordMap }) {
  if (homepage) {
    return (
      <div>
        <Homepage />
      </div>
    );
  }

  if (integration === "notion") {
    return (
      <div>
        <NotionPage recordMap={recordMap} customCss="" />;
      </div>
    );
  }

  return <div>{subdomain} not found</div>;
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const reqUrl = req.headers.host;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );

  if (process.env.NODE_ENV !== "production") {
    if (
      new URL("http://" + reqUrl).origin.split(".")[0] ===
      "http://localhost:3000"
    ) {
      return {
        props: {
          homepage: true,
          subdomain: false,
        },
      };
    } else if (new URL("http://" + reqUrl).origin.includes("localhost:3000")) {
      const notion = new NotionAPI();
      const recordMap = await notion.getPage(reqUrl.split(".")[0]);
      return {
        props: {
          homepage: false,
          subdomain: reqUrl.split(".")[0],
          recordMap: recordMap,
          integration: "notion",
        },
      };
    }
  }

  if (new URL("https://" + reqUrl).host === "pagely.site") {
    return {
      props: {
        homepage: true,
        subdomain: "",
      },
    };
  } else {
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(reqUrl.split(".")[0]);
    // console.log(idToUuid(reqUrl.split(".")[0]));
    // const metaData =
    //   @ts-ignore
    //   recordMap.block[asd].value.format.page_icon;
    return {
      props: {
        homepage: false,
        subdomain: reqUrl.split(".")[0],
        recordMap: recordMap,
        integration: "notion",
      },
    };
  }
};
