import { useState, useRef } from "react";
import { MdOutlinePlayCircle, MdOutlinePauseCircle, MdOutlineFileDownload } from "react-icons/md";
import Button from "./Button";

type Props = {
  src: string;
  alt?: string;
  photographer: string;
  className?: string;
};

export default function Video({
  src,
  alt = "Video",
  photographer,
  className,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function handlePlayPause() {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function download() {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = alt || "video";
        link.click();
      })
      .catch((error) => {
        console.error("Failed to download video:", error);
      });
  }

  return (
    <div className="h-min rounded-2xl overflow-hidden relative group cursor-pointer">
      <video
        ref={videoRef}
        className={`w-full h-auto ${className}`}
        onClick={handlePlayPause}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support videos.
      </video>

      <div
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-50"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <MdOutlinePauseCircle className="text-6xl text-white" />
        ) : (
          <MdOutlinePlayCircle className="text-6xl text-white" />
        )}
      </div>

      <div className="flex items-center w-full justify-between p-4 absolute bottom-0 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <MdOutlinePlayCircle className="text-2xl" /> {photographer}
        </div>
        <div>
          <Button
            action={download}
            className="flex items-center gap-2 text-md text-background bg-accentColor hover:brightness-95 transition-all duration-200 rounded-lg py-3 px-4"
          >
            <MdOutlineFileDownload className="text-xl" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
