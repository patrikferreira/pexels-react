"use client";
import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";
import Button from "./Button";
import { TbPhotoSensor2 } from "react-icons/tb";
import DownloadBtn from "./DownloadBtn";

type Props = {
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  src: string;
  alt: string;
};

export default function Modal({ onClose, title, children, className, src, alt }: Props) {
  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-background rounded-lg shadow-lg p-4 max-w-lg w-full flex flex-col gap-4 relative ${className}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
           <TbPhotoSensor2 className="text-3xl" />
            {title}
          </div>
          <DownloadBtn src={src} alt={alt} />
        </div>
        <div className="">{children}</div>
        <Button action={onClose} className="absolute top-0 right-[-40]">
          <IoIosClose className="text-4xl text-background" />
        </Button>
      </div>
    </div>
  );
}
