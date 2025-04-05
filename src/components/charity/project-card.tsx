"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import i18nIsoCountries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import FieldsOfWorkBadges from "./field-of-work-bagdes";
import { InlineCountryFlags } from "./country-flags";
import { Project } from "@/types/project";

i18nIsoCountries.registerLocale(enLocale);

interface ProjectCardProps {
  project: Project;
  onClickAction: (project: Project) => void;
}

function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function ProjectCard({ project, onClickAction }: ProjectCardProps) {
  return (
    <Card
      className="w-full max-w-md cursor-pointer"
      onClick={() => onClickAction(project)}
    >
      <CardHeader className="pb-2">
        {/* Row with project name and flags */}
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <h2 className="text-xl font-semibold line-clamp-2">{project.name}</h2>
          {/* Show up to N flags; hovering each flag reveals the country name */}
          {project.focusedCountryCodes?.length > 0 && (
            <InlineCountryFlags
              codes={project.focusedCountryCodes}
              maxFlags={3}
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-3">
        <p className="text-muted-foreground">
          {truncateText(project.description, 200)}
        </p>
        <FieldsOfWorkBadges
          fields={project.charityFieldsOfWork || []}
          maxBadges={5}
        />
      </CardContent>
    </Card>
  );
}
