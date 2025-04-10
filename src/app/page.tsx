import { Hero32, Integration } from "@/components/hero/hero32";
import Image from "next/image";
import { PageContainer } from "@/components/custom/page-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const integrations: Integration[][] = [
  [
    {
      id: "spring-boot",
      icon: (
        <Image
          src="/Spring_Boot.svg"
          alt="Spring Boot"
          width={50}
          height={50}
        />
      ),
    },
    {
      id: "kotlin",
      icon: (
        <Image
          src="/kotlin-svgrepo-com.svg"
          alt="Kotlin"
          width={50}
          height={50}
        />
      ),
    },
    {
      id: "kubernetes",
      icon: (
        <Image
          src="/kubernetes-svgrepo-com.svg"
          alt="Kubernetes"
          width={50}
          height={50}
        />
      ),
    },
    {
      id: "postgresql",
      icon: (
        <Image
          src="/postgresql-icon.svg"
          alt="PostgreSQL"
          width={50}
          height={50}
        />
      ),
    },
  ],
  [
    {
      id: "liquibase",
      icon: (
        <Image src="/Liquibase.svg" alt="Liquibase" width={50} height={50} />
      ),
    },
    {
      id: "nextjs",
      icon: (
        <Image
          src="/nextjs-svgrepo-com.svg"
          alt="Next.js"
          width={50}
          height={50}
        />
      ),
    },
    {
      id: "google-cloud",
      icon: (
        <Image
          src="/google-cloud-svgrepo-com.svg"
          alt="Google Cloud"
          width={50}
          height={50}
        />
      ),
    },
    {
      id: "react",
      icon: (
        <Image
          src="/react-svgrepo-com.svg"
          alt="React"
          width={50}
          height={50}
        />
      ),
    },
  ],
  [
    {
      id: "typescript",
      icon: (
        <Image
          src="/typescript-icon-svgrepo-com.svg"
          alt="TypeScript"
          width={50}
          height={50}
        />
      ),
    },
    {
      id: "vercel",
      icon: (
        <Image
          src="/vercel-icon-svgrepo-com.svg"
          alt="Vercel"
          width={50}
          height={50}
        />
      ),
    },
    {
      id: "shadcn",
      icon: <Image src="/shadcn.svg" alt="shadcn" width={50} height={50} />,
    },
    {
      id: "firebase",
      icon: (
        <Image
          src="/firebase-svgrepo-com.svg"
          alt="Firebase"
          width={50}
          height={50}
        />
      ),
    },
  ],
];

export default function HomePage() {
  return (
    <PageContainer>
      <Hero32
        heading={
          <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
            My internship at donista
          </h1>
        }
        description={
          <div className="text-muted-foreground">
            <p>
              Take a journey through my 3-months internship at{" "}
              <a
                href="https://donista.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                donista
              </a>
              .
            </p>
            <p>
              donista is an innovative e-commerce platform that converts
              affiliate <br />
              commissions into donations, merging online shopping with social
              impact.
            </p>
            <p>
              I joined donista on day 0 and helped build it from the ground up.
            </p>
            <p>
              On this website, I will guide you through four small projects
              I&apos;ve tackled.
            </p>
            <p>To the right are technologies I&apos;ve learned to work with.</p>
          </div>
        }
        button={
          <div className="flex gap-4 mt-10">
            <Button asChild size="lg">
              <Link href="/importer">Start journey</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                href="https://github.com/julianbht/internship"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </Button>
          </div>
        }
        integrations={integrations}
      />
    </PageContainer>
  );
}
