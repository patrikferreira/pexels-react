import { ReactNode } from "react"

type Props = {
    children: ReactNode;
    onClose: () => void;
    className?: string;
}

export default function Popover({ children, onClose, className} : Props) {
    return <div className={`absolute p-2 shadow-customShadow rounded-xl w-full bg-background ${className}`}>
        {children}
    </div>
}