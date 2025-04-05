import Image from "next/image";
import React from "react";

export interface Integration {
  id: string;
  icon: React.ReactNode;
}

interface Hero32Props {
  heading: React.ReactNode;
  description: React.ReactNode;
  button: React.ReactNode;
  integrations?: Integration[][];
}

const Hero32 = ({
  heading,
  description,
  button,
  integrations,
}: Hero32Props) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Image
          alt="background"
          src="/square-alt-grid.svg"
          fill
          className="opacity-90 object-cover [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
      </div>
      <div className="relative">
        <div className="relative container flex flex-col items-start md:flex-row md:items-center md:-space-x-26">
          <div className="z-20 -mx-4 w-full shrink-0 bg-background px-4 pt-32 md:w-1/2 md:bg-transparent md:pb-32">
            {heading}
            {description}
            {button}
          </div>
          {integrations && (
            <div className="flex flex-col gap-16 pt-12 pb-8 md:py-32">
              {integrations.map((line, i) => (
                <div key={i} className="flex gap-x-22 odd:-translate-x-22">
                  {line.map((integration) => (
                    <div
                      key={integration.id}
                      className="size-22 rounded-xl border border-background bg-background shadow-xl"
                    >
                      <div className="h-full w-full bg-muted/20 p-4">
                        {integration.icon}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero32 };
