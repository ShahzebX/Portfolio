import type { Metadata } from "next";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: gallery.title,
    description: gallery.description,
    openGraph: {
      title: gallery.title,
      description: gallery.description,
      url: `${baseURL}${gallery.path}`,
      siteName: person.name,
      images: [`/api/og/generate?title=${encodeURIComponent(gallery.title)}`],
      type: "website",
    },
  };
}

export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: gallery.title,
            description: gallery.description,
            url: `${baseURL}${gallery.path}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `${baseURL}${gallery.path}`,
              image: `${baseURL}${person.avatar}`,
            },
          }),
        }}
      />
      <GalleryView />
    </div>
  );
}
