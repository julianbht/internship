// app/scraper/page.tsx
import { readFileContent } from "@/lib/read-file-content";
import ScraperPageInteractive from "@/app/scraper/ScraperPageInteractive";

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
    name: "Kolping Foundation Rudolf-Geiselberger",
    description:
      "Die Kolpingstiftung-Rudolf-Geiselberger leistet in erster Linie „Hilfe zur Selbsthilfe“. Sie dient der Förderung der Aufgaben des Kolpingwerkes, insbesondere der Völkerverständigung und Entwicklungszusammenarbeit, der kirchlichen Jugend- und Erwachsenenbildung, der religiösen und sozialen Bildung und leistet Hilfen in der eigenen Diözese. Ein Schwerpunkt ihrer Arbeit ist die langfristige Begleitung von Menschen und Projekten. In Südafrika unterstützt die Stiftung beispielsweise das „Work Opportunity Program“, das Jugendliche auf das Berufsleben vorbereitet. In Indien werden Hygienemaßnahmen und Hausbauprojekte unterstützt. In Deutschland fördert die Kolpingstiftung-Rudolf-Geiselberger Maßnahmen im Bereich der Familienerholung, Bildungsprojekte für benachteiligte Jugendliche und Migrant:innen sowie eine Berufsschule für lern- und leistungsbeeinträchtigte Jugendliche.",
    startDate: "2025-02-18",
    endDate: "2025-03-19",
    focusedCountryCodes: ["DE", "EC", "IN", "ZA", "UA"],
    charityId: "Kolping Foundation Rudolf-Geiselberger",
    charityFieldsOfWork: [
      "Social Welfare",
      "Community Development",
      "Disaster Relief",
      "Ukraine Emergency Aid",
      "International Understanding",
      "Development Cooperation",
      "Child and Youth Welfare",
      "Refugee Care",
      "Education",
      "Child Sponsorship",
      "Religion",
    ],
    charityFounded: "1987-01-01",
    charityTotalIncome: 1189464,
    charityFundraisingIncome: 403783,
    charityLogoUrl:
      "https://www.dzi.de/wp-content/uploads/2024/10/Kolpingstifunt-Rudolf-Geiselberger_zweizeilig_4c.png",
    charityWebsite: "https://www.kolpingstiftung.de",
    socialMedia: [],
    charitySocialMedia: [],
  };

  return (
    <ScraperPageInteractive
      DziHtmlParserCode={DziHtmlParserCode}
      DziImporterTaskCode={DziImporterTaskCode}
      DziImporterTaskExecutorCode={DziImporterTaskExecutorCode}
      DziScraperCode={DziScraperCode}
      realProject={realProject}
    />
  );
}
