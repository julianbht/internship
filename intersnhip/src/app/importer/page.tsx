"use client";

import { ProjectDescription } from "@/app/importer/components/project-description";
import { CodeExamplesSection } from "@/app/importer/components/code-examples";
import digidipApiClientCode from "@/app/importer/code-snippets/digidip-api-client";
import digidipTransactionTaskExecutorCode from "@/app/importer/code-snippets/digidip-transaction-task-executor";
import { PageContainer } from "@/components/custom/page-container";

export default function ImporterPage() {
  return (
    <PageContainer
      bannerSrc={"/pexels-thisisengineering-3861943.jpg"}
      bannerAlt={
        "Foto von ThisIsEngineering: https://www.pexels.com/de-de/foto/frau-die-auf-whiteboard-schreibt-3861943/"
      }
    >
      <div className="space-y-12">
        <ProjectDescription
          title="Data Importer"
          subtitle="Automated Data Pipeline for Affiliate Transactions"
          description="The task is to import transactions from digidip, an affiliate meta-network. Digidip provides us with affiliate links for approximately 70,000 shops. Whenever a user clicks on one of these links via our platform, a transaction is initiated. These transactions will be retrieved through the digidip API and subsequently stored in our database."
        />
        <CodeExamplesSection
          codeExamples={[
            {
              id: "tte",
              title: "Task Executor",
              description: "Orchestrates the importing process",
              language: "kotlin",
              code: digidipTransactionTaskExecutorCode,
            },
            {
              id: "api-client",
              title: "API Client",
              description: "Handles the API calls to digidip",
              language: "kotlin",
              code: digidipApiClientCode,
            },
          ]}
        />
      </div>
    </PageContainer>
  );
}
