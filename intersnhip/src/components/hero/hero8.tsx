import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero8 = () => {
  return (
    <section className="py-32">
      <div className="overflow-hidden border-b border-muted">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 items-center text-center">
              <h1 className="mb-8 text-4xl font-semibold text-pretty lg:text-7xl">
                Build faster with Shadcnblocks
              </h1>
              <p className="mx-auto max-w-screen-md text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
              <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                <Button>
                  Get started now
                  <ChevronRight className="ml-2 h-4" />
                </Button>
                <Button variant="ghost">
                  Learn more
                  <ChevronRight className="ml-2 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* ✅ Next.js Image component */}
          <div className="relative mx-auto mt-24 w-full max-w-7xl h-[700px] rounded-t-lg shadow-lg overflow-hidden">
            <Image
              src="https://shadcnblocks.com/images/block/placeholder-1.svg"
              alt="placeholder"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero8 };
