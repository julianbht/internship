import Image from "next/image";
import { Button } from "@/components/ui/button";
import type React from "react";

export interface Integration {
  id: string;
  icon: React.ReactNode;
}

export interface Hero32Props {
  heading: string;
  description: string;
  button: {
    text: string;
    url: string;
  };
  integrations: Integration[][];
  background?: string;
}

export function Hero32({
  heading,
  description,
  button,
  integrations,
  background = "/square-alt-grid.svg",
}: Hero32Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Image
          alt="background"
          src={background || "/placeholder.svg"}
          fill
          className="opacity-90 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
      </div>
      <div className="relative">
        <div className="container flex flex-col items-center py-8 md:flex-row md:py-16 lg:py-24">
          <div className="z-20 w-full px-4 md:w-1/2 md:pr-8">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h1 className="mb-4 text-3xl font-bold text-pretty sm:text-4xl lg:text-5xl xl:text-6xl">
                {heading}
              </h1>
              <p className="mb-8 max-w-md text-muted-foreground">
                {description}
              </p>
              <Button asChild size="lg">
                <a href={button.url}>{button.text}</a>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <div className="icons-container">
              {integrations.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex justify-center gap-4 sm:gap-6 md:gap-8 my-6 md:my-8 ${
                    rowIndex % 2 === 1
                      ? "md:translate-x-12 lg:translate-x-16"
                      : ""
                  }`}
                >
                  {row.map((integration, iconIndex) => (
                    <div
                      key={integration.id}
                      className="icon-wrapper transition-transform hover:scale-110"
                      style={{ "--index": iconIndex } as React.CSSProperties}
                    >
                      <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-xl border bg-background/80 backdrop-blur-sm shadow-md flex items-center justify-center">
                        <div className="p-3">{integration.icon}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
