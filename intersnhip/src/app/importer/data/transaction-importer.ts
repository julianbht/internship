import type { ProjectData } from "@/app/importer/types/project";
import apiClientCode from "@/app/importer/code/api-client.example";

export const transactionImporterData: ProjectData = {
  id: "transaction-importer",
  title: "Transaction Importer",
  subtitle: "Automated Data Pipeline for Affiliate Transactions",
  description:
    "The Transaction Importer retrieves transaction data from digidip, an affiliate meta-network...",
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
