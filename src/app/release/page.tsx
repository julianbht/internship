import { readFileContent } from "@/lib/read-file-content";
import { Hero1 } from "@/components/hero/hero1";
import { CodeExamplesSection } from "@/components/custom/code-examples";
import { PageContainer } from "@/components/custom/page-container";

export default async function ReleaseInfrastructurePage() {
  // Load code snippets from the release infrastructure code-snippets folder
  const beDeployCode = await readFileContent(
    "@/app/release/code-snippets/be-deploy.yml",
  );
  const commonBuildCode = await readFileContent(
    "@/app/release/code-snippets/common-build.yml",
  );
  const commonDeployCode = await readFileContent(
    "@/app/release/code-snippets/common-deploy.yml",
  );
  const configmapCode = await readFileContent(
    "@/app/release/code-snippets/configmap.yaml",
  );
  const deploymentCode = await readFileContent(
    "@/app/release/code-snippets/deployment.yaml",
  );

  const modalContent = (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Release Infrastructure Insights
      </h2>
      <p>
        With features such as concurrency control, template variable
        substitution, and comprehensive health probes, this system exemplifies
        modern DevOps practices for reliable and scalable deployments. It
        ensures that backend services are delivered seamlessly, maintaining high
        availability and robust error handling.
      </p>
    </div>
  );

  return (
    <PageContainer>
      <Hero1
        badge="Previous Project"
        badgeLink="/scraper"
        heading="Release Infrastructure Management"
        description="This project details a robust continuous delivery pipeline for backend applications. Leveraging GitHub Actions, it automates build, test, and deployment processes, integrates with Google Cloud and GKE, and uses Kubernetes ConfigMaps to manage environment-specific configurations for enhanced reliability and scalability."
        buttons={{
          primary: { text: "Learn More" },
          secondary: { text: "Finish", url: "/thank-you" },
        }}
        primaryModalText={modalContent}
      />

      <CodeExamplesSection
        codeExamples={[
          {
            id: "1",
            title: "Github Deployment Workflow",
            description:
              "GitHub Actions workflow for deploying backend applications with environment selection and concurrency control.",
            language: "yaml",
            code: beDeployCode,
          },
          {
            id: "2",
            title: "Github Build Pipeline",
            description:
              "Automates source checkout, environment configuration, and Gradle build processes with Google Cloud integration.",
            language: "yaml",
            code: commonBuildCode,
          },
          {
            id: "3",
            title: "Github Deployment Pipeline",
            description:
              "Orchestrates deployment to GKE using template variable substitution and deployment verification procedures.",
            language: "yaml",
            code: commonDeployCode,
          },
          {
            id: "4",
            title: "Kubernetes ConfigMap",
            description:
              "Defines environment-specific application settings for the backend network importer.",
            language: "yaml",
            code: configmapCode,
          },
          {
            id: "5",
            title: "Kubernetes Deployment Config",
            description:
              "Manages container orchestration with replica settings, health probes, and volume mounts via a dedicated Deployment resource.",
            language: "yaml",
            code: deploymentCode,
          },
        ]}
      />
    </PageContainer>
  );
}
