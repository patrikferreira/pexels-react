import { useRef } from "react";
import { TbPhotoSensor2 } from "react-icons/tb";
import DownloadBtn from "./DownloadBtn";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function handleMouseEnter() {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      videoRef.current
        .play()
        .catch((error) => console.warn("Autoplay blocked:", error));
    }
  }

  function handleMouseLeave() {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }

  return (
    <div className="h-min rounded-2xl overflow-hidden relative group cursor-pointer">
      <video
        ref={videoRef}
        className={`w-full h-auto ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support videos.
      </video>

      <div className="flex items-center w-full justify-between p-4 absolute bottom-0 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <TbPhotoSensor2 className="text-3xl" /> {photographer}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <DownloadBtn src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
}
