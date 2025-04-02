import type { ProjectData } from "@/app/importer/types/project";
import apiClientCode from "@/app/importer/code-snippets/api-client.example";

export const dziScraperData: ProjectData = {
  id: "dzi-scraper",
  title: "DZI Charity Scraper",
  subtitle: "Data Collection Tool for Charity Organizations",
  description:
    "The DZI Scraper collects information about charitable organizations " +
    "from the German Central Institute for Social Issues...",
  codeExamples: [
    {
      id: "api-client",
      title: "API Client",
      description: "Handles the API calls to digidip",
      language: "typescript",
      code: apiClientCode,
    },
  ],
};
