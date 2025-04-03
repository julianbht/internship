import { ProjectShowcase } from "@/app/importer/components/project-showcase";
import { transactionImporterData } from "@/app/importer/content/transaction-importer";

export default function Importer() {
  return (
    <main className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Data Importer!</h1>
      <div className="space-y-12">
        <ProjectShowcase project={transactionImporterData} />
      </div>
    </main>
  );
}
