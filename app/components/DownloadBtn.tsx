import { MdOutlineFileDownload } from "react-icons/md";
import Button from "./Button";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function DownloadBtn({ src, alt, className }: Props) {
  function downloadElement() {
    const isVideo = src.endsWith(".mp4") || src.includes("video");

    if (isVideo) {
      const link = document.createElement("a");
      link.href = src;
      link.download = alt || "video.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      fetch(src)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = alt || "item";
          link.click();
        })
        .catch((error) => {
          console.error("Failed to download item:", error);
        });
    }
  }

  return (
    <Button
      action={downloadElement}
      className="flex items-center gap-2 text-md text-background bg-accentColor hover:brightness-95 transition-all duration-200 rounded-lg py-3 px-4"
    >
      <MdOutlineFileDownload className="text-xl" />
      Download
    </Button>
  );
}
