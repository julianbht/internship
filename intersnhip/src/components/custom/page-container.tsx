import type React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface PageContainerProps {
  /**
   * The content to display inside the container
   */
  children: React.ReactNode;
  /**
   * Optional banner image source URL
   */
  bannerSrc?: string;
  /**
   * Optional banner image alt text
   */
  bannerAlt?: string;
  /**
   * Optional banner height in pixels (default: 300)
   */
  bannerHeight?: number;
  /**
   * Optional CSS class to apply to the container
   */
  className?: string;
  /**
   * Optional maximum width for the content (default: "max-w-4xl")
   */
  maxWidth?: string;
}

export function PageContainer({
  children,
  bannerSrc,
  bannerAlt = "Page banner",
  bannerHeight = 300,
  className,
  maxWidth = "max-w-5xl",
}: PageContainerProps) {
  return (
    <div className="w-full">
      {bannerSrc && (
        <div className="w-full relative mb-8">
          <Image
            src={bannerSrc || "/placeholder.svg"}
            alt={bannerAlt}
            width={1920}
            height={bannerHeight}
            className="w-full object-cover"
            style={{ height: `${bannerHeight}px` }}
            priority
          />
        </div>
      )}
      <main className={cn("px-4 mx-auto pb-12", maxWidth, className)}>
        {children}
      </main>
    </div>
  );
}
