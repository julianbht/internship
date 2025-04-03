export interface DonistaImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  title?: string;
  srcSet?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  // Optionally add more properties as needed, such as crop info or focal point
}
