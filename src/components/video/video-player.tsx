interface VideoPlayerProps {
  src: string;
  title: string;
}

function getYouTubeVideoId(url: string): string | null {
  // Regex to extract video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  const isYouTubeUrl = src.includes('youtube.com/') || src.includes('youtu.be/');
  let videoId: string | null = null;

  if (isYouTubeUrl) {
    videoId = getYouTubeVideoId(src);
  }

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-black">
      {videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
          data-ai-hint="youtube video"
        ></iframe>
      ) : (
        <video
          controls
          src={src}
          title={title}
          className="w-full h-full"
          data-ai-hint="video play"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
