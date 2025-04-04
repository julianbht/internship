import NextImage from "next/image";
import { ReactNode } from "react";
import { DonistaImage } from "@/app/importer/types/project";

interface ImageSplitProps {
  /** Optional title to display above the content. */
  title?: string;
  /** The main content to be displayed next to the image. */
  content: ReactNode;
  /** Image configuration following the new Image type. */
  image: DonistaImage;
  /** If true, the image and content order will be flipped. */
  reverse?: boolean;
  /** The fraction of the container's width that the image should take up (0 to 1). Default is 2/3. */
  imageFraction?: number;
}

export function ImageSplit({
  title,
  content,
  image,
  reverse = false,
  imageFraction = 2 / 3,
}: ImageSplitProps) {
  const contentFraction = 1 - imageFraction;
  // This CSS variable is applied only on md screens via an arbitrary media query utility.
  // It sets the grid-template-columns as "contentFraction imageFraction" in percentages.
  return (
    <div
      className="grid gap-8 items-center md:[grid-template-columns:var(--grid-cols)]"
      style={
        {
          "--grid-cols": `${(contentFraction * 100).toFixed(2)}% ${(imageFraction * 100).toFixed(2)}%`,
        } as React.CSSProperties
      }
    >
      {/* Content Section */}
      <div className={reverse ? "order-2" : "order-1"}>
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {title}
          </h2>
        )}
        <div>{content}</div>
      </div>
      {/* Image Section */}
      <div className={reverse ? "order-1" : "order-2"}>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <NextImage
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes={image.sizes ?? "(max-width: 768px) 100vw, 50vw"}
            loading={image.loading ?? "lazy"}
          />
        </div>
      </div>
    </div>
  );
}
