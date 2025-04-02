import { ProjectShowcase } from "@/app/importer/components/project-showcase";
import { projectData } from "@/app/importer/data/project-data";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Internship Projects at Donista
      </h1>
      <div className="space-y-12">
        {projectData.map((project) => (
          <ProjectShowcase key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
