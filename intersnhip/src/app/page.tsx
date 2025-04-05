import { Hero32, Integration } from "@/components/hero/hero32";
import Image from "next/image";
import { PageContainer } from "@/components/custom/page-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const integrations: Integration[][] = [
  [
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
      id: "liquibase-2",
      icon: (
        <Image src="/Liquibase.svg" alt="Liquibase" width={50} height={50} />
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
            My Internship at donista
          </h1>
        }
        description={
          <>
            <p className="text-muted-foreground">
              Take a journey through my 3-months internship at donista.
            </p>
            <p className="text-muted-foreground">
              During this time, I've tackled 4 small projects. I will guide you
              through them.
            </p>
            <p className="text-muted-foreground">
              To the right are technologies I've learned to work with.
            </p>
          </>
        }
        button={
          <Button asChild size="lg" className="mt-10">
            <Link href="/importer">Start journey</Link>
          </Button>
        }
        integrations={integrations}
      />
    </PageContainer>
  );
}
