import Navbar from "@/components/Navbar";
import { SiNotion, SiGooglesheets, SiAirtable, SiGithub } from "react-icons/si";
import { FaRobot } from "react-icons/fa";

export default function Page() {
  return (
    <div className="mx-10">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-24">
        <div className="text-center">
          <p className="mb-1 text-xs font-semibold tracking-widest text-gray-500 uppercase title-font ">
            No coding required
          </p>
          <h1 className="text-5xl font-extrabold">
            The quickest way to launch beautiful websites from your favourite
            apps
          </h1>
          <h2 className="mt-5 text-xl text-gray-600">
            Launch websites from{" "}
            <span className="relative inline-block mx-1 top-1">
              <SiNotion />
            </span>
            <span className="font-medium text-gray-700">Notion</span>,
            <span className="relative inline-block mx-1 top-1">
              <SiGooglesheets />
            </span>
            <span className="font-medium text-gray-700">Google Sheets</span>,{" "}
            <span className="relative inline-block mx-1 top-1">
              <SiGithub />
            </span>
            <span className="font-medium text-gray-700">GitHub</span>,{" "}
            <span className="relative inline-block mx-1 top-1">
              <SiAirtable />
            </span>{" "}
            <span className="font-medium text-gray-700">Airtable</span> or just
            by chatting with a{" "}
            <span className="relative inline-block mx-1 top-1">
              <FaRobot />
            </span>
            <span className="font-medium text-gray-700">robot</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
