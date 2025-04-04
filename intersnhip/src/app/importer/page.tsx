import { readFileContent } from "@/lib/read-file-content";
import { Hero1 } from "@/components/hero/hero";
import { CodeExamplesSection } from "@/components/custom/code-examples";
import { PageContainer } from "@/components/custom/page-container";
import Image from "next/image";

export default async function ImporterPage() {
  const DigidipApiClientCode = await readFileContent(
    "@/app/importer/code-snippets/DigidipApiClient.kt",
  );

  const DigidipParserCode = await readFileContent(
    "@/app/importer/code-snippets/DigidipParser.kt",
  );

  const DigidipTransactionImporterTaskCode = await readFileContent(
    "@/app/importer/code-snippets/DigidipTransactionImporterTask.kt",
  );

  const DigidipTransactionTaskExecutorCode = await readFileContent(
    "@/app/importer/code-snippets/DigidipTransactionTaskExecutor.kt",
  );

  return (
    <PageContainer>
      <Hero1
        badge="Previous Project"
        heading="Transaction Importer"
        description="This project implements a recurring data pipeline that imports affiliate transaction data from Digidip, a network aggregating over 70,000 merchants. On a fixed schedule, the system retrieves, parses, and persists timestamped transaction data via the Digidip API, linking each entry to the appropriate merchant and capturing key financial metrics. The architecture cleanly separates scheduling, API access, parsing, and persistence to ensure robustness and maintainability."
        media={
          <div className="relative w-full max-w-6xl aspect-[4/3]">
            <Image
              src="/importer-architecture.svg"
              alt="Importer Architecture Diagram"
              fill
              className="object-contain"
            />
          </div>
        }
        buttons={{
          primary: { text: "Learn more", url: "#" },
          secondary: { text: "Next project", url: "#" },
        }}
      />

      <CodeExamplesSection
        codeExamples={[
          {
            id: "1",
            title: "Importer Task",
            description: "Schedules and executes the recurring task.",
            language: "kotlin",
            code: DigidipTransactionImporterTaskCode,
          },
          {
            id: "2",
            title: "Task Executor",
            description: "Orchestrates the importing process.",
            language: "kotlin",
            code: DigidipTransactionTaskExecutorCode,
          },
          {
            id: "3",
            title: "API Client",
            description: "Handles the API calls to digidip.",
            language: "kotlin",
            code: DigidipApiClientCode,
          },
          {
            id: "4",
            title: "Parser",
            description: "Parses Digidip API JSON responses.",
            language: "kotlin",
            code: DigidipParserCode,
          },
        ]}
      />
    </PageContainer>
  );
}
