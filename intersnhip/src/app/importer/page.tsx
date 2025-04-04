import { readFileContent } from "@/lib/read-file-content";
import { Hero1 } from "@/components/hero/hero";
import { CodeExamplesSection } from "@/app/importer/components/code-examples";
import { PageContainer } from "@/components/custom/page-container";

export default async function ImporterPage() {
  // Use the utility function with a full path string.
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
        description="The task is to import transactions from digidip, an affiliate meta-network. Digidip provides us with affiliate links for approximately 70,000 shops. Whenever a user clicks on one of these links, a transaction is initiated. These transactions will be retrieved through the digidip API and subsequently stored in our database."
        image={{
          src: "/importer-architecture.svg",
          alt: "Importer Architecture Diagram",
        }}
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
