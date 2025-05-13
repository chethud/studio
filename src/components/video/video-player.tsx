interface VideoPlayerProps {
  src: string;
  title: string;
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-black">
      <video
        controls
        src={src}
        title={title}
        className="w-full h-full"
        data-ai-hint="video play"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
