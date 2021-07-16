import toast, { Toaster } from "react-hot-toast";

const validateData = (data) => {
  // check if data.notionPageUrl contains "/"
  if (!data.notionPageUrl.includes("/")) {
    toast.error("Please enter a valid notion.so or notion.site URL", {
      duration: 5000,
      position: "bottom-center",
    });
    return;
  }

  const notionPageUrl = data.notionPageUrl;
  const notionPageUrlParts = notionPageUrl.split("/");
  const host = notionPageUrlParts[2];
  // check if data.notionPageUrl has domain name without subdomain is notion.so or notion.site
  if (!host.endsWith("notion.so") && !host.endsWith(".notion.site")) {
    toast.error("Please enter a valid notion.so or notion.site URL", {
      duration: 5000,
      position: "bottom-center",
    });
    return;
  }

  // check if data.subdomain is url
  const subdomain = data.subdomain;
  const subdomainUrl = subdomain.replace(/^https?:\/\//, "");
  if (/^[a-z0-9\-]+\.[a-z]+$/.test(subdomainUrl)) {
    toast.error(
      "Please enter a valid subdomain without any special characters. You can use alphanumeric characters, and hyphens",
      {
        duration: 5000,
        position: "bottom-center",
      }
    );
    return;
  }

  // check if data.subdomain contains any special characters other than hyphens
  if (/[^a-z0-9-]/gi.test(subdomain)) {
    toast.error(
      "Subdomain should not contain any special characters other than hyphens",
      {
        duration: 5000,
        position: "bottom-center",
      }
    );
    return;
  }

  // check if data.subdomain starts or ends with special character or a hyphen
  if (/^[^a-z0-9]|[^a-z0-9]$/gi.test(subdomain)) {
    toast.error(
      "Subdomain should not start or end with a special character or a hyphen",
      {
        duration: 5000,
        position: "bottom-center",
      }
    );
    return;
  }

  // check if data.subdomain starts with http
  if (/^http/gi.test(subdomain)) {
    toast.error("Subdomain should not start with http", {
      duration: 5000,
      position: "bottom-center",
    });
    return;
  }

  // check if data.ogImageUrl is a data uri
  const ogImageUrl = data.ogImageUrl;
  if (ogImageUrl.startsWith("data:")) {
    toast.error("Please enter a valid URL. Do not use data URIs", {
      duration: 5000,
      position: "bottom-center",
    });
    return;
  }

  return null;
};

export default validateData;
