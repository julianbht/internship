"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

// Import the shared dialog components
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hero1Props {
  badge?: string;
  badgeLink?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  primaryModalText?: ReactNode;
  media?: ReactNode;
  background?: string;
}

const Hero1 = ({
  badge,
  badgeLink,
  heading,
  description,
  buttons,
  primaryModalText,
  background = "/square-alt-grid.svg",
  media,
}: Hero1Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-32">
        <Image
          alt="background"
          src={background}
          fill
          className="absolute inset-0 z-[-1] opacity-90 object-cover [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {badge &&
                (badgeLink ? (
                  <Link href={badgeLink}>
                    <Badge variant="outline">
                      <ArrowLeft className="ml-2 size-4" />
                      {badge}
                    </Badge>
                  </Link>
                ) : (
                  <Badge variant="outline">
                    <ArrowLeft className="ml-2 size-4" />
                    {badge}
                  </Badge>
                ))}
              <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                {heading}
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                {description}
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                {buttons?.primary && (
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    {buttons.primary.text}
                  </Button>
                )}
                {buttons?.secondary && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Link href={buttons.secondary.url}>
                      {buttons.secondary.text}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            {media && (
              <div className="flex items-center justify-center">{media}</div>
            )}
          </div>
        </div>
      </section>

      {/* Use the shared dialog for the primary button modal */}
      {primaryModalText && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md mx-auto p-6 bg-background rounded shadow-lg">
            {/* Add an empty DialogTitle to satisfy accessibility requirements */}
            <DialogTitle>{""}</DialogTitle>
            {primaryModalText}
            <DialogClose asChild>
              <Button onClick={() => setIsModalOpen(false)} className="mt-4">
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export { Hero1 };
