export interface SocialMedia {
  platform: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string | null; // Because the JSON shows null
  endDate: string | null;
  focusedCountryCodes: string[];

  // Charity-related fields flattened into the project object
  charityId: string;
  charityFieldsOfWork: string[];
  charityFounded: string | null; // or omit null if your API always returns a date string
  charityTotalIncome: number;
  charityFundraisingIncome: number;
  charityLogoUrl: string;
  charityWebsite: string;

  // Social media fields
  socialMedia: SocialMedia[];
  charitySocialMedia: SocialMedia[];
}
