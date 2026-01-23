type VideoBlockProps = {
  src?: string;
};

export default function VideoBlock({ src }: VideoBlockProps) {
  if (!src) return null;

  return (
    <div className="my-6 aspect-video rounded-lg overflow-hidden border">
      <iframe
        src={src}
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
}
