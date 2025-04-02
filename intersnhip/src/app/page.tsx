import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ModeToggle></ModeToggle>
      <Link href={"/importer"}>Importer</Link>
    </>
  );
}
