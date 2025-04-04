import ReactCountryFlag from "react-country-flag";
import React from "react";
import i18nIsoCountries from "i18n-iso-countries";

/** Renders up to 'maxFlags' flags inline. Any extra countries get a +X label. */
interface InlineCountryFlagsProps {
  codes: string[]
  maxFlags?: number
}

function getCountryName(code: string): string {
  const upperCode = code.toUpperCase()
  const countryName = i18nIsoCountries.getName(upperCode, "en")
  return countryName || code // fallback if unknown
}

export function InlineCountryFlags({ codes, maxFlags = 3 }: InlineCountryFlagsProps) {
  // Filter out any empty codes (or codes with only whitespace)
  const validCodes = codes.filter(code => code.trim() !== "");
  const displayedCodes = validCodes.slice(0, maxFlags);
  const remainderCount = validCodes.length - displayedCodes.length;

  return (
      <div className="flex items-center gap-1 flex-wrap">
        {displayedCodes.map((code) => (
            <ReactCountryFlag
                key={code}
                countryCode={code}
                svg
                // Provide the full country name on hover:
                title={getCountryName(code)}
                style={{ width: "1.25em", height: "1.25em" }}
            />
        ))}
        {remainderCount > 0 && (
            <span className="text-sm text-muted-foreground">+{remainderCount}</span>
        )}
      </div>
  );
}