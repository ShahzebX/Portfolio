"use client";

import Image from "next/image";
import { gallery } from "@/resources";

export default function GalleryView() {
  return (
    <div className="columns-1 sm:columns-2 gap-4 space-y-4">
      {gallery.images.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg break-inside-avoid"
          style={{
            aspectRatio:
              image.orientation === "horizontal" ? "16 / 9" : "3 / 4",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
}
