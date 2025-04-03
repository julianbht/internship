"use client";

import { Hero1 } from "@/components/hero/hero";
import { CodeExamplesSection } from "@/app/importer/components/code-examples";
import digidipApiClientCode from "@/app/importer/code-snippets/digidip-api-client";
import digidipTransactionTaskExecutorCode from "@/app/importer/code-snippets/digidip-transaction-task-executor";
import { PageContainer } from "@/components/custom/page-container";

export default function ImporterPage() {
  return (
    <PageContainer>
      <Hero1
        badge={"Previous Project"}
        heading="Transaction Importer"
        description="The task is to import transactions from digidip, an affiliate meta-network. Digidip provides us with affiliate links for approximately 70,000 shops. Whenever a user clicks on one of these links, a transaction is initiated. These transactions will be retrieved through the digidip API and subsequently stored in our database."
        image={{
          src: "/importer-architecture.svg",
          alt: "Importer Architecture Diagram",
        }}
        buttons={{
          primary: {
            text: "Learn more",
            url: "#",
          },
          secondary: {
            text: "Next project",
            url: "#",
          },
        }}
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
    </PageContainer>
  );
}
