import { readFileContent } from "@/lib/read-file-content";
import { Hero1 } from "@/components/hero/hero";
import { CodeExamplesSection } from "@/components/custom/code-examples";
import { PageContainer } from "@/components/custom/page-container";
import { ProjectCard } from "@/components/charity/project-card";

export default async function DziScraperPage() {
  // Load code snippets using the utility function
  const DziHtmlParserCode = await readFileContent(
    "@/app/scraper/code-snippets/DziHtmlParser.kt",
  );

  const DziImporterTaskCode = await readFileContent(
    "@/app/scraper/code-snippets/DziImporterTask.kt",
  );

  const DziImporterTaskExecutorCode = await readFileContent(
    "@/app/scraper/code-snippets/DziImporterTaskExecutor.kt",
  );

  const DziScraperCode = await readFileContent(
    "@/app/scraper/code-snippets/DziScraper.kt",
  );

  // Real project data for the charity card
  const realProject = {
    id: "68cc84f0-8340-3855-8e31-6e76dc5d8c7b",
    name: "Kolpingstiftung-Rudolf-Geiselberger",
    description:
      "Die Kolpingstiftung-Rudolf-Geiselberger leistet in erster Linie „Hilfe zur Selbsthilfe“. Sie dient der Förderung der Aufgaben des Kolpingwerkes, insbesondere der Völkerverständigung und Entwicklungszusammenarbeit, der kirchlichen Jugend- und Erwachsenenbildung, der religiösen und sozialen Bildung und leistet Hilfen in der eigenen Diözese. Ein Schwerpunkt ihrer Arbeit ist die langfristige Begleitung von Menschen und Projekten. In Südafrika unterstützt die Stiftung beispielsweise das „Work Opportunity Program“, das Jugendliche auf das Berufsleben vorbereitet. In Indien werden Hygienemaßnahmen und Hausbauprojekte unterstützt. In Deutschland fördert die Kolpingstiftung-Rudolf-Geiselberger Maßnahmen im Bereich der Familienerholung, Bildungsprojekte für benachteiligte Jugendliche und Migrant:innen sowie eine Berufsschule für lern- und leistungsbeeinträchtigte Jugendliche.",
    startDate: "2025-02-18 09:56:54.474 -0500",
    endDate: "2025-03-19 14:54:54.310 -0400",
    focusedCountryCodes: ["DE", "EC", "IN", "ZA", "UA"],
    charityId: "Kolpingstiftung-Rudolf-Geiselberger",
    charityFieldsOfWork: ["Social Welfare", "Community Development"],
    charityFounded: "1987-01-01",
    charityTotalIncome: 1189464,
    charityFundraisingIncome: 403783,
    charityLogoUrl:
      "https://www.dzi.de/wp-content/uploads/2024/10/Kolpingstifunt-Rudolf-Geiselberger_zweizeilig_4c.png",
    charityWebsite: "http://www.kolpingstiftung.de",
    socialMedia: [],
    charitySocialMedia: [],
  };

  return (
    <PageContainer>
      <Hero1
        badge="Previous Project"
        heading="DZI Charity Scraper"
        description="This project implements a recurring data ingestion pipeline that scrapes and processes data from the DZI website to build a structured database of German charitable organizations. The data is used to power a donation interface, allowing users to direct affiliate-generated funds to a charity of their choice. The system emphasizes modularity, separating scheduling, orchestration, and scraping logic."
        media={
          <ProjectCard
            project={realProject}
            onClickAction={() => {
              console.log("Charity card clicked");
            }}
          />
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
            description: "Registers and schedules the DZI importer task.",
            language: "kotlin",
            code: DziImporterTaskCode,
          },
          {
            id: "2",
            title: "Task Executor",
            description:
              "Executes the main scraping and saving logic, enforcing domain rules.",
            language: "kotlin",
            code: DziImporterTaskExecutorCode,
          },
          {
            id: "4",
            title: "Scraper",
            description:
              "Assembles full Charity objects by coordinating HTML parsing and constructing.",
            language: "kotlin",
            code: DziScraperCode,
          },
          {
            id: "3",
            title: "HTML Parser",
            description:
              "Parses structured and semi-structured data from the DZI website.",
            language: "kotlin",
            code: DziHtmlParserCode,
          },
        ]}
      />
    </PageContainer>
  );
}
