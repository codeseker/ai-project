type VideoBlockProps = {
  videoId: string;
  title?: string;
};

export default function VideoBlock({ videoId, title }: VideoBlockProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Optional title */}
      {title && (
        <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
          {title}
        </div>
      )}

      {/* Video */}
      <div className="aspect-video w-full bg-muted">
        <iframe
          loading="lazy"
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
