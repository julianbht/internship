import { readFileContent } from "@/lib/read-file-content";
import { Hero1 } from "@/components/hero/hero1";
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

  const modalContent = (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Welcome to the Transaction Importer!
      </h2>
      <p>
        In this project, I&quot;ve designed a clear separation of concerns that
        ensures each component remains focused and maintainable.
      </p>
      <p>
        For example, the <span className="font-medium">Task Executor</span> is
        solely responsible for orchestrating the recurring import
        process—including dynamic scheduling, robust error handling (like
        managing rate limits via the &quot;Retry-After&quot; header), and
        processing paginated API responses.
      </p>
      <p>
        Meanwhile, the <span className="font-medium">API Client</span>{" "}
        encapsulates all communication with the external Digidip API, handling
        URL construction and HTTP header management (as shown in
        DigidipApiClient.kt
      </p>
      <p>
        This modular approach not only enhances readability and maintainability
        but also makes the system scalable and easy to extend. We’ve
        successfully applied this pattern across multiple importers—and soon,
        you’ll see it in action with the upcoming DZI Importer.
      </p>
    </div>
  );

  return (
    <PageContainer>
      {/* Header Section */}
      <header className="py-10 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Transaction Importer
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A robust and scalable solution for importing affiliate transaction
            data.
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <Hero1
        badge="Homepage"
        badgeLink="/"
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
          primary: { text: "Learn more" },
          secondary: { text: "Next project", url: "/domain" },
        }}
        primaryModalText={modalContent}
      />

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8">
        <section>
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
        </section>
      </main>
    </PageContainer>
  );
}
