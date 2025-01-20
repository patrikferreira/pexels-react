"use client"
import { AiOutlinePicture } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

type Props = {
    option: string;
}

export default function Select({ option  }: Props) {
    return <div className="bg-background p-3 rounded-2xl flex items-center justify-between gap-1 cursor-pointer">
        <AiOutlinePicture className="text-lg text-secondColor" />
        <p className="font-semibold text-sm">
            {option}
        </p>
        <MdKeyboardArrowDown className="text-secondColor" />
    </div>
}