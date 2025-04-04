"use client";

import { useState } from "react";
import { Hero1 } from "@/components/hero/hero";
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

  return (
    <PageContainer>
      <Hero1
        badge="Previous Project"
        heading="DZI Charity Scraper"
        description="This project implements a recurring data ingestion pipeline that scrapes and processes data from the DZI website to build a structured database of German charitable organizations. The data is used to power a donation interface, allowing users to direct affiliate-generated funds to a charity of their choice. The system emphasizes modularity, separating scheduling, orchestration, and scraping logic."
        media={
          <ProjectCard project={realProject} onClickAction={handleCardClick} />
        }
        buttons={{
          primary: { text: "Learn more", url: "#" },
          secondary: { text: "Next project", url: "#" },
        }}
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
