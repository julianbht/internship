import { ImageSplit } from "@/app/importer/components/image-split";

interface ProjectDescriptionProps {
  title: string;
  subtitle: string;
  description: string;
}

export function ProjectDescription({
  title,
  subtitle,
  description,
}: ProjectDescriptionProps) {
  return (
    <div className="mb-6">
      <ImageSplit
        title={title}
        content={
          <>
            <p className="text-muted-foreground">{subtitle}</p>
            <div className="prose max-w-none dark:prose-invert">
              <p>{description}</p>
            </div>
          </>
        }
        image={{
          src: "/importer-architecture.svg",
          alt: "Importer Architecture Diagram",
          sizes: "(max-width: 768px) 100vw, 50vw",
          loading: "lazy",
        }}
      />
    </div>
  );
}
