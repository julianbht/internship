"use client";

import { useState } from "react";
import { Hero1 } from "@/components/hero/hero1";
import { CodeExamplesSection } from "@/components/custom/code-examples";
import { PageContainer } from "@/components/custom/page-container";
import { ProjectCard } from "@/components/charity/project-card";
import { ProjectDialog } from "@/components/charity/project-dialog";
import { Project } from "@/types/project";

interface ScraperPageInteractiveProps {
  DziHtmlParserCode: string;
  DziImporterTaskCode: string;
  DziImporterTaskExecutorCode: string;
  DziScraperCode: string;
  realProject: Project;
}

export default function ScraperPageInteractive({
  DziHtmlParserCode,
  DziImporterTaskCode,
  DziImporterTaskExecutorCode,
  DziScraperCode,
  realProject,
}: ScraperPageInteractiveProps) {
  // State to control the project dialog visibility and selected project
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // When the card is clicked, update the selected project and open the dialog
  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
    console.log("Project clicked: " + project);
  };

  const modalContent = (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">DZI Scraper Insights</h2>
      <p>
        Click on the card to explore how the scraped data is used! I designed
        this user-friendly interface, providing the option to pick a charity to
        support. It&quot;s a key feature of donista&quot;s business model.
      </p>
      <p>
        Built on a modular and scalable architecture, our scraper not only
        extracts data but also dynamically validates and transforms it in
        real-time. This ensures that every charity record is accurate,
        supporting donista&quot;s commitment to data integrity and delivering a
        seamless user experience.
      </p>
    </div>
  );

  return (
    <PageContainer>
      <Hero1
        badge="Previous Project"
        badgeLink={"/domain"}
        heading="DZI Charity Scraper"
        description="This project implements a recurring data ingestion pipeline that scrapes and processes data from the DZI website to build a structured database of German charitable organizations. The data is used to power a donation interface, allowing users to direct affiliate-generated funds to a charity of their choice. The system emphasizes modularity, separating scheduling, orchestration, and scraping logic."
        media={
          <ProjectCard project={realProject} onClickAction={handleCardClick} />
        }
        buttons={{
          primary: { text: "Learn more" },
          secondary: { text: "Next project", url: "/release" },
        }}
        primaryModalText={modalContent}
      />

      {/* Render the project dialog when a card is clicked */}
      <ProjectDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChangeAction={setDialogOpen}
        setShowProjectAction={setSelectedProject}
        showSupportButton={true}
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
            id: "3",
            title: "Scraper",
            description:
              "Assembles full Charity objects by coordinating HTML parsing and constructing.",
            language: "kotlin",
            code: DziScraperCode,
          },
          {
            id: "4",
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
