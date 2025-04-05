import { Hero32, Integration } from "@/components/hero/hero32";
import Image from "next/image";
import { PageContainer } from "@/components/custom/page-container";

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
        heading="My Internship at donista"
        description="A showcase of the technologies we worked with during my internship."
        button={{
          text: "Learn more",
          url: "/about",
        }}
        integrations={integrations}
      />
    </PageContainer>
  );
}
