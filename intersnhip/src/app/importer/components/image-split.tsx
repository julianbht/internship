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
}

export function ImageSplit({
  title,
  content,
  image,
  reverse = false,
}: ImageSplitProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
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
