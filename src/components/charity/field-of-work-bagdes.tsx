import { Badge } from "@/components/ui/badge";

/** Renders fields of work as badges with a max limit */
export default function FieldsOfWorkBadges({
  fields,
  maxBadges = 3,
}: {
  fields: string[];
  maxBadges?: number;
}) {
  if (!fields || fields.length === 0) {
    return (
      <span className="text-sm text-muted-foreground">None specified</span>
    );
  }
  // Show only the first 'maxBadges'
  const displayedFields = fields.slice(0, maxBadges);
  const remainderCount = fields.length - displayedFields.length;

  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {displayedFields.map((field) => (
        <Badge key={field} variant="outline" className="text-xs font-normal">
          {field}
        </Badge>
      ))}

      {remainderCount > 0 && (
        <Badge
          variant="outline"
          className="text-xs font-normal text-muted-foreground"
        >
          +{remainderCount} more
        </Badge>
      )}
    </div>
  );
}
