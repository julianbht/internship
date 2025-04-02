import { CodeDisplay } from "@/app/importer/components/code-display";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectData } from "@/app/importer/types/project";
import Image from "next/image";

interface ProjectShowcaseProps {
  project: ProjectData;
}

export function ProjectShowcase({ project }: ProjectShowcaseProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{project.title}</CardTitle>
        <CardDescription>{project.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose max-w-none dark:prose-invert">
          <p>{project.description}</p>
        </div>
        <Image
          src="/donista-technical-overview-be-network-importer-detailed.drawio.svg"
          alt="Your Diagram"
          width={400}
          height={400}
        />

        {project.codeExamples.length > 0 && (
          <div className="my-6">
            <h3 className="text-lg font-medium mb-3">Implementation</h3>
            <Tabs defaultValue={project.codeExamples[0].id} className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                {project.codeExamples.map((example) => (
                  <TabsTrigger key={example.id} value={example.id}>
                    {example.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {project.codeExamples.map((example) => (
                <TabsContent
                  key={example.id}
                  value={example.id}
                  className="mt-4"
                >
                  <div className="mb-2 text-sm text-muted-foreground">
                    {example.description}
                  </div>
                  <CodeDisplay
                    code={example.code}
                    language={example.language}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
