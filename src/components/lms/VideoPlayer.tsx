"use client";

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
  const src = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&responsive=true&preload=false`;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-black"
      style={{ paddingBottom: "56.25%" }}
    >
      <iframe
        src={src}
        title={title}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
