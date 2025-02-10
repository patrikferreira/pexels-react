import { MdOutlineFileDownload } from "react-icons/md";
import Button from "./Button";
import { TbPhotoSensor2 } from "react-icons/tb";

type Props = {
  src: string;
  alt?: string;
  photographer: string;
  className?: string;
};

export default function Image({
  src,
  alt = "Image",
  photographer,
  className,
}: Props) {
  function download() {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = alt || "image";
        link.click();
      })
      .catch((error) => {
        console.error("Failed to download image:", error);
      });
  }

  return (
    <div className="h-min rounded-2xl overflow-hidden relative group cursor-pointer">
      <img src={src} alt={alt} className={`w-full h-auto ${className}`} />
      <div className="flex items-center w-full justify-between p-4 absolute bottom-0 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <TbPhotoSensor2 className="text-3xl" /> {photographer}
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
