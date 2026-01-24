type VideoBlockProps = {
  videoId: string;
  title?: string;
};

export default function VideoBlock({ videoId, title }: VideoBlockProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      {/* Optional title */}
      {title && (
        <div className="border-b border-border bg-muted/40 px-4 py-2 text-sm font-medium text-muted-foreground">
          {title}
        </div>
      )}

      {/* Video */}
      <div className="aspect-video w-full bg-muted">
        <iframe
          loading="lazy"
          src={`https://www.youtube.com/embed/${videoId}`}
          className="h-full w-full"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
