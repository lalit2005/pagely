import Homepage from "@/components/Homepage";
import { GetServerSideProps } from "next";
export default function Page({ homepage, subdomain }) {
  if (homepage) {
    return (
      <div>
        <Homepage />
      </div>
    );
  }

  return <div>{subdomain}</div>;
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  const reqUrl = req.headers.host;

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
      return {
        props: {
          homepage: false,
          subdomain: reqUrl.split(".")[0],
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
    return {
      props: {
        homepage: false,
        subdomain: reqUrl.split(".")[0],
      },
    };
  }
};
