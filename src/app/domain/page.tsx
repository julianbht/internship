import { readFileContent } from "@/lib/read-file-content";
import { CodeExamplesSection } from "@/components/custom/code-examples";
import { PageContainer } from "@/components/custom/page-container";
import { Hero1 } from "@/components/hero/hero1";
import Image from "next/image";

export default async function HomePage() {
  const charityCode = await readFileContent(
    "@/app/domain/code-snippets/Charity.kt",
  );
  const merchantCode = await readFileContent(
    "@/app/domain/code-snippets/Merchant.kt",
  );
  const networkCode = await readFileContent(
    "@/app/domain/code-snippets/Network.kt",
  );
  const organisationCode = await readFileContent(
    "@/app/domain/code-snippets/Organisation.kt",
  );
  const projectCode = await readFileContent(
    "@/app/domain/code-snippets/Project.kt",
  );

  const modalContent = (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Domain Model Insights</h2>
      <p>
        In this project, we engineered a robust domain model anchored in
        PostgreSQL, ensuring data integrity and scalability. Our approach
        guarantees that core business entities map cleanly to the relational
        database.
      </p>
      <p>
        An interesting implementation is the handling of many-to-many
        relationships, which are challenging due to the need for mapping tables.
        The <span className="font-medium">Charity</span> entity exemplifies this
        with its dynamic management of fields of work and related associations.
      </p>
      <p>
        Moreover, our solution leverages Kotlin as the data relational mapper,
        which allows us to define domain entities and relationships in a
        type-safe and expressive way.
      </p>
    </div>
  );

  return (
    <PageContainer>
      <Hero1
        badge={"Previous Project"}
        badgeLink={"/importer"}
        heading="Domain Model"
        description="In this project we built the domain model, determining the way core business entities are structured and mapped to a PostgreSQL database for robust data integrity and scalable operations."
        buttons={{
          primary: { text: "Learn more" },
          secondary: { text: "Next Project", url: "/scraper" },
        }}
        primaryModalText={modalContent}
      />

      {/* Domain image rendered beneath the hero section */}
      <div className="relative mx-auto mt-12 w-full max-w-9xl h-[900px] rounded-t-lg overflow-hidden">
        <Image
          src="/domain.svg"
          alt="Domain illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      <CodeExamplesSection
        codeExamples={[
          {
            id: "1",
            title: "Charity",
            description:
              "Charity.kt – Defines the Charity entity, capturing vital details and establishing relationships for effective philanthropic management.",
            language: "kotlin",
            code: charityCode,
          },
          {
            id: "2",
            title: "Organisation",
            description:
              "Organisation.kt – An embeddable model that encapsulates common details and social media links for organisations.",
            language: "kotlin",
            code: organisationCode,
          },
          {
            id: "3",
            title: "Merchant",
            description:
              "Merchant.kt – Implements the Merchant entity, managing transaction data and contractual details for network operations.",
            language: "kotlin",
            code: merchantCode,
          },
          {
            id: "4",
            title: "Network",
            description:
              "Network.kt – Represents the Network entity, connecting merchants and organisations through structured data integration.",
            language: "kotlin",
            code: networkCode,
          },
          {
            id: "5",
            title: "Project",
            description:
              "Project.kt – Defines the Project entity that encapsulates charity associations, relevant fields of work, social media, and timeline information for comprehensive project tracking.",
            language: "kotlin",
            code: projectCode,
          },
        ]}
      />
    </PageContainer>
  );
}
