"use client";
import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";
import Button from "./Button";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbPhotoSensor2 } from "react-icons/tb";

type Props = {
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function Modal({ onClose, title, children, className }: Props) {
  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function download() {
    alert("test");
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
          <Button
            action={download}
            className="flex items-center gap-2 text-md text-background bg-accentColor hover:brightness-95 transition-all duration-200 rounded-lg py-3 px-4"
          >
            <MdOutlineFileDownload className="text-xl" />
            Download
          </Button>
        </div>
        <div className="">{children}</div>
        <Button action={onClose} className="absolute top-0 right-[-40]">
          <IoIosClose className="text-4xl text-background" />
        </Button>
      </div>
    </div>
  );
}
