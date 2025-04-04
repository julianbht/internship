"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { Project } from "@/types/project";
import { InlineCountryFlags } from "./country-flags";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  setShowProjectAction: React.Dispatch<React.SetStateAction<Project | null>>;
  showSupportButton?: boolean; // New prop to control display of the support button
}

export function ProjectDialog({
  project,
  open,
  onOpenChangeAction,
}: ProjectDialogProps) {
  if (!project) return null;

  // Helper to format income values with a thousand separator and Euro symbol
  const formatIncome = (amount?: number) => {
    if (amount == null) return "";
    return amount.toLocaleString("de-DE") + " €";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-4">
              {project.charityLogoUrl ? (
                <div className="relative rounded-md overflow-hidden border bg-muted/20 max-h-40 max-w-[200px]">
                  <Image
                    src={project.charityLogoUrl}
                    alt="Charity Logo"
                    width={800}
                    height={500}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="relative rounded-md overflow-hidden border bg-muted/20 w-16 h-16" />
              )}
              <div>
                <div className="flex items-center gap-1">
                  <DialogTitle className="text-2xl">{project.name}</DialogTitle>
                  {project.charityWebsite && (
                    <Link
                      href={project.charityWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-blue-600"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogDescription className="text-base text-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-2">
              {project.startDate && (
                <div>
                  <strong>Startdatum:</strong> {project.startDate}
                </div>
              )}
              {project.endDate && (
                <div>
                  <strong>Enddatum:</strong> {project.endDate}
                </div>
              )}
              {project.focusedCountryCodes &&
                project.focusedCountryCodes.length > 0 && (
                  <div className="flex items-center gap-2">
                    <strong>Länder:</strong>{" "}
                    <InlineCountryFlags
                      codes={project.focusedCountryCodes}
                      maxFlags={project.focusedCountryCodes.length}
                    />
                  </div>
                )}
              {project.charityFounded && (
                <div>
                  <strong>Gründungsdatum (Charity):</strong>{" "}
                  {project.charityFounded}
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-2">
              {project.charityFieldsOfWork &&
                project.charityFieldsOfWork.length > 0 && (
                  <div>
                    <strong>Arbeitsgebiete:</strong>{" "}
                    {project.charityFieldsOfWork.join(", ")}
                  </div>
                )}
              {project.charityTotalIncome != null && (
                <div>
                  <strong>Gesamteinnahmen:</strong>{" "}
                  {formatIncome(project.charityTotalIncome)}
                </div>
              )}
              {project.charityFundraisingIncome != null && (
                <div>
                  <strong>Fundraising-Einnahmen:</strong>{" "}
                  {formatIncome(project.charityFundraisingIncome)}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChangeAction(false)}>
            Schließen
          </Button>
          <Button onClick={() => {}}>{"Projekt unterstützen"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
