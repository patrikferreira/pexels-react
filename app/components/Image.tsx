import { TbPhotoSensor2 } from "react-icons/tb";
import DownloadBtn from "./DownloadBtn";

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
  return (
    <div className="h-min rounded-2xl overflow-hidden relative group cursor-pointer">
      <img src={src} alt={alt} className={`w-full h-auto ${className}`} />
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
