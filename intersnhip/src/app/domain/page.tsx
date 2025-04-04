import { readFileContent } from "@/lib/read-file-content";
import { Hero8 } from "@/components/hero/hero8";
import { CodeExamplesSection } from "@/components/custom/code-examples";
import { PageContainer } from "@/components/custom/page-container";

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

  return (
    <PageContainer>
      <Hero8
        imageSrc="/domain.svg"
        alt="Domain illustration"
        title="Domain Model"
        description="In this project we built the domain model, determining the way core business entities are structured and mapped to a PostgreSQL database for robust data integrity and scalable operations."
        primaryButtonText="Learn more"
        secondaryButtonText="Next Project"
      />

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
