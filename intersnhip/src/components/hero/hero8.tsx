import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface Hero8Props {
  imageSrc?: string;
  alt?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const Hero8: React.FC<Hero8Props> = ({
  imageSrc = "/domain.svg",
  alt = "domain image",
  title = "Build faster with Shadcnblocks",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  primaryButtonText = "Get started now",
  secondaryButtonText = "Learn more",
}) => {
  return (
    <section className="py-32">
      <div className="overflow-hidden border-b border-muted">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 items-center text-center">
              <h1 className="mb-8 text-4xl font-semibold text-pretty lg:text-7xl">
                {title}
              </h1>
              <p className="mx-auto max-w-screen-md text-muted-foreground lg:text-xl">
                {description}
              </p>
              <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                <Button>
                  {primaryButtonText}
                  <ChevronRight className="ml-2 h-4" />
                </Button>
                <Button variant="ghost">
                  {secondaryButtonText}
                  <ChevronRight className="ml-2 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-12 w-full max-w-9xl h-[900px] rounded-t-lg shadow-lg overflow-hidden">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-contain" // Changed from object-cover to object-contain
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero8 };
